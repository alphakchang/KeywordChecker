import React from 'react';
import ActionButton from '../../ActionButton/ActionButton';

const NoMatch = ({ keyword }) => {
    return (
        <>
            <div className="row mx-1">
                <div className="col-5 mx-1 border-bottom">
                {keyword}
                </div>
                <div className="col-5 mx-1 border-bottom text-center">
                    <ActionButton />
                </div>
            </div>
        </>
    );
}

export default NoMatch;