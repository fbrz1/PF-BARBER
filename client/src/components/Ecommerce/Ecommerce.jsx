import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import React, { useEffect, useState, useContext } from "react";
import s from "./Ecommerce.module.css";
import Paginado from "../Paginado/Paginado.jsx";
import ProductItem from "../Shopping/ProductsItem";
import {
  getProducts,
  createProducts,
  priceLower,
  priceHigh,
  filterQuality,
  filterShop,
  addToCart,
  delFromCart,
  getLocalStorage,
  getDBCart,
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";
import { CartContext } from "../Shopping/ShoppingCart";
import { Button, Form, Input, Label, Row, Col } from "reactstrap";
import { FaAssistiveListeningSystems } from "react-icons/fa";

const Ecommerce = ({
  products,
  filterstate,
  allProducts,
  cart,
  getProducts,
  createProducts,
  priceLower,
  priceHigh,
  filterQuality,
  filterShop,

  getLocalStorage,
  getDBCart,
}) => {
  const {
    addItemToCart,
    subtractItemToCart,
    deleteItemToCart,
    isLogueado,
    logIn,
    SignOff,
  } = useContext(CartContext);
  const [state, setState] = useState(true);
  useEffect(() => {
    if (state) {
      setState(false);
      getProducts();
      if (isLogueado) getDBCart(1);
      else getLocalStorage();
    }
  }, [state]);

  const [categorySelected, setCategory] = useState("all");

  //paginado
  const [pag, setCurrentPage] = useState(1); // inicializacion
  const [productsPerPage, setPerPage] = useState(6); //cant x pag
  const max = Math.ceil(products.length / productsPerPage); //max pag posible REDONDE HACIA ARRIBA
  const sliceProduct = products.slice(
    (pag - 1) * productsPerPage,
    (pag - 1) * productsPerPage + productsPerPage
  ); // corte de elementos x pag

  //-----sort
  function handleSort(sort) {
    sort.preventDefault();
    if (sort.target.value === "lower") priceLower(sort.target.value);
    else if (sort.target.value === "high") priceHigh(sort.target.value);
  }

  //----score
  // function handleScore(score) {
  //   score.preventDefault();
  //   dispatch(sortScore(score.target.value))
  // }

  //-----filter
  function handleQuality(quality) {
    quality.preventDefault();
    filterQuality(quality.target.value); //all-basic-premium
    filterShop(categorySelected); // (categorys context )
  }
  //----filter anidado
  function handleShop(shop) {
    shop.preventDefault();
    filterShop(shop.target.value);
    setCategory(shop.target.value);
  }

  return (
    <div className={s.background}>
      <br />
      <div>
        {/*  <Link to="/">
          <button className={s.button}>Home</button>
        </Link>
        <button
          className={s.button}
          onClick={async (e) => {
            e.preventDefault();
            if (isLogueado) {
              SignOff();
            } else {
              logIn();
            }
          }}
        >
          {isLogueado ? "Cerrar sesión" : "Iniciar sesión"}
        </button> */}

        {/* Searchbar */}

        <SearchBar setCurrentPage={setCurrentPage} />

        {/* buttons filter Quality */}
        <div className={s.ordenadores}>
          <div className={s.allPrem}>
            <Button
              id="All"
              name="All"
              value="default"
              onClick={(quality) => handleQuality(quality)}
              color="dark"
              href="#"
              tag="a"
            >
              All
            </Button>{" "}
            <Button
              id="Premium"
              name="Premium"
              value="Premium"
              onClick={(quality) => handleQuality(quality)}
              color="dark"
              tag="input"
              type="submit"
            />{" "}
            <Button
              id="Basic"
              name="Basic"
              value="Basic"
              onClick={(quality) => handleQuality(quality)}
              color="dark"
              tag="input"
              type="reset"
            />{" "}
          </div>
          {/*<button
          id="All"
          name="All"
          value="default"
          onClick={(quality) => handleQuality(quality)}
        >
          All
        </button>
        <button
          id="Premium"
          name="Premium"
          value="Premium"
          onClick={(quality) => handleQuality(quality)}
        >
          {" "}
          Premium
        </button>
        <button
          id="Basic"
          name="Basic"
          value="Basic"
          onClick={(quality) => handleQuality(quality)}
        >
          Basic
        </button> */}
          {/* <SearchBar setCurrentPage={setCurrentPage}/> */}
          {/* price sort */}
          <Form className={s.selectors}>
            <Row className="row-cols-lg-auto g-3 align-items-center">
              <Col>
                <Label className="visually-hidden" for="examplePassword">
                  Shop
                </Label>
                <Input
                  type="select"
                  className={s.select2}
                  onChange={(shop) => handleShop(shop)}
                >
                  <option value="all">All</option>
                  <option value="after shave">After Shave</option>
                  <option value="razor">Razors</option>
                </Input>
              </Col>
              <Col className={s.select}>
                <Input type="select" onChange={(sort) => handleSort(sort)}>
                  {" "}
                  Price
                  <option hidden value="">
                    ⇅
                  </option>
                  <option value="high">+</option>
                  <option value="lower">-</option>
                </Input>
              </Col>
            </Row>
          </Form>
          {/* <div className={s.selectFilterSort}>
          <label>Price </label>
          <select className={s.select} onChange={(sort) => handleSort(sort)}>
            <option hidden value="">
              ⇅
            </option>
            <option value="high">+</option>
            <option value="lower">-</option>
          </select>
      */}
          {/* filter anidado */}
          {/*<UncontrolledDropdown group>
          <Button color="primary" onChange={(shop) => handleShop(shop)}>
            Shop
          </Button>
          <DropdownToggle caret color="primary" />
          <DropdownMenu>
            <DropdownItem value="all">ALL</DropdownItem>
            <DropdownItem value="after shave">After shave</DropdownItem>
            <DropdownItem value="razor">Razors</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
          {/*<label>Category</label>
        <select className={s.select} onChange={(shop) => handleShop(shop)}>
          <option hidden value="all">
            Shop
          </option>
          <option value="all">All</option>
          <option value="after shave">After Shave</option>
          <option value="razor">Razors</option>
        </select> */}
        </div>
      </div>
      <br />

      <Paginado
        pag={pag}
        setCurrentPage={setCurrentPage}
        max={max}
        className={s.paginado}
      />

      {/*  {console.log(cart)} */}
      <h2>{cart.length}</h2>
      {/* score sort sol*/}

      {/* card */}
      <div className={s.containerCard}>
        {sliceProduct.length > 0
          ? sliceProduct.map((product) => {
              const findProductCar = cart.find(
                (productInCar) => productInCar.productId === product.id
              );
              return (
                <div className={s.products} key={product.id}>
                  <div className={s.btn}>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick={async (e) => {
                        e.preventDefault();
                        await addItemToCart(product);
                      }}
                    >
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="currentColor"
                        class="bi bi-cart-plus-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                      </svg>{" "}
                    </button>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick={async (e) => {
                        e.preventDefault();
                        await subtractItemToCart(product);
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

                    <button
                      type="button"
                      class="btn btn-secondary"
                      onClick={async (e) => {
                        e.preventDefault();
                        await deleteItemToCart(product);
                      }}
                    >
                      {" "}
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
                    <div className={s.container}>
                      <h3 className={s.quantity}>{findProductCar?.quantity}</h3>
                    </div>
                  </div>

                  <h2 title={product.name} className={s.productInfo}>
                    {product.name.length > 26
                      ? product.name.substring(0, 23) + "..."
                      : product.name}
                  </h2>
                  <img className={s.img} src={product.image} alt="img"></img>
                  <h3 className={s.productQuality}>
                    {product.quality.toUpperCase()}
                  </h3>
                  <div className={s.productInfo}>
                    <h2 className={s.productPrice}> ${product.price}</h2>
                  </div>
                  <div className={s.fixButton}>
                    <Link to={`/product/${product.id}`} className={s.button}>
                      BUY
                    </Link>
                  </div>
                </div>
              );
            })
          : allProducts.map((e) => {
              return (
                <div className={s.products} key={e.id}>
                  {/*   <Link to={`/yourCart/${e.id}`} onClick={(id)=> addToCart(id)}>🛒</Link> */}
                  <button onClick={() => addItemToCart(e)}>🛒</button>
                  {/*  {
                    <ProductItem
                    id={e.id}
                    stock={e.stock}
                     quantity={e.quantity} 
                    />
                  } */}
                  <img className={s.img} src={e.image} alt="img"></img>
                  <div className={s.productInfo}>
                    <h2 className={s.productInfo}>{e.name}</h2>
                    <h3 className={s.productPrice}> ${e.price}</h3>
                    <h3>Quality: {e.quality}</h3>
                  </div>
                  <div class="d-grid gap-2 col-6 mx-auto">
                    <Link to={`/product/${e.id}`} className={s.button}>
                      BUY
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export const mapStateToProps = ({
  products,
  allProducts,
  filterstate,
  cart,
}) => {
  return {
    products,
    allProducts,
    filterstate,
    cart,
  };
};
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProducts,
      createProducts,
      priceLower,
      priceHigh,
      filterQuality,
      filterShop,
      addToCart,
      delFromCart,
      getLocalStorage,
      getDBCart,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Ecommerce);
