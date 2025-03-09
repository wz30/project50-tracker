import React from 'react';
import { Task } from '../types/cs50';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <div
          key={task.id}
          className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleTask(task.id)}
            className="mt-1 w-5 h-5 accent-blue-600"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900">{task.title}</h4>
              <span className={`
                px-2 py-1 text-xs rounded-full
                ${task.type === 'problem_set' ? 'bg-blue-100 text-blue-800' :
                  task.type === 'lab' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'}
              `}>
                {task.type}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList; 