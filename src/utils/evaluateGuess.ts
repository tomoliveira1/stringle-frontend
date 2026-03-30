/**
 * Stringle — evaluateGuess
 * Design: Minimalismo Editorial Tech
 *
 * Avalia uma tentativa do jogador contra a resposta correta.
 * Retorna um array de objetos com a letra e seu status.
 *
 * Status possíveis:
 * - "correct"           → Verde  (letra correta na posição correta)
 * - "present"          → Amarelo (letra existe, mas posição errada, mesma palavra)
 * - "present-other"    → Azul   (letra existe, mas em outra palavra da frase)
 * - "absent"           → Cinza  (letra não existe)
 *
 * Regras especiais para frases:
 * - Espaços são ignorados na comparação (tratados automaticamente)
 * - "present-other" só aparece em frases multi-palavra
 */

export type LetterStatus = "correct" | "present" | "present-other" | "absent" | "empty" | "tbd";

export interface LetterResult {
  letter: string;
  status: LetterStatus;
}

/**
 * Remove espaços de uma string para comparação de posição.
 */
function stripSpaces(str: string): string {
  return str.replace(/\s/g, "");
}

/**
 * Divide uma frase em palavras, retornando array de palavras sem espaços.
 */
function getWords(str: string): string[] {
  return str.split(/\s+/).filter((w) => w.length > 0);
}

/**
 * Verifica se a resposta é uma frase (contém espaços).
 */
export function isPhrase(answer: string): boolean {
  return answer.includes(" ");
}

/**
 * Avalia a tentativa do jogador contra a resposta correta.
 * Trabalha com letras sem espaços (espaços são tratados automaticamente).
 *
 * @param guess  - Tentativa do jogador (sem espaços, uppercase)
 * @param answer - Resposta correta (com ou sem espaços, uppercase)
 * @returns Array de LetterResult com status de cada letra
 */
export function evaluateGuess(guess: string, answer: string): LetterResult[] {
  // Normalizar: remover espaços para comparação posicional
  const guessLetters = stripSpaces(guess).split("");
  const answerLetters = stripSpaces(answer).split("");

  const result: LetterResult[] = new Array(guessLetters.length).fill(null).map((_, i) => ({
    letter: guessLetters[i],
    status: "absent" as LetterStatus,
  }));

  // Contagem de letras disponíveis na resposta (para evitar duplicação incorreta)
  const answerCount: Record<string, number> = {};
  for (const letter of answerLetters) {
    answerCount[letter] = (answerCount[letter] || 0) + 1;
  }

  // Passo 1: Identificar letras CORRETAS (verde) — prioridade máxima
  for (let i = 0; i < guessLetters.length; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      result[i].status = "correct";
      answerCount[guessLetters[i]]--;
    }
  }

  // Passo 2: Para frases, identificar em qual palavra cada posição da resposta pertence
  const answerWords = getWords(answer);
  const isMultiWord = answerWords.length > 1;

  // Mapear cada posição (sem espaços) para o índice da palavra original
  const positionToWordIndex: number[] = [];
  for (let wi = 0; wi < answerWords.length; wi++) {
    for (let li = 0; li < answerWords[wi].length; li++) {
      positionToWordIndex.push(wi);
    }
  }

  // Passo 3: Identificar letras PRESENTES (amarelo ou azul)
  for (let i = 0; i < guessLetters.length; i++) {
    if (result[i].status === "correct") continue;

    const letter = guessLetters[i];

    if (answerCount[letter] && answerCount[letter] > 0) {
      answerCount[letter]--;

      if (isMultiWord) {
        // Verificar se a letra está na mesma palavra que sua posição na tentativa
        // Para frases, a tentativa também é dividida em palavras
        const guessWords = getWords(guess);
        let guessWordIndex = -1;
        let letterCount = 0;
        for (let wi = 0; wi < guessWords.length; wi++) {
          if (i < letterCount + guessWords[wi].length) {
            guessWordIndex = wi;
            break;
          }
          letterCount += guessWords[wi].length;
        }

        // Verificar se a letra existe na mesma palavra da resposta
        const sameWordIndex = guessWordIndex < answerWords.length ? guessWordIndex : -1;
        const letterInSameWord =
          sameWordIndex >= 0 && answerWords[sameWordIndex].includes(letter);

        if (letterInSameWord) {
          result[i].status = "present";
        } else {
          // Verificar se existe em alguma outra palavra
          const letterInAnyWord = answerWords.some((word) => word.includes(letter));
          result[i].status = letterInAnyWord ? "present-other" : "absent";
        }
      } else {
        result[i].status = "present";
      }
    }
  }

  return result;
}

/**
 * Normaliza o input do usuário: uppercase, remove caracteres inválidos.
 * Para frases, mantém espaços internos.
 */
export function normalizeInput(input: string): string {
  return input.toUpperCase().replace(/[^A-Z\s]/g, "");
}

/**
 * Verifica se a tentativa tem o comprimento correto (ignorando espaços).
 */
export function isValidLength(guess: string, answer: string): boolean {
  return stripSpaces(guess).length === stripSpaces(answer).length;
}

/**
 * Retorna o comprimento da palavra/frase sem espaços.
 */
export function getWordLength(word: string): number {
  return stripSpaces(word).length;
}

export default evaluateGuess;
