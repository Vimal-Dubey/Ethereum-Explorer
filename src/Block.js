import { Alchemy, Network } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

export default function Block({ blockNumber }){

    const [timeStamp, setTimeStamp] = useState();
    const [hash, setHash] = useState();
    const [txnsNum, setTxnsNum] = useState();

    useEffect(() => {
        async function blockInfo() {
            const block = await alchemy.core.getBlock(blockNumber);
            setHash(block.hash);
            setTimeStamp(block.timestamp);
            setTxnsNum(block.transactions.length);
        }
        blockInfo();
    }, [blockNumber])

    const formatDate = (unixTimeStamp) => {
        const date = new Date(unixTimeStamp * 1000);
        return `(${date.toLocaleDateString()} | ${date.toLocaleTimeString()})`;
    };

    return (
        <>
            <div className="onebl">
                <h3><Link to={`/block/${blockNumber}`} className="blnum">Block: {blockNumber}</Link></h3>
                <p className="hsh">Hash: {hash}</p>
                <p className="tstmp">TimeStamp: {formatDate(timeStamp)}</p>
                <p className="ttltr"> <b>{txnsNum}</b> Transactions</p>
            </div>
        </>
    )

}