import type { TarotCard } from '../types'

/** The 22 Major Arcana. Image paths point to /public/cards. */
export const majorArcana: TarotCard[] = [
  {
    id: '00-the-fool',
    number: '0',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Gã Khờ', en: 'The Fool' },
    image: '/cards/00-the-fool.jpeg',
    upright: {
      keywords: { vi: 'Khởi đầu, tự do, ngây thơ', en: 'New beginnings, freedom, innocence' },
      text: {
        vi: 'Một khởi đầu mới đầy hứng khởi đang chờ đợi. Hãy bước đi với niềm tin, tinh thần cởi mở và dám liều lĩnh một cách hồn nhiên.',
        en: 'An exciting fresh start awaits. Step forward with faith, an open spirit, and a willingness to take a leap.',
      },
    },
    reversed: {
      keywords: { vi: 'Liều lĩnh, bốc đồng, ngại thay đổi', en: 'Recklessness, holding back, naivety' },
      text: {
        vi: 'Có thể bạn đang hành động hấp tấp hoặc ngược lại, quá sợ hãi để bắt đầu. Hãy cân nhắc rủi ro trước khi nhảy.',
        en: 'You may be acting rashly, or conversely too afraid to begin. Weigh the risks before you leap.',
      },
    },
  },
  {
    id: '01-the-magician',
    number: 'I',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Nhà Ảo Thuật', en: 'The Magician' },
    image: '/cards/01-the-magician.jpeg',
    upright: {
      keywords: { vi: 'Ý chí, sáng tạo, hiện thực hóa', en: 'Willpower, skill, manifestation' },
      text: {
        vi: 'Bạn có đủ công cụ và năng lực để biến ý tưởng thành hiện thực. Tập trung ý chí và hành động ngay.',
        en: 'You have all the tools and talent to turn ideas into reality. Focus your will and take action.',
      },
    },
    reversed: {
      keywords: { vi: 'Thao túng, thiếu tập trung, lỡ tiềm năng', en: 'Manipulation, scattered focus, untapped talent' },
      text: {
        vi: 'Năng lực bị lãng phí hoặc dùng sai mục đích. Hãy trung thực với bản thân và tập trung lại nguồn lực.',
        en: 'Talent is being wasted or misused. Be honest with yourself and refocus your resources.',
      },
    },
  },
  {
    id: '02-the-high-priestess',
    number: 'II',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Nữ Tư Tế', en: 'The High Priestess' },
    image: '/cards/02-the-high-priestess.jpeg',
    upright: {
      keywords: { vi: 'Trực giác, bí ẩn, tiềm thức', en: 'Intuition, mystery, the subconscious' },
      text: {
        vi: 'Câu trả lời nằm bên trong bạn. Hãy lắng nghe trực giác và những gì chưa được nói thành lời.',
        en: 'The answers lie within you. Listen to your intuition and what remains unspoken.',
      },
    },
    reversed: {
      keywords: { vi: 'Phớt lờ trực giác, bí mật, mất kết nối', en: 'Ignored intuition, secrets, disconnection' },
      text: {
        vi: 'Bạn đang bỏ qua tiếng nói nội tâm hoặc che giấu điều gì đó. Hãy tĩnh lặng để nghe lại chính mình.',
        en: 'You are overriding your inner voice or hiding something. Be still and reconnect with yourself.',
      },
    },
  },
  {
    id: '03-the-empress',
    number: 'III',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Nữ Hoàng', en: 'The Empress' },
    image: '/cards/03-the-empress.jpeg',
    upright: {
      keywords: { vi: 'Sung túc, nuôi dưỡng, sáng tạo', en: 'Abundance, nurturing, creativity' },
      text: {
        vi: 'Một giai đoạn nuôi dưỡng và sinh sôi. Hãy chăm sóc bản thân, các mối quan hệ và những dự án bạn ấp ủ.',
        en: 'A season of nurturing and growth. Care for yourself, your relationships, and the projects you cherish.',
      },
    },
    reversed: {
      keywords: { vi: 'Bế tắc sáng tạo, phụ thuộc, bỏ bê', en: 'Creative block, dependence, neglect' },
      text: {
        vi: 'Bạn có thể đang bỏ quên nhu cầu của chính mình hoặc cảm thấy cạn kiệt. Hãy tái tạo năng lượng.',
        en: 'You may be neglecting your own needs or feeling depleted. Replenish your energy.',
      },
    },
  },
  {
    id: '04-the-emperor',
    number: 'IV',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Hoàng Đế', en: 'The Emperor' },
    image: '/cards/04-the-emperor.jpeg',
    upright: {
      keywords: { vi: 'Quyền lực, kỷ luật, cấu trúc', en: 'Authority, structure, discipline' },
      text: {
        vi: 'Sự ổn định đến từ trật tự và kỷ luật. Hãy nắm quyền kiểm soát và xây dựng nền móng vững chắc.',
        en: 'Stability comes from order and discipline. Take charge and build a solid foundation.',
      },
    },
    reversed: {
      keywords: { vi: 'Độc đoán, cứng nhắc, mất kiểm soát', en: 'Domination, rigidity, loss of control' },
      text: {
        vi: 'Sự kiểm soát đang trở nên quá mức hoặc bạn đang mất nó. Tìm lại sự cân bằng giữa cứng và mềm.',
        en: 'Control has become excessive, or you are losing it. Rebalance firmness with flexibility.',
      },
    },
  },
  {
    id: '05-the-hierophant',
    number: 'V',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Giáo Hoàng', en: 'The Hierophant' },
    image: '/cards/05-the-hierophant.jpeg',
    upright: {
      keywords: { vi: 'Truyền thống, niềm tin, dẫn dắt', en: 'Tradition, belief, guidance' },
      text: {
        vi: 'Tìm đến truyền thống, thầy hướng dẫn hoặc các giá trị đã được kiểm chứng. Học hỏi từ kinh nghiệm có sẵn.',
        en: 'Lean on tradition, a mentor, or proven values. Learn from established wisdom.',
      },
    },
    reversed: {
      keywords: { vi: 'Phá cách, nổi loạn, tự do tư tưởng', en: 'Nonconformity, rebellion, freethinking' },
      text: {
        vi: 'Đã đến lúc đi theo con đường riêng và đặt câu hỏi với những quy tắc cũ. Hãy tin vào giá trị của chính mình.',
        en: 'It is time to forge your own path and question old rules. Trust your own values.',
      },
    },
  },
  {
    id: '06-the-lovers',
    number: 'VI',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Tình Nhân', en: 'The Lovers' },
    image: '/cards/06-the-lovers.jpeg',
    upright: {
      keywords: { vi: 'Tình yêu, hòa hợp, lựa chọn', en: 'Love, harmony, choices' },
      text: {
        vi: 'Một mối liên kết sâu sắc hoặc một lựa chọn quan trọng dựa trên giá trị thật. Hãy hành động từ trái tim.',
        en: 'A deep connection or an important choice aligned with your true values. Act from the heart.',
      },
    },
    reversed: {
      keywords: { vi: 'Bất hòa, lệch giá trị, do dự', en: 'Disharmony, misalignment, indecision' },
      text: {
        vi: 'Có sự mất cân bằng trong mối quan hệ hoặc xung đột giữa lý trí và con tim. Hãy làm rõ điều bạn thật sự muốn.',
        en: 'There is imbalance in a relationship or conflict between head and heart. Clarify what you truly want.',
      },
    },
  },
  {
    id: '07-the-chariot',
    number: 'VII',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Cỗ Xe', en: 'The Chariot' },
    image: '/cards/07-the-chariot.jpeg',
    upright: {
      keywords: { vi: 'Quyết tâm, chiến thắng, kiểm soát', en: 'Determination, victory, control' },
      text: {
        vi: 'Bằng ý chí và sự tập trung, bạn sẽ vượt qua trở ngại. Giữ vững hướng đi và tiến lên.',
        en: 'Through willpower and focus, you will overcome obstacles. Hold your course and press on.',
      },
    },
    reversed: {
      keywords: { vi: 'Mất phương hướng, thiếu kiểm soát', en: 'Lack of direction, loss of control' },
      text: {
        vi: 'Bạn có thể đang bị giằng kéo theo nhiều hướng hoặc thiếu động lực. Xác định lại mục tiêu rõ ràng.',
        en: 'You may be pulled in many directions or lacking drive. Redefine a clear goal.',
      },
    },
  },
  {
    id: '08-strength',
    number: 'VIII',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Sức Mạnh', en: 'Strength' },
    image: '/cards/08-strength.jpeg',
    upright: {
      keywords: { vi: 'Dũng cảm, kiên nhẫn, nội lực', en: 'Courage, patience, inner strength' },
      text: {
        vi: 'Sức mạnh thật sự đến từ sự dịu dàng và kiên nhẫn, không phải vũ lực. Hãy làm chủ cảm xúc bằng lòng trắc ẩn.',
        en: 'True strength comes from gentleness and patience, not force. Master your emotions with compassion.',
      },
    },
    reversed: {
      keywords: { vi: 'Tự ti, nghi ngờ bản thân, kiệt sức', en: 'Self-doubt, low confidence, burnout' },
      text: {
        vi: 'Bạn có thể đang nghi ngờ bản thân hoặc để cảm xúc lấn át. Hãy nhẹ nhàng tìm lại sự tự tin.',
        en: 'You may be doubting yourself or letting emotions take over. Gently rebuild your confidence.',
      },
    },
  },
  {
    id: '09-the-hermit',
    number: 'IX',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Ẩn Sĩ', en: 'The Hermit' },
    image: '/cards/09-the-hermit.jpeg',
    upright: {
      keywords: { vi: 'Nội quan, tĩnh lặng, tìm kiếm chân lý', en: 'Introspection, solitude, inner guidance' },
      text: {
        vi: 'Hãy dành thời gian một mình để suy ngẫm. Câu trả lời đến từ sự tĩnh lặng và soi rọi nội tâm.',
        en: 'Take time alone to reflect. Answers come from stillness and looking within.',
      },
    },
    reversed: {
      keywords: { vi: 'Cô lập, lạc lối, né tránh', en: 'Isolation, loneliness, withdrawal' },
      text: {
        vi: 'Sự tĩnh lặng đang trở thành cô lập. Hãy cân nhắc kết nối lại với người khác khi cần.',
        en: 'Solitude is turning into isolation. Consider reconnecting with others when needed.',
      },
    },
  },
  {
    id: '10-wheel-of-fortune',
    number: 'X',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Bánh Xe Số Phận', en: 'Wheel of Fortune' },
    image: '/cards/10-wheel-of-fortune.jpeg',
    upright: {
      keywords: { vi: 'Vận may, chu kỳ, bước ngoặt', en: 'Luck, cycles, turning point' },
      text: {
        vi: 'Một bước ngoặt của số phận đang đến. Hãy đón nhận sự thay đổi và tin vào dòng chảy cuộc sống.',
        en: 'A turning point of fate is arriving. Embrace change and trust the flow of life.',
      },
    },
    reversed: {
      keywords: { vi: 'Xui rủi, trì trệ, kháng cự thay đổi', en: 'Bad luck, stagnation, resisting change' },
      text: {
        vi: 'Vòng quay tạm thời bất lợi. Đừng chống lại điều không thể kiểm soát; hãy kiên nhẫn chờ chu kỳ mới.',
        en: 'The wheel turns against you for now. Do not fight what you cannot control; await the next cycle.',
      },
    },
  },
  {
    id: '11-justice',
    number: 'XI',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Công Lý', en: 'Justice' },
    image: '/cards/11-justice.jpeg',
    upright: {
      keywords: { vi: 'Công bằng, sự thật, trách nhiệm', en: 'Fairness, truth, accountability' },
      text: {
        vi: 'Sự thật và công bằng sẽ thắng thế. Hãy hành động chính trực và chịu trách nhiệm cho lựa chọn của mình.',
        en: 'Truth and fairness will prevail. Act with integrity and own the consequences of your choices.',
      },
    },
    reversed: {
      keywords: { vi: 'Bất công, trốn tránh, thiên vị', en: 'Injustice, avoidance, bias' },
      text: {
        vi: 'Có sự thiếu công bằng hoặc bạn đang né tránh trách nhiệm. Hãy đối diện sự thật một cách thẳng thắn.',
        en: 'There is unfairness, or you are dodging responsibility. Face the truth honestly.',
      },
    },
  },
  {
    id: '12-the-hanged-man',
    number: 'XII',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Người Bị Treo', en: 'The Hanged Man' },
    image: '/cards/12-the-hanged-man.jpeg',
    upright: {
      keywords: { vi: 'Buông bỏ, góc nhìn mới, tạm dừng', en: 'Surrender, new perspective, pause' },
      text: {
        vi: 'Đôi khi tiến lên nghĩa là dừng lại và nhìn mọi thứ theo cách khác. Hãy buông bỏ để thấy rõ hơn.',
        en: 'Sometimes progress means pausing and seeing things differently. Let go to gain clarity.',
      },
    },
    reversed: {
      keywords: { vi: 'Trì hoãn, kháng cự, hy sinh vô ích', en: 'Stalling, resistance, needless sacrifice' },
      text: {
        vi: 'Bạn đang mắc kẹt vì không chịu buông hoặc trì hoãn quá lâu. Đã đến lúc thay đổi góc nhìn và hành động.',
        en: 'You are stuck by refusing to let go or delaying too long. It is time to shift perspective and move.',
      },
    },
  },
  {
    id: '13-death',
    number: 'XIII',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Cái Chết', en: 'Death' },
    image: '/cards/13-death.jpeg',
    upright: {
      keywords: { vi: 'Kết thúc, chuyển hóa, tái sinh', en: 'Endings, transformation, rebirth' },
      text: {
        vi: 'Một chương khép lại để chương mới mở ra. Hãy để cái cũ ra đi và đón nhận sự chuyển hóa.',
        en: 'One chapter closes so a new one can open. Let the old go and welcome transformation.',
      },
    },
    reversed: {
      keywords: { vi: 'Níu kéo, sợ thay đổi, đình trệ', en: 'Clinging, fear of change, stagnation' },
      text: {
        vi: 'Bạn đang chống lại một kết thúc tất yếu. Sự níu kéo chỉ kéo dài đau khổ; hãy can đảm buông tay.',
        en: 'You are resisting an inevitable ending. Clinging only prolongs the pain; find courage to release.',
      },
    },
  },
  {
    id: '14-temperance',
    number: 'XIV',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Tiết Độ', en: 'Temperance' },
    image: '/cards/14-temperance.jpeg',
    upright: {
      keywords: { vi: 'Cân bằng, điều độ, kiên nhẫn', en: 'Balance, moderation, patience' },
      text: {
        vi: 'Sự hài hòa đến từ điều độ và kiên nhẫn. Hãy pha trộn các yếu tố trong đời một cách khéo léo.',
        en: 'Harmony comes from moderation and patience. Blend the elements of your life with care.',
      },
    },
    reversed: {
      keywords: { vi: 'Mất cân bằng, thái quá, nóng vội', en: 'Imbalance, excess, impatience' },
      text: {
        vi: 'Có điều gì đó đang quá đà hoặc thiếu hài hòa. Hãy điều chỉnh lại nhịp độ và tìm điểm cân bằng.',
        en: 'Something is excessive or out of harmony. Recalibrate your pace and find the middle ground.',
      },
    },
  },
  {
    id: '15-the-devil',
    number: 'XV',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Ác Quỷ', en: 'The Devil' },
    image: '/cards/15-the-devil.jpeg',
    upright: {
      keywords: { vi: 'Ràng buộc, cám dỗ, lệ thuộc', en: 'Bondage, temptation, attachment' },
      text: {
        vi: 'Bạn có thể đang bị trói buộc bởi thói quen, ham muốn hay nỗi sợ. Hãy nhận ra xiềng xích thật ra do chính bạn nắm giữ.',
        en: 'You may be bound by a habit, desire, or fear. Recognize that the chains are ones you can release.',
      },
    },
    reversed: {
      keywords: { vi: 'Giải phóng, thoát ràng buộc, tỉnh thức', en: 'Release, breaking free, awareness' },
      text: {
        vi: 'Bạn đang dần nhận ra và phá vỡ những ràng buộc cũ. Tự do đang đến gần khi bạn buông bỏ điều níu kéo.',
        en: 'You are recognizing and breaking old bonds. Freedom nears as you release what held you.',
      },
    },
  },
  {
    id: '16-the-tower',
    number: 'XVI',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Tòa Tháp', en: 'The Tower' },
    image: '/cards/16-the-tower.jpeg',
    upright: {
      keywords: { vi: 'Đảo lộn, vỡ lẽ, thay đổi đột ngột', en: 'Upheaval, revelation, sudden change' },
      text: {
        vi: 'Một biến cố bất ngờ phá vỡ những gì không còn vững chắc. Dù khó khăn, nó dọn đường cho sự thật và khởi đầu mới.',
        en: 'A sudden shake-up tears down what was no longer sound. Though hard, it clears the way for truth and renewal.',
      },
    },
    reversed: {
      keywords: { vi: 'Né tránh khủng hoảng, sợ thay đổi', en: 'Averting disaster, fear of change' },
      text: {
        vi: 'Bạn đang trì hoãn một sự sụp đổ tất yếu hoặc dần vượt qua nó. Đừng bám víu vào nền móng đã nứt.',
        en: 'You are delaying an inevitable collapse, or slowly recovering from one. Do not cling to a cracked foundation.',
      },
    },
  },
  {
    id: '17-the-star',
    number: 'XVII',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Ngôi Sao', en: 'The Star' },
    image: '/cards/17-the-star.jpeg',
    upright: {
      keywords: { vi: 'Hy vọng, chữa lành, cảm hứng', en: 'Hope, healing, inspiration' },
      text: {
        vi: 'Sau giông bão là ánh sao hy vọng. Hãy tin tưởng, chữa lành và để cảm hứng dẫn lối.',
        en: 'After the storm comes starlight and hope. Have faith, heal, and let inspiration guide you.',
      },
    },
    reversed: {
      keywords: { vi: 'Mất niềm tin, nản lòng, mất kết nối', en: 'Loss of faith, discouragement, disconnection' },
      text: {
        vi: 'Bạn có thể đang cảm thấy mất hy vọng hoặc cạn cảm hứng. Hãy nhẹ nhàng nuôi dưỡng lại niềm tin.',
        en: 'You may feel hopeless or uninspired. Gently rekindle your faith.',
      },
    },
  },
  {
    id: '18-the-moon',
    number: 'XVIII',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Mặt Trăng', en: 'The Moon' },
    image: '/cards/18-the-moon.jpeg',
    upright: {
      keywords: { vi: 'Ảo ảnh, trực giác, vô thức', en: 'Illusion, intuition, the subconscious' },
      text: {
        vi: 'Mọi thứ chưa rõ ràng như vẻ ngoài. Hãy tin vào trực giác và bước qua nỗi sợ vô hình.',
        en: 'Things are not as clear as they seem. Trust your intuition and move through unseen fears.',
      },
    },
    reversed: {
      keywords: { vi: 'Sáng tỏ, hết hoang mang, giải tỏa nỗi sợ', en: 'Clarity, confusion lifting, releasing fear' },
      text: {
        vi: 'Sương mù đang tan, sự thật dần hiện rõ. Những lo sợ vô căn cứ bắt đầu được giải tỏa.',
        en: 'The fog is clearing and truth emerges. Unfounded fears begin to dissolve.',
      },
    },
  },
  {
    id: '19-the-sun',
    number: 'XIX',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Mặt Trời', en: 'The Sun' },
    image: '/cards/19-the-sun.jpeg',
    upright: {
      keywords: { vi: 'Niềm vui, thành công, sức sống', en: 'Joy, success, vitality' },
      text: {
        vi: 'Ánh sáng, niềm vui và thành công đang tỏa rạng. Hãy tận hưởng và lan tỏa năng lượng tích cực.',
        en: 'Light, joy, and success are shining. Enjoy this moment and share your positive energy.',
      },
    },
    reversed: {
      keywords: { vi: 'Lạc quan gượng gạo, trì hoãn niềm vui', en: 'Dimmed joy, temporary clouds, delay' },
      text: {
        vi: 'Niềm vui đang tạm bị che mờ hoặc bạn quá lạc quan. Hãy tìm lại điều khiến bạn thật sự rạng rỡ.',
        en: 'Joy is temporarily clouded, or optimism is forced. Reconnect with what genuinely lights you up.',
      },
    },
  },
  {
    id: '20-judgement',
    number: 'XX',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Phán Xét', en: 'Judgement' },
    image: '/cards/20-judgement.jpeg',
    upright: {
      keywords: { vi: 'Thức tỉnh, tổng kết, đổi đời', en: 'Awakening, reckoning, renewal' },
      text: {
        vi: 'Một lời mời gọi thức tỉnh và làm mới chính mình. Hãy nhìn lại quá khứ, tha thứ và bước sang trang mới.',
        en: 'A call to awaken and renew yourself. Reflect on the past, forgive, and step into a new chapter.',
      },
    },
    reversed: {
      keywords: { vi: 'Tự trách, do dự, phớt lờ tiếng gọi', en: 'Self-doubt, hesitation, ignoring the call' },
      text: {
        vi: 'Bạn có thể đang quá khắt khe với bản thân hoặc phớt lờ một lời gọi quan trọng. Hãy lắng nghe và tha thứ.',
        en: 'You may be too hard on yourself or ignoring an important call. Listen, and offer yourself forgiveness.',
      },
    },
  },
  {
    id: '21-the-world',
    number: 'XXI',
    arcana: 'major',
    suit: 'major',
    name: { vi: 'Thế Giới', en: 'The World' },
    image: '/cards/21-the-world.jpeg',
    upright: {
      keywords: { vi: 'Hoàn thành, viên mãn, trọn vẹn', en: 'Completion, fulfillment, wholeness' },
      text: {
        vi: 'Một hành trình đã trọn vẹn và thành tựu trong tầm tay. Hãy ăn mừng và đón nhận chu kỳ mới.',
        en: 'A journey reaches completion and achievement is at hand. Celebrate, and welcome the next cycle.',
      },
    },
    reversed: {
      keywords: { vi: 'Dang dở, thiếu khép kín, trì hoãn', en: 'Incompletion, loose ends, delay' },
      text: {
        vi: 'Một mục tiêu gần đạt được nhưng còn dang dở. Hãy hoàn tất những việc còn thiếu để khép lại trọn vẹn.',
        en: 'A goal is nearly reached but unfinished. Tie up the loose ends to bring true closure.',
      },
    },
  },
]
