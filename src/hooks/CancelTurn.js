import { setReserved } from "../feactures/turns/turnsReserved";
import Axios from "axios";
import { useDispatch } from "react-redux";

export const CancelTurn = (id) => {
  const dispatch = useDispatch();
  return Axios.delete(`http://localhost:5000/turnos/${id}`)
    .then((response) => {
      const data = response.data;
      dispatch(
        setReserved({
          turns: data,
        })
      );
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      window.location.reload();
    });
};
