import React, { useEffect } from "react";

const User = React.memo(({ user, onRemove, onToggle }) => {
  console.log("User 렌더링");
  function Effet() {
    console.log("user 값이 설정됨");
    console.log(user);

    // useEffect cleanup 뒤처리 함수
    // 빈배열일 경우는 언마운트시 호출
    // 언마운트시에도, 값이 바뀌기 직전에도 호출
    return () => {
      console.log("user 가 바뀌기 전..");
      console.log(user);
    };
  }

  useEffect(Effet, [user]);

  const style = {
    cursor: "pointer",
    color: user.active ? "green" : "black",
  };

  return (
    <div>
      <b onClick={() => onToggle(user.id)} style={style}>
        {user.username}
      </b>{" "}
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

const UserList = ({ users, onRemove, onToggle }) => {
  console.log("UserList 렌더링");
  return (
    <div>
      {users.map((user) => {
        return (
          <User
            key={user.id}
            user={user}
            onRemove={onRemove}
            onToggle={onToggle}
          />
        );
      })}
    </div>
  );
};

export default React.memo(UserList);
