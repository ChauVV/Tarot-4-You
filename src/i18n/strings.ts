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

  // Drill-down (focus) step
  chooseFocus: { vi: 'Vấn đề của bạn là gì?', en: 'What is your question about?' },
  chooseAspect: { vi: 'Chọn khía cạnh', en: 'Choose an aspect' },
  suggestedQuestions: { vi: 'Câu hỏi gợi ý', en: 'Suggested questions' },
  pickOrWrite: {
    vi: 'Chọn một câu hỏi gợi ý, hoặc tự viết câu hỏi của riêng bạn.',
    en: 'Pick a suggested question, or write your own below.',
  },
  dailyFocusNote: {
    vi: 'Lá bài sẽ mang đến thông điệp tổng quan cho ngày hôm nay của bạn — không cần đặt câu hỏi.',
    en: 'The cards will bring an overall message for your day — no question needed.',
  },

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
  messageForYou: { vi: 'Thông điệp cho bạn', en: 'Message for you' },
  inDepth: { vi: 'Diễn giải sâu', en: 'In-depth reading' },
  saveToJournal: { vi: 'Lưu vào nhật ký', en: 'Save to journal' },
  saved: { vi: 'Đã lưu ✓', en: 'Saved ✓' },
  autoSaved: { vi: 'Đã tự động lưu vào nhật ký ✓', en: 'Automatically saved to journal ✓' },
  newReading: { vi: 'Xem quẻ mới', en: 'New reading' },
  tapToFlip: { vi: 'Chạm để lật', en: 'Tap to flip' },
  summary: { vi: 'Tổng kết', en: 'Summary' },
  mysticMessage: { vi: 'Thông điệp thần bí', en: 'Mystic Message' },
  combinedAdvice: { vi: 'Lời khuyên tổng hợp', en: 'Combined Advice' },
  interpreting: { vi: 'Đang luận giải…', en: 'Interpreting…' },
  aiLimitTitle: { vi: 'Đã hết lượt AI miễn phí hôm nay', en: 'Daily free AI limit reached' },
  aiLimitNote: {
    vi: 'Bạn đã chạm giới hạn lượt dùng AI miễn phí trong ngày, nên quẻ này chưa được luận giải bằng AI và sẽ không được lưu. Hãy quay lại vào ngày mai, hoặc đăng nhập bằng một tài khoản khác để dùng tiếp.',
    en: 'You have reached the daily free AI usage limit, so this reading was not interpreted by AI and will not be saved. Please come back tomorrow, or sign in with a different account to continue.',
  },

  // Follow-up
  askMoreTitle: { vi: 'Bạn còn điều muốn hỏi?', en: 'Anything else to ask?' },
  askMoreHint: {
    vi: 'Chọn câu hỏi bên dưới hoặc tự nhập — các lá vừa rút sẽ tiếp tục dẫn lối.',
    en: 'Pick a question below or type your own — the cards you drew will keep guiding you.',
  },
  askPlaceholder: { vi: 'Hoặc nhập câu hỏi của bạn…', en: 'Or type your question…' },
  ask: { vi: 'Hỏi', en: 'Ask' },
  asking: { vi: 'Đang hỏi…', en: 'Asking…' },

  // Connect AI screen
  connectAITitle: { vi: 'Kết nối AI', en: 'Connect AI' },
  connectAIDesc: {
    vi: 'Tarot 4 You dùng OpenRouter để giải bài bằng AI hoàn toàn miễn phí. Kết nối tài khoản OpenRouter của bạn để bắt đầu.',
    en: 'Tarot 4 You uses OpenRouter to deliver free AI readings. Connect your OpenRouter account to get started.',
  },
  connectAISkip: { vi: 'Không cần dùng AI', en: 'Continue without AI' },
  connectAIConnected: { vi: 'Đã kết nối OpenRouter ✓', en: 'OpenRouter connected ✓' },
  connectAIConnectedDesc: {
    vi: 'Bạn đã kết nối thành công. Sẵn sàng trải nghiệm giải bài bằng AI!',
    en: 'You are connected. Ready to enjoy AI-powered readings!',
  },
  connectAIContinue: { vi: 'Tiếp tục', en: 'Continue' },
  connectAIErrorTitle: { vi: 'Kết nối thất bại', en: 'Connection failed' },
  connectAIRetry: { vi: 'Thử lại', en: 'Try again' },

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
  confirmClearMsg: {
    vi: 'Toàn bộ lượt xem đã lưu sẽ bị xóa vĩnh viễn. Không thể hoàn tác.',
    en: 'All saved readings will be permanently deleted. This cannot be undone.',
  },
  cancel: { vi: 'Hủy', en: 'Cancel' },
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
