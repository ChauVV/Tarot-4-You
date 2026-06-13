import type { TarotCard, Suit } from '../types'

/**
 * Minor Arcana built from a compact table to avoid boilerplate.
 * Tuple order per card:
 *   [kwUpVi, kwUpEn, textUpVi, textUpEn, kwRevVi, kwRevEn, textRevVi, textRevEn]
 */
type M = [string, string, string, string, string, string, string, string]

const NUM_EN = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King']
const NUM_VI = ['Át', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Tiểu Đồng', 'Hiệp Sĩ', 'Hoàng Hậu', 'Đức Vua']
const NUM_DISP = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King']

const SUIT_EN: Record<Exclude<Suit, 'major'>, string> = {
  cups: 'Cups',
  pentacles: 'Pentacles',
  swords: 'Swords',
  wands: 'Wands',
}
const SUIT_VI: Record<Exclude<Suit, 'major'>, string> = {
  cups: 'Cốc',
  pentacles: 'Tiền',
  swords: 'Kiếm',
  wands: 'Gậy',
}

function buildSuit(suit: Exclude<Suit, 'major'>, rows: M[]): TarotCard[] {
  return rows.map((r, i) => {
    const n = String(i + 1).padStart(2, '0')
    return {
      id: `${suit}-${n}`,
      number: NUM_DISP[i],
      arcana: 'minor',
      suit,
      name: { vi: `${NUM_VI[i]} ${SUIT_VI[suit]}`, en: `${NUM_EN[i]} of ${SUIT_EN[suit]}` },
      image: `/cards/${suit}-${n}.jpeg`,
      upright: { keywords: { vi: r[0], en: r[1] }, text: { vi: r[2], en: r[3] } },
      reversed: { keywords: { vi: r[4], en: r[5] }, text: { vi: r[6], en: r[7] } },
    }
  })
}

const CUPS: M[] = [
  ['Tình cảm mới, trực giác, yêu thương', 'New emotion, intuition, love', 'Một nguồn cảm xúc và tình yêu mới đang tuôn chảy. Hãy mở lòng đón nhận.', 'A new wellspring of emotion and love flows in. Open your heart to receive it.',
   'Cảm xúc bị kìm nén, trống rỗng', 'Blocked emotion, emptiness', 'Bạn có thể đang đè nén cảm xúc hoặc cảm thấy trống trải. Hãy cho phép mình cảm nhận.', 'You may be suppressing feelings or feeling empty. Allow yourself to feel.'],
  ['Kết nối, hòa hợp, tình yêu đôi lứa', 'Connection, harmony, partnership', 'Một mối liên kết cân bằng và chân thành. Sự thấu hiểu lẫn nhau được vun đắp.', 'A balanced, sincere bond. Mutual understanding deepens.',
   'Bất hòa, mất cân bằng, chia tay', 'Disharmony, imbalance, breakup', 'Mối quan hệ đang căng thẳng hoặc lệch pha. Hãy trò chuyện chân thành để hàn gắn.', 'A relationship is strained or unbalanced. Speak honestly to mend it.'],
  ['Niềm vui, tình bạn, ăn mừng', 'Celebration, friendship, joy', 'Một dịp vui đáng ăn mừng cùng bạn bè và người thân. Hãy tận hưởng sự kết nối.', 'A joyful occasion to celebrate with friends and loved ones. Enjoy the connection.',
   'Tiệc tùng quá đà, rạn nứt nhóm', 'Overindulgence, gossip, rifts', 'Niềm vui có thể đang quá đà hoặc có rạn nứt trong nhóm. Hãy giữ chừng mực.', 'Joy may be excessive, or there are rifts in the group. Keep balance.'],
  ['Chán nản, thờ ơ, suy ngẫm', 'Apathy, contemplation, boredom', 'Bạn đang cảm thấy nhàm chán và bỏ lỡ cơ hội trước mắt. Hãy mở mắt nhìn lại.', 'You feel bored and may overlook an offer before you. Open your eyes.',
   'Tỉnh thức, nắm bắt cơ hội', 'Renewed interest, seizing chances', 'Bạn đang thoát khỏi sự trì trệ và sẵn sàng đón nhận cơ hội mới.', 'You are emerging from stagnation, ready to embrace new opportunities.'],
  ['Mất mát, tiếc nuối, đau buồn', 'Loss, regret, grief', 'Hãy cho phép mình buồn, nhưng đừng quên vẫn còn điều tốt đẹp ở lại.', 'Allow yourself to grieve, but remember what still remains.',
   'Chấp nhận, chữa lành, buông bỏ', 'Acceptance, healing, moving on', 'Bạn đang dần chữa lành và buông bỏ nỗi đau cũ. Hy vọng quay trở lại.', 'You are healing and releasing old pain. Hope returns.'],
  ['Hoài niệm, ngây thơ, lòng tốt', 'Nostalgia, innocence, kindness', 'Những kỷ niệm đẹp hoặc sự tử tế giản dị mang lại niềm an ủi. Hãy trân trọng.', 'Happy memories or simple kindness bring comfort. Cherish them.',
   'Mắc kẹt quá khứ, lý tưởng hóa', 'Stuck in the past, idealizing', 'Bạn có thể đang sống quá nhiều trong quá khứ. Hãy quay về hiện tại.', 'You may be living too much in the past. Return to the present.'],
  ['Lựa chọn, mộng tưởng, ảo ảnh', 'Choices, fantasy, illusion', 'Có nhiều lựa chọn hấp dẫn nhưng không phải cái nào cũng thật. Hãy phân định rõ ràng.', 'Many tempting options appear, but not all are real. Discern carefully.',
   'Sáng tỏ, quyết định dứt khoát', 'Clarity, decisive action', 'Sương mù tan đi và bạn nhìn rõ điều thật sự quan trọng để chọn.', 'The fog lifts and you see clearly what truly matters.'],
  ['Rời đi, tìm kiếm sâu xa hơn', 'Walking away, seeking more', 'Bạn rời bỏ điều không còn thỏa mãn để tìm ý nghĩa sâu sắc hơn. Đó là sự dũng cảm.', 'You leave behind what no longer fulfills you to seek deeper meaning. That is courage.',
   'Sợ thay đổi, bỏ cuộc dở dang', 'Fear of change, drifting', 'Bạn có thể đang lưỡng lự giữa ở lại và ra đi. Hãy lắng nghe điều trái tim cần.', 'You waver between staying and leaving. Listen to what your heart needs.'],
  ['Mãn nguyện, ước mơ thành hiện thực', 'Contentment, wishes fulfilled', 'Lá bài của điều ước: sự thỏa mãn và niềm vui đang trong tầm tay.', 'The wish card: satisfaction and joy are within reach.',
   'Thỏa mãn hời hợt, tham lam', 'Shallow satisfaction, greed', 'Niềm vui bên ngoài chưa lấp đầy bên trong. Hãy hỏi điều gì thật sự khiến bạn hạnh phúc.', 'Outer pleasure does not fill the inside. Ask what truly makes you happy.'],
  ['Hạnh phúc viên mãn, gia đình', 'Emotional fulfillment, family', 'Sự hòa hợp trọn vẹn trong tình cảm và gia đình. Đây là bức tranh hạnh phúc lâu dài.', 'Complete emotional and family harmony — a picture of lasting happiness.',
   'Bất hòa gia đình, kỳ vọng lệch', 'Family discord, misaligned values', 'Có khoảng cách giữa kỳ vọng và thực tế trong gia đình. Hãy vun đắp lại sự kết nối.', 'There is a gap between expectation and reality at home. Rebuild connection.'],
  ['Tin vui cảm xúc, sáng tạo, mơ mộng', 'Emotional message, creativity', 'Một thông điệp ngọt ngào hoặc nguồn cảm hứng sáng tạo đang đến. Hãy đón nhận với tâm hồn cởi mở.', 'A sweet message or creative spark arrives. Receive it with an open heart.',
   'Cảm xúc non nớt, mộng mơ viển vông', 'Emotional immaturity, escapism', 'Cảm xúc còn chưa chín hoặc bạn đang trốn vào mơ mộng. Hãy thực tế hơn.', 'Feelings are immature, or you escape into daydreams. Be more grounded.'],
  ['Lãng mạn, lý tưởng, theo đuổi con tim', 'Romance, idealism, following the heart', 'Một lời mời gọi lãng mạn hoặc một lý tưởng đáng theo đuổi. Hãy đi theo tiếng gọi con tim.', 'A romantic invitation or an ideal worth pursuing. Follow your heart.',
   'Mơ mộng hão, thất hứa, ủy mị', 'Unrealistic, moody, broken promises', 'Lời hứa có thể không thành hoặc cảm xúc thất thường. Hãy giữ đôi chân trên mặt đất.', 'Promises may not hold, or moods swing. Keep your feet on the ground.'],
  ['Thấu cảm, dịu dàng, trực giác', 'Compassion, intuition, nurturing', 'Hãy dẫn dắt bằng sự đồng cảm và trực giác. Bạn là chỗ dựa tinh thần cho người khác.', 'Lead with empathy and intuition. You are an emotional anchor for others.',
   'Quá nhạy cảm, lệ thuộc cảm xúc', 'Over-sensitivity, emotional dependency', 'Cảm xúc có thể đang lấn át hoặc bạn cho đi quá nhiều. Hãy chăm sóc chính mình trước.', 'Emotions may overwhelm, or you give too much. Care for yourself first.'],
  ['Cân bằng cảm xúc, bao dung, chín chắn', 'Emotional balance, diplomacy', 'Bạn làm chủ cảm xúc với sự điềm tĩnh và bao dung. Đây là sự trưởng thành nội tâm.', 'You master your emotions with calm and compassion — true inner maturity.',
   'Đè nén cảm xúc, lạnh lùng, thao túng', 'Suppressed emotion, moodiness', 'Bạn có thể đang che giấu cảm xúc hoặc để chúng âm ỉ. Hãy thành thật với cảm nhận của mình.', 'You may be hiding feelings or letting them simmer. Be honest with how you feel.'],
]

const PENTACLES: M[] = [
  ['Cơ hội vật chất, khởi đầu thịnh vượng', 'New opportunity, prosperity', 'Một cơ hội mới về tài chính hoặc sự nghiệp đang nảy mầm. Hãy nắm lấy và vun trồng.', 'A new financial or career opportunity sprouts. Take it and nurture it.',
   'Lỡ cơ hội, kế hoạch xấu', 'Missed chance, poor planning', 'Một cơ hội có thể trôi qua nếu thiếu chuẩn bị. Hãy lập kế hoạch thực tế.', 'An opportunity may slip away without preparation. Plan realistically.'],
  ['Cân bằng, linh hoạt, ứng biến', 'Balance, adaptability, juggling', 'Bạn đang khéo léo cân bằng nhiều việc cùng lúc. Hãy giữ sự linh hoạt.', 'You are skillfully balancing many things at once. Stay flexible.',
   'Quá tải, mất cân bằng tài chính', 'Overwhelm, financial imbalance', 'Bạn đang ôm đồm quá nhiều. Hãy ưu tiên và buông bớt việc kém quan trọng.', 'You are taking on too much. Prioritize and let some things go.'],
  ['Hợp tác, kỹ năng, xây dựng', 'Teamwork, skill, craftsmanship', 'Thành quả đến từ sự hợp tác và tay nghề. Hãy học hỏi và đóng góp giá trị.', 'Results come from collaboration and craft. Learn and contribute your value.',
   'Thiếu phối hợp, làm ẩu', 'Poor teamwork, mediocrity', 'Thiếu sự phối hợp hoặc làm việc qua loa đang cản trở kết quả. Hãy chú tâm chất lượng.', 'Lack of coordination or sloppy work hampers results. Focus on quality.'],
  ['Ổn định, tiết kiệm, bảo toàn', 'Stability, saving, security', 'Bạn coi trọng sự an toàn và biết giữ gìn. Hãy đảm bảo điều đó không thành bám víu.', 'You value security and hold things steady — just ensure it does not become clinging.',
   'Bám víu, keo kiệt, sợ mất mát', 'Greed, clinging, fear of loss', 'Bạn đang giữ chặt quá mức vì sợ mất. Hãy học cách cho đi và buông lỏng.', 'You grip too tightly out of fear of loss. Learn to give and to loosen up.'],
  ['Khó khăn, thiếu thốn, cô đơn', 'Hardship, lack, insecurity', 'Một giai đoạn thiếu thốn về vật chất hoặc tinh thần. Hãy nhớ rằng vẫn có nơi để cầu cứu.', 'A spell of material or emotional scarcity. Remember that help is available.',
   'Hồi phục, vượt khó, hết bĩ cực', 'Recovery, end of hardship', 'Khó khăn đang dần qua đi và bạn lấy lại chỗ đứng. Hy vọng trở lại.', 'Hardship is passing and you regain your footing. Hope returns.'],
  ['Cho đi, sẻ chia, hào phóng', 'Generosity, giving and receiving', 'Sự cân bằng giữa cho và nhận. Hãy rộng lượng, và cũng biết đón nhận giúp đỡ.', 'A balance of giving and receiving. Be generous, and also accept help.',
   'Cho có điều kiện, mất cân bằng', 'Strings attached, debt, inequality', 'Sự trao đổi đang thiếu công bằng hoặc kèm điều kiện. Hãy làm rõ ranh giới.', 'An exchange is unequal or comes with strings. Clarify the boundaries.'],
  ['Kiên nhẫn, đầu tư dài hạn, đánh giá', 'Patience, long-term investment', 'Hãy kiên nhẫn chờ thành quả chín muồi và đánh giá lại tiến độ. Gieo trồng cần thời gian.', 'Be patient for results to ripen and review your progress. Growth takes time.',
   'Sốt ruột, đầu tư kém hiệu quả', 'Impatience, poor return', 'Bạn đang nóng vội hoặc nỗ lực chưa mang lại kết quả. Hãy xem lại hướng đi.', 'You are impatient, or effort is not paying off. Re-examine your approach.'],
  ['Chăm chỉ, rèn luyện, tỉ mỉ', 'Diligence, skill-building, mastery', 'Sự chuyên cần và rèn luyện đang đưa bạn đến tinh thông. Hãy kiên trì hoàn thiện.', 'Dedication and practice are leading you to mastery. Keep refining your craft.',
   'Cẩu thả, thiếu động lực, lặp lại vô nghĩa', 'Carelessness, lack of focus', 'Công việc trở nên nhàm chán hoặc làm cho có. Hãy tìm lại ý nghĩa và sự tỉ mỉ.', 'Work feels dull or half-hearted. Rediscover meaning and attention to detail.'],
  ['Độc lập, sung túc, tự chủ', 'Independence, abundance, self-reliance', 'Bạn tận hưởng thành quả của nỗ lực và sự tự chủ. Hãy trân trọng những gì mình gây dựng.', 'You enjoy the fruits of your effort and independence. Savor what you have built.',
   'Lệ thuộc, vung tay quá trán', 'Dependence, overspending', 'Có sự lệ thuộc hoặc chi tiêu thiếu kiểm soát. Hãy lấy lại sự tự chủ tài chính.', 'There is dependence or unchecked spending. Reclaim your financial footing.'],
  ['Thịnh vượng lâu dài, gia sản, di sản', 'Lasting wealth, legacy, family', 'Sự ổn định và thịnh vượng bền vững, thường gắn với gia đình và di sản. Nền móng vững chắc.', 'Lasting wealth and stability, often tied to family and legacy. A solid foundation.',
   'Rủi ro tài chính, mâu thuẫn gia sản', 'Financial loss, family conflict', 'Có rủi ro về tài chính hoặc bất đồng quanh tiền bạc, gia sản. Hãy thận trọng và minh bạch.', 'Risk to finances or conflict over money and inheritance. Be cautious and transparent.'],
  ['Học hỏi, tham vọng thực tế, tin vui', 'Learning, ambition, good news', 'Một tinh thần ham học và tin vui về tài chính, công việc. Hãy đầu tư vào kiến thức.', 'A studious spirit and good news about money or work. Invest in learning.',
   'Lười học, thiếu mục tiêu, tin xấu', 'Lack of focus, missed lessons', 'Bạn có thể đang xao nhãng việc học hoặc thiếu định hướng. Hãy đặt mục tiêu cụ thể.', 'You may be neglecting learning or lacking direction. Set concrete goals.'],
  ['Bền bỉ, đáng tin cậy, chăm chỉ', 'Reliability, hard work, routine', 'Tiến bộ đến từ sự bền bỉ và đáng tin cậy. Hãy kiên trì với thói quen tốt.', 'Progress comes from steadiness and reliability. Keep up good routines.',
   'Trì trệ, bảo thủ, làm việc máy móc', 'Stagnation, stubbornness', 'Công việc trở nên trì trệ hoặc quá rập khuôn. Hãy thêm chút linh hoạt và đổi mới.', 'Work feels stagnant or overly rigid. Add some flexibility and fresh thinking.'],
  ['Thực tế, hào phóng, nuôi dưỡng', 'Practicality, abundance, nurturing', 'Bạn quản lý nguồn lực khôn ngoan và chăm lo cho người khác. Sự an yên đến từ sự chu đáo.', 'You manage resources wisely and care for others. Security comes from your care.',
   'Bỏ bê bản thân, vật chất hóa', 'Self-neglect, materialism', 'Bạn có thể đang quá tập trung vào vật chất mà quên chăm sóc mình. Hãy cân bằng lại.', 'You may focus too much on material things and neglect yourself. Rebalance.'],
  ['Thành đạt, vững vàng, lãnh đạo', 'Success, security, leadership', 'Bạn gặt hái thành công vật chất và lãnh đạo vững vàng. Hãy dùng nguồn lực một cách rộng lượng.', 'You enjoy material success and steady leadership. Use your resources generously.',
   'Tham lam, bảo thủ, ám ảnh tiền bạc', 'Greed, stubbornness, materialism', 'Thành công có thể biến thành ám ảnh kiểm soát hoặc tiền bạc. Hãy nhớ điều gì thật sự giá trị.', 'Success can turn into obsession with control or money. Remember what truly matters.'],
]

const SWORDS: M[] = [
  ['Sáng tỏ, sự thật, đột phá tư duy', 'Clarity, truth, breakthrough', 'Một ý tưởng sắc bén hoặc sự thật rõ ràng đột phá. Hãy dùng lý trí để cắt qua hỗn loạn.', 'A sharp idea or clear truth breaks through. Use reason to cut through confusion.',
   'Hỗn loạn tư duy, lạm dụng lý lẽ', 'Confusion, misused force', 'Suy nghĩ đang rối ren hoặc bạn dùng lý lẽ để gây tổn thương. Hãy tìm lại sự rõ ràng.', 'Thinking is muddled, or logic is used to wound. Seek clarity again.'],
  ['Bế tắc, do dự, né tránh quyết định', 'Stalemate, indecision, avoidance', 'Bạn đang trốn tránh một quyết định khó. Hãy gỡ bỏ tấm bịt mắt và đối diện sự thật.', 'You are avoiding a hard choice. Remove the blindfold and face the truth.',
   'Quyết định cuối cùng, hết do dự', 'Decision made, moving forward', 'Sự bế tắc được tháo gỡ và bạn sẵn sàng chọn một hướng. Sự thật được nhìn nhận.', 'The stalemate breaks and you are ready to choose. Truth is acknowledged.'],
  ['Đau lòng, tổn thương, mất mát', 'Heartbreak, sorrow, painful truth', 'Một nỗi đau hoặc sự thật phũ phàng. Hãy cho phép mình cảm nhận để chữa lành.', 'Heartbreak or a painful truth. Let yourself feel it in order to heal.',
   'Hồi phục, tha thứ, nguôi ngoai', 'Recovery, forgiveness, release', 'Nỗi đau đang dịu lại và bạn bắt đầu tha thứ. Quá trình chữa lành đã khởi động.', 'The pain eases and forgiveness begins. Healing is underway.'],
  ['Nghỉ ngơi, hồi phục, tĩnh tâm', 'Rest, recovery, contemplation', 'Đã đến lúc tạm dừng và nạp lại năng lượng. Sự tĩnh lặng mang lại sáng suốt.', 'It is time to pause and recharge. Stillness restores clarity.',
   'Kiệt sức, bồn chồn, trở lại quá sớm', 'Burnout, restlessness, premature return', 'Bạn cần nghỉ ngơi nhưng lại ép mình tiếp tục. Hãy thật sự cho phép mình dừng lại.', 'You need rest but push on. Truly allow yourself to stop.'],
  ['Xung đột, thắng bằng mọi giá, kiêu ngạo', 'Conflict, winning at a cost', 'Một cuộc tranh chấp mà chiến thắng có thể đi kèm tổn thất. Hãy cân nhắc cái giá phải trả.', 'A conflict where victory may cost you. Weigh the price of winning.',
   'Hòa giải, buông bỏ hơn thua', 'Reconciliation, letting go', 'Bạn sẵn sàng làm hòa hoặc rút lui khỏi tranh cãi vô nghĩa. Đó là sự khôn ngoan.', 'You are ready to make peace or step back from a pointless fight. That is wisdom.'],
  ['Chuyển tiếp, rời khó khăn, hồi phục', 'Transition, moving on, recovery', 'Bạn đang rời khỏi vùng khó khăn để đến nơi yên ổn hơn. Hành trình đang tốt dần lên.', 'You are leaving troubled waters for calmer ones. The journey improves.',
   'Mắc kẹt quá khứ, hành trình dang dở', 'Stuck, unresolved baggage', 'Bạn khó dứt khỏi quá khứ hoặc trì hoãn sự chuyển mình cần thiết. Hãy nhẹ gánh để đi tiếp.', 'You struggle to leave the past or delay a needed move. Lighten the load to move on.'],
  ['Mưu lược, chiến thuật, hành động kín', 'Strategy, cunning, acting alone', 'Đôi khi cần khéo léo và đi đường vòng để đạt mục tiêu. Hãy hành động có tính toán.', 'Sometimes you need cunning and an indirect route. Act strategically.',
   'Lừa dối bị lộ, hối lỗi, tự lừa mình', 'Deception exposed, self-deceit', 'Mưu mẹo có thể phản tác dụng hoặc bạn đang tự lừa dối mình. Hãy chọn sự trung thực.', 'A scheme may backfire, or you deceive yourself. Choose honesty.'],
  ['Tự trói buộc, sợ hãi, mắc kẹt', 'Self-limitation, fear, feeling trapped', 'Bạn cảm thấy bị mắc kẹt, nhưng xiềng xích phần lớn nằm trong tâm trí. Hãy bước ra.', 'You feel trapped, but the chains are largely in your mind. Step out.',
   'Giải thoát, vượt qua nỗi sợ', 'Release, overcoming fear', 'Bạn đang nhận ra mình có thể tự cởi trói và lấy lại tự do. Hãy bước tới.', 'You realize you can free yourself and reclaim freedom. Move forward.'],
  ['Lo âu, ám ảnh, mất ngủ', 'Anxiety, worry, nightmares', 'Nỗi lo lắng đang lớn hơn thực tế. Hãy chia sẻ và soi rọi nỗi sợ dưới ánh sáng.', 'Worry looms larger than reality. Share your fears and bring them into the light.',
   'Nỗi sợ dịu đi, tìm lại bình yên', 'Anxiety easing, finding peace', 'Những lo âu ban đêm đang nhạt dần và sự bình an quay lại. Hãy nhẹ nhõm.', 'The night-worries fade and peace returns. Breathe easier.'],
  ['Kết thúc đau đớn, chạm đáy, kiệt quệ', 'Painful ending, rock bottom', 'Một kết thúc khó khăn nhưng cũng là điểm thấp nhất — phía trước chỉ còn đi lên.', 'A painful ending, but also the lowest point — the only way now is up.',
   'Hồi sinh, vực dậy, hết khổ', 'Recovery, rising again', 'Giai đoạn tồi tệ nhất đã qua. Bạn đang đứng dậy và bắt đầu lại.', 'The worst has passed. You are rising and beginning anew.'],
  ['Tò mò, cảnh giác, ý tưởng mới', 'Curiosity, vigilance, new ideas', 'Một tâm trí sắc sảo và ham hiểu biết. Hãy quan sát kỹ trước khi lên tiếng.', 'A sharp, inquisitive mind. Observe carefully before you speak.',
   'Soi mói, nói xấu, hấp tấp', 'Gossip, haste, harsh words', 'Lời nói có thể trở nên cay nghiệt hoặc thiếu suy nghĩ. Hãy cẩn trọng ngôn từ.', 'Words may turn harsh or careless. Be mindful of what you say.'],
  ['Hành động quyết liệt, thẳng thắn, nhanh', 'Bold action, directness, speed', 'Bạn lao về phía trước với lý trí và quyết tâm. Hãy đảm bảo hướng đi đã đúng.', 'You charge ahead with intellect and resolve. Make sure your direction is right.',
   'Hấp tấp, hung hăng, thiếu cân nhắc', 'Recklessness, aggression', 'Sự vội vàng và gay gắt có thể gây hậu quả. Hãy chậm lại và lắng nghe.', 'Haste and harshness can cause harm. Slow down and listen.'],
  ['Độc lập, sắc sảo, trung thực', 'Independence, clear thinking, honesty', 'Bạn nhìn nhận mọi việc rõ ràng và trung thực, không để cảm xúc làm lu mờ. Hãy giữ sự công tâm.', 'You see clearly and honestly, unclouded by emotion. Stay fair-minded.',
   'Lạnh lùng, cay nghiệt, cô đơn', 'Coldness, cruelty, isolation', 'Sự sắc bén có thể trở thành lạnh lùng hoặc gay gắt. Hãy thêm chút bao dung.', 'Sharpness can become coldness or cruelty. Add some compassion.'],
  ['Trí tuệ, công minh, quyền uy lý trí', 'Intellect, authority, fair judgment', 'Bạn lãnh đạo bằng lý trí, sự công bằng và nguyên tắc rõ ràng. Hãy quyết đoán nhưng nhân văn.', 'You lead with intellect, fairness, and clear principles. Be decisive yet humane.',
   'Lạm quyền, độc đoán, thao túng lý lẽ', 'Abuse of power, manipulation', 'Quyền lực lý trí có thể bị lạm dụng để áp đặt. Hãy dùng trí tuệ một cách chính trực.', 'Mental authority can be misused to dominate. Wield your intellect with integrity.'],
]

const WANDS: M[] = [
  ['Cảm hứng, khởi đầu, tiềm năng', 'Inspiration, new venture, potential', 'Một tia lửa sáng tạo và cơ hội mới bùng lên. Hãy nắm lấy nguồn cảm hứng và hành động.', 'A creative spark and new opportunity ignite. Seize the inspiration and act.',
   'Trì hoãn, thiếu nhiệt huyết, lỡ thời', 'Delays, lack of drive, false start', 'Năng lượng khởi đầu đang bị kìm hãm hoặc thời điểm chưa chín. Hãy kiên nhẫn nuôi ý tưởng.', 'Initial energy stalls or the timing is off. Be patient and nurture the idea.'],
  ['Lên kế hoạch, tầm nhìn, quyết định', 'Planning, vision, decisions', 'Bạn đang đứng trước những lựa chọn mở rộng tầm nhìn. Hãy mạnh dạn lên kế hoạch cho tương lai.', 'You stand before choices that broaden your horizons. Plan boldly for the future.',
   'Sợ rủi ro, thiếu kế hoạch, do dự', 'Fear of the unknown, poor planning', 'Nỗi sợ rủi ro đang kìm chân bạn. Hãy can đảm bước ra khỏi vùng an toàn.', 'Fear of the unknown holds you back. Find courage to leave your comfort zone.'],
  ['Mở rộng, tầm nhìn xa, tiến triển', 'Expansion, foresight, progress', 'Những nỗ lực ban đầu bắt đầu cho kết quả và cơ hội mở rộng. Hãy nhìn xa hơn.', 'Early efforts start to pay off and opportunities expand. Look further ahead.',
   'Chậm trễ, kế hoạch đổ bể, thiển cận', 'Delays, setbacks, short-sightedness', 'Kế hoạch gặp trở ngại hoặc bạn nhìn chưa đủ xa. Hãy điều chỉnh và kiên nhẫn.', 'Plans hit obstacles or your view is too narrow. Adjust and be patient.'],
  ['Ăn mừng, hòa hợp, mái ấm', 'Celebration, harmony, homecoming', 'Một cột mốc đáng ăn mừng cùng cộng đồng và mái ấm. Hãy tận hưởng niềm vui chung.', 'A milestone worth celebrating with community and home. Enjoy the shared joy.',
   'Niềm vui chưa trọn, bất ổn nền tảng', 'Lack of harmony, unstable foundation', 'Niềm vui còn dang dở hoặc nền tảng chưa vững. Hãy củng cố trước khi ăn mừng.', 'Joy feels incomplete or the foundation is shaky. Shore it up before celebrating.'],
  ['Cạnh tranh, xung đột nhỏ, thử thách', 'Competition, conflict, friction', 'Có sự cạnh tranh hoặc bất đồng sôi nổi. Hãy xem đó là cơ hội rèn giũa bản thân.', 'There is lively competition or disagreement. See it as a chance to sharpen yourself.',
   'Tránh xung đột, hòa giải, mệt mỏi', 'Avoiding conflict, resolution', 'Bạn đang né tránh va chạm hoặc tìm cách hòa giải. Hãy chọn trận đáng để đấu.', 'You avoid friction or seek peace. Choose which battles are worth fighting.'],
  ['Chiến thắng, công nhận, tự tin', 'Victory, recognition, confidence', 'Thành công và sự công nhận đang đến. Hãy ngẩng cao đầu và đón nhận xứng đáng.', 'Success and recognition arrive. Hold your head high and accept what you have earned.',
   'Thiếu công nhận, tự nghi ngờ, kiêu', 'Lack of recognition, self-doubt', 'Bạn có thể chưa được ghi nhận hoặc đang nghi ngờ bản thân. Hãy tin vào giá trị của mình.', 'You may feel unrecognized or doubtful. Trust your own worth.'],
  ['Kiên định, bảo vệ lập trường, dũng cảm', 'Perseverance, defending your ground', 'Bạn đang đứng vững trước thử thách và bảo vệ điều mình tin. Hãy giữ vững lập trường.', 'You hold firm against challenge and defend what you believe. Stand your ground.',
   'Quá tải, đuối sức, muốn bỏ cuộc', 'Overwhelm, giving up, defensiveness', 'Áp lực dồn dập khiến bạn muốn buông xuôi. Hãy tìm sự hỗ trợ và giữ sức.', 'Mounting pressure tempts you to quit. Seek support and conserve your energy.'],
  ['Tăng tốc, tin tức nhanh, hành động', 'Swift action, fast news, momentum', 'Mọi việc đang chuyển động nhanh và tin tức đến dồn dập. Hãy bắt nhịp và hành động.', 'Things move quickly and news arrives fast. Catch the momentum and act.',
   'Trì hoãn, hỗn loạn, mất đà', 'Delays, chaos, losing momentum', 'Tiến độ bị chậm lại hoặc rối loạn. Hãy sắp xếp lại trước khi tiếp tục.', 'Progress slows or scatters. Reorganize before pushing on.'],
  ['Kiên cường, phòng thủ, gần thành công', 'Resilience, last stand, persistence', 'Bạn đã mệt nhưng gần đến đích. Hãy gắng thêm một chút với sự cảnh giác.', 'You are weary but near the finish. Push on a little more, stay watchful.',
   'Kiệt sức, đa nghi, phòng thủ thái quá', 'Exhaustion, paranoia, over-defensiveness', 'Sự cảnh giác đang biến thành đa nghi và kiệt sức. Hãy hạ bớt phòng thủ và nghỉ ngơi.', 'Vigilance turns into paranoia and burnout. Lower your guard and rest.'],
  ['Gánh nặng, trách nhiệm quá tải', 'Burden, over-commitment, responsibility', 'Bạn đang ôm quá nhiều trách nhiệm. Hãy san sẻ bớt gánh nặng để không gục ngã.', 'You carry too much responsibility. Share the load before it breaks you.',
   'Buông bớt gánh nặng, ủy thác', 'Releasing burdens, delegating', 'Bạn đang học cách đặt xuống và san sẻ. Sự nhẹ nhõm và cân bằng quay trở lại.', 'You are learning to put things down and share. Relief and balance return.'],
  ['Nhiệt huyết, tin vui, khám phá', 'Enthusiasm, good news, exploration', 'Một tinh thần nhiệt huyết và tin vui về dự án mới. Hãy giữ ngọn lửa đam mê.', 'An enthusiastic spirit and good news about a new venture. Keep your passion alive.',
   'Bốc đồng, hứa hão, thiếu kiên trì', 'Impulsiveness, empty promises', 'Nhiệt huyết có thể bốc đồng hoặc thiếu bền. Hãy biến đam mê thành hành động cụ thể.', 'Enthusiasm may be impulsive or short-lived. Turn passion into concrete action.'],
  ['Hành động, đam mê, phiêu lưu', 'Action, passion, adventure', 'Bạn lao vào hành trình với năng lượng và đam mê. Hãy hướng nhiệt huyết đó có mục tiêu.', 'You charge into the adventure with energy and passion. Aim that fire at a goal.',
   'Nóng vội, thiếu định hướng, hấp tấp', 'Haste, recklessness, no direction', 'Năng lượng đang thiếu định hướng và dễ bốc đồng. Hãy chậm lại và lập kế hoạch.', 'Energy lacks direction and turns impulsive. Slow down and make a plan.'],
  ['Tự tin, lôi cuốn, quyết đoán', 'Confidence, charisma, determination', 'Bạn truyền cảm hứng cho người khác bằng sự tự tin và đam mê. Hãy dẫn dắt bằng nhiệt huyết.', 'You inspire others with confidence and passion. Lead with your fire.',
   'Bốc đồng, áp đặt, thiếu kiên nhẫn', 'Impulsiveness, domineering, impatience', 'Sự tự tin có thể thành áp đặt hoặc nóng nảy. Hãy dẫn dắt bằng sự kiên nhẫn.', 'Confidence can become domineering or hot-tempered. Lead with patience.'],
  ['Tầm nhìn, lãnh đạo, khởi xướng', 'Vision, leadership, big ideas', 'Bạn có tầm nhìn lớn và khả năng truyền lửa. Hãy biến ý tưởng táo bạo thành hiện thực.', 'You hold a grand vision and inspire others. Turn bold ideas into reality.',
   'Độc đoán, kỳ vọng quá cao, bốc đồng', 'Overbearing, unrealistic, impulsive', 'Tầm nhìn có thể thành kỳ vọng phi thực tế hoặc độc đoán. Hãy lắng nghe và thực tế hơn.', 'Vision can turn unrealistic or domineering. Listen and stay grounded.'],
]

export const minorArcana: TarotCard[] = [
  ...buildSuit('cups', CUPS),
  ...buildSuit('pentacles', PENTACLES),
  ...buildSuit('swords', SWORDS),
  ...buildSuit('wands', WANDS),
]
