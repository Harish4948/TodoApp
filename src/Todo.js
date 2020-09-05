import React,{useState,useEffect} from 'react'
import './Todo.css'
import { List } from '@material-ui/core'
import {Modal,Button,ListItemAvatar,ListItem,ListItemText,InputLabel,Input} from '@material-ui/core';
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';

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
            <h1></h1>
            <InputLabel >Edit a Todo</InputLabel>
            <Input value={input} onChange={e=> setInput(e.target.value)}></Input>
            <Button onClick={updateTodo}>Edit<EditIcon/></Button>
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
            
            <Button onClick={e=> setOpen(true)}> <EditIcon  /></Button>
            <Button onClick={e => db.collection('todos').doc(props.todo.id).delete()}> <DeleteForeverIcon /></Button>
        </List>
      </>
    )
}

export default Todo
