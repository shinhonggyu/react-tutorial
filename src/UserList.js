import React, { useEffect, memo, useContext } from "react";
import { UserDispatch } from "./App";

const User = memo(({ user }) => {
  console.log("User");
  const dispatch = useContext(UserDispatch);
  useEffect(() => {
    // console.log("user 값이 설정됨");
    // console.log(user);

    return () => {
      // console.log("User Cleanup");
      // console.log(user);
    };
    // 사용하는 상태나 props가 있다면 deps 에 넣어주는게 규칙
    // 안하면 최신 상태나 props가 아니다.
  }, [user]);

  return (
    <div>
      <b
        onClick={() => {
          dispatch({ type: "TOGGLE_USER", id: user.id });
        }}
        style={{ color: user.active && "green", cursor: "pointer" }}
      >
        {user.username}
      </b>{" "}
      <span>({user.email})</span>
      <button
        onClick={() => {
          dispatch({ type: "REMOVE_USER", id: user.id });
        }}
      >
        삭제
      </button>
    </div>
  );
});

const UserList = ({ users }) => {
  console.log("UserList");
  return (
    <div>
      {users.map((user) => {
        return <User user={user} key={user.id} />;
      })}
    </div>
  );
};

export default memo(UserList);
