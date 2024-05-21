import { v1 } from "uuid";
import {setTodolistsAC, todolistsReducer} from "../state/todolists-reducer";
import {setTasksAC, tasksReducer} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

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

test('tasks should be added to todolist', () => {

    const startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    }
    const action = setTasksAC('todolistId1', startState["todolistId1"])

    const endState = tasksReducer({
        "todolistId1": [],
        "todolistId2": []
    }, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
})