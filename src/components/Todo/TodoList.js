import React from "react";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


import classes from "./TodoList.module.css";
import * as actionTypes from '../store/actions'
const TodoList = () => {

  const notes=useSelector(state=>state.notes);
  const [filteredValue, setFilteredValue] = useState();
  const [searchedValue, setSearchedValue] = useState('');
  const [filterList, setFilteredList] = useState(notes);
  const dispatch=useDispatch();
  const removeHandler = (id) => {
    console.log(id, "remove was clicked");
dispatch({
  type:actionTypes.REMOVE_TODO,
  payload:id
})
  };
  const doneHandler = (id) => {
    console.log(id, "done was clicked");
    dispatch({
      type:actionTypes.DONE_TODO,
      payload:id
    })
  };
  useEffect(() => {
    if (filteredValue === "true") {
      console.log(filteredValue);
        console.log(!filteredValue);
        console.log(!!filteredValue);
      setFilteredList(
        
        notes.filter((item) => item.done === !!filteredValue)
      );
    } else if (filteredValue === "false") {
      setFilteredList(
        notes.filter((item) => item.done !== !!filteredValue)
      );
    } else {
      setFilteredList(notes);
    }
  }, [filteredValue, notes]);

  const filterHandler = (e) => {
    setFilteredValue(e.target.value);
  };
  const searchHandler = (e) => {
    console.log('serch method');
    setSearchedValue(e.target.value);
    console.log('serchvalue',searchedValue);
    setFilteredList(
      notes.filter((item) => item.title.toLowerCase().includes(searchedValue.toLowerCase()))
    );
  };
  return (
    <div className={classes.todos}>
      <h1>Notes:</h1>
      <label>Search</label>
      <input type="text" name="search" onChange={searchHandler}/>
      <select name="done" defaultValue="all" onChange={filterHandler}>
        <option value="true">Done</option>
        <option value="false">Not done</option>
        <option value="all">All</option>
      </select>
      {filterList.map((note) => {
        return (
          <div
            onClick={() => doneHandler(note.id)}
            className={`${classes.todo} ${
              note.done ? classes.done : classes.notDone
            }`}
            key={note.id}
          >
            <h2>
              {note.id}. {note.title}
            </h2>
            <p>{note.task}</p>
            <span
              onClick={() => removeHandler(note.id)}
              className={`material-icons ${classes.delete}`}
            >
              delete
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
