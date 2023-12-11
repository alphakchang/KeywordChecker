import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import './App.css';
import _ from 'lodash';
import KeywordWindow from './components/KeywordWindow/KeywordWindow';
import ContentWindow from './components/ContentWindow/ContentWindow';
import KeywordCounter from './components/KeywordCounter/KeywordCounter';
import EnterContent from './components/EnterContent/EnterContent';
import { Robot } from 'react-bootstrap-icons';

const initialState = {
  keywords: [],
  keywordsInput: '',
  content: '',
  haveContent: false
};

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
    return trimmedParts;
  }

  updateKeywords(e) {
    this.setState({ keywordsInput: e.target.value }, () => {
      this.setState({ keywords: this.formatKeywords(this.state.keywordsInput) }, () => {
        console.log(this.state.keywords);
      });
    });
  }

  debouncedUpdate = (e) => {
    e.persist();
    this.updateKeywords(e);
  }

  updateContent = (e) => {
    this.setState({ content: e.target.value }, () => {
      console.log(this.state.content);
    })
  }

  highlightKeywords = (content, keywords) => {
    const regex = new RegExp(`(${keywords.join('|')})`, 'gi');
    return content.replace(regex, (match) => `<span class="highlight">${match}</span>`);
  }

  countKeywordOccurrences = () => {
    const { content, keywords } = this.state;
    let keywordCounts = {};

    keywords.forEach(keyword => {
      if (keyword.trim() === '') return;

      const regex = new RegExp(keyword, 'gi');
      const matches = content.match(regex);
      keywordCounts[keyword] = matches ? matches.length : 0;
    });

    return keywordCounts;
  };


  render() {

    const { keywords, content, haveContent } = this.state;
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
                  <div className="row">
                    <div className="col-4">
                      <KeywordWindow updateKeywords={this.debouncedUpdateKeywords} />
                    </div>

                    <div className="col-8">
                      <div className="row">
                        <div className='d-flex justify-content-start align-items-center m-2'>
                          <Robot />
                          <span className='mx-1'>
                            Keywords Counter
                          </span>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-5 border rounded mx-1">
                          Keyword
                        </div>
                        <div className="col-2 border rounded mx-1 text-center">
                          Found
                        </div>
                        <div className="col-2 border rounded mx-1 text-center">
                          Counts
                        </div>
                      </div>
                      {keywords.map((keyword, index) => (
                        <KeywordCounter key={index} keyword={keyword} count={keywordCounts[keyword]} />
                      ))}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <ContentWindow
                        content={content}
                        keywords={keywords}
                        highlightKeywords={this.highlightKeywords}
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section>
              </section>
            </>
          )
        }
        <Footer />
      </>
    );
  }
}

export default App;
