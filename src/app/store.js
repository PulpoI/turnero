import { configureStore } from "@reduxjs/toolkit";

//Reducers
import turnsReducer from "../feactures/turns/turnsSlice";
import usersReducer from "../feactures/users/usersSlice";
import dateReducer from "../feactures/date/dateSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    turns: turnsReducer,
    date: dateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
