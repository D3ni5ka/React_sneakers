import Card from "../Card/Card";
import { AppContext } from "../../App";
import { useContext } from "react";

const Favorite = ({ onAddToFavorite, isLoading }) => {
  const { favorites } = useContext(AppContext);
  console.log(favorites)

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1 className="">Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card
            loading={!isLoading}
            key={index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            favorited={true}
            onFavorite={() => onAddToFavorite(item)}
            // onPlus={() => onAddToCart(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
