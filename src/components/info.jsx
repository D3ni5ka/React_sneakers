import React from "react";
import { AppContext } from "../App";

const Info = ({ title, description, image }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img className="mb-20" width="120px" src={image} alt="Empty" />
      <h2>{title}</h2>
      <p className="opacity-6">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="https://raw.githubusercontent.com/D3ni5ka/react_sneakers/571f0c73ea91c8e42af15832709c6749cd9de718/img/arrow.svg" alt="Arrow" />
        Вернуться назад
      </button>
    </div>
  );
};

export default Info;
