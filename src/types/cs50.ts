export interface Rule {
  id: number;
  title: string;
  description: string;
}

export interface DayProgress {
  date: string;
  completedRules: number[];
  notes: {
    positive: string;
    negative: string;
    improvements: string;
  };
}

export interface ChallengeProgress {
  currentDay: number;
  totalDays: number;
  rules: Rule[];
  dailyProgress: Record<string, DayProgress>;
}

export const RULES: Rule[] = [
  {
    id: 1,
    title: "Wake up before 8 a.m.",
    description: "Sleep at least 6 hours and maintain a consistent bed routine. If you need to get up early, try to go to bed early, too."
  },
  {
    id: 2,
    title: "Create a morning routine",
    description: "Follow a proper morning routine. No email or social media for at least 30 minutes after waking up. Instead, make your bed, follow skincare routine, meditate, walk or read."
  },
  {
    id: 3,
    title: "Exercise",
    description: "Exercise based on your fitness level. Start small - even with 15 minute yoga, stretching, walk outside or go to the gym as part of your morning routine."
  },
  {
    id: 4,
    title: "Read 10 pages a day",
    description: "Read at least 10 pages from a book every day to enhance vocabulary, knowledge, imagination and creativity while reducing stress."
  },
  {
    id: 5,
    title: "Dedicate 1 hour towards new skill",
    description: "Pick a skill you want to develop (piano, coding, language, etc.) and dedicate one hour a day with no distractions."
  },
  {
    id: 6,
    title: "Eat healthy",
    description: "Eliminate alcohol and soft drinks, eat more veggies and proteins. Cook healthy meals at home. Remember to drink enough water."
  },
  {
    id: 7,
    title: "Track your progress",
    description: "Write down positive and negative experiences of each day, and what you can improve. Use a journal, Notes app, or computer."
  }
]; 