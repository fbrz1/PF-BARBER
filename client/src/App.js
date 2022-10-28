import React, { useEffect, useContext } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DetailProduct from "./components/DetailProducts/DetailProducts";
import Ecommerce from "./components/Ecommerce/Ecommerce";
import Home from "./components/Home/Home.jsx";
import AboutUs from "./components/AboutUs/AboutUs.jsx";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import Register from "./components/Register/Register.jsx";
import LoginUser from "./components/LoginUser/LoginUser";
import { CartContext } from "./components/Shopping/ShoppingCart";
import { getDBUser } from "./redux/actions";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import List from "./components/Dashboard/List/List.jsx"
import Single from "./components/Dashboard/Single/Single.jsx";
import HomeNavBar from "./components/HomeNavBar/HomeNavBar"
import Products from "./components/Dashboard/Products/Products.jsx"
import "./App.css";
import ItemCart from "./components/FullCart/FullCart";
import New from "./components/Dashboard/UploadFiles/UploadFiles";
import { inputs } from "./components/Dashboard/UploadFiles/formSource";

//import { createProducts, getProducts } from "./store/actions";
//import ShoppingCart from "./components/Shopping/ShoppingCart";
//import ProductItem from "./components/Shopping/ProductsItem";
//import CartItem from "./components/Shopping/CartItem";
// Top level App component
//import { ProvideAuth } from "./use-auth.js";
//holi
var URLactual = window.location;



function App() {
  let { userId } = useContext(CartContext)
  const dispatch = useDispatch()
  let user = useSelector(state => state.user)
  useEffect(() => {
    if (!Object.keys(user).length && userId) {
      dispatch(getDBUser(userId))
    }
  }, [user])
  return (
    <div className="App">
      {!URLactual.pathname.includes("/dash") ? <Route path="/" render={({ location }) => {
        return <HomeNavBar user={user} pathname={location.pathname} />
      }}>

      </Route> : null}

      <Route exact path="/dash/users">
        <List />
      </Route>
      <Route exact path="/dash/products">

              <Products/>
        
      </Route>

      <Route exact path="/dash">
        <Dashboard />
      </Route>

      <Route exact path = "/dash/products/add">
        <New inputs ={inputs} title = "Add new product"/>
       </Route>


      <Route exact path="/dash/users/:id">
        <Single />
      </Route>



      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>

      <Route exact path="/login">
        <LoginUser />
      </Route>

      <Route exact path="/shop">
        <Ecommerce />
      </Route>
      <Route exact path="/aboutus">
        <AboutUs />
      </Route>

      <Route exact path="/payments/pay">
        <MercadoPago />
      </Route>

      <Route exact path="/cart">
        <ItemCart />
      </Route>

      <Route
        exact path="/product/:id"
        render={({ match }) => {
          return <DetailProduct match={match} />;
        }}
      />
    </div>
  );
}

export default App;