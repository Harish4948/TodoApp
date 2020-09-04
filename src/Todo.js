import React from 'react'
import './Todo.css'
import { List } from '@material-ui/core'
import {ListItemAvatar,ListItem,ListItemText} from '@material-ui/core';
import db from './firebase'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
function Todo(props) {
    return (
        <List className="todo_list">
          <ListItem>
            <ListItemAvatar>

            </ListItemAvatar>
            <ListItemText
                    primary={props.todo.todo}
                    secondary="User"
                  />
            </ListItem>
            <DeleteForeverIcon onClick={e => db.collection('todos').doc(props.todo.id).delete()}/>
        </List>
    )
}

export default Todo
