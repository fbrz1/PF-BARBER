import React, { useEffect } from 'react'
import "./Widget.scss"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getProducts } from '../../../redux/actions';
function Widget({type, isUser, isProducts, isReview}) {

    let data;
    let dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const products = useSelector((state) => state.products)

    //temporal
    useEffect(() => {
      dispatch(getUsers())
      dispatch(getProducts())

    }, [])
    


    const amount = 100
    const productss = products.filter(e => e.isActive !== false)
    const productsFilter = productss.length
    const userss = users.filter(e => e.isActive !== false).length
    const productsReivew = products.filter(e => e.isReview !== false).length

    switch(type){

        case "user":
            data ={title:"ACTIVE USERS", ifMoney: false, link:<a href="/dash/users">See all users</a>, icon: <Person2OutlinedIcon className='icon' style={{color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}}/>,
    };
    break;
    case "order":
            data ={title:"REVIEWS", ifMoney: false, link:<a href="/dash/reviews">View all reviews</a>, icon: <LocalGroceryStoreOutlinedIcon className='icon' style={{color: "goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)"}}/>,
    };
    break;
    case "earning":
            data ={title:"PRODUCTS", ifMoney: false, link:<a href="http://localhost:3000/dash/products">See all products</a>, icon: <MonetizationOnOutlinedIcon className='icon' style={{color: "green", backgroundColor: "rgba(0, 128, 0, 0.2)"}}/>,
    };
    break;
    case "balance":
            data ={title:"MERCADO PAGO", ifMoney: false, link:<a href="https://www.mercadopago.com.ar/home"><img src='https://d1161c5903.clvaw-cdnwnd.com/44b76df625b5df4c64733857e9b94307/200000154-493204a2cc/700/logo-mercadopago-300x257.png' width={'60'} height={'50'}></img></a>, icon: <AccountBalanceWalletOutlinedIcon className='icon' style={{color: "purple", backgroundColor: "rgba(128, 0, 128, 0.2)"}}/>,
    };
    break;
    default:
        break;
}



  return (
    <div className='widget'>
        <div className="left">
             <span className="title">{data.title}</span>
             <span className="counter">{data.ifMoney && "$"}{isUser ? userss : null}</span>
             <span className="counter">{data.ifMoney && "$"}{isProducts ? productsFilter : null}</span>
             <span className="counter">{data.ifMoney && "$"}{isReview ? productsReivew : null}</span>
             <span className="link">{data.link}</span>
             </div>
        <div className="right">
            <div className="percentage positive">
           
           
                </div>
                {data.icon}

        </div>
    </div>
  )
}

export default Widget