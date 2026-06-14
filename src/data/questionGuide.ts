import type { SubTopic, Topic } from '../types'

/**
 * Guided "drill-down" content: for each topic, a set of specific angles
 * (subtopics), each with several suggested questions covering many moods —
 * hopeful, anxious, confused, decision-making. Helps users, especially
 * newcomers, articulate what they actually want to ask. Topics not listed here
 * (daily, custom) skip the subtopic step.
 */
export const QUESTION_GUIDE: Partial<Record<Topic, SubTopic[]>> = {
  love: [
    {
      id: 'crush',
      label: { vi: 'Người mình thích', en: 'Someone I like' },
      icon: '✦',
      questions: [
        { vi: 'Người ấy có tình cảm với tôi không?', en: 'Do they have feelings for me?' },
        { vi: 'Người ấy đang nghĩ gì về tôi?', en: 'What are they thinking about me?' },
        { vi: 'Tôi nên chủ động hay tiếp tục chờ đợi?', en: 'Should I make a move or keep waiting?' },
        { vi: 'Mối quan hệ này có tương lai không?', en: 'Does this connection have a future?' },
        { vi: 'Điều gì đang cản trở giữa hai chúng tôi?', en: 'What stands between us?' },
        { vi: 'Làm sao để tôi tiến gần hơn tới người ấy?', en: 'How can I grow closer to them?' },
        { vi: 'Người ấy có đang để ý ai khác không?', en: 'Are they interested in someone else?' },
        { vi: 'Tôi có nên thổ lộ tình cảm lúc này không?', en: 'Should I confess my feelings now?' },
        { vi: 'Tình cảm này có phải chỉ thoáng qua?', en: 'Is this just a passing feeling?' },
      ],
    },
    {
      id: 'current',
      label: { vi: 'Người yêu hiện tại', en: 'Current partner' },
      icon: '♥',
      questions: [
        { vi: 'Mối quan hệ của chúng tôi đang ở giai đoạn nào?', en: 'Where is our relationship right now?' },
        { vi: 'Người ấy thật lòng với tôi đến đâu?', en: 'How sincere are they with me?' },
        { vi: 'Chúng tôi nên cải thiện điều gì?', en: 'What should we work on together?' },
        { vi: 'Tương lai của mối quan hệ này thế nào?', en: 'What does the future hold for us?' },
        { vi: 'Điều gì đang gây căng thẳng giữa hai người?', en: 'What is causing tension between us?' },
        { vi: 'Người ấy có còn yêu tôi như trước không?', en: 'Do they still love me like before?' },
        { vi: 'Chúng tôi có tiến tới hôn nhân không?', en: 'Are we heading toward marriage?' },
        { vi: 'Làm sao để hâm nóng tình cảm?', en: 'How can we rekindle the spark?' },
        { vi: 'Người ấy có đang giấu tôi điều gì không?', en: 'Are they hiding something from me?' },
      ],
    },
    {
      id: 'ex',
      label: { vi: 'Người yêu cũ', en: 'Ex-partner' },
      icon: '☾',
      questions: [
        { vi: 'Chúng tôi có nên quay lại với nhau không?', en: 'Should we get back together?' },
        { vi: 'Người ấy còn nghĩ về tôi không?', en: 'Do they still think about me?' },
        { vi: 'Tôi nên buông bỏ hay tiếp tục hy vọng?', en: 'Should I let go or keep hoping?' },
        { vi: 'Người ấy có hối hận khi chia tay không?', en: 'Do they regret the breakup?' },
        { vi: 'Tại sao tôi vẫn chưa quên được người ấy?', en: 'Why can I not get over them?' },
        { vi: 'Người ấy có quay lại tìm tôi không?', en: 'Will they come back to me?' },
        { vi: 'Làm sao để tôi chữa lành và bước tiếp?', en: 'How can I heal and move on?' },
        { vi: 'Bài học từ mối quan hệ này là gì?', en: 'What is the lesson from this relationship?' },
      ],
    },
    {
      id: 'ambiguous',
      label: { vi: 'Mối quan hệ mập mờ', en: 'Situationship' },
      icon: '◈',
      questions: [
        { vi: 'Người ấy thực sự muốn gì ở mối quan hệ này?', en: 'What do they really want from this?' },
        { vi: 'Mối quan hệ mập mờ này sẽ đi tới đâu?', en: 'Where is this ambiguous bond heading?' },
        { vi: 'Tôi có nên nói rõ ràng cảm xúc của mình?', en: 'Should I make my feelings clear?' },
        { vi: 'Người ấy có nghiêm túc với tôi không?', en: 'Are they serious about me?' },
        { vi: 'Tôi có đang kỳ vọng quá nhiều không?', en: 'Am I expecting too much?' },
        { vi: 'Tôi nên tiếp tục hay dừng lại?', en: 'Should I continue or walk away?' },
        { vi: 'Vì sao người ấy cứ nửa vời với tôi?', en: 'Why do they keep me at arm’s length?' },
      ],
    },
    {
      id: 'single',
      label: { vi: 'Độc thân / Tình yêu sắp tới', en: 'Single / Love ahead' },
      icon: '☀',
      questions: [
        { vi: 'Khi nào tôi sẽ gặp được người phù hợp?', en: 'When will I meet the right person?' },
        { vi: 'Tôi cần thay đổi gì để mở lòng với tình yêu?', en: 'What should I change to open up to love?' },
        { vi: 'Người ấy sẽ là người như thế nào?', en: 'What kind of person will they be?' },
        { vi: 'Điều gì đang ngăn tôi tìm được tình yêu?', en: 'What is keeping love away from me?' },
        { vi: 'Tôi đã sẵn sàng cho một mối quan hệ mới chưa?', en: 'Am I ready for a new relationship?' },
        { vi: 'Vì sao tôi cứ gặp những mối tình không trọn vẹn?', en: 'Why do my relationships keep falling short?' },
        { vi: 'Tình yêu sẽ đến với tôi từ đâu?', en: 'Where will love come into my life from?' },
      ],
    },
    {
      id: 'marriage',
      label: { vi: 'Hôn nhân / Gắn bó lâu dài', en: 'Marriage / Long-term' },
      icon: '✶',
      questions: [
        { vi: 'Cuộc hôn nhân của chúng tôi đang thế nào?', en: 'How is our marriage doing?' },
        { vi: 'Chúng tôi có vượt qua được giai đoạn khó khăn này?', en: 'Will we get through this rough patch?' },
        { vi: 'Điều gì sẽ giúp gia đình tôi hạnh phúc hơn?', en: 'What will make my family happier?' },
        { vi: 'Người ấy có chung thủy với tôi không?', en: 'Are they faithful to me?' },
        { vi: 'Chúng tôi có nên tiếp tục bên nhau?', en: 'Should we stay together?' },
        { vi: 'Làm sao để hàn gắn rạn nứt giữa hai người?', en: 'How can we mend the rift between us?' },
      ],
    },
  ],
  career: [
    {
      id: 'current',
      label: { vi: 'Công việc hiện tại', en: 'Current job' },
      icon: '✦',
      questions: [
        { vi: 'Tôi có nên gắn bó với công việc này không?', en: 'Should I stay in this job?' },
        { vi: 'Làm sao để tôi phát triển ở vị trí hiện tại?', en: 'How can I grow in my current role?' },
        { vi: 'Điều gì đang kìm hãm tôi trong công việc?', en: 'What is holding me back at work?' },
        { vi: 'Tôi có đang đi đúng hướng sự nghiệp không?', en: 'Am I on the right career path?' },
        { vi: 'Vì sao tôi cảm thấy chán nản với công việc?', en: 'Why do I feel burned out at work?' },
        { vi: 'Tôi nên làm gì khi gặp áp lực ở chỗ làm?', en: 'What should I do about pressure at work?' },
        { vi: 'Sếp và đồng nghiệp nhìn nhận tôi thế nào?', en: 'How do my boss and colleagues see me?' },
      ],
    },
    {
      id: 'change',
      label: { vi: 'Chuyển việc / Cơ hội mới', en: 'New opportunity' },
      icon: '◈',
      questions: [
        { vi: 'Đây có phải thời điểm tốt để đổi việc?', en: 'Is now a good time to change jobs?' },
        { vi: 'Cơ hội mới này có phù hợp với tôi không?', en: 'Is this new opportunity right for me?' },
        { vi: 'Tôi nên chọn hướng đi nào?', en: 'Which path should I choose?' },
        { vi: 'Rủi ro khi thay đổi là gì?', en: 'What are the risks of changing?' },
        { vi: 'Tôi có nên nhận lời mời công việc này?', en: 'Should I accept this job offer?' },
        { vi: 'Công việc mới có mang lại điều tôi mong muốn?', en: 'Will the new job give me what I want?' },
        { vi: 'Tôi có nên nghỉ việc lúc này không?', en: 'Should I quit my job right now?' },
      ],
    },
    {
      id: 'growth',
      label: { vi: 'Thăng tiến / Phát triển', en: 'Growth & promotion' },
      icon: '☀',
      questions: [
        { vi: 'Tôi có cơ hội thăng tiến sắp tới không?', en: 'Is a promotion coming my way?' },
        { vi: 'Tôi cần làm gì để được công nhận?', en: 'What should I do to be recognized?' },
        { vi: 'Hướng phát triển nào phù hợp với tôi?', en: 'Which direction suits me best?' },
        { vi: 'Tôi có nên học thêm kỹ năng mới?', en: 'Should I learn a new skill?' },
        { vi: 'Điều gì sẽ giúp tôi bứt phá trong sự nghiệp?', en: 'What will help me break through in my career?' },
      ],
    },
    {
      id: 'relations',
      label: { vi: 'Đồng nghiệp / Cấp trên', en: 'Colleagues & boss' },
      icon: '❖',
      questions: [
        { vi: 'Mối quan hệ với sếp của tôi sẽ ra sao?', en: 'How will my relationship with my boss go?' },
        { vi: 'Làm sao để hòa hợp hơn với đồng nghiệp?', en: 'How can I get along better with coworkers?' },
        { vi: 'Có ai đang gây khó dễ cho tôi không?', en: 'Is someone working against me?' },
        { vi: 'Tôi nên xử lý mâu thuẫn nơi công sở thế nào?', en: 'How should I handle conflict at work?' },
      ],
    },
    {
      id: 'startup',
      label: { vi: 'Khởi nghiệp / Dự án riêng', en: 'Startup / Own venture' },
      icon: '✶',
      questions: [
        { vi: 'Ý tưởng/dự án của tôi có khả thi không?', en: 'Is my idea or project viable?' },
        { vi: 'Đây có phải lúc thích hợp để bắt đầu?', en: 'Is this the right time to start?' },
        { vi: 'Điều gì quyết định thành công của tôi?', en: 'What will determine my success?' },
        { vi: 'Tôi có nên hợp tác với người này không?', en: 'Should I partner with this person?' },
        { vi: 'Dự án này sẽ phát triển ra sao?', en: 'How will this project develop?' },
      ],
    },
  ],
  finance: [
    {
      id: 'overview',
      label: { vi: 'Tình hình tài chính', en: 'Money outlook' },
      icon: '◈',
      questions: [
        { vi: 'Tình hình tài chính sắp tới của tôi thế nào?', en: 'What does my financial future look like?' },
        { vi: 'Tôi nên quản lý tiền bạc ra sao?', en: 'How should I manage my money?' },
        { vi: 'Điều gì đang ảnh hưởng tới tài chính của tôi?', en: 'What is affecting my finances?' },
        { vi: 'Khi nào tình hình tiền bạc của tôi sẽ khá hơn?', en: 'When will my money situation improve?' },
        { vi: 'Tôi có đang tiêu xài quá tay không?', en: 'Am I overspending?' },
      ],
    },
    {
      id: 'invest',
      label: { vi: 'Đầu tư', en: 'Investing' },
      icon: '✦',
      questions: [
        { vi: 'Tôi có nên đầu tư vào việc này không?', en: 'Should I invest in this?' },
        { vi: 'Quyết định đầu tư này có sinh lời không?', en: 'Will this investment pay off?' },
        { vi: 'Rủi ro tôi cần lưu ý là gì?', en: 'What risks should I watch out for?' },
        { vi: 'Đây có phải thời điểm tốt để đầu tư?', en: 'Is this a good time to invest?' },
        { vi: 'Tôi nên đầu tư dài hạn hay ngắn hạn?', en: 'Should I invest long-term or short-term?' },
      ],
    },
    {
      id: 'bigspend',
      label: { vi: 'Quyết định chi tiêu lớn', en: 'Big spending decision' },
      icon: '☀',
      questions: [
        { vi: 'Tôi có nên thực hiện khoản chi tiêu lớn này?', en: 'Should I make this big purchase?' },
        { vi: 'Đây có phải thời điểm phù hợp để mua?', en: 'Is this the right time to buy?' },
        { vi: 'Quyết định này có khiến tôi hối hận không?', en: 'Will I regret this decision?' },
      ],
    },
    {
      id: 'income',
      label: { vi: 'Cơ hội thu nhập', en: 'Income opportunity' },
      icon: '✶',
      questions: [
        { vi: 'Tôi có cơ hội tăng thu nhập không?', en: 'Is there a chance to increase my income?' },
        { vi: 'Nguồn thu mới này có đáng theo đuổi?', en: 'Is this new income source worth pursuing?' },
        { vi: 'Làm sao để tôi cải thiện thu nhập?', en: 'How can I improve my income?' },
        { vi: 'Công việc phụ này có mang lại lợi ích không?', en: 'Will this side job be worthwhile?' },
      ],
    },
    {
      id: 'debt',
      label: { vi: 'Nợ nần / Vay mượn', en: 'Debt & loans' },
      icon: '❖',
      questions: [
        { vi: 'Khi nào tôi sẽ thoát khỏi nợ nần?', en: 'When will I get out of debt?' },
        { vi: 'Tôi có nên vay khoản tiền này không?', en: 'Should I take on this loan?' },
        { vi: 'Làm sao để tôi quản lý các khoản nợ tốt hơn?', en: 'How can I manage my debts better?' },
        { vi: 'Tôi có nên cho người này vay tiền?', en: 'Should I lend money to this person?' },
      ],
    },
  ],
  health: [
    {
      id: 'physical',
      label: { vi: 'Sức khỏe thể chất', en: 'Physical health' },
      icon: '❀',
      questions: [
        { vi: 'Sức khỏe của tôi thời gian tới thế nào?', en: 'How will my health be in the coming time?' },
        { vi: 'Tôi cần chú ý điều gì cho cơ thể mình?', en: 'What should I pay attention to for my body?' },
        { vi: 'Vấn đề sức khỏe này có cải thiện không?', en: 'Will this health issue improve?' },
        { vi: 'Tôi nên thay đổi gì để khỏe mạnh hơn?', en: 'What should I change to be healthier?' },
      ],
    },
    {
      id: 'mental',
      label: { vi: 'Tinh thần / Cảm xúc', en: 'Mind & emotions' },
      icon: '☾',
      questions: [
        { vi: 'Làm sao để tôi tìm lại sự bình an trong tâm hồn?', en: 'How can I find inner peace again?' },
        { vi: 'Điều gì đang khiến tôi căng thẳng, lo âu?', en: 'What is making me stressed and anxious?' },
        { vi: 'Tôi nên làm gì khi cảm thấy kiệt sức?', en: 'What should I do when I feel exhausted?' },
        { vi: 'Làm sao để tôi cân bằng cảm xúc?', en: 'How can I balance my emotions?' },
        { vi: 'Tâm trạng của tôi rồi sẽ khá hơn chứ?', en: 'Will my mood get better?' },
      ],
    },
    {
      id: 'recovery',
      label: { vi: 'Hồi phục / Bệnh tật', en: 'Recovery & illness' },
      icon: '✦',
      questions: [
        { vi: 'Quá trình hồi phục của tôi sẽ ra sao?', en: 'How will my recovery go?' },
        { vi: 'Tôi nên làm gì để mau lành bệnh?', en: 'What should I do to heal faster?' },
        { vi: 'Điều gì đang ảnh hưởng tới sức khỏe của tôi?', en: 'What is affecting my health?' },
      ],
    },
    {
      id: 'habits',
      label: { vi: 'Thói quen / Lối sống', en: 'Habits & lifestyle' },
      icon: '☀',
      questions: [
        { vi: 'Tôi nên thay đổi thói quen nào để tốt hơn?', en: 'Which habit should I change for the better?' },
        { vi: 'Làm sao để tôi duy trì lối sống lành mạnh?', en: 'How can I keep a healthy lifestyle?' },
        { vi: 'Điều gì đang cản trở tôi chăm sóc bản thân?', en: 'What is stopping me from caring for myself?' },
      ],
    },
    {
      id: 'energy',
      label: { vi: 'Năng lượng / Cân bằng', en: 'Energy & balance' },
      icon: '✶',
      questions: [
        { vi: 'Vì sao gần đây tôi luôn cảm thấy mệt mỏi?', en: 'Why have I been feeling so tired lately?' },
        { vi: 'Làm sao để tôi lấy lại năng lượng?', en: 'How can I restore my energy?' },
        { vi: 'Tôi có đang mất cân bằng trong cuộc sống không?', en: 'Am I out of balance in my life?' },
      ],
    },
  ],
}

export function getSubTopics(topic: Topic): SubTopic[] {
  return QUESTION_GUIDE[topic] ?? []
}
