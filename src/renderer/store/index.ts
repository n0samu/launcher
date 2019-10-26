import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { ILibraryState, libraryReducer } from './library';
import { searchReducer, SearchState } from './search';

// The top-level state object
export interface ApplicationState {
  router: RouterState;
  search: SearchState;
  library: ILibraryState;
}

// Top-level reducer
export const createRootReducer = (history: History) => combineReducers<ApplicationState>({
  router: connectRouter(history),
  search: searchReducer,
  library: libraryReducer
});
