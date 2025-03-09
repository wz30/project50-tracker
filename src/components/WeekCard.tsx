import React from 'react';
import { Week } from '../types/cs50';

interface WeekCardProps {
  week: Week;
  onToggleComplete: (weekId: number) => void;
}

const WeekCard: React.FC<WeekCardProps> = ({ week, onToggleComplete }) => {
  const completedTasks = week.tasks.filter(task => task.completed).length;
  const totalTasks = week.tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">{week.title}</h3>
        <input
          type="checkbox"
          checked={week.completed}
          onChange={() => onToggleComplete(week.id)}
          className="w-5 h-5 accent-blue-600"
        />
      </div>
      <p className="text-gray-600 mb-4">{week.description}</p>
      <div className="space-y-2">
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{completedTasks} of {totalTasks} tasks completed</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="mt-4">
        {week.tasks.map(task => (
          <div key={task.id} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
            <span className={`w-2 h-2 rounded-full ${task.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span>{task.title}</span>
            <span className="ml-auto text-xs bg-gray-100 px-2 py-1 rounded">{task.type}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCard; 