// Component not being used at the moment

import React, { useState, useEffect } from 'react';

const ContentWindow = ({ content, keywords, partialContent, highlightMatchedKeywords, highlightPartiallyMatchedKeywords }) => {
    const [highlightedContent, setHighlightedContent] = useState('');
    const [partiallyMatchedContent, setPartiallyMatchedContent] = useState('');

    useEffect(() => {
        const highlighted = highlightMatchedKeywords(content, keywords);
        setHighlightedContent(highlighted);
    }, [content, keywords, highlightMatchedKeywords]);

    useEffect(() => {
        const partiallyMatched = highlightPartiallyMatchedKeywords(content, partialContent);
        setPartiallyMatchedContent(partiallyMatched);
    }, [content, partialContent, highlightPartiallyMatchedKeywords]);

    const combinedContent = highlightedContent + partiallyMatchedContent;

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: combinedContent
            }}
            className="content-preview border border-2 p-4 rounded box" // box css defined in App.css
        />
    );
}

export default ContentWindow;
