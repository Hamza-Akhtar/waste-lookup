import React, { Component } from 'react';
import './Search.css'

import Favourites from './Favourites'
import './Favourites.css'


import SearchResults from './SearchResults'
import axios from 'axios';

class Search extends Component {

    state = {
        searchVal: '',
        results: [],
        favourites: {}
    }

    addorRemoveFromFavs = (elem) => {
        var newFavourites = {...this.state.favourites};
    
        if (!(elem.title in newFavourites)) {
        newFavourites[elem.title] = elem;
        }
        else {
            delete newFavourites[elem.title]; 
        }

        this.setState({
            favourites: newFavourites
        })
    }

    search = () => {
        if (this.state.searchVal !== '') {
            axios.get("https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000").then(
                res => {
                    this.filterByKeywods(res.data);
                }
            )
        }
    }

    filterByKeywods = (data) => {
        var filterArr = data.filter(elem => {
            return (elem.keywords.includes(this.state.searchVal))
        });
        this.setState({
            results: filterArr
        });
    }

    updateSearchVal = (e) => {
        var val = e.target.value;

        if (val === '') {
            this.setState({
                results: []
            })
        }
        this.setState({
            searchVal: val
        })
    }

    render() {
        const filteredList = this.state.results;
        return (
            <div>
                <div className="searchBarDiv">
                    <input onChange={this.updateSearchVal} className="searchBar" type="text" placeholder="Search" />
                    <button onClick={this.search} className="searchBtn"></button>
                </div>
                <div>
                    <SearchResults addorRemoveFromFavs={this.addorRemoveFromFavs} arr={filteredList} favourites={this.state.favourites} />
                    <Favourites  addorRemoveFromFavs={this.addorRemoveFromFavs} favourites={this.state.favourites} />
                </div>
            </div>
        )
    }
}

export default Search;