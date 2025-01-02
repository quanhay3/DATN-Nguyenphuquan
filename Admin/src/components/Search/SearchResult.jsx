import React, { memo } from 'react'
import ItemSearch from './ItemSearch';

const SearchResult = ({ value = [] }) => {
    const searchResult = value;
    return (searchResult.map((result, index) => <ItemSearch key={index} data={result} />));
}

export default memo(SearchResult)
