import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const Header = ({ onClickCart, favorites }) => {
  const { getSum, cartItems } = useContext(AppContext);
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={"/react_sneakers/"}>
        <div className="headerLeft d-flex align-center">
          <img width={40} height={40} src="https://raw.githubusercontent.com/D3ni5ka/react_sneakers/gh-pages/img/logo.png" alt="logo" />
          <div className="headerInfo">
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li className="mr-30 cu-p" onClick={onClickCart}>
          <img width={20} height={20} src="https://raw.githubusercontent.com/D3ni5ka/react_sneakers/36e86a2772931d3c12036fe89c9d2d19389922c0/img/user.svg" alt="imgUser" />
          <span>{getSum(cartItems)} грн</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to={"/favorites"}>
            <img
              width={20}
              height={20}
              src={
                favorites.length > 0
                  ? "https://raw.githubusercontent.com/D3ni5ka/react_sneakers/36e86a2772931d3c12036fe89c9d2d19389922c0/img/heart-liked.svg"
                  : "https://raw.githubusercontent.com/D3ni5ka/react_sneakers/36e86a2772931d3c12036fe89c9d2d19389922c0/img/heart-unliked.svg"
              }
              alt="heart"
            />
          </Link>
        </li>
        <li>
          <Link to={'/orders'}>
            <img width={20} height={20} src="https://raw.githubusercontent.com/D3ni5ka/react_sneakers/36e86a2772931d3c12036fe89c9d2d19389922c0/img/cart.svg" alt="imgCart" />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
