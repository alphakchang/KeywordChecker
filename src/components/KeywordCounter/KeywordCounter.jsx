import React from 'react';

const KeywordCounter = ({ keyword, count }) => {
    return (
        <div className="row">
            <div className="col-4">{keyword}</div>
            <div className="col-2">{count}</div>
        </div>
    );
}

export default KeywordCounter;