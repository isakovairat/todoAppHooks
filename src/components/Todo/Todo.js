import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import clsx from 'clsx';
import formatSecondsToTimeString from '../../utils/formatSecondsToTimeString';

let timerId;

const Todo = (props) => {
  const { onDelete, onChecked, isCompleted, seconds, description, date } = props;
  const [dateString, setDateString] = useState('less than 5 seconds');
  const [isEdit, setIsEdit] = useState(false);
  const [todoDescription, setDescription] = useState(description);
  const [todoDate, setDate] = useState(date);
  const [currentTime, setCurrentTime] = useState(seconds);
  const [isPaused, setPaused] = useState(true);

  const handleEditClick = () => setIsEdit(true);
  const handleEditChange = (event) => setDescription(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEdit(false);
    setDateString('less than 5 seconds');
    setDate(new Date());
  };

  const handlePlayClick = () => setPaused(false);

  const handlePlayPause = () => setPaused(true);

  const tick = useCallback(() => {
    let newCurrentTime;
    if (currentTime === 0) {
      newCurrentTime = 0;
    } else {
      newCurrentTime = isPaused ? currentTime : currentTime - 1;
    }

    setDateString(formatDistanceToNow(todoDate, { includeSeconds: true }));
    setCurrentTime(newCurrentTime);
  }, [todoDate, currentTime, isPaused]);

  useEffect(() => {
    timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  const descriptionView = !isEdit ? (
    <span style={{ flexBasis: '45%' }} className="title">
      {todoDescription}
    </span>
  ) : (
    <form className="editForm" onSubmit={handleSubmit}>
      <input value={todoDescription} className="editInput" onChange={handleEditChange} />
    </form>
  );

  return (
    <div className="view">
      <input className={clsx({ toggle: true })} type="checkbox" onChange={onChecked} checked={isCompleted} />
      <label style={{ display: 'flex' }}>
        {descriptionView}
        <button
          className={clsx('icon icon-play', isEdit && 'hidden')}
          onClick={handlePlayClick}
          aria-label="Play"
          type="button"
        />
        <button
          className={clsx('icon icon-pause', isEdit && 'hidden')}
          onClick={handlePlayPause}
          aria-label="Pause"
          type="button"
        />
        <span
          className={clsx({
            description: true,
            hidden: isEdit,
          })}
        >
          {formatSecondsToTimeString(currentTime)}
        </span>
        <span
          style={{ flexBasis: '37%', textAlign: 'right' }}
          className={clsx({
            description: true,
            created: true,
            hidden: isEdit,
          })}
        >
          {dateString} ago
        </span>
      </label>
      <button
        type="button"
        className={clsx('icon icon-edit', isEdit && 'hidden')}
        aria-label="Edit"
        onClick={handleEditClick}
      />
      <button
        type="button"
        className={clsx('icon icon-destroy', isEdit && 'hidden')}
        onClick={onDelete}
        aria-label="Delete"
      />
    </div>
  );
};

Todo.defaultProps = {
  seconds: 600,
  description: 'test',
  date: new Date(),
  isCompleted: false,
  onDelete: () => {},
  onChecked: () => {},
};

Todo.propTypes = {
  seconds: PropTypes.number,
  description: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  isCompleted: PropTypes.bool,
  onDelete: PropTypes.func,
  onChecked: PropTypes.func,
};

export default Todo;
