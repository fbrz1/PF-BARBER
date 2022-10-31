import React from 'react'
import "./Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link } from 'react-router-dom';



function Sidebar() {
  return (
    <div className='sidebar' >
        <div className='top'><span className='logo'><img src="https://img.freepik.com/premium-vector/vintage-barbershop-logo-template_441059-26.jpg" alt="logo" /></span></div>
        <hr/>
        <div className='center' >
            <ul>
                <p className="title">MAIN</p>
                <Link to="/dash">

                <li>
                        <DashboardIcon className='icon'></DashboardIcon>
                    <span> 
                        Dashboard</span>
                </li>
                </Link>
                
                <Link to="/dash/users">
                <li> <GroupIcon className='icon'></GroupIcon>
                    <span>Users</span>
                   
                </li>
                    </Link>
                    <Link to="/dash/products">
                <li> <StoreIcon className='icon'></StoreIcon>
                    <span>Products</span>
                </li>
                    </Link>
                <li> <CreditCardIcon className='icon'></CreditCardIcon>
                    <span>Orders</span>
                </li>
            
                
                <p className="title">USER</p>
                <li> <AccountCircleOutlinedIcon className='icon'></AccountCircleOutlinedIcon>
                    <span>Profile</span>
                </li>
                <li> <ExitToAppOutlinedIcon className='icon'></ExitToAppOutlinedIcon>
                    <span>Logout</span>
                </li>
            </ul>
            </div>

        
    </div>

  )
}

export default Sidebar