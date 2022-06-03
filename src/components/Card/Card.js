import React, { useState, useContext } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

const Card = (props) => {
  const { card, favorite } = styles;
  const {
    id,
    title,
    price,
    imageUrl,
    onPlus,
    onFavorite,
    favorited = false,
    loading = false,
  } = props;

  // console.log(loading)

  const { isItemAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const obj = { id, parentId: id, title, price, imageUrl };
  // console.log(title, isItemAdded(id));

  const onClickPlus = (obj) => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite();
  };

  return (
    <div className={card}>
      {loading ? (
        <>
          {onPlus && (
            <div className={favorite} onClick={() => onClickFavorite()}>
              <img
                src={`img/heart-${
                  isFavorite ? "liked" : "unliked"
                }.svg`}
              />
            </div>
          )}

          <img width="100%" height={135} src={`/sneakers/${imageUrl}`} alt="" />
          <h5>{title}</h5>

          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Cost:</span>
              <b>{price} грн</b>
            </div>

            {onPlus && (
              <button
                className="button"
                style={{ border: "none" }}
                onClick={() => onClickPlus(obj)}
              >
                <img
                  width={30}
                  height={30}
                  src={`/img/btn-${isItemAdded(id) ? "checked" : "plus"}.svg`}
                  alt=""
                />
              </button>
            )}
          </div>
        </>
      ) : (
        <MyLoader />
      )}
    </div>
  );
};

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={165}
    height={255}
    viewBox="0 0 150 265"
    backgroundColor="#f6f5f4"
    foregroundColor="#ecebeb"
    // {...props}
  >
    <rect x="1" y="186" rx="5" ry="5" width="150" height="15" />
    <rect x="2" y="235" rx="10" ry="10" width="80" height="25" />
    <rect x="0" y="15" rx="5" ry="5" width="150" height="155" />
    <rect x="1" y="212" rx="5" ry="5" width="100" height="15" />
    <rect x="115" y="235" rx="10" ry="10" width="30" height="30" />
  </ContentLoader>
);

export default Card;
