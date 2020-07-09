import React, {useEffect} from 'react';
import Context from "./context";
import TodoList from "./Todo/TodoList";
import Loader from "./Loader";
import Modal from "./Modal/Modal";


const AddTodo = React.lazy(() => new Promise(resolve =>{
    setTimeout(() =>{
        resolve(import('./AddTodo'))
        },3000)
    }) );


 function App() {
     const [todos, setTodos] = React.useState([])
     const[loading, setLoading] = React.useState(true)

     useEffect(()=> {
         fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
             .then(response => response.json())
             .then(todos => {
                 setTimeout(() =>{
                     setTodos(todos)
                     setLoading(false)
                 }, 2000)
             })
     },[])
     function toggleTodo(id){
         console.log('todo id', id)
         setTodos(todos.map(todo => {
             if (todo.id === id) {
                 todo.completed = !todo.completed
             }
             return todo
         }))

     }
     function removeTodo(id){
         setTodos(todos.filter(todo=>todo.id !== id) )
     }
     
     function addTodo(title) {
    setTodos(
    todos.concat([
        {
            title,
            id: Date.now(),
            completed: false,
        }

        ])
    )
     }
        return (
            <Context.Provider value={{ removeTodo: removeTodo }}>


                <div className={"wrapper"}>
                <h1 className ={"header"}> My todoes </h1>
                    <Modal/>
                    <React.Suspense fallback={<p> Loading....</p>}>
                    <AddTodo onCreate={addTodo}/>
                    {loading && <Loader/>}

                     { todos.length ? (<TodoList todos={todos} onToggle={toggleTodo}/>) :
                    loading ? null: (
                   <p className={"other"}> No todos! </p>
                    )}
                    </React.Suspense>
            </div>
            </Context.Provider>
        )
}
export default App;
