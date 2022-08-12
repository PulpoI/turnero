import { configureStore } from "@reduxjs/toolkit";

//Reducers
import turnsReducer from "../feactures/turns/turnsSlice";
import usersReducer from "../feactures/users/usersSlice";
import dateReducer from "../feactures/date/dateSlice";
import turnsReserved from "../feactures/turns/turnsReserved";
import adminReducer from "../feactures/admin/adminSlice";

export default configureStore({
  reducer: {
    users: usersReducer,
    turns: turnsReducer,
    date: dateReducer,
    turnsReserved: turnsReserved,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
