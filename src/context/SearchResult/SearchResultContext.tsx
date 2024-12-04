import { createContext, Dispatch } from 'react';
import { SearchResult } from './interface';

// 定義搜尋結果 Context 的類型
interface SearchResultContextType {
  searchResults: SearchResult[];
  dispatch: Dispatch<SearchResultAction>;
}

// 定義 Action 類型
type SearchResultAction =
  | { type: 'SET_RESULTS'; payload: SearchResult[] }
  | { type: 'CLEAR_RESULTS' };

// 建立 Context
export const SearchResultContext = createContext<SearchResultContextType>({
  searchResults: [],
  dispatch: () => {},
});
