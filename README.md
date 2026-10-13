# 🔮 zam-affi-quiz — Dynamic Quiz Portal for Manga & High-Converting Affiliate Offers

> **Production Domain**: [quiz.zamverse.com](https://quiz.zamverse.com)  
> **Platform**: Vercel (Edge CDN, Zero-Config, Fast Static Routing)  
> **ClickBank Affiliate Nickname**: `gnite`

---

## 🌟 TỔNG QUAN DỰ ÁN

`zam-affi-quiz` là hệ thống Web Quiz động (Dynamic Multi-Quiz Engine) được tối ưu đo ni đóng giày cho khán giả đọc truyện **Manga / Manhwa / Anime** (Đặc biệt là tệp độc giả Manga Nữ: Manhwa Ladies, Melodies, Sweetie, Duchess... và Manga Nam: Returner, Reel...).

Trang web đóng vai trò là **"Tấm khiên an toàn" (Compliant Bridge Page)**:
- Không vi phạm chính sách của YouTube / Google Safe Browsing (khách chủ động làm test và tự bấm link sang ClickBank).
- Tăng tỷ lệ chuyển đổi (CVR) gấp 3–5 lần so với việc dán link bán hàng thô sơ.
- Tự động bắt mã Video ID để theo dõi doanh thu ClickBank chi tiết theo từng video (`TID`).

---

## 🎯 DANH MỤC CÁC BÀI QUIZ ĐƯỢC TÍCH HỢP SẴN

| URL Slug | Sản Phẩm ClickBank & Vendor | Tệp Khán Giả Mục Tiêu | Hoplink Tự Động (`gnite`) |
| :--- | :--- | :--- | :--- |
| **`/soulmate`** | **Soulmate Sketch** (`tinapsc`) | Fan Manga Nữ / Romance / Otome / Duke of the North | `https://hop.clickbank.net/?affiliate=gnite&vendor=tinapsc&tid=...` |
| **`/love-secret`** | **His Secret Obsession** (`hissecret`) | Nữ giới / Tâm lý tình cảm đàn ông ("Hero Instinct") | `https://hop.clickbank.net/?affiliate=gnite&vendor=hissecret&tid=...` |
| **`/glowup`** | **Cinderella Glow-Up** (`javaburn`) | Nữ giới / Giảm cân / Thải độc / Làm đẹp | `https://hop.clickbank.net/?affiliate=gnite&vendor=javaburn&tid=...` |
| **`/brainwave`** | **Billionaire Brain Wave** (`attractbr`) | Fan Manga Nam / Shonen / System Leveling | `https://hop.clickbank.net/?affiliate=gnite&vendor=attractbr&tid=...` |

---

## 📊 CƠ CHẾ TRACKING TỪNG VIDEO YOUTUBE (TID)

Khi đăng comment lên YouTube, anh chỉ cần gắn thêm đuôi `?v=ID_VIDEO`:

```
https://quiz.zamverse.com/soulmate?v=4r0MRF8j9pI
```

Hệ thống sẽ tự động bóc tách `4r0MRF8j9pI` và gán vào ClickBank Hoplink:
`https://hop.clickbank.net/?affiliate=gnite&vendor=tinapsc&tid=4r0MRF8j9pI`

Khi có người mua hàng, trang thống kê Analytics của ClickBank sẽ hiển thị chính xác **video nào đã tạo ra đơn hàng**!

---

## 🚀 HƯỚNG DẪN DEPLOY LÊN VERCEL (3 BƯỚC CỰC NHANH)

### Bước 1: Kết nối Repo vào Vercel
1. Truy cập [vercel.com](https://vercel.com) ➡️ Bấm **"Add New Project"**.
2. Chọn Repository: `longhtd/zam-affi-quiz`.
3. Framework Preset: Để mặc định **Other** (hoặc Static).
4. Bấm **Deploy** (chỉ mất ~10 giây).

### Bước 2: Gắn Tên Miền Custom `quiz.zamverse.com`
1. Trong dashboard dự án Vercel, vào **Settings** ➡️ **Domains**.
2. Nhập: `quiz.zamverse.com` ➡️ Bấm **Add**.
3. Vercel sẽ cung cấp bản ghi CNAME (thường là `cname.vercel-dns.com`).

### Bước 3: Cấu hình DNS trên Cloudflare (cho tên miền zamverse.com)
1. Mở Cloudflare ➡️ Chọn domain `zamverse.com` ➡️ Mục **DNS Records**.
2. Thêm bản ghi mới:
   - **Type**: `CNAME`
   - **Name**: `quiz`
   - **Target**: `cname.vercel-dns.com`
   - **Proxy status**: `DNS only` (hoặc Proxied đều được).
3. Chờ 1–2 phút là `https://quiz.zamverse.com` sẽ hoạt động mượt mà với chứng chỉ SSL miễn phí!

---

## ✍️ MẪU PINNED COMMENT YOUTUBE SẴN DÙNG (COPY-PASTE READY)

### 1. Cho các kênh Manga Nữ (Otome / Romance) ➡️ Đẩy Soulmate Sketch
```markdown
✨ A little fun test for our romantic readers: 
Ever wonder who your real-life "Duke of the North" is? 

Take this quick 45-second quiz to uncover your destined partner's archetype and reveal their psychic sketch:
👉 https://quiz.zamverse.com/soulmate?v={VIDEO_ID}
(100% free • Instant personalized result)
```

### 2. Cho video có nam chính lạnh lùng / Drama tình cảm ➡️ Đẩy His Secret Obsession
```markdown
👑 Why do men pull away even when things seem perfect?
Discover the hidden "Hero Instinct" psychological trigger that makes a man fiercely devoted to you:
👉 https://quiz.zamverse.com/love-secret?v={VIDEO_ID}
(Quick 60-second assessment • Watch the free counselor masterclass)
```

### 3. Cho video nữ chính chuyển sinh / Lột xác xinh đẹp ➡️ Đẩy Glow-Up
```markdown
💎 Ready for your real-life Cinderella glow-up?
Take the 45-second metabolic audit to discover your true biological body score and the natural morning routine:
👉 https://quiz.zamverse.com/glowup?v={VIDEO_ID}
```
