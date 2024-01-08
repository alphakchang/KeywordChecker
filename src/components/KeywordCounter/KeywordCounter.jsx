// Component not being used at the moment

import React from 'react';
import { HandThumbsUpFill, HandThumbsDown } from 'react-bootstrap-icons';

const KeywordCounter = ({ keyword, count }) => {
    return (
        <>
            <div className="row">
                <div className="col-5 mx-1 border-bottom">
                {keyword}
                </div>
                <div className="col-2 mx-1 text-center border-bottom">
                    {
                        keyword && (
                            count > 0 ? (
                                <HandThumbsUpFill />
                            ) : (
                                <HandThumbsDown />
                            )
                        )
                    }
                </div>
                <div className="col-2 mx-1 text-center border-bottom">
                {count}
                </div>
            </div>
        </>
    );
}

export default KeywordCounter;