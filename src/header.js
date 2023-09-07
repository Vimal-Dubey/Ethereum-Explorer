import './App.css';
import eth from './eth.png';
import Search from './search';
const Header = ()=>{
return(
    <div className="header">
        <div className="heading">
            <img src={eth} className='logo'/>
                Ethereum Block Explorer
        </div>
       
        </div>

)
}
export default Header;