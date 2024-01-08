import React from 'react';

const MatchedKeywords = ({ keyword, count }) => {
    return (
        <>
            <div className="row mx-1">
                <div className="col-5 mx-1 border-bottom">
                {keyword}
                </div>
                <div className="col-5 mx-1 text-center border-bottom">
                {count}
                </div>
            </div>
        </>
    );
}

export default MatchedKeywords;