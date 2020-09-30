import React from 'react';
import PropTypes from 'prop-types';
import TodosFilter from '../TodosFilter';

const Footer = (props) => {
  const { clearCompleted, todoCount, filter, onFilterChange } = props;

  return (
    <footer className="footer">
      <span className="todo-count">{todoCount} items left</span>
      <TodosFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  todoCount: 0,
  clearCompleted: () => {},
  filter: 'active',
  onFilterChange: () => {},
};

Footer.propTypes = {
  todoCount: PropTypes.number,
  clearCompleted: PropTypes.func,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func,
};

export default Footer;
