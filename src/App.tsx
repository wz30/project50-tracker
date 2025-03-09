import { useState, useEffect, useMemo } from 'react'
import './App.css'
import { ChallengeProgress, RULES } from './types/cs50'
import ChallengeTable from './components/ChallengeTable'

function App() {
  const [progress, setProgress] = useState<ChallengeProgress>(() => {
    const saved = localStorage.getItem('challengeProgress')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      currentDay: 1,
      totalDays: 50,
      rules: RULES,
      dailyProgress: {}
    }
  })

  useEffect(() => {
    localStorage.setItem('challengeProgress', JSON.stringify(progress))
  }, [progress])

  const getDates = () => {
    const dates: string[] = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < progress.totalDays; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const tableData = useMemo(() => {
    return getDates().map((date, index) => {
      const dayProgress = progress.dailyProgress[date] || {
        date,
        completedRules: [],
        notes: { positive: '', negative: '', improvements: '' }
      }
      
      return {
        dayNumber: index + 1,
        date,
        completedRules: dayProgress.completedRules,
        progress: (dayProgress.completedRules.length / RULES.length) * 100,
        notes: [
          dayProgress.notes.positive,
          dayProgress.notes.negative,
          dayProgress.notes.improvements
        ].filter(Boolean).join('\n')
      }
    })
  }, [progress.dailyProgress])

  const handleToggleRule = (dayNumber: number, ruleId: number) => {
    const date = getDates()[dayNumber - 1]
    const dayProgress = progress.dailyProgress[date] || {
      date,
      completedRules: [],
      notes: { positive: '', negative: '', improvements: '' }
    }

    const completedRules = dayProgress.completedRules.includes(ruleId)
      ? dayProgress.completedRules.filter(id => id !== ruleId)
      : [...dayProgress.completedRules, ruleId]

    setProgress(prev => ({
      ...prev,
      dailyProgress: {
        ...prev.dailyProgress,
        [date]: {
          ...dayProgress,
          completedRules
        }
      }
    }))
  }

  const handleUpdateNotes = (dayNumber: number, notes: string) => {
    const date = getDates()[dayNumber - 1]
    const [positive = '', negative = '', improvements = ''] = notes.split('\n')

    setProgress(prev => ({
      ...prev,
      dailyProgress: {
        ...prev.dailyProgress,
        [date]: {
          ...(prev.dailyProgress[date] || {
            date,
            completedRules: [],
          }),
          notes: { positive, negative, improvements }
        }
      }
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-full max-w-[95%] md:max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex space-x-2 sm:space-x-4">
            <button className="px-3 sm:px-4 py-2 bg-white rounded-md shadow-sm font-medium text-gray-700 border-b-2 border-blue-500 text-sm sm:text-base">
              50 Days
            </button>
            <button className="px-3 sm:px-4 py-2 bg-white rounded-md shadow-sm font-medium text-gray-500 hover:text-gray-700 text-sm sm:text-base">
              Calendar
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Project 50 Daily Tracker</h1>
          </div>

          <ChallengeTable
            data={tableData}
            rules={RULES}
            onToggleRule={handleToggleRule}
            onUpdateNotes={handleUpdateNotes}
          />
        </div>
      </div>
    </div>
  )
}

export default App
