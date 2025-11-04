# 🌐 Project Task & Feature Flow (Step-by-Step)

This document outlines the exact step-by-step development process for building the app — from setting up login to final features like real-time posts and notifications.

---

## 🧱 1. Authentication (User Onboarding)

- 🔹 Set up **Next.js** project with TypeScript and Tailwind CSS.
- 🔹 Configure **Mobile Number OTP** login flow:
  - Create `/login` page with phone number input
  - Send OTP using SMS API (e.g., Fast2SMS or Msg91)
  - Verify OTP and generate JWT
  - Store JWT in localStorage or cookies
- 🔹 Alternative login: Google Auth (Firebase Auth or Supabase)
- 🔹 Create Protected Routes using middleware/auth check

---

## 👤 2. User Profile Setup

- After login, redirect to `/onboarding` or `/profile-setup`
- Collect info like:
  - Name
  - City (for LocalBuzz)
  - Profile picture (upload to Firebase Storage)
- Save all data in **Firestore** or **Supabase DB**

---

## 🏡 3. Home Feed / Dashboard

- Setup `/home` or `/feed` page
- Show dynamic content based on:
  - Selected city or interests
  - Verified user posts
- Support infinite scroll or pagination

---

## 📝 4. Post Creation Flow

- Build `/post/create` form:
  - Text + Image or Short Video upload
  - Caption, tags, category
- Store media in Firebase Storage or Cloudinary
- Save post metadata to Firestore/Supabase
- Display preview after submission

---

## 🔄 5. Display Post Cards / Feed

- Reusable `<PostCard />` component
  - Author info, timestamp, image/video, caption
  - Like, Comment, Share buttons
- Video support using **HLS.js** (if short video platform)
- Fetch and show based on city, interests, or latest

---

## ❤️ 6. Engagement Features

- **Like**: toggle + update count
- **Comment**:
  - Modal or inline thread
  - Add comment & show reply chain
- **Share**: Copy link or share to social
- **Views tracking** (for videos): track on first play

---

## 🔔 7. Notifications (Optional but Powerful)

- Integrate **OneSignal** or Firebase Cloud Messaging
- Use for:
  - New comment on post
  - New followers
  - Moderator alerts

---

## 🧭 8. Navigation and Routing

- Setup main nav bar with:
  - Home, Create, Notifications, Profile
- Use Next.js `Link` for routing
- Protect routes based on login status

---

## 🛡️ 9. Security & User Data Protection

- OTPs hashed using **bcrypt**
- JWT secured with expiry
- Store minimal user data, encrypt sensitive info
- Use environment variables for secrets

---

## 📊 10. Admin or Moderator Panel (Future Add-on)

- Route: `/admin`
- View flagged content, user reports, analytics
- Allow post removal or user banning

---

## 🧪 11. Testing & Optimization

- Use Lighthouse for performance check
- Responsive test on mobile & tablets
- Lazy loading for images & videos
- Error handling for upload & auth

---

## 🧾 12. Deployment

- Deploy on **Vercel**
- Use environment variables for Firebase keys, JWT secret
- Enable SSR or ISR where needed (like for SEO pages)

---

## 🧪 13. Testing & QA Checklist

To ensure the app is reliable, responsive, and bug-free, the following testing strategies will be applied:

### 🔧 Unit Testing

- Test utility functions (e.g. `convertISOToEpoch()`, form validators)
- Tools: **Jest + ts-jest**
- Folder: `/__tests__/utils.test.ts`

### 💅 Component Testing

- Test core UI components like `<PostCard />`, `<CommentBox />`, `<UploadModal />`
- Simulate props, state changes, and user events
- Tools: **React Testing Library** + Jest
- Folder: `/__tests__/components/`

### 🔁 Integration Testing

- Simulate user flow:
  - Login → Create Post → View Post → Like/Comment
- Tools: **Playwright** or **Cypress**
- Folder: `/e2e/`

### 🔐 Auth Testing

- Test protected route access:
  - Access without JWT → Redirect to `/login`
  - Access with valid token → Proceed
- Simulate expired/invalid tokens

### 📱 Responsive Testing

- Check UI on multiple screen sizes
- Use browser DevTools or tools like **Percy** for visual diffs

### ⚙️ Performance Testing

- Use **Lighthouse** or Chrome DevTools Audit
- Target >90 performance score on mobile
- Optimize image/video loading with lazy loading

### 🚫 Edge Cases

- Upload errors (too large, wrong type)
- Empty form submissions
- Network failures / retry logic

---

## ✅ Testing Tools Summary

| Tool             | Purpose              |
|------------------|----------------------|
| Jest             | Unit + component test |
| React Testing Lib| UI testing           |
| Cypress/Playwright | End-to-end flow    |
| Lighthouse       | Performance + PWA    |
| ESLint + Prettier| Code quality         |

---

## 🧾 Sample Test Command

```bash
# Run all Jest tests
npm run test

# Run E2E tests
npx cypress open

# Run Lighthouse for performance
npx lighthouse http://localhost:3000 --view


## ✅ Sample Order of Tasks

```text
1. Login with Mobile OTP
2. Setup JWT-based auth
3. User profile page
4. Create & upload post
5. Fetch and display post feed
6. Like & comment feature
7. Protect private routes
8. Add Google login
9. Deploy to Vercel
