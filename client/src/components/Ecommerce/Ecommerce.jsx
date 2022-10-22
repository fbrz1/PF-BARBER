import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import React, { useEffect, useState, useContext } from "react";
import s from './Ecommerce.module.css'
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
} from "../../redux/actions";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { Link } from "react-router-dom";
import { CartContext } from "../Shopping/ShoppingCart";

const Ecommerce = ({ products, filterstate, allProducts, cart, getLocalStorage,
  getProducts,
  createProducts,
  priceLower,
  priceHigh,
  filterQuality,
  filterShop,
  addToCart,
  delFromCart,
}) => {
  const { addItemToCart, subtractItemToCart, deleteItemToCart } = useContext(CartContext)
  const [state, setState] = useState(true)
  useEffect(() => {
    if (state) {
      setState(false)
      getProducts()
      getLocalStorage()
    }
  }, [state]);


  const [categorySelected, setCategory] = useState('all')



  //paginado
  const [pag, setCurrentPage] = useState(1)// inicializacion
  const [productsPerPage, setPerPage] = useState(6) //cant x pag 
  const max = Math.ceil(products.length / productsPerPage); //max pag posible REDONDE HACIA ARRIBA 
  const sliceProduct = products.slice((pag - 1) * productsPerPage,
    ((pag - 1) * productsPerPage) + productsPerPage)// corte de elementos x pag

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
    filterQuality(quality.target.value) //all-basic-premium
    filterShop(categorySelected)// (categorys context )

  }
  //----filter anidado
  function handleShop(shop) {
    shop.preventDefault()
    filterShop(shop.target.value)
    setCategory(shop.target.value)
  }

  return (
    <div>
      <br />
      <div>
       

        <Link to='/'><button className={s.button}>Home</button></Link>


        {/* Searchbar */}

        <SearchBar setCurrentPage={setCurrentPage} />

        {/* buttons filter Quality */}
        <button id="All" name="All" value="default" onClick={quality => handleQuality(quality)}>All</button>
        <button id="Premium" name="Premium" value="Premium" onClick={quality => handleQuality(quality)}> Premium</button>
        <button id="Basic" name="Basic" value="Basic" onClick={quality => handleQuality(quality)}>Basic</button>

        {/* <SearchBar setCurrentPage={setCurrentPage}/> */}


        {/* price sort */}
        <div className={s.selectFilterSort}>
          <label>Price </label>
          <select className={s.select} onChange={sort => handleSort(sort)}>
            <option hidden value=''>⇅</option>
            <option value='high'>+</option>
            <option value='lower'>-</option>
          </select>

          {/* filter anidado */}
          <label>Category</label>
          <select className={s.select} onChange={shop => handleShop(shop)}>
            <option hidden value="all">Shop</option>
            <option value="all">All</option>
            <option value="after shave">After Shave</option>
            <option value="razor">Razors</option>
          </select>

        </div><br />







        
        <Paginado pag={pag}
          setCurrentPage={setCurrentPage}
          max={max} />


        {/*  {console.log(cart)} */}
        <h2>{cart.length}</h2>
        {/* score sort sol*/}

        


        {/* card */}
        <div className={s.containerCard}>
          {
            sliceProduct.length > 0 ?
            sliceProduct.map((product) => {
              const findProductCar = cart.find(productInCar => productInCar.productId === product.id);
              return (
                  <div className={s.products} key={product.id}>
                    <button onClick={async (e) => {
                      e.preventDefault()
                      await addToCart(product)
                      await addItemToCart(product)
                    }}> +🛒 </button>
                    <button onClick={async (e) => {
                      e.preventDefault()
                      await delFromCart(product)
                      await subtractItemToCart(product)
                    }}> -🛒 </button>
                    
                    <button onClick={async (e) => {
                      e.preventDefault()
                      await delFromCart(product, true)
                      await deleteItemToCart(product)
                    }}> X🛒 </button>
                    <h3>{findProductCar?.quantity}</h3>

                    
                    <h2 className={s.productInfo}>{product.name}</h2>
                    <img className={s.img} src={product.image} alt="img" ></img>
                    <h3 className={s.productQuality}>{product.quality.toUpperCase()}</h3>
                    <div className={s.productInfo}>
                      <h2 className={s.productPrice}> ${product.price}</h2>
                    </div>
                    <Link to={`/product/${product.id}`} className={s.button}>BUY</Link>
                  </div>


                );
              }) :

              allProducts.map((e) => {
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
                    <Link to={`/product/${e.id}`} className={s.button}>BUY</Link>
                  </div>);
              })

          }
        </div>
      </div>
    </div>
  );
}

export const mapStateToProps = ({ products, allProducts, filterstate, cart }) => {
  return {
    products,
    allProducts,
    filterstate,
    cart
  }
}
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getProducts,
    createProducts,
    priceLower,
    priceHigh,
    filterQuality,
    filterShop,
    addToCart,
    delFromCart,
    getLocalStorage,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Ecommerce);