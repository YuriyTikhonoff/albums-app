import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer } from "./Reducers/userReducers";
import { albumListReducer } from "./Reducers/albumReducers";

const reducer = combineReducers({
  albumList: albumListReducer,
  userLogin: userLoginReducer,
});

const initialState = {
  albumList: [{}],
  userLogin: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
