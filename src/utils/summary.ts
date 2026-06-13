import type { Bi, DrawnCard, Spread, Suit } from '../types'

/** Thematic meaning of each suit, used to describe the dominant energy. */
const SUIT_THEME: Record<Suit, Bi> = {
  major: { vi: 'những bài học lớn và bước ngoặt của số phận', en: 'major life lessons and turning points' },
  cups: { vi: 'cảm xúc, tình cảm và các mối quan hệ', en: 'emotions, love, and relationships' },
  pentacles: { vi: 'tài chính, công việc và những điều thực tế', en: 'finances, work, and the material world' },
  swords: { vi: 'suy nghĩ, giao tiếp và những quyết định', en: 'thoughts, communication, and decisions' },
  wands: { vi: 'hành động, đam mê và sự sáng tạo', en: 'action, passion, and creativity' },
}

function join(parts: string[]): string {
  return parts.filter(Boolean).join(' ')
}

/** Describe overall energy from the upright/reversed balance. */
function energyLine(rev: number, total: number): Bi {
  const ratio = rev / total
  if (rev === 0)
    return { vi: 'Năng lượng tổng thể rất thuận lợi và sáng rõ.', en: 'The overall energy is bright and flowing.' }
  if (ratio <= 0.34)
    return {
      vi: 'Năng lượng tổng thể nghiêng về tích cực, dù có vài điểm cần lưu tâm.',
      en: 'The overall energy leans positive, with a few points to watch.',
    }
  if (ratio < 0.67)
    return {
      vi: 'Năng lượng pha trộn — vừa có cơ hội, vừa có thử thách cần điều chỉnh.',
      en: 'The energy is mixed — both opportunity and challenges to adjust to.',
    }
  return {
    vi: 'Phần lớn lá ngược cho thấy đây là giai đoạn hướng nội: hãy chậm lại và điều chỉnh trước khi tiến tới.',
    en: 'Mostly reversed cards point to an inward phase: slow down and recalibrate before pushing ahead.',
  }
}

/** Most frequent suit across the draw (Major Arcana counts as its own theme). */
function dominantSuit(drawn: DrawnCard[]): Suit {
  const counts = {} as Record<Suit, number>
  for (const d of drawn) counts[d.card.suit] = (counts[d.card.suit] ?? 0) + 1
  return (Object.keys(counts) as Suit[]).reduce((a, b) => (counts[b] > (counts[a] ?? 0) ? b : a))
}

/**
 * Choice spread scoring.
 * Positions: [overview, A-pros, A-cons, B-pros, B-cons].
 * An upright "pro" helps (+1); a reversed "pro" weakens (-1).
 * An upright "con" is an active obstacle (-1); a reversed "con" is fading (+1).
 */
function choiceVerdict(drawn: DrawnCard[]): Bi {
  const s = (d: DrawnCard, isPro: boolean) => {
    const positive = isPro ? !d.reversed : d.reversed
    return positive ? 1 : -1
  }
  const scoreA = s(drawn[1], true) + s(drawn[2], false)
  const scoreB = s(drawn[3], true) + s(drawn[4], false)
  if (scoreA === scoreB)
    return {
      vi: 'Hai hướng đang khá cân bằng — lá bài khuyên bạn lắng nghe trực giác và giá trị của chính mình để quyết định.',
      en: 'The two paths are evenly matched — the cards advise listening to your intuition and values to decide.',
    }
  const favorA = scoreA > scoreB
  return {
    vi: `Xét tổng thể, các lá bài nghiêng về ${favorA ? 'Hướng A' : 'Hướng B'}: con đường này hiện có nhiều thuận lợi và ít trở ngại hơn. Tuy vậy, hãy xem đây là gợi ý, không phải lời phán quyết.`,
    en: `On balance, the cards favor ${favorA ? 'Path A' : 'Path B'}: it currently shows more support and fewer obstacles. Still, treat this as guidance, not a verdict.`,
  }
}

/** Build a closing synthesis for the whole reading. No AI required. */
export function summarize(drawn: DrawnCard[], spread: Spread): Bi {
  const total = drawn.length
  const rev = drawn.filter((d) => d.reversed).length
  const energy = energyLine(rev, total)
  const suit = dominantSuit(drawn)
  const themeLine: Bi = {
    vi: `Các lá bài chủ yếu xoay quanh ${SUIT_THEME[suit].vi}.`,
    en: `The cards mostly revolve around ${SUIT_THEME[suit].en}.`,
  }

  if (spread.layout === 'single') {
    const d = drawn[0]
    return {
      vi: join([energy.vi, `Hãy để thông điệp của lá ${d.card.name.vi} (${d.reversed ? 'ngược' : 'xuôi'}) dẫn lối cho ngày hôm nay.`]),
      en: join([energy.en, `Let the message of ${d.card.name.en} (${d.reversed ? 'reversed' : 'upright'}) guide your day.`]),
    }
  }

  if (spread.layout === 'row3') {
    const [past, present, future] = drawn
    const outlook: Bi = future.reversed
      ? {
          vi: 'Kết quả tương lai còn cần bạn chủ động điều chỉnh để mọi việc đi đúng hướng.',
          en: 'The future outcome still needs your active adjustment to stay on course.',
        }
      : {
          vi: 'Xu hướng tương lai khá rõ ràng nếu bạn giữ vững hướng đi hiện tại.',
          en: 'The future trend looks clear if you hold your current course.',
        }
    return {
      vi: join([
        energy.vi,
        themeLine.vi,
        `Từ nền tảng "${past.card.name.vi}" trong quá khứ, hiện tại bạn đang ở trạng thái "${present.card.name.vi}", dẫn tới "${future.card.name.vi}".`,
        outlook.vi,
      ]),
      en: join([
        energy.en,
        themeLine.en,
        `From the past foundation of "${past.card.name.en}", you are now in "${present.card.name.en}", moving toward "${future.card.name.en}".`,
        outlook.en,
      ]),
    }
  }

  // choice5
  const verdict = choiceVerdict(drawn)
  return {
    vi: join([energy.vi, themeLine.vi, verdict.vi]),
    en: join([energy.en, themeLine.en, verdict.en]),
  }
}
