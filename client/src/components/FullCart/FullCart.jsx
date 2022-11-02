import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartContext } from "../Shopping/ShoppingCart";
import { Link } from "react-router-dom";
import {
  getDBCart,
  getDBCartValidateStock,
  getLocalStorage,
  getPaymentLink,
} from "../../redux/actions";
import { Redirect } from "react-router-dom";
import style from "./FullCart.module.css";
import { Button } from "reactstrap";

export default function ItemCart() {
  const { userId, deleteItemToCart, subtractItemToCart, addItemToCart } =
    useContext(CartContext);
  const dispatch = useDispatch();

  const [update, setUpdate] = useState(true);
  const cart = useSelector((state) => state.cart);
  const cartoutstock = useSelector((state) => state.cartoutstock);
  let pay = useSelector((state) => state.payMercadoPago);

  useEffect(() => {
    if (update) {
      if (userId) {
        dispatch(getDBCart(userId));
      } else {
        dispatch(getLocalStorage());
      }
      setUpdate(false);
    }
  }, [update]);
  useEffect(() => {
    setUpdate(true);
  }, [userId]);

  useEffect(() => {
    console.log(pay, typeof cartoutstock);
    if (
      !Object.keys(pay).length && typeof cartoutstock !== "undefined"
        ? !cartoutstock.length
        : false
    ) {
      dispatch(getPaymentLink(0, userId));
    }
  }, [cartoutstock]);

  useEffect(() => {
    setUpdate(true);
  }, [userId]);

  let total = 0;
  const redireccionar = () => {
    window.open(pay.init_point + "", "Mercado pago", "width=800, height=500");
    console.log("Redireccionando...");
  };

  return (
    <div className={style.background}>
      <h1 className={style.title}>Your Cart</h1>

      {/*     <div className={style.container}>
        <h5 className={style.subtitle}>Name </h5>
        <h5 className={style.subtitle}>Image</h5>
        <h5 className={style.subtitle}>Price</h5>
        <h5 className={style.subtitle}>Stock </h5>
        <h5 className={style.subtitle}>Quantity </h5>
        <h5 className={style.subtitle}>Quality </h5>
        <h5 className={style.subtitle}>Score </h5>
        <h5 className={style.subtitle}>Total</h5>
        <br></br>
      </div> */}

      {cart.length ? (
        cart.map((productInCart) => {
          total += productInCart.product.price * productInCart.quantity;

          return (
            <div key={productInCart.product.id} className={style.containerItem}>
              {cartoutstock?.map((itemOutStock) => {
                if (
                  itemOutStock.id === productInCart.id &&
                  itemOutStock.quantity > itemOutStock.product.stock
                ) {
                  return (
                    <h2 key={productInCart.product.id} style={{ color: "red" }}>
                      Not in stock
                    </h2>
                  );
                }
              })}
              <div className={style.containerItem}>
                <table className={style.tabla}>
                  <thead className={style.elementosTabla}>
                    <th>NAME</th>
                    <th>IMAGE</th>
                    <th>PRICE</th>
                    <th>STOCK</th>
                    <th>QUANTITY</th>
                    <th>QUALITY</th>
                    <th>SCORE</th>
                    <th>TOTAL</th>
                  </thead>
                  <tbody className={style.tbodyStilos}>
                    <tr>
                      <td className={style.text}>
                        {productInCart.product.name}
                      </td>
                      <td>
                        <img
                          src={productInCart.product.image}
                          className={style.tamanoimg}
                          alt="img product"
                        />
                      </td>
                      <td>{productInCart.product.price}</td>
                      <td>{productInCart.product.stock}</td>
                      <td>{productInCart.quantity}</td>
                      <td className={style.cualiti}>
                        {productInCart.product.quality}
                      </td>
                      <td>{productInCart.product.score}</td>
                      <td>
                        {productInCart.product.price * productInCart.quantity}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br></br>
                {/*  <h3 className={style.text}>{productInCart.product.name}</h3>
                <img
                  src={productInCart.product.image}
                  className={style.tamanoimg}
                  alt="img product"
                /> */}
                {/*    <h3 className={style.price}>{productInCart.product.price}</h3>
                <br></br>

                <h3 className={style.stock}>{productInCart.product.stock}</h3>
                <br></br>
                <h3 className={style.quantity}>
                  {productInCart.product.quantity}
                </h3>
                <h3> {productInCart.product.quality}</h3>
                <h3> {productInCart.product.score}</h3> */}
                <h5>QUANTITY</h5>
                <span className={style.botones}>
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={async (e) => {
                      e.preventDefault();
                      await subtractItemToCart(productInCart.product);
                    }}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-cart-dash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1z" />
                    </svg>{" "}
                  </button>
                  {/*   <h3> {productInCart.quantity}</h3> */}
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={async (e) => {
                      e.preventDefault();
                      console.log(e);
                      await addItemToCart(productInCart.product);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-cart-plus-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                  {/*  <h5>
                    {productInCart.product.price * productInCart.quantity}
                  </h5> */}
                  <button
                    type="button"
                    class="btn btn-dark"
                    onClick={async (e) => {
                      e.preventDefault();
                      await deleteItemToCart(productInCart.product);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-cart-x-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h1>No hay nada en el carrito</h1>
        </div>
      )}
      <div>
        <h3 className={style.Total}>Total to pay ${total}</h3>
        {Object.keys(pay).length ? (
          <a
            id="gopay"
            className={style.button}
            target="_blank"
            rel="noopener"
            href={pay.init_point + ""}
            onClick={redireccionar()}
          >
            GO PAY
          </a>
        ) : userId ? (
          <button
            className={style.button}
            onClick={(e) => {
              e.preventDefault();
              if (cart.length) {
                dispatch(getDBCart(userId));
                dispatch(getDBCartValidateStock(userId));
              }
            }}
          >
            BUY NOW
          </button>
        ) : (
          <Button color="dark">
            {" "}
            <Link to="/login" className={style.bottonInicio}>
              Iniciar sesión para comprar
            </Link>
          </Button>
        )}
        <br></br>
        <br></br>
      </div>
    </div>
  );
}
