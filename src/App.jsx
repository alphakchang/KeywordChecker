import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import './App.css';
import _ from 'lodash';
import KeywordWindow from './components/KeywordWindow/KeywordWindow';
import EnterContent from './components/EnterContent/EnterContent';
import { DropletFill, DropletHalf, Droplet } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import MatchedKeywords from './components/Matches/MatchedKeywords/MatchedKeywords';
import NoMatch from './components/Matches/NoMatch/NoMatch';
import PartialMatches from './components/Matches/PartialMatches/PartialMatches';
import ContentHighlighter from './components/ContentHighlighter/ContentHighlighter';

const initialState = {
  keywords: [], // an array of keywords that user is checking for matches
  matchedKeywords: [], // an array of matched keywords
  partialMatch: [], // an array of partially matched words to the keywords
  noMatch: [], // an array of keywords with no matches
  partialMatchContent: {},
  keywordsInput: '',
  content: '',
  haveContent: false
};

const dropletColor = "#99ebff"; // the color of the droplet icons for matched keywords

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
    this.updateKeywords = this.updateKeywords.bind(this);
    this.debouncedUpdateKeywords = _.debounce(this.debouncedUpdate, 500);
  }

  checkHaveContent = () => {
    if (this.state.content) {
      this.setState({ haveContent: true });
    }
  }

  formatKeywords = (keywordsInput) => {
    const parts = keywordsInput.split(/[,;\n]+/);
    const trimmedParts = parts.map(part => part.trim());
    // Filter out empty strings
    const nonEmptyParts = trimmedParts.filter(part => part !== "");
    // Use a Set to ensure uniqueness and then convert it back to an array
    const uniqueParts = Array.from(new Set(nonEmptyParts));
    return uniqueParts;
  }



  updateKeywords(e) {
    this.setState({ keywordsInput: e.target.value }, () => {
      this.setState({ keywords: this.formatKeywords(this.state.keywordsInput) }, () => {
        console.log(this.state.keywords);
        this.sortKeywords(this.state.content, this.state.keywords);
      });
    });
  }

  debouncedUpdate = (e) => {
    e.persist();
    this.updateKeywords(e);
  }

  updateContent = (e) => {
    this.setState({ content: e.target.value })
  }

  // Helper function to escape special characters in regex
  escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  sortKeywords = (content, keywords) => {

    let matchedKeywords = [];
    let partialMatch = [];
    let noMatch = [];
    let partialMatchContent = {};

    keywords.forEach(keyword => {

      let exactMatch = false;

      // Create a regex for exact match (considering word boundaries)
      // const exactMatchRegex = new RegExp("\\b" + this.escapeRegExp(keyword) + "\\b", "i"); // check each word
      const exactMatchRegex = new RegExp(this.escapeRegExp(keyword), "i"); // check each letter

      // Check for exact match first
      if (exactMatchRegex.test(content)) {
        matchedKeywords.push(keyword);
        exactMatch = true;
      } else if (keyword.trim().includes(" ")) { // If keyword contains more than one word

        // Split the keyword and get the first and last word for multi-word keywords
        const words = keyword.split(/\s+/);
        const firstWord = this.escapeRegExp(words[0]);
        const lastWord = this.escapeRegExp(words[words.length - 1]);

        // Create a regex for the specific partial match condition
        /**
         * When a keyword has more than one word,
         * the first word and the last word of the keyword will be the anchor points,
         * if there are the same number of words +- one word in between the two anchor points,
         * this is considered a partial match.
         */
        const partialMatchRegex = new RegExp(firstWord + "(\\s+\\w+){0,2}\\s+" + lastWord, "i");

        if (partialMatchRegex.test(content)) {
          if (!exactMatch) {
            partialMatch.push(keyword);
          }
          // Extract the matched content and add it to partialMatchContent
          var match = content.match(partialMatchRegex);
          if (match && match[0]) {
            partialMatchContent[keyword] = match[0];
          }
        } else if (!exactMatch) {
          noMatch.push(keyword);
        }

      } else if (!exactMatch) {
        noMatch.push(keyword);
      }
    });
    this.setState({ matchedKeywords, partialMatch, noMatch, partialMatchContent }, () => {
      console.log(`Partial matches: ${this.state.partialMatchContent}`)
    });
  }

  countKeywordOccurrences = () => {
    const { content, matchedKeywords } = this.state;
    let keywordCounts = {};

    matchedKeywords.forEach(keyword => {
      if (keyword.trim() === '') return; // if keyword is an empty string, do nothing
      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      keywordCounts[keyword] = matches ? matches.length : 0;
    });
    return keywordCounts;
  }

  newSession = () => {
    this.setState({
      haveContent: false,
      content: ''
    });
  }


  render() {

    const { matchedKeywords, partialMatchContent, noMatch, content, haveContent } = this.state;
    const keywordCounts = this.countKeywordOccurrences();

    return (
      <>
        <Navigation />
        {
          !haveContent ? (
            <section>
              <div className='container-lg'>
                <EnterContent updateContent={this.updateContent} checkHaveContent={this.checkHaveContent} />
              </div>
            </section>
          ) : (
            <>
              <section>
                <div className='container-lg'>

                  {/* Enter keywords section */}
                  <div className='border border-2 rounded-3 pt-3 pb-5 box'>
                    <div className="row d-flex justify-content-center">
                      <div className="col-7 mx-2">
                        <KeywordWindow updateKeywords={this.debouncedUpdateKeywords} />
                      </div>

                      {/* Matched keywords part */}
                      <div className="col-4">
                        <div className="row">
                          <div className='d-flex justify-content-start align-items-center m-2'>
                            <DropletFill color={dropletColor} />
                            <span className='mx-1'>
                              Matched keywords
                            </span>
                          </div>
                        </div>
                        <div className="row mx-1">
                          <div className="col-5 border rounded mx-1">
                            Keyword
                          </div>
                          <div className="col-5 border rounded mx-1 text-center">
                            Counts
                          </div>
                        </div>
                        {matchedKeywords.map((keyword, index) => (
                          <MatchedKeywords key={index} keyword={keyword} count={keywordCounts[keyword]} />
                        ))}
                      </div>
                    </div>

                    {/* Display keywords matches and partial matches section */}
                    <div className="row d-flex justify-content-center my-3">

                      {/* Partially matched keywords part */}
                      <div className="col-7 mx-2">
                        <div className="row">
                          <div className='d-flex justify-content-start align-items-center m-2'>
                            <DropletHalf color={dropletColor} />
                            <span className='mx-1'>
                              Partial matches
                            </span>
                          </div>
                        </div>
                        <div className="row mx-1">
                          <div className="col-4 border rounded mx-1">
                            Keyword
                          </div>
                          <div className="col border rounded mx-1 text-center">
                            Current Content
                          </div>
                        </div>
                        {Object.entries(partialMatchContent).map(([keyword, value], index) => (
                          <PartialMatches key={index} keyword={keyword} currentContent={value} />
                        ))}
                      </div>

                      {/* No match keywords part */}
                      <div className="col-4">
                        <div className="row">
                          <div className='d-flex justify-content-start align-items-center m-2'>
                            <Droplet color={dropletColor} />
                            <span className='mx-1'>
                              No Match
                            </span>
                          </div>
                        </div>
                        <div className="row mx-1">
                          <div className="col-5 border rounded mx-1">
                            Keyword
                          </div>
                          <div className="col-5 border rounded mx-1 text-center">
                            Action
                          </div>
                        </div>
                        {noMatch.map((keyword, index) => (
                          <NoMatch key={index} keyword={keyword} />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content section, where keywords are highlighted */}
                  <div className="row my-5">
                    <div className="col-12">
                      {/* <ContentWindow
                      content={content}
                      keywords={matchedKeywords}
                      partialContent={Object.values(partialMatchContent)}
                      highlightMatchedKeywords={this.highlightMatchedKeywords}
                      highlightPartiallyMatchedKeywords={this.highlightPartiallyMatchedKeywords}
                    /> */}
                      <ContentHighlighter
                        content={content}
                        keywords={matchedKeywords}
                        partialContent={Object.values(partialMatchContent)}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="container-lg">
                  <div className="d-flex justify-content-center">
                    <Button variant="primary" onClick={this.newSession}>Start new session</Button>
                  </div>
                </div>
              </section>
            </>
          )
        }
        <section>
          <Footer />
        </section>
      </>
    );
  }
}

export default App;
