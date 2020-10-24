import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

const BTNS = [
  { filterName: 'all', label: 'All' },
  { filterName: 'active', label: 'Active' },
  { filterName: 'done', label: 'Done' },
];

const TodosFilter = (props) => {
  const { filter, onFilterChange } = props;

  const btns = BTNS.map(({ filterName, label }) => {
    return (
      <li key={filterName}>
        <button
          type="button"
          className={clsx({ selected: filter === filterName })}
          onClick={() => {
            onFilterChange(filterName);
          }}
        >
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{btns}</ul>;
};

TodosFilter.defaultProps = {
  filter: '',
  onFilterChange: () => {},
};

TodosFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default TodosFilter;
