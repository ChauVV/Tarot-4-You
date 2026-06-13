# Tarot 4 You ✦

Ứng dụng web bói bài Tarot (Rider–Waite–Smith), chơi được trên cả web và mobile với thiết kế responsive.

A responsive web/mobile Tarot reading app built with React + TypeScript + Vite.

## Tính năng / Features

- 🎴 **Bộ bài đầy đủ 78 lá** Rider–Waite–Smith (1909, phạm vi công cộng — Wikimedia Commons).
- 🌗 **Đổi theme**: Tối (huyền bí) ↔ Sáng vàng. Lưu lựa chọn vào trình duyệt.
- 🌐 **Song ngữ Việt – Anh**: chuyển đổi tức thì, lưu lựa chọn.
- 🔮 **Quy trình xem bài**: chọn chủ đề / đặt câu hỏi → tráo bài → rút bài → lật & luận giải.
- 🃏 **3 kiểu trải bài**: Thông điệp ngày mới (1 lá), Quá khứ–Hiện tại–Tương lai (3 lá), Lựa chọn A/B (5 lá).
- ↕️ **Xuôi / Ngược**: mỗi lá có ~40% cơ hội ngược, với ý nghĩa riêng.
- ☀ **Lá bài của ngày**: rút 1 lá mỗi ngày (cố định theo ngày).
- 📓 **Nhật ký Tarot**: lưu lại các quẻ đã xem (localStorage).
- ✨ Hiệu ứng tráo bài & lật bài bằng framer-motion, nền sao chuyển động.

## Chạy dự án / Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + bundle vào dist/
npm run preview    # xem thử bản build
```

## Tải lại hình ảnh / Re-download card art

Hình ảnh nằm sẵn trong `public/cards/`. Nếu cần tải lại từ Wikimedia Commons:

```bash
npm run download-cards   # cần bash + curl
```

## Cấu trúc / Structure

```
public/cards/            78 lá + card-back (ảnh phạm vi công cộng)
src/
  data/                  cards.major.ts, cards.minor.ts, cards.ts, spreads.ts
  context/               Theme, Language, Reading (state qua các màn hình)
  hooks/                 useJournal (localStorage)
  utils/                 draw.ts (xáo/rút), cardOfDay.ts
  components/            TarotCardView, TopBar, Layout
  screens/               Home, Question, Shuffle, Draw, Reading, Journal, CardOfDay
  i18n/strings.ts        chuỗi giao diện song ngữ
  styles/index.css       theme (CSS variables) + responsive
```

## Bản quyền hình ảnh / Image credit

Bộ bài Rider–Waite–Smith xuất bản năm 1909 thuộc **phạm vi công cộng** (public domain).
Nguồn: [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Rider-Waite_tarot_deck_(Roses_%26_Lilies)).

> Tarot là công cụ phản chiếu và gợi mở, không phải lời tiên tri. Hãy dùng với tinh thần cởi mở.
