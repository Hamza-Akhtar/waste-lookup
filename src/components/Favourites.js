import React from "react";
import "./Favourites.css";
import img from "./star-btn-selected.png";
import ReactHtmlParser from "react-html-parser";

const Favourites = props => {
  const favsMap = props.favourites;
  const favsMapDiv = Object.keys(favsMap).map(function(key) {
    const elem = favsMap[key];
    const html = ReactHtmlParser(elem.body);
    return (
      <div className="resultDiv2" key={Math.random()}>
        <div className="resultTitle" key={Math.random()}>
          <p className="outer" key={Math.random()}>
            <img
              onClick={() => props.addorRemoveFromFavs(elem)}
              alt="add or remove from favourites"
              src={img}
              className="star"
              key={Math.random()}
            />
          </p>
          <p className="elemTitle" key={Math.random()}>
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
  });
  return (
    <div className="favourites">
      <h2 className="favouritesH2">Favourites</h2>
      {favsMapDiv}
    </div>
  );
};

export default Favourites;
