/**
 * Stringle — getDailyWord
 * Design: Minimalismo Editorial Tech
 *
 * Retorna a palavra do dia de forma determinística e global.
 * Todos os jogadores recebem a mesma palavra no mesmo dia.
 */

import WORD_LIST from "@/data/words";

/**
 * Converte uma data para um índice determinístico baseado no número de dias
 * desde uma data de referência (epoch do jogo).
 */
function getDayIndex(date: Date): number {
  const EPOCH = new Date("2026-01-01T00:00:00.000Z");
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceEpoch = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
      EPOCH.getTime()) /
      msPerDay
  );
  // Garantir índice positivo e dentro do range da lista
  return ((daysSinceEpoch % WORD_LIST.length) + WORD_LIST.length) % WORD_LIST.length;
}

/**
 * Retorna a palavra do dia baseada na data atual.
 * A palavra é determinística: mesma data = mesma palavra para todos os jogadores.
 */
export function getDailyWord(date: Date = new Date()): string {
  const index = getDayIndex(date);
  return WORD_LIST[index];
}

/**
 * Retorna a data atual no formato YYYY-MM-DD (timezone local).
 */
export function getTodayString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Calcula o tempo restante até meia-noite (próxima palavra).
 */
export function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = midnight.getTime() - now.getTime();

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

export default getDailyWord;
