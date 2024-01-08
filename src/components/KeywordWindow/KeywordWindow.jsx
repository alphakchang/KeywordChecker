import React from 'react';
import './KeywordWindow.css';
import { ListColumns } from 'react-bootstrap-icons';

const KeywordWindow = ({ updateKeywords }) => {
    return (
        <>
            <div className='d-flex justify-content-start align-items-center m-2'>
                <ListColumns />
                <span className='mx-1'>
                    {"Keywords (Separated by , or ; or linebreak)"}
                </span>
            </div>
            <textarea name="keywords" id="keywords" className="form-control mx-2" onChange={updateKeywords}></textarea>
        </>
    );
}

export default KeywordWindow;