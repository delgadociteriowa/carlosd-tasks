import TaskManager from './TaskManager';
import LoginMessage from './LoginMessage';

const MainSection = () => (
  <main>
      <h1 className="text-indigo-800 text-3xl sm:text-4xl md:text-5xl text-center my-10">
        Sistema de Gestión de Tareas
      </h1>
      <TaskManager/>
      <LoginMessage/>      
  </main>
);

export default MainSection;