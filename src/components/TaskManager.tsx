import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const TaskManager = () => {
  return (
    <div className="w-[90%] md:w-[50%] p-6 rounded-2xl mb-10 mx-auto">
      <TaskForm />
      <ul>
        <TaskItem />
        <TaskItem />
        <TaskItem />
        <TaskItem />
      </ul>
    </div>
  )
}

export default TaskManager;