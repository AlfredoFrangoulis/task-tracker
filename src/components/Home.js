function Home({ showAddTask, addTask, Tasks, tasks, toggleReminder, deleteTask, AddTask }){
    return(
        <div className="home">
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            ) : (
            "No Tasks To Show"
            )}
        </div>
    )
}

export default Home;