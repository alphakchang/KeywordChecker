import React from 'react';
import Button from 'react-bootstrap/Button';
import { TextareaT } from 'react-bootstrap-icons';
import './EnterContent.css';

const EnterContent = ({ updateContent, checkHaveContent }) => {
    return (
        <>
            <p className='fs-3 fw-medium d-flex justify-content-around align-items-center'>
                <TextareaT /><span className='mx-3'>Content</span><TextareaT />
            </p>
            <div className='d-flex justify-content-center'>
                <textarea name="contentInput" id="contentInput" className="form-control" onChange={updateContent}></textarea>
            </div>
            <div className='d-flex justify-content-center'>
                <Button className='my-3' variant='primary' onClick={checkHaveContent}>Confirm</Button>
            </div>
        </>
    );
}

export default EnterContent;