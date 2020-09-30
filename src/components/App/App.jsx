import React, { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import NewTodoForm from '../NewTodoForm/NewTodoForm';
import TodoList from '../TodoList';
import getTodoActiveCount from '../../utils/getTodoActiveCount';

let id = 1;

const App = () => {
  function createTodo(description, seconds = 600) {
    return {
      // eslint-disable-next-line no-plusplus
      id: ++id,
      description,
      isCompleted: false,
      date: new Date(),
      seconds,
    };
  }

  const [todoData, setTodoData] = useState(() => [...Array(3)].map((_todo, index) => createTodo(`test ${index}`)));
  const [filter, setFilter] = useState('all');

  const addTodo = (description, seconds) =>
    setTodoData((prevState) => [...prevState, createTodo(description, seconds)]);

  const deleteTodo = (todoId) => setTodoData((prevState) => prevState.filter((todo) => todo.id !== todoId));

  const checkTodo = (todoId) =>
    setTodoData((prevState) =>
      prevState.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              isCompleted: !todo.isCompleted,
            }
          : todo
      )
    );

  const clearCompleted = () => setTodoData((prevState) => prevState.filter((todo) => !todo.isCompleted));

  // eslint-disable-next-line no-shadow
  const filterTodoData = (todoData, filter) => {
    switch (filter) {
      case 'all':
        return todoData;
      case 'active':
        return todoData.filter((todo) => !todo.isCompleted);
      case 'done':
        return todoData.filter((todo) => todo.isCompleted);
      default:
        return todoData;
    }
  };

  return (
    <section className="todoapp">
      <Header />
      <NewTodoForm addTodo={addTodo} />
      <TodoList todoData={filterTodoData(todoData, filter)} deleteTodo={deleteTodo} checkTodo={checkTodo} />
      <Footer
        todoCount={getTodoActiveCount(todoData)}
        clearCompleted={clearCompleted}
        filter={filter}
        onFilterChange={(newFilter) => setFilter(newFilter)}
      />
    </section>
  );
};

export default App;
