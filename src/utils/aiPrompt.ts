import type { DrawnCard, Lang, Spread, Topic } from '../types'
import type { ChatMessage } from './openrouter'
import { TOPICS } from '../data/spreads'

function topicLabel(topic: Topic, lang: Lang): string {
  return TOPICS.find((t) => t.id === topic)?.label[lang] ?? topic
}

/** Build the chat messages for a personalized AI tarot reading. */
export function buildReadingMessages(
  lang: Lang,
  topic: Topic,
  question: string,
  spread: Spread,
  drawn: DrawnCard[],
): ChatMessage[] {
  // Keep it short, and scale length with the number of cards.
  const lengthVi =
    spread.count <= 1 ? 'Viết gọn trong khoảng 2 đoạn ngắn.' : 'Viết gọn trong khoảng 3 đoạn ngắn.'
  const lengthEn =
    spread.count <= 1 ? 'Keep it to about 2 short paragraphs.' : 'Keep it to about 3 short paragraphs.'

  const system =
    lang === 'vi'
      ? `Bạn là một người đọc bài Tarot ấm áp, sâu sắc, thực tế và SÚC TÍCH. Trả lời hoàn toàn bằng tiếng Việt, văn xuôi thuần — KHÔNG dùng markdown, KHÔNG dấu ** in đậm, KHÔNG tiêu đề hay gạch đầu dòng. Kết nối các lá theo vị trí và câu hỏi rồi đưa lời khuyên cụ thể, đi thẳng trọng tâm, tránh dài dòng. ${lengthVi} Nhấn mạnh Tarot là công cụ phản chiếu, không phải lời phán quyết.`
      : `You are a warm, insightful, practical, and CONCISE Tarot reader. Respond entirely in English in plain prose — NO markdown, NO ** bold, NO headings or bullet points. Connect the cards by position and the question, then give concrete advice, straight to the point. ${lengthEn} Emphasize that Tarot is a tool for reflection, not a verdict.`

  const cards = drawn
    .map((d, i) => {
      const pos = spread.positions[i]
      const ori = lang === 'vi' ? (d.reversed ? 'ngược' : 'xuôi') : d.reversed ? 'reversed' : 'upright'
      const posLabel = pos ? pos.title[lang] : `#${i + 1}`
      return `${i + 1}. [${posLabel}] ${d.card.name[lang]} (${ori})`
    })
    .join('\n')

  const q = question.trim()
  const user =
    lang === 'vi'
      ? `Chủ đề: ${topicLabel(topic, 'vi')}\n${q ? `Câu hỏi: "${q}"` : 'Không có câu hỏi cụ thể (xem tổng quan).'}\nKiểu trải bài: ${spread.name.vi}\n\nCác lá đã rút:\n${cards}\n\nHãy luận giải trải bài này cho tôi.`
      : `Topic: ${topicLabel(topic, 'en')}\n${q ? `Question: "${q}"` : 'No specific question (general reading).'}\nSpread: ${spread.name.en}\n\nCards drawn:\n${cards}\n\nPlease interpret this spread for me.`

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
