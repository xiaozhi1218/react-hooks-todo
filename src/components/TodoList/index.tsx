import React, { FC, ReactElement, useCallback, useEffect, useReducer, useState } from 'react';

import TdInput from './Input';
import TdList from './List';
import { todoReducer } from './reducer';
import { ACTION_TYPE, IState, ITodo } from './typings';


// const initialState: IState = {
//     todoList: []
// }

// 惰性初始化state，通过一个函数创建state
function init(initTodoList: ITodo[]): IState {
    return {
        todoList: initTodoList
    }
}

const TodoList: FC = (): ReactElement => {

    // const [todoList, setTodoList] = useState<ITodo[]>([])

    // useReducer
    const [state, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        // console.log(state.todoList);
        const todoList = JSON.parse(localStorage.getItem('todolist') || '[]')

        dispatch({
            type: ACTION_TYPE.INIT_TODOLIST,
            payload: todoList
        })
    }, [])

    useEffect(() => {
        localStorage.setItem('todolist', JSON.stringify(state.todoList))
    }, [state.todoList])

    const addTodo = useCallback((todo: ITodo): void => {
        // setTodoList(todoList => [...todoList, todo])
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    }, [])

    const removeTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    }, [])

    const toggleTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    }, [])

    return (
      <div className="todo-list">
          <TdInput 
            addTodo={ addTodo }
            todolist={ state.todoList }
            />
          <TdList 
            todoList={ state.todoList } 
            removeTodo={ removeTodo }
            toggleTodo={ toggleTodo }
            />
      </div>
    )
}

export default TodoList;