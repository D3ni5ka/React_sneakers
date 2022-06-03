import React, { createContext, useContext, useEffect, useState } from "react";
import Drawer from "./components/Drawer";
import Header from "./components/Header";
//import { v4 as uuid } from "uuid";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Favorite from "./components/pages/Favorite";
import Orders from "./components/pages/Orders";

const URL_API = "https://62961206810c00c1cb6e77a1.mockapi.io";

export const AppContext = createContext({});
// console.log(AppContext);

function App() {
  const [cartOpened, setCartOpened] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(items);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get(`${URL_API}/cart`),
            axios.get(`${URL_API}/favorites`),
            axios.get(`${URL_API}/sneakers`),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        console.log("Ошибка при запросе данных");
      }
    };

    fetchData();
  }, []);

  const onAddToCart = async (item) => {
    try {
      console.log(item);

      const findItem = cartItems.find(
        (elem) => Number(elem.parentId) === Number(item.id)
      );

      if (findItem) {
        setCartItems((cartItems) =>
          cartItems.filter((elm) => elm.parentId !== item.id)
        );
        await axios.delete(`${URL_API}/cart/${findItem.id}`);
      } else {
        setCartItems((cartItems) => [...cartItems, item]);
        const { data } = await axios.post(`${URL_API}/cart`, item);
        setCartItems((cartItems) =>
          cartItems.map((elem) => {
            if (elem.parentId === data.parentId) {
              return {
                ...elem,
                id: data.id,
              };
            }
            return elem;
          })
        );
      }
    } catch (error) {
      console.log("Ошибка при добавлении в корзину");
    }
  };

  const onAddToFavorite = async (item) => {
    // console.log(item);
    try {
      if (favorites.find((obj) => obj.id === item.id)) {
        axios.delete(`${URL_API}/favorites/${item.id}`);
        setFavorites(() => favorites.filter((elm) => elm.id !== item.id));
      } else {
        const { data } = await axios.post(`${URL_API}/favorites`, item);
        setFavorites((cartItems) => [...cartItems, data]);
      }
    } catch (error) {
      console.log("Не удалост добавить в фавориты");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onDeleteItem = (id) => {
    try {
      axios.delete(`${URL_API}/cart/${id}`);
      const newArr = cartItems.filter((elem) => elem.id !== id);
      setCartItems(newArr);
    } catch (error) {
      console.log("Ошибка при удалении из корзины");
    }
  };

  const getSum = (arr) => {
    let sum = 0;
    arr.forEach((item) => (sum += Number(item.price.replace(/\s/g, ""))));
    return sum;
  };

  const isItemAdded = (id) => {
    return cartItems.some((elem) => Number(elem.parentId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        getSum,
        isItemAdded,
        setCartOpened,
        setCartItems,
        URL_API,
      }}
    >
      <div className="wrapper clear">
        <Header onClickCart={() => setCartOpened(true)} favorites={favorites} />

        <Routes>
          <Route
            path="/react_sneakers/"
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="favorites"
            element={
              <Favorite
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          />

          <Route path="orders" element={<Orders />} />
        </Routes>

        {cartOpened && (
          <Drawer
            onClose={() => setCartOpened(false)}
            cartItems={cartItems}
            onDeleteItem={onDeleteItem}
          />
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
