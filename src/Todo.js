import React,{useState,useEffect} from 'react'
import './Todo.css'
import { List } from '@material-ui/core'
import {Modal,Button,ListItemAvatar,ListItem,ListItemText} from '@material-ui/core';
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


function Todo(props) {
  const classes=useStyles();
  const [open,setOpen]=useState(false);
  const [input,setInput]=useState(props.todo.todo);
  const handleOpen = () =>{
    setOpen(true);
  };
  const updateTodo= () =>{
    db.collection('todos').doc(props.todo.id).set({todo:input},{merge:true});
    setOpen(false);
  }
    return (
      <>
      <Modal
        open={open}
        onClose={e=>setOpen(false)}> 
          <div className={classes.paper}>
            <h1>Modal</h1>
            <input value={input} onChange={e=> setInput(e.target.value)}></input>
            <Button onClick={updateTodo}>Edit</Button>
          </div>
      </Modal>
        <List className="todo_list">
          <ListItem>
            <ListItemAvatar>

            </ListItemAvatar>
            <ListItemText
                    primary={props.todo.todo}
                    secondary="User"
                  />
            </ListItem>
            <button onClick={e=> setOpen(true)}>Edit</button>
            <DeleteForeverIcon onClick={e => db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
      </>
    )
}

export default Todo
