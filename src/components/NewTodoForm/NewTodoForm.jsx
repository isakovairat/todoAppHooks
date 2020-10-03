import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NewTodoForm = (props) => {
  const { addTodo } = props;

  const [description, setDescription] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  function initialState() {
    setDescription('');
    setMinutes('');
    setSeconds('');
  }

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'description':
        setDescription(event.target.value);
        break;
      case 'minutes':
        if (+event.target.value > 60) {
          break;
        }
        setMinutes(event.target.value);
        break;
      case 'seconds':
        if (+event.target.value > 60) {
          break;
        }
        setSeconds(event.target.value);
        break;
      default:
        initialState();
        break;
    }
  };

  const handleSubmit = (event) => {
    const transformedSeconds = +minutes * 60 + +seconds;
    addTodo(description, transformedSeconds);
    event.preventDefault();
    initialState();
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input
        className="new-todo"
        type="text"
        name="description"
        placeholder="Task"
        value={description}
        onChange={handleChange}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        name="minutes"
        placeholder="Min"
        value={minutes}
        onChange={handleChange}
      />
      <input
        className="new-todo-form__timer"
        type="text"
        name="seconds"
        placeholder="Sec"
        value={seconds}
        onChange={handleChange}
      />
      <input type="submit" style={{ display: 'none' }} />
    </form>
  );
};

NewTodoForm.defaultProps = {
  addTodo: () => {},
};

NewTodoForm.propTypes = {
  addTodo: PropTypes.func,
};

export default NewTodoForm;
