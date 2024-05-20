import { v1 } from "uuid";
import {setTodolistsAC, todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";

test('todolists should be set to the state', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ]
    const action = setTodolistsAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
})

test('empty array should be added when we set todolists', () => {
    const action = setTodolistsAC([
        { id: "1", title: "title1", addedDate: '', order: 0},
        { id: "2", title: "title2", addedDate: '', order: 0}
    ])

    const endState = tasksReducer({}, action);

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2);
    expect(endState['1']).toBeDefined();
    expect(endState['2']).toStrictEqual([]);
})