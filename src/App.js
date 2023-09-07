import './App.css';
import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {Routes, Route, BrowserRouter, Link} from 'react-router-dom';
import BlockList from './BlockList';
import BlockInfo from './BlockInfo';
import Search from './search';
import TransactionDetails from './Transaction';
import Address from './Address';
import Header from './header';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


function App() {
  const [blockNumber, setBlockNumber] = useState();
  useEffect(() => {
  
    getBlockNumber();
  }, []);

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
  }


  return (
    <>
    <div>
      <Header />
     
    </div>
    <BrowserRouter>
    <Search />
    <Routes>
    <Route path='/' element={<><h3 onClick={()=>window.location.reload()} className='latebtn'>Latest Blocks</h3><BlockList blockNumber={blockNumber}/></>}/>
    <Route path="block/:blockNumber" element={<BlockInfo />} />
    <Route path="transaction/:hash" element={<TransactionDetails />} />
    <Route path="address/:address" element={<Address />} />
    <Route path="*" element={<div>
          <Link to={"/"}>Home</Link>
          <h1>No Match</h1>
        </div>} />

    </Routes>
    </BrowserRouter>

    </> 
  );
 
}

export default App;
