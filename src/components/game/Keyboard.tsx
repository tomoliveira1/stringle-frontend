/**
 * Stringle — Keyboard Component
 * Design: Minimalismo Editorial Tech
 * Teclado virtual QWERTY com estado visual das letras já usadas
 * Tipografia: Space Grotesk (medium 500) para teclas
 */

import type { KeyboardState } from "@/hooks/useGame";
import type { LetterStatus } from "@/utils/evaluateGuess";

interface KeyboardProps {
  keyboardState: KeyboardState;
  onLetter: (letter: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  disabled?: boolean;
}

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "⌫"],
];

const keyStatusStyles: Record<LetterStatus, string> = {
  correct:
    "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-400 active:bg-emerald-600",
  present:
    "bg-amber-500 text-white border-amber-500 hover:bg-amber-400 active:bg-amber-600",
  "present-other":
    "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-400 active:bg-indigo-600",
  absent:
    "bg-gray-600 text-gray-300 border-gray-600 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-500 active:bg-gray-700",
  tbd: "bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400",
  empty:
    "bg-gray-200 text-gray-900 border-gray-300 dark:bg-gray-600 dark:text-gray-100 dark:border-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 active:bg-gray-400",
};

interface KeyProps {
  value: string;
  status?: LetterStatus;
  onClick: () => void;
  wide?: boolean;
  disabled?: boolean;
}

function Key({ value, status = "empty", onClick, wide = false, disabled = false }: KeyProps) {
  const styleClass = keyStatusStyles[status] || keyStatusStyles["empty"];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center
        border rounded-md font-semibold uppercase
        transition-all duration-150 select-none
        touch-manipulation
        ${wide ? "px-3 text-xs sm:text-sm min-w-[52px] sm:min-w-[64px]" : "w-8 sm:w-10 text-sm sm:text-base"}
        h-12 sm:h-14
        ${styleClass}
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      `}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      aria-label={value === "⌫" ? "Apagar" : value}
    >
      {value}
    </button>
  );
}

export function Keyboard({
  keyboardState,
  onLetter,
  onDelete,
  onEnter,
  disabled = false,
}: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-full px-1 sm:px-2 max-w-lg mx-auto">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 sm:gap-1.5 justify-center w-full">
          {row.map((key) => {
            if (key === "ENTER") {
              return (
                <Key
                  key="ENTER"
                  value="ENTER"
                  onClick={onEnter}
                  wide
                  disabled={disabled}
                />
              );
            }
            if (key === "⌫") {
              return (
                <Key
                  key="DELETE"
                  value="⌫"
                  onClick={onDelete}
                  wide
                  disabled={disabled}
                />
              );
            }
            return (
              <Key
                key={key}
                value={key}
                status={keyboardState[key] || "empty"}
                onClick={() => onLetter(key)}
                disabled={disabled}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
