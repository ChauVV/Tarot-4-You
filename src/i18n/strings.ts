import type { Lang } from '../types'

/** UI strings (non-card). Keep keys flat and descriptive. */
export const UI = {
  appName: { vi: 'Tarot 4 You', en: 'Tarot 4 You' },
  tagline: { vi: 'Lắng nghe thông điệp từ những lá bài', en: 'Listen to the message of the cards' },

  start: { vi: 'Bắt đầu xem bài', en: 'Begin a Reading' },
  cardOfDay: { vi: 'Lá bài của ngày', en: 'Card of the Day' },
  journal: { vi: 'Nhật ký Tarot', en: 'Tarot Journal' },
  back: { vi: 'Quay lại', en: 'Back' },
  next: { vi: 'Tiếp tục', en: 'Continue' },
  home: { vi: 'Trang chủ', en: 'Home' },

  // Question screen
  chooseTopic: { vi: 'Chọn chủ đề', en: 'Choose a topic' },
  yourQuestion: { vi: 'Câu hỏi của bạn', en: 'Your question' },
  questionPlaceholder: {
    vi: 'Ví dụ: Tôi có nên thay đổi công việc vào tháng tới không?',
    en: 'E.g. Should I change jobs next month?',
  },
  optionalQuestion: { vi: '(Không bắt buộc) Bạn có thể đặt một câu hỏi cụ thể', en: '(Optional) You may ask a specific question' },
  chooseSpread: { vi: 'Chọn kiểu trải bài', en: 'Choose a spread' },
  cards: { vi: 'lá', en: 'cards' },

  // Shuffle
  shuffleTitle: { vi: 'Tĩnh tâm và tráo bài', en: 'Center yourself and shuffle' },
  shuffleHint: {
    vi: 'Hít thở sâu, tập trung vào câu hỏi rồi nhấn để tráo bài.',
    en: 'Breathe deeply, focus on your question, then shuffle.',
  },
  shuffleNow: { vi: 'Tráo bài', en: 'Shuffle' },
  shuffling: { vi: 'Đang tráo bài…', en: 'Shuffling…' },
  shuffleDone: { vi: 'Bài đã sẵn sàng', en: 'The deck is ready' },

  // Draw
  drawTitle: { vi: 'Rút bài', en: 'Draw your cards' },
  drawHint: {
    vi: 'Chạm vào các lá để chọn theo trực giác',
    en: 'Tap the cards to choose by intuition',
  },
  selected: { vi: 'Đã chọn', en: 'Selected' },
  reveal: { vi: 'Lật bài & giải', en: 'Reveal & interpret' },

  // Reading
  readingTitle: { vi: 'Lời giải của bạn', en: 'Your Reading' },
  upright: { vi: 'Xuôi', en: 'Upright' },
  reversed: { vi: 'Ngược', en: 'Reversed' },
  keywords: { vi: 'Từ khóa', en: 'Keywords' },
  overview: { vi: 'Tổng quan', en: 'Overview' },
  inDepth: { vi: 'Diễn giải sâu', en: 'In-depth reading' },
  saveToJournal: { vi: 'Lưu vào nhật ký', en: 'Save to journal' },
  saved: { vi: 'Đã lưu ✓', en: 'Saved ✓' },
  newReading: { vi: 'Xem quẻ mới', en: 'New reading' },
  tapToFlip: { vi: 'Chạm để lật', en: 'Tap to flip' },
  summary: { vi: 'Tổng kết', en: 'Summary' },

  // AI reader (optional, via OpenRouter)
  aiTitle: { vi: 'Giải bằng AI', en: 'AI reading' },
  aiIntro: {
    vi: 'Muốn một lời giải cá nhân hóa, mạch lạc hơn theo đúng câu hỏi của bạn? Kết nối tài khoản OpenRouter (miễn phí) để giải bằng AI.',
    en: 'Want a more personalized, flowing reading tailored to your question? Connect your OpenRouter account (free) for an AI interpretation.',
  },
  aiConnect: { vi: 'Kết nối AI', en: 'Connect AI' },
  aiConnecting: { vi: 'Đang kết nối…', en: 'Connecting…' },
  aiRun: { vi: '✨ Giải bằng AI', en: '✨ Interpret with AI' },
  aiThinking: { vi: 'Đang luận giải…', en: 'Interpreting…' },
  aiRegenerate: { vi: 'Giải lại', en: 'Regenerate' },
  aiDisconnect: { vi: 'Ngắt kết nối AI', en: 'Disconnect AI' },
  aiError: {
    vi: 'Có lỗi khi gọi AI. Có thể model miễn phí đang quá tải — hãy thử lại.',
    en: 'Something went wrong calling the AI. The free model may be busy — please try again.',
  },
  aiConnected: { vi: 'Đã kết nối OpenRouter', en: 'OpenRouter connected' },

  // Journal
  journalEmpty: {
    vi: 'Chưa có lượt xem nào được lưu. Hãy bắt đầu một quẻ bói!',
    en: 'No saved readings yet. Start a reading!',
  },
  delete: { vi: 'Xóa', en: 'Delete' },
  clearAll: { vi: 'Xóa tất cả', en: 'Clear all' },
  confirmClear: { vi: 'Xóa toàn bộ nhật ký?', en: 'Clear the entire journal?' },
  viewDetails: { vi: 'Xem chi tiết', en: 'View details' },
  hideDetails: { vi: 'Thu gọn', en: 'Hide details' },

  // Card of the day
  cotdTitle: { vi: 'Lá bài của ngày', en: 'Card of the Day' },
  cotdReturn: {
    vi: 'Bạn đã rút lá bài hôm nay. Hãy quay lại vào ngày mai nhé.',
    en: 'You have drawn today’s card. Come back tomorrow.',
  },

  // Misc
  position: { vi: 'Vị trí', en: 'Position' },
  imageCredit: {
    vi: 'Hình ảnh: bộ bài Rider–Waite–Smith (1909), phạm vi công cộng — Wikimedia Commons.',
    en: 'Imagery: Rider–Waite–Smith deck (1909), public domain — Wikimedia Commons.',
  },
} as const

export type UIKey = keyof typeof UI

export function tr(key: UIKey, lang: Lang): string {
  return UI[key][lang]
}
