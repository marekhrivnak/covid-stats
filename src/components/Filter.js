import React from 'react'
import './Filter.css'


export const Filter = ({filter, setFilter}) => {
    return (
        <div className="SearchBar">
        <span className="searchtext">
            Search: {' '}
            <input className="tableinput" value={filter || ''} placeholder="Enter country" onChange={(e) => setFilter(e.target.value)} />
        </span>
        </div>
    )
}

