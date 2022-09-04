const { createStore, applyMiddleware } = require("redux");
const { delayActionMiddleware } = require("./middlewares");
const { fetchTodosMiddleware } = require("./mmiddlewers");

// initial State
const initialState = {
  todos: [],
};

// reducer
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            title: action.payload,
          },
        ],
      };

    case "todo/todoLoaded":
      return {
        ...state,
        todos: [...state.todos, ...action.payload],
      };

    default:
      break;
  }
};

// store
const store = createStore(
  todoReducer,
  applyMiddleware(delayActionMiddleware, fetchTodosMiddleware)
);

// subscrib to store
store.subscribe(() => {
  console.log(store.getState());
});

// dispathc action
// store.dispatch({
//   type: "todos/todoAdded",
//   payload: "Lear Redux.js with LWS",
// });

store.dispatch({
  type: "todo/fetchTodos",
});
