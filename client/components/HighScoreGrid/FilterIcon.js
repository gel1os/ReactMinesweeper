import React from 'react';
import PropTypes from 'prop-types';

const FilterIcon = ({name, sortBy, sortDirection, changeSorting}) => {
  const isSelected = name === sortBy;
  const icon = isSelected ? 'icons/filter-applied.svg' : 'icons/filter.svg';
  return <img
    className={`filter-icon filter-icon__${sortDirection}`}
    src={icon}
    alt="filter"
    onClick={() => changeSorting(name)}
  />;
};

FilterIcon.propTypes = {
  name: PropTypes.string.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortDirection: PropTypes.oneOf(['asc', 'desc']).isRequired,
  changeSorting: PropTypes.func,
};

export default FilterIcon;