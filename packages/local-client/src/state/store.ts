import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
//import { ActionType } from './action-types';  // for manual testing
import { persistMiddleware } from './middlewares/persist-middleware';

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk));


// for manual testing
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'code'
//   }
// });
//
// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: 'text'
//   }
// });

