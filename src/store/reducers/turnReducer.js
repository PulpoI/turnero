import { CHOOSE_TURN } from "../actions/types";

const initialState = {
  turn: "08:00",
  available: true,
  date: new Date(),
};

export default function turnReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_TURN:
      return {
        ...state,
        date: action.payload,
        available: false,
      };
    default:
      return state;
  }
}
