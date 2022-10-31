import './navbar.scss'
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';

const NavbarDash = () => {
    return (

        <div className='navbar'>
            
            <div className='wrapper'>
                <div className='search'>
                    <input type="text" placeholder='Search....' />
                    <SearchIcon />
                </div>
                <div className='items' >
                    <div className='items' >
                        <LogoutIcon className="logout" />
                    </div>


                    <div className='items' >
                        <img
                            src="https://i.pinimg.com/236x/2f/e8/18/2fe818fcdfc224267544eb180d584cbd.jpg"
                            alt="avatar"
                            className='avatar'

                        />
                    </div>
                </div>
            </div>
        </div>
//:)
    )
}
export default NavbarDash