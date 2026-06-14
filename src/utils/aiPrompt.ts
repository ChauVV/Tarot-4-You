import type { DrawnCard, Lang, Spread, Topic } from '../types'
import type { ChatMessage } from './openrouter'
import { TOPICS } from '../data/spreads'

function topicLabel(topic: Topic, lang: Lang): string {
  return TOPICS.find((t) => t.id === topic)?.label[lang] ?? topic
}

/** A short list of the drawn cards with their position labels. */
function cardLines(lang: Lang, spread: Spread, drawn: DrawnCard[]): string {
  return drawn
    .map((d, i) => {
      const pos = spread.positions[i]
      const ori = lang === 'vi' ? (d.reversed ? 'ngược' : 'xuôi') : d.reversed ? 'reversed' : 'upright'
      const posLabel = pos ? pos.title[lang] : `#${i + 1}`
      return `${i + 1}. [${posLabel}] ${d.card.name[lang]} (${ori})`
    })
    .join('\n')
}

export interface CardInterp {
  overview: string
  message: string
}
export interface ParsedReading {
  cards: CardInterp[]
  mystic: string
  advice: string
}

/**
 * Build ONE chat request that interprets every card plus a two-part summary,
 * using tagged sections we can parse reliably (more robust than JSON on the
 * free models). Each card gets an "overview" and a "message for you"; the
 * summary gets a "mystic message" and "combined advice".
 */
export function buildReadingMessages(
  lang: Lang,
  topic: Topic,
  question: string,
  spread: Spread,
  drawn: DrawnCard[],
  focus?: string,
): ChatMessage[] {
  const system =
    lang === 'vi'
      ? `Bạn là một người đọc bài Tarot ấm áp, sâu sắc, giàu trải nghiệm và rất thực tế. Trả lời hoàn toàn bằng tiếng Việt, văn xuôi thuần — KHÔNG markdown, KHÔNG dấu ** in đậm, KHÔNG gạch đầu dòng. Bám sát câu hỏi và vị trí từng lá. Mỗi phần viết một đoạn ĐẦY ĐỦ và CHI TIẾT, khoảng 4–6 câu, có chiều sâu cảm xúc, liên hệ với hoàn cảnh người hỏi và đưa ra góc nhìn cụ thể (tránh chung chung, tránh sáo rỗng). Nhấn mạnh Tarot là công cụ phản chiếu, không phải lời phán quyết. RẤT QUAN TRỌNG: trả về CHÍNH XÁC theo các thẻ [[...]] được yêu cầu, không thêm bất kỳ chữ nào ngoài các thẻ đó.`
      : `You are a warm, insightful, experienced, and very practical Tarot reader. Respond entirely in English, plain prose — NO markdown, NO ** bold, NO bullet points. Stay close to the question and each card's position. Write a FULL, DETAILED paragraph of about 4–6 sentences per part, with emotional depth, tied to the querent's situation and offering concrete perspective (avoid vague platitudes). Emphasize that Tarot is a tool for reflection, not a verdict. VERY IMPORTANT: return EXACTLY the requested [[...]] tags and nothing outside them.`

  const cards = cardLines(lang, spread, drawn)

  // The exact template the model must fill in.
  const template = drawn
    .map((_, i) => `[[C${i + 1}.O]]\n[[C${i + 1}.M]]`)
    .join('\n')

  const q = question.trim()
  const f = focus?.trim()

  const user =
    lang === 'vi'
      ? `Chủ đề: ${topicLabel(topic, 'vi')}${f ? ` — ${f}` : ''}\n${q ? `Câu hỏi: "${q}"` : 'Không có câu hỏi cụ thể (xem tổng quan).'}\nKiểu trải bài: ${spread.name.vi}\n\nCác lá đã rút:\n${cards}\n\nHãy điền vào ĐÚNG các thẻ sau (giữ nguyên thẻ trên dòng riêng, viết nội dung ngay dưới mỗi thẻ). Mỗi phần là một đoạn đầy đủ 4–6 câu, sâu sắc và cụ thể:\nVới mỗi lá: [[Cx.O]] = phân tích ý nghĩa lá đó tại vị trí của nó, liên hệ chiều xuôi/ngược và bối cảnh câu hỏi; [[Cx.M]] = thông điệp và lời khuyên thực tế lá đó dành riêng cho người hỏi.\n[[S.MYSTIC]] = thông điệp tổng hợp, kết nối tất cả các lá thành một câu chuyện mạch lạc, giàu hình ảnh.\n[[S.ADVICE]] = lời khuyên tổng hợp, thực tế, cụ thể, hành động được.\n\n${template}\n[[S.MYSTIC]]\n[[S.ADVICE]]`
      : `Topic: ${topicLabel(topic, 'en')}${f ? ` — ${f}` : ''}\n${q ? `Question: "${q}"` : 'No specific question (general reading).'}\nSpread: ${spread.name.en}\n\nCards drawn:\n${cards}\n\nFill in EXACTLY these tags (keep each tag on its own line, write the content right under each tag). Each part is a full 4–6 sentence paragraph, insightful and specific:\nFor each card: [[Cx.O]] = analyze the card's meaning in its position, factoring orientation and the question's context; [[Cx.M]] = a practical message and advice that card holds for the querent.\n[[S.MYSTIC]] = a synthesized message weaving ALL the cards into one coherent, vivid story.\n[[S.ADVICE]] = combined, practical, concrete, actionable advice.\n\n${template}\n[[S.MYSTIC]]\n[[S.ADVICE]]`

  return [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ]
}

/** Parse the tagged reading output into structured sections. Null if unusable. */
export function parseStructuredReading(text: string, count: number): ParsedReading | null {
  const re = /\[\[\s*([^\]]+?)\s*\]\]/g
  const matches = [...text.matchAll(re)]
  if (!matches.length) return null

  const parts: Record<string, string> = {}
  for (let i = 0; i < matches.length; i++) {
    const tag = matches[i][1].trim().toUpperCase().replace(/\s+/g, '')
    const start = (matches[i].index ?? 0) + matches[i][0].length
    const end = i + 1 < matches.length ? matches[i + 1].index ?? text.length : text.length
    parts[tag] = text.slice(start, end).trim()
  }

  const cards: CardInterp[] = []
  for (let i = 1; i <= count; i++) {
    cards.push({ overview: parts[`C${i}.O`] ?? '', message: parts[`C${i}.M`] ?? '' })
  }
  const mystic = parts['S.MYSTIC'] ?? ''
  const advice = parts['S.ADVICE'] ?? ''

  const anyContent = mystic || advice || cards.some((c) => c.overview || c.message)
  return anyContent ? { cards, mystic, advice } : null
}

/** Build a follow-up question request, grounded in the cards already drawn. */
export function buildFollowupMessages(
  lang: Lang,
  topic: Topic,
  question: string,
  spread: Spread,
  drawn: DrawnCard[],
  followupQuestion: string,
  focus?: string,
): ChatMessage[] {
  const system =
    lang === 'vi'
      ? `Bạn là một người đọc bài Tarot ấm áp, sâu sắc và thực tế. Trả lời hoàn toàn bằng tiếng Việt, văn xuôi thuần — KHÔNG markdown, KHÔNG dấu ** in đậm, KHÔNG gạch đầu dòng. Dựa trên các lá bài ĐÃ rút, trả lời thẳng vào câu hỏi tiếp theo một cách chi tiết, sâu sắc trong 2–3 đoạn đầy đủ, có liên hệ cụ thể tới các lá đã rút. Nhấn mạnh Tarot là công cụ phản chiếu, không phải lời phán quyết.`
      : `You are a warm, insightful, practical Tarot reader. Respond entirely in English, plain prose — NO markdown, NO ** bold, NO bullet points. Based on the cards ALREADY drawn, answer the follow-up question directly and in depth across 2–3 full paragraphs, tied concretely to the cards drawn. Emphasize that Tarot is a tool for reflection, not a verdict.`

  const cards = cardLines(lang, spread, drawn)
  const q = question.trim()
  const f = focus?.trim()

  const user =
    lang === 'vi'
      ? `Chủ đề: ${topicLabel(topic, 'vi')}${f ? ` — ${f}` : ''}\n${q ? `Câu hỏi ban đầu: "${q}"` : ''}\nKiểu trải bài: ${spread.name.vi}\n\nCác lá đã rút:\n${cards}\n\nCâu hỏi tiếp theo của tôi: "${followupQuestion.trim()}"\n\nHãy trả lời dựa trên chính các lá bài này.`
      : `Topic: ${topicLabel(topic, 'en')}${f ? ` — ${f}` : ''}\n${q ? `Original question: "${q}"` : ''}\nSpread: ${spread.name.en}\n\nCards drawn:\n${cards}\n\nMy follow-up question: "${followupQuestion.trim()}"\n\nPlease answer based on these same cards.`

  return [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ]
}

/** Build the chat messages for an AI "Card of the Day" interpretation. */
export function buildCotdMessages(
  lang: Lang,
  drawn: { card: { name: { vi: string; en: string }; id: string }; reversed: boolean },
): ChatMessage[] {
  const ori = lang === 'vi' ? (drawn.reversed ? 'ngược' : 'xuôi') : drawn.reversed ? 'reversed' : 'upright'

  const system =
    lang === 'vi'
      ? `Bạn là một người đọc bài Tarot ấm áp, sâu sắc, thực tế và SÚC TÍCH. Trả lời hoàn toàn bằng tiếng Việt, văn xuôi thuần — KHÔNG dùng markdown, KHÔNG dấu ** in đậm, KHÔNG tiêu đề hay gạch đầu dòng. Viết gọn trong 2 đoạn ngắn. Nhấn mạnh Tarot là công cụ phản chiếu, không phải lời phán quyết.`
      : `You are a warm, insightful, practical, and CONCISE Tarot reader. Respond entirely in English in plain prose — NO markdown, NO ** bold, NO headings or bullet points. Keep it to about 2 short paragraphs. Emphasize that Tarot is a tool for reflection, not a verdict.`

  const user =
    lang === 'vi'
      ? `Hôm nay là ${new Date().toLocaleDateString('vi-VN', { dateStyle: 'full' })}.\nLá bài của ngày: ${drawn.card.name.vi} (${ori}).\n\nHãy luận giải lá bài này như một thông điệp cho ngày hôm nay, đưa lời khuyên thực tế.`
      : `Today is ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}.\nCard of the Day: ${drawn.card.name.en} (${ori}).\n\nPlease interpret this card as a message for today, with practical advice.`

  return [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ]
}
