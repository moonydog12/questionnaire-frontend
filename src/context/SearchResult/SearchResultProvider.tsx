import { ReactNode, useEffect, useReducer } from 'react';
import { SearchResultContext } from './SearchResultContext';
import { SearchResult, SearchResultAction } from './interface';

// 初始狀態
const initialResults: SearchResult[] = [];

// Reducer 處理邏輯
function searchResultReducer(state: SearchResult[], action: SearchResultAction): SearchResult[] {
  switch (action.type) {
    case 'SET_RESULTS':
      return action.payload;
    case 'CLEAR_RESULTS':
      return [];
    default:
      return state;
  }
}

// Provider 組件
export function SearchResultProvider({ children }: { children: ReactNode }) {
  const [searchResults, dispatch] = useReducer(searchResultReducer, initialResults);

  useEffect(() => {
    async function fetchInitialData() {
      try {
        const response = await fetch('http://localhost:8080/quiz/search', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: '',
            startDate: '',
            endDate: '',
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'SET_RESULTS', payload: [...data.quizList] });
      } catch (error) {
        console.error('Failed to fetch survey data:', error);
      }
    }

    fetchInitialData();
  }, []);

  return (
    <SearchResultContext.Provider value={{ searchResults, dispatch }}>
      {children}
    </SearchResultContext.Provider>
  );
}
