import type { Bi, DrawnCard, SpreadPosition, Suit, Topic } from '../types'

/** What each suit fundamentally speaks to — used to ground the reading. */
const SUIT_CONTEXT: Record<Suit, Bi> = {
  major: {
    vi: 'một bài học lớn hoặc bước ngoặt quan trọng của cuộc đời',
    en: 'a major life lesson or a pivotal turning point',
  },
  cups: { vi: 'cảm xúc, tình cảm và các mối quan hệ', en: 'emotions, love, and relationships' },
  pentacles: { vi: 'tài chính, công việc và những điều thực tế', en: 'finances, work, and material matters' },
  swords: { vi: 'suy nghĩ, lý trí và cách bạn ra quyết định', en: 'thoughts, intellect, and how you decide' },
  wands: { vi: 'hành động, đam mê và năng lượng sáng tạo', en: 'action, passion, and creative drive' },
}

interface Lens {
  up: Bi
  rev: Bi
}

/** A topic-specific angle, varied by orientation. */
const TOPIC_LENS: Record<Topic, Lens> = {
  love: {
    up: {
      vi: 'Xét riêng chuyện tình cảm, năng lượng này nghiêng về sự gắn kết, cởi mở và chân thành — hãy để trái tim dẫn đường nhưng vẫn giữ sự tỉnh táo.',
      en: 'In matters of love, this leans toward connection, openness, and sincerity — let your heart lead while staying clear-eyed.',
    },
    rev: {
      vi: 'Xét riêng chuyện tình cảm, hãy lưu ý tới hiểu lầm, kỳ vọng lệch pha hoặc những điều chưa được nói rõ — một cuộc trò chuyện thẳng thắn sẽ giúp ích.',
      en: 'In matters of love, watch for misunderstandings, mismatched expectations, or things left unsaid — an honest conversation will help.',
    },
  },
  career: {
    up: {
      vi: 'Trong công việc và sự nghiệp, đây là dấu hiệu khích lệ bạn chủ động, kiên định và tin vào năng lực của mình.',
      en: 'For work and career, this encourages you to take initiative, stay steady, and trust your abilities.',
    },
    rev: {
      vi: 'Trong công việc, hãy xem lại cách tiếp cận, tránh nóng vội và củng cố nền tảng trước khi bứt phá.',
      en: 'For work, review your approach, avoid haste, and shore up the foundation before pushing ahead.',
    },
  },
  finance: {
    up: {
      vi: 'Về tài chính, lá bài cho thấy sự ổn định hoặc cơ hội nếu bạn quản lý nguồn lực một cách khôn ngoan.',
      en: 'On finances, the card points to stability or opportunity if you manage your resources wisely.',
    },
    rev: {
      vi: 'Về tài chính, hãy thận trọng với rủi ro, chi tiêu cảm tính và những cam kết chưa rõ ràng.',
      en: 'On finances, be cautious of risk, emotional spending, and commitments that are not yet clear.',
    },
  },
  health: {
    up: {
      vi: 'Về sức khỏe, lá bài khích lệ bạn lắng nghe cơ thể, giữ sự cân bằng và chăm sóc bản thân một cách dịu dàng.',
      en: 'For health, the card encourages you to listen to your body, keep balance, and care for yourself gently.',
    },
    rev: {
      vi: 'Về sức khỏe, hãy chú ý tới căng thẳng tích tụ, nghỉ ngơi chưa đủ hoặc thói quen cần điều chỉnh.',
      en: 'For health, watch for built-up stress, insufficient rest, or habits that need adjusting.',
    },
  },
  daily: {
    up: {
      vi: 'Cho ngày hôm nay, hãy mang theo năng lượng này như một lời nhắc tích cực trong từng lựa chọn nhỏ.',
      en: 'For today, carry this energy as a positive cue in each small choice you make.',
    },
    rev: {
      vi: 'Cho ngày hôm nay, hãy chậm lại một chút và để ý những tín hiệu mà bạn dễ bỏ qua.',
      en: 'For today, slow down a little and notice the signals you might otherwise miss.',
    },
  },
  custom: {
    up: {
      vi: 'Đặt trong câu hỏi của bạn, lá bài ủng hộ việc tiến tới với sự rõ ràng và niềm tin.',
      en: 'In the context of your question, the card supports moving forward with clarity and trust.',
    },
    rev: {
      vi: 'Đặt trong câu hỏi của bạn, lá bài khuyên bạn cân nhắc kỹ và tháo gỡ những vướng mắc nội tâm trước.',
      en: 'In the context of your question, the card advises careful thought and clearing inner blocks first.',
    },
  },
}

const CLOSING: Lens = {
  up: {
    vi: 'Đây là thời điểm thuận lợi để bạn tin tưởng và hành động theo hướng mà lá bài gợi mở.',
    en: 'This is a favorable moment to trust the message and act on what the card opens up.',
  },
  rev: {
    vi: 'Chiều ngược là lời nhắc hãy nhìn vào bên trong, tháo gỡ điều đang cản trở và điều chỉnh trước khi tiến xa hơn.',
    en: 'Reversed, it is a reminder to look inward, clear what blocks you, and adjust before going further.',
  },
}

/**
 * Build a richer, context-aware interpretation for one drawn card by weaving
 * together its position in the spread, the chosen topic, the suit, and the
 * card's own meaning. Offline — no AI required.
 */
export function deepInterpret(d: DrawnCard, position: SpreadPosition | undefined, topic: Topic): Bi {
  const { card, reversed } = d
  const m = reversed ? card.reversed : card.upright
  const lens = reversed ? TOPIC_LENS[topic].rev : TOPIC_LENS[topic].up
  const closing = reversed ? CLOSING.rev : CLOSING.up
  const suit = SUIT_CONTEXT[card.suit]
  const oriVi = reversed ? 'ngược' : 'xuôi'
  const oriEn = reversed ? 'reversed' : 'upright'

  const openVi = position
    ? `Ở vị trí "${position.title.vi}" — ${position.hint.vi.toLowerCase()} — lá ${card.name.vi} (chiều ${oriVi}) mang năng lượng của ${m.keywords.vi.toLowerCase()}.`
    : `Lá ${card.name.vi} (chiều ${oriVi}) mang năng lượng của ${m.keywords.vi.toLowerCase()}.`
  const openEn = position
    ? `In the "${position.title.en}" position — ${position.hint.en.toLowerCase()} — ${card.name.en} (${oriEn}) carries the energy of ${m.keywords.en.toLowerCase()}.`
    : `${card.name.en} (${oriEn}) carries the energy of ${m.keywords.en.toLowerCase()}.`

  return {
    vi: [openVi, m.text.vi, `Lá này thuộc về ${suit.vi}.`, lens.vi, closing.vi].join(' '),
    en: [openEn, m.text.en, `This card speaks to ${suit.en}.`, lens.en, closing.en].join(' '),
  }
}
