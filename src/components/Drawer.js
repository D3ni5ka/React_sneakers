import axios from "axios";
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import Info from "./info";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Drawer = ({ onClose, cartItems = [], onDeleteItem }) => {
  const { getSum, setCartItems, URL_API } = useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${URL_API}/orders`, {
        items: cartItems,
      });

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`${URL_API}/cart/` + item.id);
        await delay(1000);
      }
    } catch (error) {
      console.log("Не удалось создать заказ.");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="img/btm-remove.svg"
            alt="Remove"
          />
        </h2>

        {cartItems.length > 0 ? (
          <div className="items">
            {cartItems.map((cart) => (
              <div className="cartItem d-flex align-center mb-20" key={cart.id}>
                <div
                  style={{ backgroundImage: `url(${cart.imageUrl})` }}
                  className="cartItemImg"
                ></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{cart.title}</p>
                  <b>{cart.price} грн.</b>
                </div>
                <img
                  onClick={() => onDeleteItem(cart.id)}
                  className="removeBtn"
                  src="img/btm-remove.svg"
                  alt="Remove"
                />
              </div>
            ))}
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? "img/zakaz.jpg" : "img/boxing.png"}
          />
        )}

        {/* <Info /> */}

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого</span>
              <div></div>
              <b>{getSum(cartItems)} грн.</b>
            </li>

            <li>
              <span>Налог 5%</span>
              <div></div>
              <b>{Math.ceil((getSum(cartItems) / 100) * 5)} грн.</b>
            </li>
          </ul>
          <button
            disabled={isLoading}
            className="greenButton"
            onClick={() => onClickOrder()}
          >
            Оформить заказ
            <img src="img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
