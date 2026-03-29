/**
 * Stringle — HintModal Component
 * Design: Minimalismo Editorial Tech
 * Modal para exibir dica e explicação da palavra do dia
 */

import { X, Lightbulb } from "lucide-react";

interface HintModalProps {
  hint: string;
  explanation: string;
  onClose: () => void;
}

export function HintModal({ hint, explanation, onClose }: HintModalProps) {
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
          <div className="flex items-center gap-2">
            <Lightbulb size={20} className="text-amber-400" />
            <h2
              className="text-lg font-extrabold text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Dica
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            aria-label="Fechar"
          >
            <X size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Conteúdo */}
        <div className="px-5 py-6 flex flex-col gap-5">
          {/* Dica */}
          <div className="flex flex-col gap-2">
            <p
              className="text-xs font-semibold text-muted-foreground uppercase tracking-widest"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Dica Rápida
            </p>
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: "rgba(251, 191, 36, 0.1)",
                borderLeft: "3px solid #fbbf24",
              }}
            >
              <p
                className="text-base font-semibold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {hint}
              </p>
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-border" />

          {/* Nota */}
          <div
            className="p-3 rounded-lg text-xs text-muted-foreground"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            💡 <span className="font-semibold">Dica usada!</span> Você pode usar apenas uma dica por jogo.
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4" style={{ borderTop: "1px solid var(--border)" }}>
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl font-bold text-sm text-white transition-all duration-150 active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              boxShadow: "0 4px 14px rgba(245, 158, 11, 0.25)",
            }}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export default HintModal;
