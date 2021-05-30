import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const FileUpload = () => {
    const fileInputRef = useRef(null);
    const history = useHistory();


    const onSubmit = async () => {
        const file = fileInputRef.current.files[0];
        const base64 = await toBase64(file);
        const finalBase64 = base64.substring(base64.indexOf(',') + 1);
        await axios.post('/api/people/ImportCSV', {base64File: finalBase64, name: file.name});
        history.push('/');
    }


    return (
            <div className="row" style={{marginTop: '120px'}}>
                <div className="col-md-4 offset-2" >
                    <input ref={fileInputRef} type="file" className="form-control-lg" />
                </div>
                <div className="col-md-2">
                    <button className='btn btn-primary btn-lg' onClick={onSubmit}>Submit</button>
                </div>
            </div>
    )
}

export default FileUpload;