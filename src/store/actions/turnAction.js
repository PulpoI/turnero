import { CHOOSE_TURN, CREATE_DATA } from "./types";

export const chooseTurn = (turn) => ({ type: CHOOSE_TURN, payload: turn });
export const createTurn = (turn) => ({ type: CREATE_DATA, payload: turn });
