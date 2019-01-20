// class to display all search results

import React, { Component } from "react";
import "../css/SearchResults.css";
import starUnselected from "../images/star-btn-unselected.png";
import starSelected from "../images/star-btn-selected.png";
import ReactHtmlParser from "react-html-parser";

class SearchResults extends Component {
  render() {
    var result = this.props.arr;
    var favourites = this.props.favourites;
    const filteredListDiv =
      result && result.length > 0 ? (
        result.map(elem => {
          const html = ReactHtmlParser(elem.body);
          return (
            <div className="resultDiv" key={"result" + elem.title}>
              <div className="resultTitle" key={"resultTitle" + elem.title}>
                <p className="outer" key={"outer" + elem.title}>
                  <img
                    onClick={() => this.props.addorRemoveFromFavs(elem)}
                    alt="add or remove from favourites"
                    src={
                      elem.title in favourites ? starSelected : starUnselected
                    }
                    className="star"
                    key={"star" + elem.title}
                  />
                </p>
                <p className="elemTitle" key={"elemTitle" + elem.title}>
                  {elem.title}
                </p>
              </div>
              <div
                key={"resultBody" + elem.title}
                className="resultBody"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          );
        })
      ) : this.props.searched ? (
        <p className="noResults">No Results Found</p>
      ) : null;
    return <div className="searchResults">{filteredListDiv}</div>;
  }
}

export default SearchResults;
