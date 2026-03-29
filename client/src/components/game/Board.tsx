/**
 * Stringle — Board Component
 * Design: Minimalismo Editorial Tech
 * Grid central de tentativas com suporte a palavras e frases
 * Tiles com tamanho adequado e layout responsivo
 */

import { useEffect, useRef } from "react";
import { Tile } from "./Tile";
import type { GuessRow } from "@/hooks/useGame";
import { MAX_GUESSES } from "@/hooks/useGame";
import { getWordLength } from "@/utils/evaluateGuess";
import type { LetterStatus } from "@/utils/evaluateGuess";

interface BoardProps {
  answer: string;
  guesses: GuessRow[];
  currentInput: string;
  currentRow: number;
  invalidShake: boolean;
  revealingRow: number | null;
  onShakeDone: () => void;
  onRevealDone: () => void;
}

function buildCurrentRowLetters(
  input: string,
  answer: string
): Array<{ letter: string; isSpace: boolean }> {
  const answerChars = answer.split("");
  const inputLetters = input.replace(/\s/g, "").split("");
  const result: Array<{ letter: string; isSpace: boolean }> = [];
  let letterIdx = 0;

  for (const ch of answerChars) {
    if (ch === " ") {
      result.push({ letter: " ", isSpace: true });
    } else {
      result.push({ letter: inputLetters[letterIdx] || "", isSpace: false });
      letterIdx++;
    }
  }

  return result;
}

function buildGuessRowLetters(
  guess: GuessRow,
  answer: string
): Array<{ letter: string; status: LetterStatus; isSpace: boolean }> {
  const answerChars = answer.split("");
  const guessLetters = guess.letters;
  const result: Array<{ letter: string; status: LetterStatus; isSpace: boolean }> = [];
  let letterIdx = 0;

  for (const ch of answerChars) {
    if (ch === " ") {
      result.push({ letter: " ", status: "empty", isSpace: true });
    } else {
      const gl = guessLetters[letterIdx] || { letter: "", status: "empty" as LetterStatus };
      result.push({ letter: gl.letter, status: gl.status, isSpace: false });
      letterIdx++;
    }
  }

  return result;
}

export function Board({
  answer,
  guesses,
  currentInput,
  currentRow,
  invalidShake,
  revealingRow,
  onShakeDone,
  onRevealDone,
}: BoardProps) {
  const wordLength = getWordLength(answer);
  const answerChars = answer.split("");
  const shakeRef = useRef<HTMLDivElement>(null);

  // Shake animation ao erro
  useEffect(() => {
    if (invalidShake && shakeRef.current) {
      shakeRef.current.classList.add("animate-shake");
      const t = setTimeout(() => {
        shakeRef.current?.classList.remove("animate-shake");
        onShakeDone();
      }, 600);
      return () => clearTimeout(t);
    }
  }, [invalidShake, onShakeDone]);

  // Reveal done callback
  useEffect(() => {
    if (revealingRow !== null) {
      const revealDuration = wordLength * 300 + 500;
      const t = setTimeout(onRevealDone, revealDuration);
      return () => clearTimeout(t);
    }
  }, [revealingRow, wordLength, onRevealDone]);

  // Calcular tamanho dos tiles dinamicamente
  const letterCount = wordLength; // sem espaços
  const tileSize =
    letterCount <= 5
      ? 62
      : letterCount <= 7
      ? 54
      : letterCount <= 9
      ? 46
      : letterCount <= 12
      ? 38
      : letterCount <= 16
      ? 32
      : 28;

  const gap = letterCount <= 9 ? 6 : 4;

  return (
    <div className="flex flex-col items-center w-full px-2" style={{ gap: `${gap}px` }}>
      {Array.from({ length: MAX_GUESSES }, (_, rowIndex) => {
        const isCompleted = rowIndex < guesses.length;
        const isCurrent = rowIndex === currentRow;
        const isRevealing = revealingRow === rowIndex;

        type RowCell =
          | { letter: string; status: LetterStatus; isSpace: boolean }
          | { letter: string; isSpace: boolean; status?: undefined };

        let rowCells: RowCell[];

        if (isCompleted) {
          rowCells = buildGuessRowLetters(guesses[rowIndex], answer);
        } else if (isCurrent) {
          rowCells = buildCurrentRowLetters(currentInput, answer).map((c) => ({
            ...c,
            status: c.isSpace ? ("empty" as LetterStatus) : c.letter ? ("tbd" as LetterStatus) : ("empty" as LetterStatus),
          }));
        } else {
          rowCells = answerChars.map((ch) => ({
            letter: "",
            isSpace: ch === " ",
            status: "empty" as LetterStatus,
          }));
        }

        // Calcular delay de reveal por índice de letra (não de espaço)
        let letterRevealIdx = 0;

        return (
          <div
            key={rowIndex}
            ref={isCurrent ? shakeRef : undefined}
            className="flex items-center"
            style={{ gap: `${gap}px` }}
          >
            {rowCells.map((cell, colIndex) => {
              if (cell.isSpace) {
                return (
                  <div
                    key={`space-${colIndex}`}
                    style={{ width: "10px" }}
                    className="flex items-center justify-center"
                  >
                    <div
                      className="rounded-full bg-gray-600 dark:bg-gray-500"
                      style={{ width: "4px", height: "4px" }}
                    />
                  </div>
                );
              }

              const revealDelay = letterRevealIdx * 300;
              letterRevealIdx++;

              return (
                <div
                  key={colIndex}
                  style={{ width: `${tileSize}px`, height: `${tileSize}px` }}
                >
                  <Tile
                    letter={cell.letter}
                    status={(cell as { status: LetterStatus }).status || "empty"}
                    isRevealing={isRevealing}
                    revealDelay={revealDelay}
                    isCurrentRow={isCurrent}
                    position={colIndex}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
