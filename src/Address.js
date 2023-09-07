import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import './App.css';
const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);


export default function Address(){

    const [balance, setBalance] = useState("");
    const [txCount, setTxCount] = useState("");

    const { address } = useParams();


    useEffect(() => {
        async function fetchAddressDetails() {
            try {
                const [
                    addressBalance,
                    addressTxCount,
                ] = await Promise.all([
                    alchemy.core.getBalance(address),
                    alchemy.core.getTransactionCount(address),
                ]);

                setBalance(addressBalance);
                setTxCount(addressTxCount);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAddressDetails();
    }, [address]);

    return (
        <>
            <Link to={"/"} className="homebtn">Home</Link>
            <div className="address-info">
                
                <h1 className="tobecenter">Address</h1>
                <h3> <Link>{address}</Link></h3>
                <div>
                    <div>
                        <h2 className="tobecenter">Balance</h2>
                        <p className="tobecenter">{balance / 10 ** 18} ETH</p>
                    </div>
                    <div>
                        <h2 className="tobecenter">Transaction Count</h2>
                        <p className="tobecenter">{txCount} Transactions</p>
                    </div>
                </div>
            </div>
        </>
    );
}