import {
  SHOW_SIGN_IN_MESSAGE,
  SHOW_SIGN_UP_MESSAGE,
  HIDE_MESSAGE,
  ADD_NEW_USER,
} from "./types";

const handlers = {
  [SHOW_SIGN_UP_MESSAGE]: (state, payload) => ({
    ...payload,
    messageScreen: "success",
  }),
  [SHOW_SIGN_IN_MESSAGE]: (state, payload) => ({
    ...payload,
    messageScreen: "authorized",
  }),
  [HIDE_MESSAGE]: (state, payload) => ({
    ...state,
    messageScreen: "authorized",
  }),
  [ADD_NEW_USER]: (state, { payload }) => ({
    ...state,
    users: [...state.users, payload],
  }),
  DEFAULT: (state) => state,
};

export const Reducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
