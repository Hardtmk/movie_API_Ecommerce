import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import styles from '../style/Quantitybtn.module.css';
// 為什麽不會顯示新的資料呢

export default function QuantityBtn({ productInfo }) {
  const { cartItems, setCartItems } = useContext(CartContext);

  let productIndexIncart = cartItems.findIndex(element => {
    return element._id === productInfo._id;
  });

  let [numInCart, setNumIncart] = useState(
    productIndexIncart === -1 ? 0 : cartItems[productIndexIncart].quantity
  );

  const handleAdd = () => {
    if (productIndexIncart === -1) {
      setCartItems([
        {
          adult: productInfo.adult,
          original_language: productInfo.original_language,
          poster_path: productInfo.poster_path,
          price: productInfo.price,
          release_date: productInfo.release_date,
          title: productInfo.title,
          vote_average: productInfo.vote_average,
          overview: productInfo.overview,
          _id: productInfo._id,
          quantity: 1,
        },
        ...cartItems,
      ]);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexIncart].quantity++;
      setCartItems(newCartArray);
    }
    setNumIncart(numInCart + 1);
  };
  const handleSubtract = () => {
    if (cartItems[productIndexIncart].quantity === 1) {
      let newCartArray = [...cartItems];
      newCartArray.splice(productIndexIncart, 1);
      setCartItems(newCartArray);
    } else {
      let newCartArray = [...cartItems];
      newCartArray[productIndexIncart].quantity--;
      setCartItems(newCartArray);
    }

    setNumIncart(numInCart - 1);
  };

  return (
    <>
      {numInCart === 0 ? (
        <button className={styles.quantityBtn} onClick={handleAdd}>
          Add into Cart
        </button>
      ) : (
        <div>
          <span onClick={handleSubtract}>-</span>
          {numInCart}
          <span onClick={handleAdd}>+</span>
        </div>
      )}
    </>
  );
}

// 可是有一個問題要解決
// 就是網頁一render就沒有

// 也就是說要弄兩個function
