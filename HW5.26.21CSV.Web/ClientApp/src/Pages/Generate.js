import React, { useState, useRef } from 'react';
import axios from 'axios';




const Generate = () => {
    const [amount, setAmount] = useState('');


    const generateFile = e => {
        e.preventDefault();
        if (amount == 0){
            return;
        }
        window.location = `api/people/generatePeopleCSV/${amount}`;
        }

    return (
        <div className="row">
            <div className="col-md-6 offset-3" style={{marginTop: '120px'}}>
                <form className="form-inline">
                    <div className="form-group mb-2">
                        <input type="text" onChange={e => {setAmount(e.target.value)}} className="form-control" placeholder="Generate" />
                    </div>
                    <button type="submit" onClick={generateFile} className="btn btn-primary mb-2">Generate</button>
                </form>
            </div>
        </div>
    );
}

export default Generate;