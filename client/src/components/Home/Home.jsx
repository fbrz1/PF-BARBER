import React from "react";
import { Link } from "react-router-dom";
import Carrusel from "../carrusel/carrusel";
import Cookies from 'universal-cookie';
import axios from 'axios'
import styles from "./Home.module.css";
export default function Home() {
const cookies = new Cookies()

  

if(cookies.get('token')) {
  const cookies = new Cookies()
  return (
    
    <div className={styles.background}>
      <div className={styles.title}>
        {/* <img
          src="https://w7.pngwing.com/pngs/139/83/png-transparent-scissors-angle-technic-scissors.png"
          className="tijeraImgen" //barber
        ></img> */}
        
        <h1>BARBER 'S APP</h1>
        <button onClick={()=>cookies.remove('token')} className={styles.myButton}><Link to="/"> Logout </Link></button>
      </div>
      <Carrusel />
      <br />
  
  
      <div className={styles.buttons}>
        <button className={styles.myButton}><Link to="/AboutUs"> Developers</Link></button>
  
        <button className={styles.myButton}><Link to=""> Services </Link></button>
  
        <button className={styles.myButton}><Link to="/shop"> Shop </Link></button>


        {/* <button onClick={cookies.remove('token')}className={styles.myButton}><Link to="/"> Logout </Link></button> */}
      </div>
  
      <div>
        <h1>Token: {cookies.get('token')}</h1>
        {/* <button onClick={()=>cookies.remove('token')}>Logount</button>         */}
      </div>
  
  
      <br /> 
  
      <h3>Pay with MercadoPago</h3>
      <img
        src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/718/448/products/d_738371-mla49316492518_032022-f1-ed4272fc0b58b093aa16519683623243-640-0.jpg"
        width="100"
        height="100"
        alt="Mercado de Pago"
      ></img>
      <br />
      <br />
    </div>
  );

} else {
  return (
    
    <div className={styles.background}>
      <div className={styles.title}>
        {/* <img
          src="https://w7.pngwing.com/pngs/139/83/png-transparent-scissors-angle-technic-scissors.png"
          className="tijeraImgen" //barber
        ></img> */}
        <h1>BARBER 'S APP</h1>
        <button className={styles.myButton} ><Link to="/register"> Sign up</Link></button>
  
        <button className={styles.myButton}><Link to="/login">Sign in</Link></button>
      </div>
      <Carrusel />
      <br />
  
  
      <div className={styles.buttons}>
        <button className={styles.myButton}><Link to="/AboutUs"> Developers</Link></button>
  
        <button className={styles.myButton}><Link to=""> Services </Link></button>
  
        <button className={styles.myButton}><Link to="/shop"> Shop </Link></button>
  
      </div>
  
      <div>
      <h1>Hola soy la cookie JWT {cookies.get('token')}</h1>
      </div>
  
  
      <br /> 
  
      <h3>Pay with MercadoPago</h3>
      <img
        src="http://d3ugyf2ht6aenh.cloudfront.net/stores/001/718/448/products/d_738371-mla49316492518_032022-f1-ed4272fc0b58b093aa16519683623243-640-0.jpg"
        width="100"
        height="100"
        alt="Mercado de Pago"
      ></img>
      <br />
      <br />
    </div>
  );

}

}