import React, { Component } from "react";
import "./SearchResults.css";
import img from "./star-btn.png";
import starSelected from "./star-btn-selected.png";
import ReactHtmlParser from "react-html-parser";

class SearchResults extends Component {
  render() {
    var result = this.props.arr;
    var favourites = this.props.favourites;
    const filteredListDiv =
      result && result.length > 0
        ? result.map(elem => {
            const html = ReactHtmlParser(elem.body);
            return (
              <div className="resultDiv" key={Math.random() + "resultDiv"}>
                <div
                  className="resultTitle"
                  key={Math.random() + "resultTitle"}
                >
                  <p className="outer" key={Math.random() + "outer"}>
                    <img
                      onClick={() => this.props.addorRemoveFromFavs(elem)}
                      alt="add or remove from favourites"
                      src={elem.title in favourites ? starSelected : img}
                      className="star"
                      key={Math.random() + "star"}
                    />
                  </p>
                  <p className="elemTitle" key={Math.random() + "elemTitle"}>
                    {elem.title}
                  </p>
                </div>
                <div
                  key={Math.random()}
                  className="resultBody"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </div>
            );
          })
        : this.props.searched ? <p className="noResults">No Results Found</p> : null;
    return <div className="searchResults">{filteredListDiv}</div>;
  }
}

export default SearchResults;
