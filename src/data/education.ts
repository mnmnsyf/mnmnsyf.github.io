import type { Education } from './types'

export const education: Education[] = [
  {
    school: 'University of Southern California',
    degree: 'M.S. Computer Science',
    period: '2026 – 2028 (expected)',
    location: 'Los Angeles, CA',
    focus: 'Graphics track',
    // TODO: fill in the Fall 2026 course list.
    coursework: [],
  },
  {
    school: 'Chengdu University of Information Technology',
    degree: 'B.Eng., School of Computer Science',
    period: '2020 – 2024',
    location: 'Chengdu, China',
    honors: ['National Scholarship (2023) — 1st in program', 'Special Scholarship (2021, 2022)'],
    coursework: [
      'Computer Graphics',
      'Data Structures',
      'Discrete Mathematics',
      'Probability Theory',
      'Databases',
      'Software Engineering',
      'Network Game Programming',
      'Unity Game Programming',
      'Unreal Engine Game Programming',
    ],
  },
]
