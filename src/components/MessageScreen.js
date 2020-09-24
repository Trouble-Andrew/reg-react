import React, { useContext } from "react";
import { CSSTransition } from "react-transition-group";
import { Context } from "../context/stateContext";

export default function MessageScreen({ type }) {
  const { state } = useContext(Context);

  return (
    <CSSTransition
      in={!!state.messageScreen}
      timeout={300}
      classNames={"message-screen-animation"}
      mountOnEnter
      unmountOnExit
    >
      <div className={"message-screen"}>
        <div className="message-screen__img"></div>
        {state.messageScreen === "success" ? (
          <p>Вы зарегистрированы</p>
        ) : (
          <p>Вы авторизованы</p>
        )}
      </div>
    </CSSTransition>
  );
}
