// src/app/page.js
"use client";
import { useState, useEffect } from "react";
import { db, auth } from "../../firebase";
import withAuth from "@/components/withAuth";

const Home = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      const unsubscribe = db
        .collection("tasks")
        .where("user", "==", user.uid)
        .onSnapshot((snapshot) => {
          const tasksData = [];
          snapshot.forEach((doc) =>
            tasksData.push({ ...doc.data(), id: doc.id })
          );
          setTasks(tasksData);
        });
      return () => unsubscribe();
    }
  }, [user]);

  const addTask = () => {
    if (newTask.trim() && dueDate.trim()) {
      db.collection("tasks")
        .add({
          user: user.uid,
          text: newTask,
          dueDate: new Date(dueDate),
          completed: false,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      setNewTask("");
      setDueDate("");
      setIsModalOpen(false);
    }
  };

  const toggleComplete = (task) => {
    db.collection("tasks").doc(task.id).update({ completed: !task.completed });
  };

  const deleteTask = (task) => {
    db.collection("tasks").doc(task.id).delete();
  };

  const handleLogout = () => {
    auth.signOut().catch((error) => {
      console.error("Error signing out: ", error);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">ToDo App</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <ul className="space-y-2 mb-4 flex flex-col items-center">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white shadow rounded p-4 flex justify-between items-center md:w-1/2 w-[80%]"
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between items-center w-full h-auto">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="form-checkbox h-6 w-6 rounded-full text-blue-600 mr-2"
                  />
                  <div
                    className={`flex-grow cursor-pointer ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                    onClick={() => toggleComplete(task)}
                  >
                    {task.text}
                  </div>
                </div>
                <div
                  onClick={() => deleteTask(task)}
                  className="ml-4 hover:text-red-700"
                >
                  <img src="./icons/delete.png" className="w-7 h-7" />
                </div>
              </div>

              <div className="text-sm text-gray-500">
                {new Date(task.dueDate?.seconds * 1000).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      >
        Add Task
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <h2 className="text-xl mb-4">Add New Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Task Description"
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
            />
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={addTask}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withAuth(Home);
