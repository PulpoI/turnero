import { useSelector, useDispatch } from "react-redux";
import { Index } from "../pages/Index";
import { setUser } from "../feactures/users/usersSlice";

const Turn = () => {
  const dispatch = useDispatch();

  const { fullName, phone } = useSelector((state) => state.users);

  return (
    <>
      <div>
        <Index />
      </div>
    </>
  );
};

export default Turn;
