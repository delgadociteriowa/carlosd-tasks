const TaskForm = () => {
  return (
    <form>
      <div className="flex flex-wrap md:flex-nowrap gap-3 mb-6">
        <input type="text" placeholder="Agregar tarea" className="w-full md:w-[70%] px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
        <select
          className="w-full md:w-[15%] px-3 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          defaultValue=""
          autoComplete="off"
        >
          <option value="" disabled>Estado</option>
          <option value="por-hacer">Por hacer</option>
          <option value="en-progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        <button type="submit" className="w-full md:w-[15%] bg-indigo-600 hover:bg-indigo-500 py-3 rounded-2xl text-stone-100 text-lg tracking-[2px] shadow-xl/10 transition-colors cursor-pointer">
          Agregar
        </button>
      </div>
    </form>
  )
};

export default TaskForm;