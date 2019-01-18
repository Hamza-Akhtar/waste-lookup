// class to handle all search features

import React, { Component } from "react";
import Favourites from "./Favourites";
import SearchResults from "./SearchResults";
import "../css/Favourites.css";
import "../css/Search.css";
import axios from "axios";

class Search extends Component {
  state = {
    data: [],
    searchVal: "",
    results: [],
    favourites: {},
    searched: false
  };

  componentDidMount() {
    var favs = localStorage.getItem("Favourites");

    if (favs) {
      try {
        var parsedFavs = JSON.parse(favs);
        this.setState({
          favourites: parsedFavs
        });
      } catch (e) {
        localStorage.removeItem("Favourites");
      }
    }
  }

  addorRemoveFromFavs = elem => {
    var newFavourites = { ...this.state.favourites };

    if (!(elem.title in newFavourites)) {
      newFavourites[elem.title] = elem;
    } else {
      delete newFavourites[elem.title];
    }

    this.setState({
      favourites: newFavourites
    });

    localStorage.setItem("Favourites", JSON.stringify(newFavourites));

  };

  search = e => {
    e.preventDefault();

    if (this.state.data.length === 0 && this.state.searchVal !== "") {
      axios
        .get(
          "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000"
        )
        .then(res => {
          this.setState({
            data: res.data
          });
          this.filterByKeywods(this.state.data);
        });
    }
    else if (this.state.searchVal !== "") {
        this.filterByKeywods(this.state.data);
    }
  };

  filterByKeywods = data => {
    var filterArr = [];
    var searchValArr = this.state.searchVal.toLowerCase().split(' ');

    searchValArr.forEach(searchWord => {
    var tempFilterArr = data.filter(elem => {
        return elem.keywords.includes(searchWord) && !filterArr.includes(elem);
      });
      filterArr = [...filterArr, ...tempFilterArr];
    });

    this.setState({
      results: filterArr,
      searched: true
    });
  };

  updateSearchVal = e => {
    var val = e.target.value.trim();

    if (val === "") {
      this.setState({
        results: [],
        searched: false
      });
    }
    this.setState({
      searchVal: val, 
    });
  };

  render() {
    const filteredList = this.state.results;
    return (
      <div>
        <div className="searchBarDiv">
          <form onSubmit={this.search}>
            <input
              onChange={this.updateSearchVal}
              className="searchBar"
              type="text"
              placeholder="Search"
            />
            <button className="searchBtn" />
          </form>
        </div>
        <div>
          <SearchResults
            addorRemoveFromFavs={this.addorRemoveFromFavs}
            arr={filteredList}
            favourites={this.state.favourites}
            searched={this.state.searched}
          />
          <Favourites
            addorRemoveFromFavs={this.addorRemoveFromFavs}
            favourites={this.state.favourites}
          />
        </div>
      </div>
    );
  }
}

export default Search;
