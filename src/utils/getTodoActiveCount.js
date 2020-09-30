const getTodoActiveCount = (todoData) => {
  let counter = 0;

  todoData.forEach((todo) => {
    counter = todo.isCompleted ? counter : counter + 1;
  });

  return counter;
};

export default getTodoActiveCount;
