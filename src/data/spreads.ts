import type { Spread, Topic, Bi } from '../types'

export const SPREADS: Spread[] = [
  {
    id: 'daily',
    name: { vi: 'Thông điệp ngày mới', en: 'Daily Message' },
    description: {
      vi: 'Một lá bài cho năng lượng và lời khuyên của ngày hôm nay.',
      en: 'A single card for today’s energy and guidance.',
    },
    count: 1,
    layout: 'single',
    positions: [
      {
        title: { vi: 'Thông điệp', en: 'Message' },
        hint: { vi: 'Năng lượng tổng quan của ngày hôm nay', en: 'The overall energy of your day' },
      },
    ],
  },
  {
    id: 'ppf',
    name: { vi: 'Quá khứ – Hiện tại – Tương lai', en: 'Past · Present · Future' },
    description: {
      vi: 'Ba lá bài soi rọi dòng chảy của một vấn đề theo thời gian.',
      en: 'Three cards revealing how a situation flows through time.',
    },
    count: 3,
    layout: 'row3',
    positions: [
      {
        title: { vi: 'Quá khứ', en: 'Past' },
        hint: { vi: 'Nguyên nhân, nền tảng đã qua', en: 'The cause and what led here' },
      },
      {
        title: { vi: 'Hiện tại', en: 'Present' },
        hint: { vi: 'Trạng thái cốt lõi lúc này', en: 'The core of the situation now' },
      },
      {
        title: { vi: 'Tương lai', en: 'Future' },
        hint: { vi: 'Xu hướng và kết quả sắp tới', en: 'The likely outcome ahead' },
      },
    ],
  },
  {
    id: 'choice',
    name: { vi: 'Lựa chọn A hay B', en: 'Choice: A or B' },
    description: {
      vi: 'Năm lá bài giúp cân nhắc giữa hai hướng đi.',
      en: 'Five cards to weigh two possible paths.',
    },
    count: 5,
    layout: 'choice5',
    positions: [
      {
        title: { vi: 'Tổng quan', en: 'Overview' },
        hint: { vi: 'Bối cảnh chung của tình huống', en: 'The overall situation' },
      },
      {
        title: { vi: 'Hướng A – Thuận lợi', en: 'Path A – Pros' },
        hint: { vi: 'Điều tốt nếu chọn hướng A', en: 'What favors choosing A' },
      },
      {
        title: { vi: 'Hướng A – Khó khăn', en: 'Path A – Cons' },
        hint: { vi: 'Trở ngại nếu chọn hướng A', en: 'What challenges choosing A' },
      },
      {
        title: { vi: 'Hướng B – Thuận lợi', en: 'Path B – Pros' },
        hint: { vi: 'Điều tốt nếu chọn hướng B', en: 'What favors choosing B' },
      },
      {
        title: { vi: 'Hướng B – Khó khăn', en: 'Path B – Cons' },
        hint: { vi: 'Trở ngại nếu chọn hướng B', en: 'What challenges choosing B' },
      },
    ],
  },
]

export function getSpread(id: string): Spread | undefined {
  return SPREADS.find((s) => s.id === id)
}

export const TOPICS: { id: Topic; label: Bi; icon: string }[] = [
  { id: 'daily', label: { vi: 'Tổng quan ngày mới', en: 'Daily Overview' }, icon: '☀' },
  { id: 'love', label: { vi: 'Tình yêu', en: 'Love' }, icon: '♥' },
  { id: 'career', label: { vi: 'Sự nghiệp', en: 'Career' }, icon: '✦' },
  { id: 'finance', label: { vi: 'Tài chính', en: 'Finance' }, icon: '◈' },
  { id: 'health', label: { vi: 'Sức khỏe', en: 'Health' }, icon: '❀' },
  { id: 'custom', label: { vi: 'Câu hỏi tự do', en: 'Free Question' }, icon: '✎' },
]
