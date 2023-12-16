// React
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Components
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import Home from './components/Home'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST', 
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(task)  
    })

    const data = await res.json()
    setTasks([ ...tasks, data ])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([ ...tasks, newTask ])
  }

  // Delete task
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, { 
      method: 'DELETE'
    })

    res.status === 200 ?
      setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error deleting this task')
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data  = await res.json()

    setTasks(
      tasks.map((task) => 
        task.id === id ? {...task, reminder:
        data.reminder} : task
      )
    )
  }

  return (
    <Router>
      <div className='container'>
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path='/'
            exact
            element={
              <Home
                showAddTask={showAddTask}
                addTask={addTask}
                tasks={tasks}
                Tasks={Tasks}
                toggleReminder={toggleReminder}
                deleteTask={deleteTask}
                AddTask={AddTask}
              />
            }
          />
          <Route
            path='/about' 
            element={<About/>}   
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
