# Poplix

Poplix is a modern social media web application built with Next.js, React, MongoDB, Socket.IO, Cloudinary and Stripe. It provides social networking features such as posts, comments, likes, reposts, following, bookmarks, real-time messaging, notifications, AI interactions, premium content, and verified organizations.

## Key Features

- Authentication with signup, login, OTP verification, JWT tokens and session support
- User profiles, followers/following, follow suggestions, and profile search
- Post creation, viewing, saving, liking, reposting, commenting, and trending feeds
- Bookmarks, saved posts, and posts for followed users
- Real-time messaging and chat contact list powered by Socket.IO
- Notifications for likes, comments, follows, reposts, and system events
- Explore pages for search, trending content, premium content, and verified organizations
- AI chat / PopAI integration for intelligent conversation and content assistance
- Stripe payment integration for premium access or checkout flows
- PWA-ready assets, manifest, and service worker support

## Technology Stack

- Next.js 16 (App Router)
- React 19
- MongoDB with Mongoose
- Socket.IO for real-time messaging and notifications
- Cloudinary for media uploads
- Stripe for payments
- Tailwind CSS for styling
- Node.js and Express-style API route handlers

## Folder Structure

```
poplix/
  ├─ actions/              # API route handler modules for server-side operations
  │   ├─ ai/               # AI feature endpoints
  │   ├─ auth/             # Authentication endpoints (signup, login, OTP, verify)
  │   ├─ bookmarks/        # Bookmarks API
  │   ├─ explore/          # Explore / search API endpoints
  │   ├─ followsuggetions/ # Follow suggestion endpoints
  │   ├─ me/               # Current user helper endpoints
  │   ├─ messages/         # Messaging APIs and chat contact retrieval
  │   ├─ notification/     # Notification retrieval endpoints
  │   ├─ postActions/      # Post-related actions (likes, comments, reposts, save, delete)
  │   ├─ profile/          # Profile follow/check APIs
  │   ├─ trending/         # Trending feed APIs
  │   └─ userposts/        # User post listing endpoints
  ├─ app/                  # Next.js App Router pages and route segments
  │   ├─ api/              # Edge and server routes for app API endpoints
  │   ├─ bookmarks/        # Bookmarks page
  │   ├─ explore/          # Explore UI pages
  │   ├─ home/             # Home feed page
  │   ├─ message/          # Messaging UI pages
  │   ├─ more/             # More options / utility pages
  │   ├─ notifications/    # Notifications page
  │   ├─ popai/            # AI chat interface page
  │   ├─ post/             # Post details and post page
  │   ├─ premium/          # Premium user pages
  │   ├─ verified-orgs/    # Verified organizations page
  │   ├─ [username]/       # Dynamic user profile pages
  │   ├─ globals.css       # Global styling
  │   ├─ head.js           # Metadata and head config
  │   ├─ layout.jsx        # Root layout for all pages
  │   └─ LayoutClient.jsx  # Client wrapper layout for hydrated UI
  ├─ components/           # Reusable React components
  │   ├─ Auth.jsx
  │   ├─ Card.jsx
  │   ├─ CheckoutPayment.jsx
  │   ├─ CustomVideoPlayer.jsx
  │   ├─ DeleteCommentModal.jsx
  │   ├─ GlassSidebar.jsx
  │   ├─ Loader.jsx
  │   ├─ Loading.jsx
  │   ├─ LogoLoader.jsx
  │   ├─ Media.jsx
  │   ├─ NotificationSkeleton.jsx
  │   ├─ Popai.jsx
  │   ├─ Popaichatoverlay.jsx
  │   ├─ PostComment.jsx
  │   ├─ PostShow.jsx
  │   ├─ ProfilepageLoader.jsx
  │   └─ SwipeToGoBack.jsx
  ├─ lib/                  # Library utilities and shared helpers
  │   ├─ cloudinary.js     # Cloudinary upload configuration
  │   ├─ db.js             # MongoDB connection helper
  │   ├─ getUserIdfromToken.js # JWT token parsing helper
  │   └─ mailer.js         # Email sending helper
  ├─ models/               # Mongoose schemas and data models
  │   ├─ AiChat.models.js
  │   ├─ Block.models.js
  │   ├─ Chat.models.js
  │   ├─ Comment.models.js
  │   ├─ Group.models.js
  │   ├─ Message.models.js
  │   ├─ MessageChat.models.js
  │   ├─ Notification.models.js
  │   ├─ Post.models.js
  │   ├─ Suggetion.models.js
  │   └─ User.models.js
  ├─ public/               # Static assets, icons, manifest, service worker
  │   ├─ manifest.json
  │   ├─ sw.js
  │   ├─ workbox-4754cb34.js
  │   └─ icons/
  │   └─ images/
  │   └─ logos/
  ├─ utils/                # Miscellaneous utility constants and helpers
  │   └─ status.js
  ├─ socket-server/        # Separate real-time socket server project
  │   ├─ socket-server/
  │   │   ├─ package.json
  │   │   ├─ server.js
  │   │   └─ models/
  ├─ features-docs/        # Project notes, feature docs, and issue tracking
  ├─ middleware.js         # Global middleware for API request handling
  ├─ next.config.js        # Next.js configuration
  ├─ postcss.config.mjs    # PostCSS configuration
  ├─ eslint.config.mjs     # ESLint configuration
  └─ tsconfig.json         # TypeScript settings
```

## Detailed Folder Descriptions

### `actions/`
This folder contains server-side route handlers that support the frontend. Each subfolder groups API behavior by domain.

- `auth/` handles signup, login, OTP verification, user info retrieval, and validation helpers.
- `postActions/` contains post operations including like, save, repost, delete, comments, and view tracking.
- `messages/` supports contact listing and message retrieval for chat.
- `notification/` returns notification streams for the authenticated user.
- `explore/`, `trending/`, and `bookmarks/` provide page-specific data endpoints.

### `app/`
Contains Next.js App Router pages and UI route segments.

- `page.jsx` is the home entry page.
- `layout.jsx` defines the top-level layout and providers.
- `LayoutClient.jsx` wraps client-side UI components requiring hydration.
- Nested folders such as `bookmarks/`, `message/`, `notifications/`, `premium/`, and `verified-orgs/` each host their own page UI.
- The dynamic `[username]/` route renders user profile pages.

### `components/`
Reusable UI components that are shared across the app.

- `Card.jsx` and `PostShow.jsx` render post/listing cards.
- `Auth.jsx` handles authentication forms and flows.
- `Popai.jsx` and `Popaichatoverlay.jsx` power the AI chat experience.
- `CheckoutPayment.jsx` handles Stripe checkout UI.
- `Loader.jsx`, `Loading.jsx`, and `NotificationSkeleton.jsx` improve loading states.

### `lib/`
Shared backend utilities.

- `db.js` connects to MongoDB.
- `cloudinary.js` configures media upload paths.
- `mailer.js` sends email notifications and OTP codes.
- `getUserIdfromToken.js` decodes auth tokens from requests.

### `models/`
Mongoose schemas that define the platform data model.

- `User.models.js` stores user profile, authentication, and follow relationships.
- `Post.models.js`, `Comment.models.js`, and `Notification.models.js` manage social activity.
- `Chat.models.js`, `Message.models.js`, and `MessageChat.models.js` support conversations.

### `socket-server/`
A separate Socket.IO server implementation for real-time communication.

- `server.js` launches the socket server.
- Contains its own `package.json` and model definitions.

## Getting Started

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the project root and configure environment variables for:

- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `STRIPE_SECRET_KEY`
- `EMAIL_USER`
- `EMAIL_PASS`

3. Run the development server

```bash
npm run dev
```

4. Open the app

```text
http://localhost:3000
```

## Available Scripts

- `npm run dev` - start the Next.js development server
- `npm run build` - build the production application
- `npm run start` - start the production server after build

## Notes

- `middleware.js` may include global request handling, authentication, or route rewrites.
- `public/manifest.json` and `sw.js` add PWA capabilities.
- The app uses both server-side and client-side rendering in the Next.js App Router.
- The project is organized so UI pages are separated from server action logic.

## Contributing

If you extend Poplix, preserve the folder conventions: keep API handlers in `actions/`, components in `components/`, and page route files in `app/`.

## License

This repository does not include a license declaration in the current package metadata. Add one if you want to publish or share the project publicly.
