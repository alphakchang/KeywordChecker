import React from 'react';

const PartialMatches = ({ keyword, currentContent }) => {
    return (
        <>
            <div className="row mx-1">
                <div className="col-4 mx-1 border-bottom">
                {keyword}
                </div>
                <div className="col mx-1 border-bottom">
                {currentContent}
                </div>
            </div>
        </>
    );
}

export default PartialMatches;