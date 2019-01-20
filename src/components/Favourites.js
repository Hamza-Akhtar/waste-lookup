// Component to display favourites

import React from "react";
import "../css/Favourites.css";
import starSelected from "../images/star-btn-selected.png";
import ReactHtmlParser from "react-html-parser";

const Favourites = (props) => {
  const favsMap = props.favourites;
  const favsMapDiv = Object.keys(favsMap).map(function (key) {
    const elem = favsMap[key];
    const html = ReactHtmlParser(elem.body);
    return (
      <div className="favsResultDiv" key={'favsResult' + elem.title}>
        <div className="favsResultTitle" key={'favsTitle' + elem.title}>
          <p className="favsOuter" key={'favsOuter' + elem.title}>
            <img
              onClick={() => props.addorRemoveFromFavs(elem)}
              alt="add or remove from favourites"
              src={starSelected}
              className="favsStar"
              key={'favsStar' + elem.title}
            />
          </p>
          <p className="favsElemTitle" key={'favsElemTitle' + elem.title}>
            {elem.title}
          </p>
        </div>
        <div
          key={'favsElemBody' + elem.title}
          className="favsResultBody"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  });
  return (
    <div className="favourites">
      <h2 className="favouritesH2">Favourites</h2>
      {favsMapDiv}
    </div>
  );
};

export default Favourites;
