import React from 'react';

const ContentHighlighter = ({ content, keywords, partialContent }) => {
    // Highlight full keywords
    const highlightKeywords = () => {
        if (keywords.length > 0) {
            const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
            return content.replace(regex, (match) => `<span class="highlight_matched">${match}</span>`);
        }
        return content;
    };

    // Highlight partial content
    const highlightPartialContent = (updatedContent) => {
        if (partialContent.length > 0) {
            const regex = new RegExp(`(${partialContent.join('|')})`, 'gi');
            return updatedContent.replace(regex, (match) => `<span class="highlight_partially_matched">${match}</span>`);
        }
        return updatedContent;
    };

    // Apply both highlighting functions
    const highlightedContent = highlightPartialContent(highlightKeywords());

    return (
        <div 
          className="content-preview border border-2 px-5 py-3 rounded box" 
          dangerouslySetInnerHTML={{ __html: highlightedContent }}
        /> 
    );
}

export default ContentHighlighter;
