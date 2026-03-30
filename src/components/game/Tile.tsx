/**
 * Stringle — Tile Component
 * Design: Minimalismo Editorial Tech
 * Tipografia: IBM Plex Mono (bold 700)
 * Animação: Flip 3D ao revelar, pop ao digitar
 */

import { useEffect, useRef, useState } from "react";
import type { LetterStatus } from "@/utils/evaluateGuess";

interface TileProps {
  letter?: string;
  status?: LetterStatus;
  isRevealing?: boolean;
  revealDelay?: number;
  isCurrentRow?: boolean;
  position?: number;
}

function getBorderColor(status: LetterStatus, hasLetter: boolean): string {
  switch (status) {
    case "correct": return "#22c55e";
    case "present": return "#f59e0b";
    case "present-other": return "#6366f1";
    case "absent": return "#4b5563";
    case "tbd": return hasLetter ? "#6b7280" : "#374151";
    default: return "#374151";
  }
}

function getBgColor(status: LetterStatus): string {
  switch (status) {
    case "correct": return "#22c55e";
    case "present": return "#f59e0b";
    case "present-other": return "#6366f1";
    case "absent": return "#4b5563";
    default: return "transparent";
  }
}

function getTextColor(status: LetterStatus): string {
  switch (status) {
    case "correct":
    case "present":
    case "present-other":
    case "absent":
      return "#ffffff";
    default:
      return "inherit";
  }
}

export function Tile({
  letter = "",
  status = "empty",
  isRevealing = false,
  revealDelay = 0,
  isCurrentRow = false,
}: TileProps) {
  const [displayStatus, setDisplayStatus] = useState<LetterStatus>(status);
  const [phase, setPhase] = useState<"idle" | "flip-out" | "flip-in">("idle");
  const [popAnim, setPopAnim] = useState(false);
  const prevLetter = useRef(letter);

  // Pop ao digitar
  useEffect(() => {
    if (letter && letter !== prevLetter.current && isCurrentRow) {
      setPopAnim(true);
      const t = setTimeout(() => setPopAnim(false), 120);
      prevLetter.current = letter;
      return () => clearTimeout(t);
    }
    prevLetter.current = letter;
  }, [letter, isCurrentRow]);

  // Flip ao revelar
  useEffect(() => {
    if (!isRevealing) {
      setPhase("idle");
      setDisplayStatus(status);
      return;
    }

    const t1 = setTimeout(() => setPhase("flip-out"), revealDelay);
    const t2 = setTimeout(() => {
      setDisplayStatus(status);
      setPhase("flip-in");
    }, revealDelay + 250);
    const t3 = setTimeout(() => setPhase("idle"), revealDelay + 500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isRevealing, revealDelay, status]);

  useEffect(() => {
    if (!isRevealing) setDisplayStatus(status);
  }, [status, isRevealing]);

  const hasLetter = letter.length > 0;
  const borderColor = getBorderColor(displayStatus, hasLetter);
  const bgColor = getBgColor(displayStatus);
  const textColor = getTextColor(displayStatus);

  const rotateX = phase === "flip-out" ? "rotateX(-90deg)" : "rotateX(0deg)";
  const scale = popAnim ? "scale(1.12)" : "scale(1)";

  const transition =
    phase === "flip-out" || phase === "flip-in"
      ? "transform 0.25s ease"
      : "transform 0.1s ease";

  return (
    <div className="w-full h-full" style={{ perspective: "300px" }}>
      <div
        className="w-full h-full flex items-center justify-center font-bold uppercase select-none"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: "clamp(0.85rem, 2.5vw, 1.4rem)",
          letterSpacing: "0.05em",
          borderRadius: "4px",
          border: `2px solid ${borderColor}`,
          backgroundColor: bgColor,
          color: textColor,
          transform: `${rotateX} ${scale}`,
          transition,
          backfaceVisibility: "hidden",
        }}
      >
        {letter}
      </div>
    </div>
  );
}

export default Tile;
