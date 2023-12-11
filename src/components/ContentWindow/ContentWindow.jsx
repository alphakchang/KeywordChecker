import React, { useState, useEffect } from 'react';

const ContentWindow = ({ content, keywords, highlightKeywords }) => {
    const [highlightedContent, setHighlightedContent] = useState('');

    useEffect(() => {
        const highlighted = highlightKeywords(content, keywords);
        setHighlightedContent(highlighted);
    }, [content, keywords, highlightKeywords]);

    return (
        <div
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
            className="content-preview border border-2 p-4 rounded"
        />
    );
}

export default ContentWindow;
