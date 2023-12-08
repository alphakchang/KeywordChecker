import React from 'react';
import Button from 'react-bootstrap/Button';

const EnterContent = ({ updateContent, checkHaveContent }) => {
    return (
        <>
            <h1>Please enter content</h1>
            <textarea name="" id="" cols="30" rows="10" onChange={updateContent}></textarea>
            <Button variant='primary' onClick={checkHaveContent}>Confirm</Button>
        </>
    );
}

export default EnterContent;