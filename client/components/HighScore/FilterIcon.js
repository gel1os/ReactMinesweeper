import React from 'react';

const FilterIcon = ({name, sortBy, sortDirection, changeSorting}) => {
  const isSelected = name === sortBy;
  const icon = isSelected ? 'icons/filter-applied.svg' : 'icons/filter.svg';
  return <img
    className={`filter-icon filter-icon__${sortDirection}`}
    src={icon}
    alt="filter"
    onClick={() => changeSorting(name)}
  />
}
export default FilterIcon;