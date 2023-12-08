import React from 'react';

const KeywordWindow = ({ updateKeywords }) => {
    return (
        <textarea name="keywords" id="keywords" cols="30" rows="10" onChange={updateKeywords}></textarea>
    );
}

export default KeywordWindow;