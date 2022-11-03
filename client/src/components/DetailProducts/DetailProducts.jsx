import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getProductsDetail,
  getDBCart,
  getPaymentLink,
  getDBUser,
} from "../../redux/actions";
import { CartContext } from "../Shopping/ShoppingCart";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
// import Score from '../Score/score'
import Carrusel from "./detailCarru";
import s from "./DetailProducts.module.css";
import Score from "../Score/Score"
// import styles from '../DetailProducts/DetailProducts.module.css';

function DetailProduct({ match }) {
  const { userId, addItemToCart, subtractItemToCart, deleteItemToCart } =
    useContext(CartContext);
  const [update, setUpdate] = useState(true);
  const [goPay, setGoPay] = useState(false);
  const dispatch = useDispatch();
  const id = Math.round(match.params.id);
  const product = useSelector((state) => state.detail);
  const cart = useSelector((state) => state.cart);
  let pay = useSelector((state) => state.payMercadoPago);
  const history = useHistory()

  function updateProductInCar() {
    return cart.find(
      (productInCar) => productInCar.productId === Math.round(id)
    );
  }
  const [productInCar, setProducInCar] = useState(updateProductInCar());

  

  useEffect(() => {
    if (update) {
      dispatch(getProductsDetail(id)); // accedo al id del detalle

      if (userId) {
        dispatch(getDBCart(userId));
      }
      setUpdate(false);
    }
  }, [update]); // muestra recien cuando el componente se monta

  useEffect(() => {
    if (cart.length) {
      console.log("cartDetailProduct", cart);
      setProducInCar(updateProductInCar());

      if (goPay) {
        Swal.showLoading();
        setTimeout(() => dispatch(getPaymentLink(id, userId)), 2000);
      }
    }
  }, [cart]);
  useEffect(() => {
    if (Object.keys(pay).length) {
      setGoPay(false);
    }
  }, [pay]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      dispatch(getDBUser(userId));
    }
  }, []);

//-------carrusel
/*   let items = document.querySelectorAll('.carousel .carousel-item')

  items.forEach((el) => {
      const minPerSlide = 4
      let next = el.nextElementSibling
      for (var i=1; i<minPerSlide; i++) {
          if (!next) {
              // wrap carousel by using first child
            next = items[0]
          }
          let cloneChild = next.cloneNode(true)
          el.appendChild(cloneChild.children[0])
          next = next.nextElementSibling
      }
  }) */

//----------Carrusel a manopla

//LA RE CONCHA DE MI MADREEEEEEEEEEE!!!!!!!!!!!!!!!!!!

/* document.addEventListener("DOMContentLoaded", function(event) {
  console.log(document.querySelector("carrusel-items"));

});


const carrusel = document.querySelector('carrusel-items');
console.log(carrusel)

let maxScrollLeft =carrusel.scrollWidth - carrusel.clientWidth
let intervalo = null;
let step = 1
const start = () => {
  intervalo = setInterval(function (){
    carrusel.scrollLeft = carrusel.scrollLeft + step;
    if(carrusel.scrollLeft === maxScrollLeft){
      step = step * -1
    } else if(carrusel.scrollLeft === 0){
      step = step * -1
    }
  }, 10);
}
const stop = () => {
  clearInterval(intervalo)

}

carrusel.addEventListener('mouseover', () => {
  stop()
} )

carrusel.addEventListener('mouseout', () => {
  start()
} );

start()
 */

  return (
    <div className={s.background}>
      <div>
        {/* <Link to="/">Back</Link> */}
        {/* <Link to={`/yourCart/${id}`} onClick={()=> addToCart(id)}>Want to Buy🛒</Link> */}

        <hr />
        {/*  <div className={s.seMore}>
        <Link to="/shop">
          {" "}
          <button className={s.button}>See more products!</button>
        </Link>
      </div>
 */}
        {/* Card */}
          <div className={s.contenedor}>
            <div>
              <h3 className={s.name}>{product.name}</h3>
              <h3 className={s.price}>Price:${product.price}</h3>
            </div>
            <div>
              <img src={product.image} alt={product.image} className={s.img} />
            </div>
            <div className={s.columna}> 
              <h3 className={s.quality}>QUALITY: {product.quality}</h3>
              <h3 className={s.quality}>SCORE: {product.score}</h3>
              {/* <h3 className={s.score}>SCORE: { <Score score={product.score}/>}</h3> */}
          

              <div className={s.quantity}>
          {     
            productInCar ? 
             (
              <h3>Quantity: {productInCar.quantity}</h3>
            
            ) : null
              }
              </div>
              <div className={s.btncarrito}>
          <div className={s.carrBtns}>
       {/*  {productInCar ? ( */}
          <span className={s.btnDelete}>
          <button
            class="btn btn-dark"
            onClick={async (e) => {
              e.preventDefault();
              await deleteItemToCart(product);
              history.push('/shop')
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
        </span>
        {/* ) : null} */}
          {/* {productInCar ? ( */}
            <span className={s.btnSubstract}>
              <button
                class="btn btn-dark"
                onClick={async (e) => {
                  e.preventDefault();
                  await subtractItemToCart(product);
                }}
              >
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
            </span>
          {/* ) : null} */}
          {/* {productInCar ? ( */}
            <span className={s.btnAdd}>
              <button
                class="btn btn-dark"
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
            </span>
            </div>
         {/*  ) : null} */}
          
        

        {Object.keys(pay).length ? (
          <a
            className={s.button}
            target="_blank"
            rel="noopener"
            href={pay.init_point + ""}
          >
            GO PAY
          </a>
        ) : userId ? (
          <button
            className={s.button}
            class = "btn btn-dark" 
            onClick={(e) => {
              e.preventDefault();
              if (cart.length) {
                // const productInCar = cart.find((productInCar) => productInCar.productId === id)
                console.log(productInCar, cart);
                if (Object.keys(product).length) {
                  if (!productInCar?.quantity) Swal.showLoading();
                  setGoPay(true);
                  addItemToCart(product, productInCar?.quantity);
                }
              } else {
                if (Object.keys(product).length) {
                  setGoPay(true);
                  addItemToCart(product);
                }
              }
            }}
          >
            BUY NOW
          </button>
        ) : (
       <div className={s.inisec}>
       
            <Link to="/login">
              {" "}
              <Button color="dark" outline className={s.inicio}>
                Inicia sesión para comprar
              </Button>
            </Link>
          </div>
        )}
           <div className={s.scoreSubmit}>
       <Score></Score>
       </div>
      </div>
            </div> 


            {console.log("productInCart", productInCar)}
          
          
      </div>
      <br>
      </br>
       </div>
       <br>
       </br>
       
       <h2>Featured Products: </h2>


        {

        <div>
      <Carrusel/>
      </div>  

        }      





{/* 
      <div class="carrusel">
        <div class="carrusel-items">
          <div class="carrusel-item">
            <img src="https://http2.mlstatic.com/D_NQ_NP_2X_959303-MLA51602582272_092022-F.webp" alt=""/>
              <p> Beard Balm </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/12277-home_default_carousel/muehle-razor-gillette-fusion-vivo-series-plumtree.jpg" alt=""/>
              <p> Mühle Razor Gillette® Fusion Vivo Series Plumtree </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/9786-large_default/maquinilla-de-afeitar-clasica-plaza-edwin-jagger-marfil.jpg" alt=""/>
              <p> Edwin Jagger Marfil </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/14216-large_default/brosh-super-hard-gel-200gr.jpg" alt=""/>
              <p> Brosh Super Hard Gel 200gr </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/1621-large_default/muehle-double-edge-safety-razor-r89-rose-gold-close-comb-.jpg" alt=""/>
              <p> Mühle Double Edge Safety Razor R89 Rose Gold Close Comb </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/17239-large_default/fatip-chrome-slant-double-edge-safety-razor.jpg" alt=""/>
              <p> Fatip Chrome Slant Double Edge Safety Razor </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/6329-large_default/brocha-de-afeitar-pelo-sintetico-roja-omega-s10018.jpg" alt=""/>
              <p> Omega Garnet Shaving Bowl </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/16511-large_default/fatip-piccolo-gold-slant-close-open-double-edge-safety-razor.jpg" alt=""/>
              <p> Fatip Piccolo Gold Slant Close Open Double Edge Safety Razor </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/9869-large_default/dear-barber-shave-oil-30ml.jpg" alt=""/>
              <p> Baxter of California Shave Tonic </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/9427-large_default/aceite-pre-afeitado-barberism-captain-fawcett-50ml.jpg" alt=""/>
              <p> Captain Fawcett Barberism Pre-Shave Oil 50ml </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/7783-large_default/hey-joe-pre-shave-oil-50ml.jpg" alt=""/>
              <p> Hey Joe Pre Shave Oil 50ml </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/3022-large_default/piedra-de-alumbre-natural-osma-75-gr.jpg" alt=""/>
              <p> After Shave BeardLovers </p>
          </div>
          <div class="carrusel-item">
            <img src="https://www.giftsandcare.com/13418-large_default/cella-milano-bio-aloe-vera-after-shave-balm-100ml.jpg" alt=""/>
              <p> Cella Milano Bio Aloe Vera After Shave Balm 100ml </p>
          </div>
        </div>
      </div>
       */}
      
    </div>
  );
}
export default DetailProduct;