/**
 * Stringle — Home Page
 * Design: Minimalismo Editorial Tech
 * Swiss International Typographic Style + Tech Editorial
 *
 * Layout: Header compacto → Board central → Teclado virtual fixo
 * Tipografia: Space Grotesk (header/UI) + IBM Plex Mono (tiles)
 */

import { useState } from "react";
import { HelpCircle, Moon, Sun, Lightbulb } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useGame } from "@/hooks/useGame";
import { Board } from "@/components/game/Board";
import { Keyboard } from "@/components/game/Keyboard";
import { ResultModal } from "@/components/game/ResultModal";
import { HowToPlay } from "@/components/game/HowToPlay";
import { HintModal } from "@/components/game/HintModal";
import { getWordLength } from "@/utils/evaluateGuess";
import { MAX_GUESSES } from "@/hooks/useGame";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [showHelp, setShowHelp] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const {
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
    canShowHint,
  } = useGame();

  const isGameOver = state.status === "won" || state.status === "lost";
  const wordLen = getWordLength(answer);
  const isPhrase = answer.includes(" ");

  // Formatar data para exibição
  const dateDisplay = (() => {
    const [year, month, day] = today.split("-");
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    return `${day} ${months[parseInt(month) - 1]} ${year}`;
  })();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden select-none">
      {/* ─── Header ─────────────────────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <button
          onClick={() => setShowHelp(true)}
          className="p-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Como jogar"
        >
          <HelpCircle size={20} className="text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center">
          <h1
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}
          >
            Stringle
          </h1>
          <p
            className="text-[9px] text-muted-foreground uppercase tracking-[0.25em] mt-0.5"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Adivinhe a tech do dia
          </p>
        </div>

        <div className="flex items-center gap-1">
          {canShowHint && (
            <button
              onClick={() => {
                setShowHint(true);
                useHint();
              }}
              className="p-2 rounded-lg hover:bg-accent transition-colors relative"
              aria-label="Ver dica"
              title="Dica disponível"
            >
              <Lightbulb size={20} className="text-amber-400" />
              <span
                className="absolute top-1 right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: "#f59e0b" }}
              />
            </button>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? (
              <Sun size={20} className="text-muted-foreground" />
            ) : (
              <Moon size={20} className="text-muted-foreground" />
            )}
          </button>
        </div>
      </header>

      {/* ─── Info Bar ────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-center gap-4 py-2 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {isPhrase ? (
            <>
              Frase com{" "}
              <span className="font-semibold text-foreground">{wordLen} letras</span>
              {" · "}
              <span className="font-semibold text-foreground">
                {answer.split(" ").length} palavras
              </span>
            </>
          ) : (
            <>
              Palavra com{" "}
              <span className="font-semibold text-foreground">{wordLen} letras</span>
            </>
          )}
        </span>

        <span className="text-muted-foreground opacity-40">|</span>

        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="font-semibold text-foreground">{state.guesses.length}</span>
          <span>/{MAX_GUESSES}</span>
        </span>

        <span className="text-muted-foreground opacity-40">|</span>

        <span
          className="text-xs text-muted-foreground"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          {dateDisplay}
        </span>
      </div>

      {/* ─── Main Content ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-between py-4 gap-4 min-h-0">
        {/* Board */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0">
          <Board
            answer={answer}
            guesses={state.guesses}
            currentInput={state.currentInput}
            currentRow={state.currentRow}
            invalidShake={state.invalidShake}
            revealingRow={state.revealingRow}
            onShakeDone={onShakeDone}
            onRevealDone={onRevealDone}
          />
        </div>

        {/* Keyboard */}
        <div className="w-full pb-2 flex-shrink-0">
          <Keyboard
            keyboardState={keyboardState}
            onLetter={typeLetter}
            onDelete={deleteLetter}
            onEnter={submitGuess}
            disabled={isGameOver}
          />
        </div>
      </main>

      {/* ─── Modals ──────────────────────────────────────────────────── */}
      {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}

      {showHint && (
        <HintModal
          hint={state.hint}
          explanation={state.explanation}
          onClose={() => setShowHint(false)}
        />
      )}

      {isGameOver && (
        <ResultModal
          status={state.status}
          answer={answer}
          guesses={state.guesses}
          today={today}
        />
      )}
    </div>
  );
}
