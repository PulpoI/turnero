import { combineReducers } from "redux";
import calendarReducer from "./calendarReducer";
import contadorReducer from "./contadorReducer";
import { crudReducer } from "./crudReducer";
import { shoppingReducer } from "./shoppingReducer";
import turnReducer from "./turnReducer";

const reducer = combineReducers({
  contador: contadorReducer,
  shopping: shoppingReducer,
  calendar: calendarReducer,
  crud: crudReducer,
  turn: turnReducer,
});

export default reducer;
