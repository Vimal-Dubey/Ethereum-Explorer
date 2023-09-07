import './App.css';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Search = ()=>{

    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleInput = (e) => {
        const value = e.target.value;
        let result;

        if (/^0x[a-fA-F0-9]+$/.test(value)) {
            // Input is in hexadecimal format
            result = value;
        } else if (/^\d+$/.test(value)) {
            // Input is in integer format
            result = parseInt(value, 10).toString();
        } else {
            // Input is not valid
            result = "";
        }
        console.log(result);
        setInputValue(result);
    };
    const handleSearch = () => {
        if (inputValue.length === 66) {
            navigate(`/transaction/${inputValue}`);
        }
        else if (inputValue.length === 42) {
            navigate(`/address/${inputValue}`);
        }
        else if (inputValue.length <= 8) {
            navigate(`/block/${inputValue}`);
        }
        else {
            console.log("Invalid Input");
        }
        setInputValue("");
    };

    return(
        <div className='searcho'>
            <input className='inp' type="text" placeholder="Search any block or transaction" 
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInput} />
            <button className='btn' onClick={handleSearch}>Search</button>
        </div>
    )
}
export default Search;