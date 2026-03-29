/**
 * Stringle — ResultModal Component
 * Design: Minimalismo Editorial Tech
 * Modal de resultado com compartilhamento estilo Wordle e countdown
 */

import { useEffect, useState } from "react";
import { Countdown } from "./Countdown";
import type { GuessRow, GameStatus } from "@/hooks/useGame";
import { MAX_GUESSES } from "@/hooks/useGame";
import { toast } from "sonner";

interface ResultModalProps {
  status: GameStatus;
  answer: string;
  guesses: GuessRow[];
  today: string;
}

const STATUS_EMOJI: Record<string, string> = {
  correct: "🟩",
  present: "🟨",
  "present-other": "🟦",
  absent: "⬛",
};

function buildShareText(guesses: GuessRow[], answer: string, today: string, won: boolean): string {
  const lines = guesses.map((g) =>
    g.letters.map((l) => STATUS_EMOJI[l.status] || "⬛").join("")
  );
  const score = won ? `${guesses.length}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`;
  return `Stringle ${today} ${score}\n\n${lines.join("\n")}\n\nstringle.manus.space`;
}

export function ResultModal({ status, answer, guesses, today }: ResultModalProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const won = status === "won";
  const lost = status === "lost";

  useEffect(() => {
    if (won || lost) {
      // Delay para deixar a animação de flip terminar
      const delay = won ? 1800 : 1200;
      const t = setTimeout(() => {
        setVisible(true);
        setTimeout(() => setMounted(true), 50);
      }, delay);
      return () => clearTimeout(t);
    }
  }, [won, lost]);

  if (!visible) return null;

  const handleShare = async () => {
    const text = buildShareText(guesses, answer, today, won);
    try {
      if (navigator.share) {
        await navigator.share({ text });
      } else {
        await navigator.clipboard.writeText(text);
        toast.success("Resultado copiado!", {
          description: "Cole no Twitter, WhatsApp ou onde quiser!",
        });
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        toast.success("Resultado copiado!");
      } catch {
        toast.error("Não foi possível copiar o resultado.");
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div
        className="bg-card text-card-foreground rounded-2xl shadow-2xl w-full max-w-sm p-6 flex flex-col items-center gap-5"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          transform: mounted ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
          opacity: mounted ? 1 : 0,
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
        }}
      >
        {/* Ícone e título */}
        {won ? (
          <>
            <div
              className="text-5xl"
              style={{
                transform: mounted ? "scale(1)" : "scale(0)",
                transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.1s",
              }}
            >
              🎉
            </div>
            <div className="text-center">
              <h2
                className="text-2xl font-extrabold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Você acertou!
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Em{" "}
                <span className="font-bold text-emerald-400">{guesses.length}</span>
                {" "}de{" "}
                <span className="font-bold">{MAX_GUESSES}</span>
                {" "}tentativas
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-5xl">😔</div>
            <div className="text-center">
              <h2
                className="text-2xl font-extrabold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Não foi dessa vez!
              </h2>
              <p className="text-sm text-muted-foreground mt-1">A palavra era:</p>
              <p
                className="text-xl font-extrabold text-foreground tracking-widest mt-1"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {answer}
              </p>
            </div>
          </>
        )}

        {/* Preview dos emojis */}
        <div
          className="flex flex-col items-center gap-0.5 p-3 rounded-xl"
          style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
        >
          {guesses.map((g, i) => (
            <div key={i} className="flex gap-0.5">
              {g.letters.map((l, j) => (
                <span key={j} className="text-lg leading-none">
                  {STATUS_EMOJI[l.status] || "⬛"}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Separador */}
        <div className="w-full h-px bg-border" />

        {/* Countdown */}
        <Countdown />

        {/* Botão compartilhar */}
        <button
          onClick={handleShare}
          className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: "linear-gradient(135deg, #22c55e, #16a34a)",
            boxShadow: "0 4px 14px rgba(34,197,94,0.35)",
          }}
        >
          Compartilhar resultado
        </button>
      </div>
    </div>
  );
}

export default ResultModal;
