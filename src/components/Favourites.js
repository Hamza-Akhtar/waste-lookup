import React from 'react';

import './Favourites.css'
import img from './star-btn.png'
import ReactHtmlParser from 'react-html-parser';



const Favourites = (props) => {
    const favsMap = props.favourites;
    const favsMapDiv = Object.keys(favsMap).map(function(key) {
        const elem = favsMap[key];
        const html =  ReactHtmlParser(elem.body);
        return (
            <div className="resultDiv2">
            <div className="resultTitle">
            <p className="outer"> 
                <img onClick={() => props.addorRemoveFromFavs(elem)} alt="add or remove from favourites" src={img} className="star"></img></p>
                <p>{elem.title}</p>
            </div>
            <div className="resultBody" dangerouslySetInnerHTML={ {__html: html} } />
            </div>
        )});    

    return (
        <div className="favourites">
            <h2 className="favouritesH2">Favourites</h2>
            {favsMapDiv}
        </div>
    )
}

export default Favourites;