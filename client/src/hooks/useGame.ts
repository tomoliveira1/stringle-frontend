/**
 * Stringle — useGame Hook
 * Design: Minimalismo Editorial Tech
 *
 * Hook principal que gerencia todo o estado do jogo:
 * - Palavra do dia (via API)
 * - Tentativas e histórico
 * - Estado do jogo (jogando/vitória/derrota/aguardando)
 * - Persistência no localStorage
 * - Input do jogador
 * - Dica e explicação
 */

import { useCallback, useEffect, useReducer, useState } from "react";
import { evaluateGuess, getWordLength, isValidLength, normalizeInput } from "@/utils/evaluateGuess";
import { getTodayString } from "@/utils/getDailyWord";
import { fetchWordOfTheDayWithCache } from "@/services/wordService";
import type { LetterResult, LetterStatus } from "@/utils/evaluateGuess";
import type { WordData } from "@/services/wordService";

// ─── Constantes ───────────────────────────────────────────────────────────────

export const MAX_GUESSES = 6;
const STORAGE_KEY = "stringle_state";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type GameStatus = "playing" | "won" | "lost" | "waiting" | "loading";

export interface GuessRow {
  letters: LetterResult[];
  word: string;
}

export interface GameState {
  date: string;
  answer: string;
  hint: string;
  explanation: string;
  guesses: GuessRow[];
  currentInput: string;
  status: GameStatus;
  currentRow: number;
  invalidShake: boolean;
  revealingRow: number | null;
  hintUsed: boolean;
}

export interface KeyboardState {
  [key: string]: LetterStatus;
}

// ─── Estado Persistido ────────────────────────────────────────────────────────

interface PersistedState {
  date: string;
  guesses: string[];
  won: boolean;
  completed: boolean;
  hintUsed: boolean;
}

function loadPersistedState(): PersistedState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

function savePersistedState(state: PersistedState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage pode estar indisponível
  }
}

// ─── Inicialização do Estado ──────────────────────────────────────────────────

function buildInitialState(): GameState {
  const today = getTodayString();

  return {
    date: today,
    answer: "",
    hint: "",
    explanation: "",
    guesses: [],
    currentInput: "",
    status: "loading",
    currentRow: 0,
    invalidShake: false,
    revealingRow: null,
    hintUsed: false,
  };
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

type Action =
  | { type: "TYPE_LETTER"; letter: string }
  | { type: "DELETE_LETTER" }
  | { type: "SUBMIT_GUESS" }
  | { type: "SHAKE_DONE" }
  | { type: "REVEAL_DONE" }
  | { type: "SET_WORD_DATA"; data: WordData }
  | { type: "USE_HINT" }
  | { type: "RESTORE_STATE"; persisted: PersistedState; answer: string };

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "SET_WORD_DATA": {
      return {
        ...state,
        answer: action.data.word,
        hint: action.data.hint,
        explanation: action.data.explanation,
        status: "playing",
      };
    }

    case "RESTORE_STATE": {
      let restored: GameState = {
        ...state,
        answer: action.answer,
        status: "playing" as GameStatus,
        currentRow: 0,
        guesses: [],
      };

      for (const word of action.persisted.guesses) {
        const letters = evaluateGuess(word, action.answer);
        const guessRow = { letters, word };
        restored = {
          ...restored,
          guesses: [...restored.guesses, guessRow] as GuessRow[],
          currentRow: restored.currentRow + 1,
        };
      }

      if (action.persisted.won) {
        restored.status = "won";
      } else if (action.persisted.completed) {
        restored.status = "lost";
      }

      restored.hintUsed = action.persisted.hintUsed;

      return restored;
    }

    case "TYPE_LETTER": {
      if (state.status !== "playing") return state;
      if (state.revealingRow !== null) return state;
      const maxLen = getWordLength(state.answer);
      const currentNoSpaces = state.currentInput.replace(/\s/g, "");
      if (currentNoSpaces.length >= maxLen) return state;

      // Auto-inserir espaços para frases
      const answerWords = state.answer.split(" ");
      const isPhrase = answerWords.length > 1;

      if (!isPhrase) {
        return { ...state, currentInput: state.currentInput + action.letter };
      }

      // Para frases: reconstruir input com espaços automáticos
      const allLetters = (state.currentInput.replace(/\s/g, "") + action.letter).split("");
      let rebuilt = "";
      let letterIdx = 0;

      for (let wi = 0; wi < answerWords.length; wi++) {
        for (let li = 0; li < answerWords[wi].length && letterIdx < allLetters.length; li++) {
          rebuilt += allLetters[letterIdx++];
        }
        if (wi < answerWords.length - 1 && letterIdx < allLetters.length) {
          rebuilt += " ";
        } else if (wi < answerWords.length - 1 && letterIdx === allLetters.length) {
          // Não adicionar espaço trailing se ainda não completou a palavra atual
        }
      }

      return { ...state, currentInput: rebuilt };
    }

    case "DELETE_LETTER": {
      if (state.status !== "playing") return state;
      if (state.revealingRow !== null) return state;
      if (state.currentInput.length === 0) return state;

      let newInput = state.currentInput;
      // Remover espaço trailing ao deletar
      while (newInput.endsWith(" ")) {
        newInput = newInput.slice(0, -1);
      }
      newInput = newInput.slice(0, -1);

      return { ...state, currentInput: newInput };
    }

    case "SUBMIT_GUESS": {
      if (state.status !== "playing") return state;
      if (state.revealingRow !== null) return state;
      if (!isValidLength(state.currentInput, state.answer)) {
        return { ...state, invalidShake: true };
      }

      const letters = evaluateGuess(state.currentInput, state.answer);
      const newGuess: GuessRow = { letters, word: state.currentInput };
      const newGuesses = [...state.guesses, newGuess];
      const won = letters.every((l) => l.status === "correct");
      const lost = !won && newGuesses.length >= MAX_GUESSES;

      let newStatus: GameStatus = "playing";
      if (won) newStatus = "won";
      else if (lost) newStatus = "lost";

      return {
        ...state,
        guesses: newGuesses,
        currentInput: "",
        currentRow: state.currentRow + 1,
        status: newStatus,
        revealingRow: state.currentRow,
      };
    }

    case "SHAKE_DONE":
      return { ...state, invalidShake: false };

    case "REVEAL_DONE":
      return { ...state, revealingRow: null };

    case "USE_HINT":
      return { ...state, hintUsed: true };

    default:
      return state;
  }
}

// ─── Hook Principal ───────────────────────────────────────────────────────────

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, undefined, buildInitialState);
  const [error, setError] = useState<string | null>(null);

  const today = state.date;
  const answer = state.answer;

  // Carregar palavra do dia da API
  useEffect(() => {
    const loadWordOfTheDay = async () => {
      try {
        const wordData = await fetchWordOfTheDayWithCache();
        const persisted = loadPersistedState();

        if (persisted && persisted.date === today) {
          // Restaurar estado persistido
          dispatch({ type: "RESTORE_STATE", persisted, answer: wordData.word });
        } else {
          // Novo jogo
          dispatch({ type: "SET_WORD_DATA", data: wordData });
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Erro ao carregar palavra";
        setError(errorMsg);
        console.error("Failed to load word of the day:", err);
        // Fallback: usar um estado de erro
        dispatch({
          type: "SET_WORD_DATA",
          data: {
            word: "REACT",
            hint: "Biblioteca JavaScript",
            explanation: "React eh uma biblioteca JavaScript de codigo aberto focada em criar interfaces de usuario.",
          },
        });
      }
    };

    if (state.status === "loading") {
      loadWordOfTheDay();
    }
  }, [state.status, today]);

  // Persistir estado quando muda
  useEffect(() => {
    if (state.status !== "loading") {
      const persisted: PersistedState = {
        date: today,
        guesses: state.guesses.map((g) => g.word),
        won: state.status === "won",
        completed: state.status === "won" || state.status === "lost",
        hintUsed: state.hintUsed,
      };
      savePersistedState(persisted);
    }
  }, [state.guesses, state.status, today, state.hintUsed]);

  // Handlers
  const typeLetter = useCallback((letter: string) => {
    const normalized = normalizeInput(letter);
    if (normalized && normalized !== " ") {
      dispatch({ type: "TYPE_LETTER", letter: normalized });
    }
  }, []);

  const deleteLetter = useCallback(() => {
    dispatch({ type: "DELETE_LETTER" });
  }, []);

  const submitGuess = useCallback(() => {
    dispatch({ type: "SUBMIT_GUESS" });
  }, []);

  const onShakeDone = useCallback(() => {
    dispatch({ type: "SHAKE_DONE" });
  }, []);

  const onRevealDone = useCallback(() => {
    dispatch({ type: "REVEAL_DONE" });
  }, []);

  const useHint = useCallback(() => {
    dispatch({ type: "USE_HINT" });
  }, []);

  // Teclado físico
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key === "Enter") {
        submitGuess();
      } else if (e.key === "Backspace") {
        deleteLetter();
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        typeLetter(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typeLetter, deleteLetter, submitGuess]);

  // Calcular estado do teclado (cores das teclas já usadas)
  const keyboardState: KeyboardState = {};
  const statusPriority: Record<LetterStatus, number> = {
    correct: 4,
    present: 3,
    "present-other": 2,
    absent: 1,
    tbd: 0,
    empty: 0,
  };

  for (const guess of state.guesses) {
    for (const { letter, status } of guess.letters) {
      const current = keyboardState[letter];
      if (!current || statusPriority[status] > statusPriority[current]) {
        keyboardState[letter] = status;
      }
    }
  }

  // Verificar se pode mostrar dica (apos 3a tentativa)
  const canShowHint = state.currentRow >= 3 && !state.hintUsed && state.status === "playing";

  return {
    state,
    keyboardState,
    typeLetter,
    deleteLetter,
    submitGuess,
    onShakeDone,
    onRevealDone,
    useHint,
    answer,
    today,
    error,
    canShowHint,
  };
}

export default useGame;
