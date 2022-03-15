import { memo, useRef, useContext } from "react";
import useInputs from "./hooks/useInputs";
import { UserDispatch } from "./App";

const CreateUser = () => {
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });

  const userId = useRef(4);
  const dispatch = useContext(UserDispatch);

  const onCreate = () => {
    const newUser = {
      id: userId.current,
      username,
      email,
      active: false,
    };

    dispatch({ type: "CREATE_USER", payload: newUser });

    reset();
    userId.current = userId.current + 1;
  };

  return (
    <div>
      <input
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>등록</button>
    </div>
  );
};

export default memo(CreateUser);
