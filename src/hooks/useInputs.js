// useState, useEffect, useReducer, useCallback 등 Hooks 를 사용하여 원하는 기능을 구현해주고,
// 컴포넌트에서 사용하고 싶은 값들을 반환

import { useReducer, useCallback } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_INPUTS":
      return {
        ...state,
        [action.name]: action.value,
      };
    case "RESET":
      return Object.keys(state).reduce((acc, current) => {
        acc[current] = "";
        // 리듀서 함수의 반환 값은 누산기에 할당
        return acc;
      }, {});
    default:
      return state;
  }
}

function useInputs(initialForm) {
  const [form, dispatch] = useReducer(reducer, initialForm);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUTS",
      name,
      value,
    });
  }, []);

  const onReset = useCallback(() => {
    dispatch({
      type: "RESET",
    });
  }, []);

  return [form, onChange, onReset];
}

export default useInputs;
