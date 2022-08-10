import { configureStore } from "@reduxjs/toolkit";

//Reducers
import turnsReducer from "../feactures/turns/turnsSlice";
import usersReducer from "../feactures/users/usersSlice";
import dateReducer from "../feactures/date/dateSlice";
import turnsReserved from "../feactures/turns/turnsReserved";

export default configureStore({
  reducer: {
    users: usersReducer,
    turns: turnsReducer,
    date: dateReducer,
    turnsReserved: turnsReserved,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
