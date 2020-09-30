import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo';

const TodoList = (props) => {
  const { todoData, deleteTodo, checkTodo } = props;

  const elements = todoData.map((el) => {
    const { id, description, isCompleted, date, seconds } = el;

    return (
      <li key={id} className={isCompleted ? 'completed' : 'active'}>
        <Todo
          seconds={seconds}
          description={description}
          date={date}
          isCompleted={isCompleted}
          onDelete={() => deleteTodo(id)}
          onChecked={() => checkTodo(id)}
          // onEdit={(newDescription) => onEdit(id, newDescription)}
        />
      </li>
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

TodoList.defaultProps = {
  todoData: [],
  deleteTodo: () => {},
  checkTodo: () => {},
};

TodoList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  todoData: PropTypes.array,
  deleteTodo: PropTypes.func,
  checkTodo: PropTypes.func,
};

export default TodoList;
