import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarDash = () => {
    return (

        <div className='navbar'>
            <div className='wrapper'>
                <div className='search'>
                    <input type="text" placeholder='Search....'/>
                    <SearchIcon />
                </div>
                <div className='items'>
                   <LogoutIcon/>
                    </div>
                </div>
            </div>
     
    )
}
export default NavbarDash