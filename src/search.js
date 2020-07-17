import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)
    }

    handleSearch(e) {
        this.props.onSearch(e.target.value);
    }

    handleClear(e) {
        document.querySelector('#search').value = '';
        this.props.onClear();
    }

    render() {
        return (
            <div className="search-container">
                <input id="search" onChange={this.handleSearch} placeholder="Filter Tickets" type="text" className="form-control" aria-label="Search Tickets" />
                <button className="clear-button" onClick={this.handleClear}>Clear</button>
            </div>
        )
    }
}

export default Search