import React, {useContext} from "react";
import { useSelector } from "react-redux";
import { CartContext } from "./ShoppingCart";
//import  "./ProductItem.css";

 const ItemCart = ({item}) => {
    const { deleteItemToCart, addItemToCart } = useContext(CartContext)
   // const { id } = item
   //const prod = useSelector((state) => state.products)

   console.log(item)

    return (
        <div className="cartItem">
            <img src = {item.image} alt={item.image}/>
            <div className="dataContainer">
               <div className="left">
                <p>{item.name}</p>
                <div className="buttons">
                    <button onClick={() => addItemToCart(item) } >Add</button>
                    <button onClick={() => deleteItemToCart(item)} ></button>
                </div>
               </div>
               <div className="styles.right">
                {item.quantity}
                <p>Total: ${item.quantity * item.price} </p>
               </div>
            </div>
        </div>
    )
}

export default ItemCart