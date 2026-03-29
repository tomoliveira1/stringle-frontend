

import { X } from "lucide-react";
import { ColorLegend } from "./ColorLegend";

interface HowToPlayProps {
  onClose: () => void;
}

export function HowToPlay({ onClose }: HowToPlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-card text-card-foreground rounded-2xl shadow-2xl w-full max-w-sm flex flex-col overflow-hidden"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          animation: "bounce-in 0.35s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <h2
            className="text-lg font-extrabold text-foreground"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Como jogar
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label="Fechar"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="px-5 py-4 flex flex-col gap-4 overflow-y-auto max-h-[70vh]">
          {/* Regras básicas */}
          <div className="flex flex-col gap-2">
            <p
              className="text-sm text-foreground leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Adivinhe a palavra (ou frase) de tecnologia e programação do dia em{" "}
              <span className="font-bold text-emerald-400">6 tentativas</span>.
            </p>
            <p
              className="text-sm text-muted-foreground leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Após cada tentativa, as cores das letras indicam o quão perto você está.
            </p>
          </div>

          {/* Legenda de cores */}
          <div>
            <p
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Significado das cores
            </p>
            <ColorLegend />
          </div>

          {/* Separador */}
          <div className="h-px bg-border" />

          {/* Notas extras */}
          <div className="flex flex-col gap-2">
            <p
              className="text-xs text-muted-foreground leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              📅 Uma nova palavra é revelada a cada 24 horas.
            </p>
            <p
              className="text-xs text-muted-foreground leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              🌍 Todos os jogadores recebem a mesma palavra no mesmo dia.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, #22c55e, #16a34a)",
              boxShadow: "0 4px 14px rgba(34,197,94,0.25)",
            }}
          >
            Entendi, vamos jogar!
          </button>
        </div>
      </div>
    </div>
  );
}

export default HowToPlay;
