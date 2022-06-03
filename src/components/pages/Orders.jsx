import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import Card from "../Card/Card";

const Orders = () => {
  const URL_API = "https://62961206810c00c1cb6e77a1.mockapi.io";
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { onAddToFavorite, onAddToCart } = useContext(AppContext);

  useEffect(() => {
    const getApiOrders = async () => {
      try {
        const { data } = await axios.get(`${URL_API}/orders`);
        // setOrders(data.map((item) => item.items).flat()); // 1 способ получить массив
        setOrders(data.reduce((prev, item) => [...prev, ...item.items], [])); // 2 способ получить массив
        setIsLoading(false)
      } catch (error) {
        console.log(error, "Не удалось получить данные с сервера");
      }
    };

    getApiOrders();
  }, []);

  // console.log(orders);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="">Мои заказы</h1>
      </div>

      <div className="d-flex flex-wrap">
        {(isLoading ? [...Array(4)] : orders).map((item, index) => (
          <Card
            loading={!isLoading}
            key={index}
            {...item}
            onFavorite={(item) => onAddToFavorite(item)}
          
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;
