import React, { useContext } from "react";
import Card from "../Card/Card";


const Home = ({
  items,
  onAddToCart,
  onAddToFavorite,
  searchValue,
  onChangeSearchInput,
  isLoading,
}) => {
  

  const renderItems = () => {
    const filterItems = items.filter((elem) =>
      elem.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (isLoading ? [...Array(8)] : filterItems).map((item, index) => (
      <Card
        key={index}
        {...item}
        // added={isItemAdded(item && item.id)}
        onFavorite={() => onAddToFavorite(item)}
        onPlus={onAddToCart}
        loading={!isLoading}
      />
    ));
  };

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="">
          {searchValue ? `Поиск по "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="./img/search.svg" alt="Search" />
          <input
            placeholder="Search"
            value={searchValue}
            onChange={(event) => onChangeSearchInput(event)}
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
};

export default Home;
