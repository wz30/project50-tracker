import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from '@tanstack/react-table';
import { Rule, DayProgress } from '../types/cs50';

interface ChallengeTableProps {
  data: {
    dayNumber: number;
    date: string;
    completedRules: number[];
    progress: number;
    notes: string;
  }[];
  rules: Rule[];
  onToggleRule: (dayNumber: number, ruleId: number) => void;
  onUpdateNotes: (dayNumber: number, notes: string) => void;
}

const ChallengeTable: React.FC<ChallengeTableProps> = ({
  data,
  rules,
  onToggleRule,
  onUpdateNotes,
}) => {
  const columnHelper = createColumnHelper<(typeof data)[0]>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('dayNumber', {
        header: '#',
        cell: info => (
          <span className="font-medium whitespace-nowrap">
            Day {String(info.getValue()).padStart(2, '0')}
          </span>
        ),
        size: 80,
      }),
      columnHelper.accessor('date', {
        header: 'Date',
        cell: info => (
          <span className="whitespace-nowrap">
            {new Date(info.getValue()).toLocaleDateString()}
          </span>
        ),
        size: 100,
      }),
      ...rules.map(rule =>
        columnHelper.accessor(
          row => row.completedRules.includes(rule.id),
          {
            id: `rule_${rule.id}`,
            header: () => (
              <div className="flex justify-center" title={rule.title}>
                <span
                  className={`inline-block w-8 h-8 sm:w-6 sm:h-6 rounded-full flex items-center justify-center ${
                    {
                      1: 'bg-purple-100',
                      2: 'bg-blue-100',
                      3: 'bg-green-100',
                      4: 'bg-yellow-100',
                      5: 'bg-red-100',
                      6: 'bg-pink-100',
                      7: 'bg-indigo-100',
                    }[rule.id]
                  }`}
                >
                  {
                    {
                      1: '⏰',
                      2: '🌅',
                      3: '💪',
                      4: '📚',
                      5: '🎯',
                      6: '🥗',
                      7: '✍️',
                    }[rule.id]
                  }
                </span>
              </div>
            ),
            cell: info => (
              <div className="flex justify-center">
                <input
                  type="checkbox"
                  checked={info.getValue()}
                  onChange={() =>
                    onToggleRule(info.row.original.dayNumber, rule.id)
                  }
                  className="checkbox-container cursor-pointer w-6 h-6 sm:w-5 sm:h-5"
                />
              </div>
            ),
            size: 60,
          }
        )
      ),
      columnHelper.accessor('progress', {
        header: () => (
          <span className="whitespace-nowrap">
            Completed
          </span>
        ),
        cell: info => (
          <span className="whitespace-nowrap">
            {Math.round(info.getValue())}%
          </span>
        ),
        size: 100,
      }),
      columnHelper.accessor('notes', {
        header: 'Notes to yourself',
        cell: info => (
          <textarea
            value={info.getValue() || ''}
            onChange={e =>
              onUpdateNotes(info.row.original.dayNumber, e.target.value)
            }
            placeholder="Write your notes here..."
            className="w-full p-2 border rounded-md text-sm min-h-[40px] resize-y"
          />
        ),
        size: 300,
      }),
    ],
    [rules, onToggleRule, onUpdateNotes]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative">
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200 table-fixed">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-white border-b border-gray-200">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="py-3 px-4 text-left font-medium text-gray-600 sticky top-0 bg-white z-10"
                      style={{
                        width: header.getSize(),
                        minWidth: header.getSize(),
                        maxWidth: header.id === 'notes' ? 'none' : header.getSize(),
                        textAlign:
                          header.id.startsWith('rule_') || header.id === 'progress'
                            ? 'center'
                            : 'left',
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className="py-3 px-4"
                      style={{
                        width: cell.column.getSize(),
                        minWidth: cell.column.getSize(),
                        maxWidth: cell.column.id === 'notes' ? 'none' : cell.column.getSize(),
                        textAlign:
                          cell.column.id.startsWith('rule_') ||
                          cell.column.id === 'progress'
                            ? 'center'
                            : 'left',
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChallengeTable; 