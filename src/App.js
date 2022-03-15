import React, { useMemo, useReducer } from "react";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import produce from "immer";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active === true).length;
}

const initialState = {
  users: [
    {
      id: 1,
      username: "velopert",
      email: "velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

function reducer(state, action) {
  if (action.type === "CREATE_USER") {
    return produce(state, (draft) => {
      draft.users.push(action.payload);
    });
  }

  if (action.type === "REMOVE_USER") {
    return produce(state, (draft) => {
      const index = draft.users.findIndex((user) => user.id === action.id);
      draft.users.splice(index, 1);
    });
  }

  if (action.type === "TOGGLE_USER") {
    return produce(state, (draft) => {
      const user = draft.users.find((user) => user.id === action.id);
      user.active = !user.active;
    });
  }

  return state;
}

export const UserDispatch = React.createContext(null);

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser />
      <p>active 가 true인 유저들 수: {count}</p>
      <UserList users={users} />
    </UserDispatch.Provider>
  );
};

export default App;
