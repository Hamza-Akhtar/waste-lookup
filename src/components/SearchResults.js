import React, {Component} from 'react';
import './SearchResults.css';
import ReactHtmlParser from 'react-html-parser';

import img from './star-btn.png'



class SearchResults extends Component {
    render() {
    var result = this.props.arr;
    const filteredListDiv = result && result.length > 0 ? result.map(
        elem => {
            const html =  ReactHtmlParser(elem.body);
            return (
            <div className="resultDiv">
            <div className="resultTitle">
            <p className="outer"> 
                <img onClick={() => this.props.addorRemoveFromFavs(elem)} alt="add or remove from favourites" src={img} className="star"></img></p>
                <p>{elem.title}</p>
            </div>
            <div className="resultBody" dangerouslySetInnerHTML={ {__html: html} } />
            </div>
            );
        }) : null;
    return (
        <div className="searchResults">
        {filteredListDiv}
        </div>
    )

    }
}

export default SearchResults;