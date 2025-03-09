import React from 'react';

const TableHeader: React.FC = () => {
  return (
    <thead>
      <tr className="bg-white border-b border-gray-200">
        <th className="py-3 px-4 text-left font-medium text-gray-600 w-20">#</th>
        <th className="py-3 px-4 text-left font-medium text-gray-600 w-32">Date</th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-20">
          <span className="inline-block w-6 h-6 bg-purple-100 rounded-full" title="Wake up before 8 a.m.">⏰</span>
        </th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-20">
          <span className="inline-block w-6 h-6 bg-blue-100 rounded-full" title="Create a morning routine">🌅</span>
        </th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-20">
          <span className="inline-block w-6 h-6 bg-green-100 rounded-full" title="Exercise">💪</span>
        </th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-20">
          <span className="inline-block w-6 h-6 bg-yellow-100 rounded-full" title="Read 10 pages a day">📚</span>
        </th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-20">
          <span className="inline-block w-6 h-6 bg-red-100 rounded-full" title="Dedicate 1 hour towards new skill">🎯</span>
        </th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-20">
          <span className="inline-block w-6 h-6 bg-pink-100 rounded-full" title="Eat healthy">🥗</span>
        </th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-20">
          <span className="inline-block w-6 h-6 bg-indigo-100 rounded-full" title="Track your progress">✍️</span>
        </th>
        <th className="py-3 px-4 text-center font-medium text-gray-600 w-24">completed</th>
        <th className="py-3 px-4 text-left font-medium text-gray-600">Notes to yourself</th>
      </tr>
    </thead>
  );
};

export default TableHeader; 