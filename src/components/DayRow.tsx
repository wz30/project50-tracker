import React, { useState } from 'react';
import { DayProgress, Rule } from '../types/cs50';

interface DayRowProps {
  dayNumber: number;
  date: string;
  rules: Rule[];
  dayProgress: DayProgress | undefined;
  onUpdateProgress: (date: string, progress: DayProgress) => void;
}

const DayRow: React.FC<DayRowProps> = ({ dayNumber, date, rules, dayProgress, onUpdateProgress }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [notes, setNotes] = useState(dayProgress?.notes || { positive: '', negative: '', improvements: '' });

  const handleToggleRule = (ruleId: number) => {
    const completedRules = dayProgress?.completedRules || [];
    const newCompletedRules = completedRules.includes(ruleId)
      ? completedRules.filter(id => id !== ruleId)
      : [...completedRules, ruleId];

    onUpdateProgress(date, {
      date,
      completedRules: newCompletedRules,
      notes
    });
  };

  const handleNotesChange = (field: keyof DayProgress['notes'], value: string) => {
    const newNotes = { ...notes, [field]: value };
    setNotes(newNotes);
    onUpdateProgress(date, {
      date,
      completedRules: dayProgress?.completedRules || [],
      notes: newNotes
    });
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric'
  });

  const progress = dayProgress
    ? (dayProgress.completedRules.length / rules.length) * 100
    : 0;

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="py-3 px-4 text-left">
          <span className="font-medium">Day {String(dayNumber).padStart(2, '0')}</span>
        </td>
        <td className="py-3 px-4">{formattedDate}</td>
        {rules.map(rule => (
          <td key={rule.id} className="py-3 px-4 text-center">
            <div className="checkbox-container">
              <input
                type="checkbox"
                checked={dayProgress?.completedRules.includes(rule.id) || false}
                onChange={() => handleToggleRule(rule.id)}
                className="cursor-pointer"
              />
            </div>
          </td>
        ))}
        <td className="py-3 px-4 text-center">{Math.round(progress)}%</td>
        <td className="py-3 px-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800"
          >
            {isExpanded ? 'Hide notes' : 'Add notes'}
          </button>
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={11} className="py-3 px-4">
            <textarea
              value={[notes.positive, notes.negative, notes.improvements].filter(Boolean).join('\n')}
              onChange={e => {
                const [positive = '', negative = '', improvements = ''] = e.target.value.split('\n');
                handleNotesChange('positive', positive);
                handleNotesChange('negative', negative);
                handleNotesChange('improvements', improvements);
              }}
              placeholder="Write your notes here..."
              className="w-full p-2 border rounded-md text-sm"
              rows={3}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default DayRow; 