// 定義搜尋結果資料結構
export interface SearchResult {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  published: boolean;
}

// 定義 Action 類型
export type SearchResultAction =
  | { type: 'SET_RESULTS'; payload: SearchResult[] }
  | { type: 'CLEAR_RESULTS' };
