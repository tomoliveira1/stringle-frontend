/**
 * Stringle — Word Service
 * Serviço para consumir a API de palavra do dia
 */

export interface WordData {
  word: string;
  hint: string;
  explanation: string;
}

export interface WordResponse {
  [date: string]: WordData;
}

const API_URL = "https://stringle-backend.onrender.com/word-of-the-day";

/**
 * Formata a data para o padrão YYYY-MM-DD
 */
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Busca a palavra do dia da API
 * @param date - Data para buscar (padrão: hoje)
 * @returns Dados da palavra (word, hint, explanation)
 */
export async function fetchWordOfTheDay(date: Date = new Date()): Promise<WordData> {
  try {
    const dateStr = formatDate(date);
    
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data: WordResponse = await response.json();
    
    // Buscar a palavra para a data especificada
    const wordData = data[dateStr];
    
    if (!wordData) {
      throw new Error(`No word found for date: ${dateStr}`);
    }
    
    return wordData;
  } catch (error) {
    console.error("Error fetching word of the day:", error);
    throw error;
  }
}

/**
 * Busca a palavra do dia com retry e cache
 * Usa localStorage como fallback
 */
export async function fetchWordOfTheDayWithCache(
  date: Date = new Date()
): Promise<WordData> {
  const dateStr = formatDate(date);
  const cacheKey = `stringle_word_${dateStr}`;
  
  // Verificar cache local
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      localStorage.removeItem(cacheKey);
    }
  }
  
  // Buscar da API
  try {
    const wordData = await fetchWordOfTheDay(date);
    
    // Salvar em cache
    localStorage.setItem(cacheKey, JSON.stringify(wordData));
    
    return wordData;
  } catch (error) {
    // Se falhar, tentar data anterior (fallback)
    console.warn("Failed to fetch word, trying previous day...");
    const previousDay = new Date(date);
    previousDay.setDate(previousDay.getDate() - 1);
    const previousDateStr = formatDate(previousDay);
    const previousCached = localStorage.getItem(`stringle_word_${previousDateStr}`);
    
    if (previousCached) {
      try {
        return JSON.parse(previousCached);
      } catch {
        // Ignorar erro de parse
      }
    }
    
    throw error;
  }
}

export default {
  fetchWordOfTheDay,
  fetchWordOfTheDayWithCache,
  formatDate,
};
