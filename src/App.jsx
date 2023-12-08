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
      this.setState({haveContent: true});
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
              <EnterContent updateContent={this.updateContent} checkHaveContent={this.checkHaveContent}/>
            </section>
          ) : (
            <>
              <section>
                <KeywordWindow updateKeywords={this.debouncedUpdateKeywords} />
                <ContentWindow
                  content={content}
                  keywords={keywords}
                  highlightKeywords={this.highlightKeywords}
                />
              </section>
              <section>
                {keywords.map((keyword, index) => (
                  <KeywordCounter key={index} keyword={keyword} count={keywordCounts[keyword]}/>
                ))}
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
