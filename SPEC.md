# ChatKings — Project Specification

> **Purpose:** This document is the single source of truth for the ChatKings project. All code changes must align with this specification. When features are added, removed, or modified, update this document first, then update the code to match.

---

## Overview

ChatKings is a mobile-first social sports prediction app where friends compete in group chats by making predictions on live games with virtual points. The app uses a dark, bold design inspired by DraftKings/FanDuel. There is no real money — only virtual points, bragging rights, and the goal of becoming "King" of your chat.

**Tech Stack:** React 18 + TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router v6, TanStack React Query (configured, not yet active), Vitest + React Testing Library.

**Target:** Mobile-first, constrained to `max-w-md` (448px). Desktop shows centered phone-width layout.

---

## Design System

### Color Palette

| Token        | HSL Value         | Usage                                    |
|--------------|-------------------|------------------------------------------|
| background   | 210 60% 7%       | Page background (very dark navy)         |
| foreground   | 210 20% 95%      | Primary text (near-white)                |
| primary      | 142 70% 45%      | CTA buttons, active states (green)       |
| secondary    | 210 40% 15%      | Inactive buttons, inputs (dark blue)     |
| accent / gold| 45 100% 55%      | Points, wins, king status (gold/yellow)  |
| strike       | 0 72% 51%        | Losses, warnings, strikes (red)          |
| surface      | 210 45% 12%      | Section backgrounds (slightly lighter)   |
| live         | 142 70% 45%      | Live indicators (matches primary green)  |
| card         | 210 50% 10%      | Card backgrounds                         |
| border       | 210 30% 18%      | Borders, dividers                        |
| muted        | 210 15% 55%      | Secondary text, placeholders             |

### Typography

| Font          | Family        | Usage                              |
|---------------|---------------|------------------------------------|
| heading       | Russo One     | Headings, stats, branding          |
| body (default)| Inter         | Body text, labels, descriptions    |

### Animations

| Class        | Effect                                          |
|--------------|-------------------------------------------------|
| pulse-live   | Pulsing opacity (1 → 0.4) on live indicators   |
| hover-scale  | Scale 105% on hover, 95% on active press       |
| animate-fade-in | Fade in + slide up on page load (0.3s)      |

### Component Patterns

- **Cards:** `rounded-xl border border-border bg-card p-3/p-4`
- **Inputs:** `bg-secondary rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary`
- **Primary buttons:** `bg-primary text-primary-foreground rounded-xl font-semibold hover-scale`
- **Filter pills:** `px-3 py-1.5 rounded-full text-xs font-medium` (active: `bg-primary`, inactive: `bg-secondary`)
- **Section headers:** `font-heading text-sm tracking-wider uppercase text-foreground`

---

## App Layout & Navigation

### Layout Structure

```
/onboarding → Full-screen (no header/nav)

All other routes → AppLayout:
  ┌─────────────────────────┐
  │ Header (sticky top)     │  Logo + Hamburger Menu
  ├─────────────────────────┤
  │                         │
  │   Page Content          │  <Outlet />
  │                         │
  ├─────────────────────────┤
  │ BottomNav (fixed bottom)│  Home | Chats | Friends
  └─────────────────────────┘
```

### Bottom Navigation (3 tabs)

| Tab      | Icon           | Path       | Notes                     |
|----------|----------------|------------|---------------------------|
| Home     | HomeIcon       | `/`        | Main landing page         |
| Chats    | MessageSquare  | `/chat/c1` | Opens first chat          |
| Friends  | Users          | `/friends` | Friends & requests        |

### Hamburger Menu (Slide-out Drawer, right side)

Shows current user profile (avatar, name, points, W-L record) at top, then:

| Item            | Icon       | Path            | Icon Color |
|-----------------|------------|-----------------|------------|
| King Status     | Crown      | `/king-status`  | gold       |
| My Bets         | History    | `/my-bets`      | primary    |
| Leaderboard     | Trophy     | `/leaderboard`  | gold       |
| How to Play     | HelpCircle | `/how-to-play`  | primary    |
| Create a Chat   | Plus       | `/create-chat`  | primary    |

Sign Out button at bottom of drawer.

---

## Route Map

| Route                    | Page          | Layout    | Description                         |
|--------------------------|---------------|-----------|-------------------------------------|
| `/`                      | Home          | AppLayout | Live games, groupchats, events      |
| `/chat/:chatId`          | Chat          | AppLayout | Group chat with bet messaging       |
| `/predictions/:gameId`   | Predictions   | AppLayout | Pro-dictions betting screen         |
| `/friends`               | Friends       | AppLayout | Friends list & requests             |
| `/king-status`           | KingStatus    | AppLayout | User's crown & stats                |
| `/my-bets`               | MyBets        | AppLayout | Betting history & results           |
| `/leaderboard`           | Leaderboard   | AppLayout | Rankings with podium & filters      |
| `/how-to-play`           | HowToPlay     | AppLayout | Rules & tutorial                    |
| `/create-chat`           | CreateChat    | AppLayout | New group chat form                 |
| `/onboarding`            | Onboarding    | None      | 4-step first-time walkthrough       |
| `*`                      | NotFound      | AppLayout | 404 page                           |

---

## Pages

### Home (`/`)

The main landing screen. Three sections stacked vertically.

**Live Games Banner** (bg-surface)
- Pulsing green "LIVE" dot + heading
- Horizontal scroll of live game cards
- Each card: sport, live time with pulse dot, teams, score, TV channel
- Tap → `/predictions/{gameId}`

**My Groupchats** (2-column grid)
- Section heading with chevron-right
- Cards with gradient-colored header (team color), emoji, chat name, description, member count
- Tap → `/chat/{chatId}`

**Followed Events** (2-column grid)
- Filter pills: "All" | "Live Now" | "Today"
- Game cards: sport, teams matchup, date/time, "Quick Bet →" link
- Tap card or Quick Bet → `/predictions/{gameId}`

**State:** `activeFilter`
**Data:** `liveGames`, `upcomingGames`, `groupChats`

---

### Chat (`/chat/:chatId`)

Group chat interface with betting integration.

**Top Bar** (bg-surface)
- Back arrow → `/`, chat name, LIVE badge with pulse, game info (teams, quarter, score), Watch button

**Points Bar** (bg-card)
- Horizontal row of first 4 users: avatar, name, points (gold)

**Messages Area** (scrollable)
- **Regular messages:** Left/right aligned bubbles, team-color tinted backgrounds, username, timestamp
- **Bet messages:** Star icon, "{User}'s Bet" label, description, points, "Take Bet" button (if not own bet)
- **Bet-accepted:** Centered pill with Zap icon — "{User} took {User}'s bet · {pts} pts"
- **Bet-result:** Centered card, gold border+bg for wins (Trophy icon), red for losses

**Input Bar** (bottom)
- Text input + Send button (primary)

**FAB** (floating, bottom-right above nav)
- Zap icon → `/predictions/g4`

**State:** `message`
**Data:** `chatMessages`, `groupChats`, `users`

---

### Predictions (`/predictions/:gameId`)

The "Pro-dictions" betting screen.

**Header** — Back arrow + "Pro-dictions" title

**Game Card**
- Sport label, LIVE badge (if live), teams layout (away VS home) with avatars and scores, date/time (if not live), "Watch on {Channel}" button

**Point Balance & Strikes** (2-column)
- Left: Available points (gold), locked points note
- Right: 3 Zap icons (filled = strike earned), warning text at 2+ strikes

**Betting Categories** (Accordion, 4 sections)
- **Winner:** Home Team Wins (+120), Away Team Wins (-140)
- **Point Spread:** Home -3.5 (-110), Away +3.5 (-110)
- **Over/Under:** Over 45.5 (-110), Under 45.5 (-110)
- **Player Predictions:** QB 250+ yards (+150) [PRO], RB 100+ yards (+200) [PRO]
- Tap any option → opens confirmation modal

**Bet Confirmation Modal** (overlay)
- Category + bet description + odds
- Wager buttons: 10 / 25 / 50 / 100 pts
- Remaining points calculation (gold)
- Strike warning (if 2+ strikes)
- Cancel + "Confirm Bet" buttons

**State:** `selectedBet`, `wager`, `showConfirm`
**Data:** `liveGames`, `upcomingGames`, `currentUser`

---

### Friends (`/friends`)

Friend management page.

**Add Friend Section** (bg-surface)
- Code input + UserPlus submit button
- "Your code: CK-7X92M" with Copy button (shows "Copied!" feedback)

**Tabs:** "Friends ({count})" | "Requests" (with red count badge)

**Friends Tab**
- Search input with search icon
- Friend cards: avatar with online/offline dot, name, W-L record, points (gold)

**Requests Tab**
- Request cards: avatar, name, activity text, points (gold), Accept (check) + Decline (X) buttons
- Empty state: UserPlus icon + "No pending requests"

**State:** `friendCode`, `addCode`, `requests`, `copied`, `tab`
**Data:** `friendRequests`, `friends`

---

### King Status (`/king-status`)

Celebratory profile page.

**Crown Card** (gold gradient border, gradient bg)
- Large crown icon (gold circle), user name (gold, 2xl heading), "ChatKings Member"
- Stats row: Total Points | Wins | Losses (with vertical dividers)

**Win Streak Card**
- Flame icon, current streak (large heading), best streak note

**King of These Chats**
- Trophy icon heading
- Cards for each chat where user is king: team-colored avatar with crown, chat name, member count, "KING" label
- Empty state message if not king of any chat

**Data:** `currentUser`, `groupChats` (first 2 as king chats)

---

### My Bets (`/my-bets`)

Betting history with filtering.

**Stats Overview** (3-column grid)
- Wins (primary), Losses (strike/red), Net Points (gold, +/- format)

**Filters:** "All" | "Wins" | "Losses" | "Pending"

**Bet List**
- Cards with result icon (Trophy/X/Clock), description, game name, category + date, points (+/- colored), status label
- Border color coded: primary (win), strike (loss), default (pending)

**State:** `filter`
**Data:** `betHistory`

---

### Leaderboard (`/leaderboard`)

Rankings with visual podium.

**Top 3 Podium**
- 3-column layout: 2nd (left, gray), 1st (center, gold, tallest), 3rd (right, orange)
- Each: avatar with colored border, name, points, pedestal bar

**Time Filters:** "Lifetime" | "Weekly" | "Monthly" (primary pill style)
**Scope Filters:** "Global" | "Per Chat" (gold pill style)

**Full Leaderboard List**
- Rank icon (Crown for #1, Medal for #2-3, number for rest), avatar, name, wins + win rate, points (gold)
- Current user row highlighted with primary border

**State:** `timeFilter`, `scopeFilter`
**Data:** `leaderboard`

---

### How to Play (`/how-to-play`)

Rules and tutorial content.

**Intro** — "Welcome to ChatKings" + subtitle

**4 Info Sections** (cards with numbered lists):
1. **Making Predictions** (Target icon, primary) — 4 steps
2. **Point System** (Trophy icon, gold) — 5 rules
3. **Strike System** (Zap icon, strike/red) — 5 rules
4. **Chat Bets** (MessageSquare icon, primary) — 4 rules

**Warning Card** (strike border/bg)
- "ChatKings uses virtual points only — no real money is involved."

---

### Create a Chat (`/create-chat`)

New group chat creation form.

**Form Fields:**
- Chat Name (text input, required)
- Description (text input)
- Link to Game (optional, scrollable list of up to 6 games, selectable with primary highlight)

**Invite Friends Info** (card with Users icon)
- Instructions about sharing chat code after creation

**Create Button** — Primary if name filled, disabled (secondary) if empty

**State:** `name`, `description`, `selectedGame`
**Data:** `liveGames`, `upcomingGames`

---

### Onboarding (`/onboarding`)

4-step first-time user walkthrough. Full-screen (no AppLayout).

**Progress Bar** — 4 segments at top, filled up to current step

**Skip Button** — Top-right, navigates to `/`

**Steps:**

| Step | Title              | Icon    | Key Content                                    |
|------|--------------------|---------|------------------------------------------------|
| 1    | Welcome to ChatKings | Crown (gold) | App intro, sports icons (NFL, NBA, College) |
| 2    | Point System       | Trophy (gold) | 500 starting points, win/lose rules, King info |
| 3    | Strike System      | Zap (red)    | 3 visual zap icons, weekly reset, warning      |
| 4    | Place Your First Bet | Target (primary) | 5-step numbered walkthrough with emojis   |

**Bottom Actions:**
- "Continue" (with chevron) or "Let's Go!" on final step → navigates to `/`
- "Back" button (hidden on step 0)

**State:** `step` (0-3)

---

## Data Models

All data is currently hardcoded mock data in `src/data/mockData.ts`. These interfaces define the shape of data throughout the app.

### Game
```typescript
{
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number          // Present if live
  awayScore?: number          // Present if live
  sport: string               // e.g., "🏈 NFL", "🏀 NBA"
  date: string                // e.g., "Now", "Sep 22"
  time: string                // e.g., "Q3 8:42", "7:00 PM"
  isLive: boolean
  channel?: string            // e.g., "ESPN", "TNT"
  homeColor: string           // HSL values, e.g., "160 60% 30%"
  awayColor: string
}
```

### GroupChat
```typescript
{
  id: string
  name: string
  description: string
  gameId?: string             // Linked game (optional)
  teamColor: string           // HSL values
  memberCount: number
}
```

### ChatMessage
```typescript
{
  id: string
  userId: string
  username: string
  text: string
  timestamp: string
  type: "message" | "bet" | "bet-accepted" | "bet-result"
  betDetails?: {
    description: string
    points: number
    won?: boolean
    takenBy?: string
  }
  isCurrentUser?: boolean
}
```

### User
```typescript
{
  id: string
  name: string
  points: number
  avatar: string              // Emoji
  wins: number
  losses: number
}
```

### Friend (extends User shape)
```typescript
{
  id: string
  name: string
  avatar: string
  points: number
  wins: number
  losses: number
  status: "online" | "offline"
}
```

### FriendRequest
```typescript
{
  id: string
  name: string
  avatar: string
  activity: string            // e.g., "5-game win streak!"
  points: number
}
```

### BetHistoryItem
```typescript
{
  id: string
  description: string
  points: number
  won: boolean | null         // null = pending
  game: string
  date: string
  category: string            // e.g., "Winner", "Over/Under"
}
```

### LeaderboardEntry
```typescript
{
  rank: number
  userId: string
  name: string
  avatar: string
  points: number
  wins: number
  winRate: number             // Percentage (e.g., 81)
}
```

### Mock Data Collections

| Export           | Type               | Count | Description                              |
|------------------|--------------------|-------|------------------------------------------|
| currentUser      | User               | 1     | "You" — 1250 pts, 18W-7L                |
| users            | User[]             | 5     | currentUser + Andy, Joe, Mike, Sarah     |
| liveGames        | Game[]             | 3     | Eagles/Bears, Knicks/Clippers, Seahawks/Broncos |
| upcomingGames    | Game[]             | 8     | Future college + NFL matchups            |
| groupChats       | GroupChat[]        | 4     | BYU Bruthas, Da Bears, Family, Office    |
| chatMessages     | ChatMessage[]      | 10    | Mix of message types                     |
| friendRequests   | FriendRequest[]    | 3     | Tyler, Emma, Carlos                      |
| friends          | Friend[]           | 5     | Andy, Joe, Mike, Sarah, Tyler            |
| betHistory       | BetHistoryItem[]   | 7     | Mix of won, lost, pending                |
| leaderboard      | LeaderboardEntry[] | 8     | Joe #1, You #2, Sarah #3...             |

---

## Navigation Flows

### Primary User Journeys

```
App Launch → / (Home)
  ├── Tap live game card → /predictions/:gameId
  ├── Tap groupchat card → /chat/:chatId
  │     ├── Tap FAB (Zap) → /predictions/g4
  │     └── Tap back arrow → /
  ├── Tap "Quick Bet" on event → /predictions/:gameId
  │     └── Tap back arrow → previous page
  ├── Bottom nav: Chats → /chat/c1
  ├── Bottom nav: Friends → /friends
  └── Hamburger menu →
        ├── King Status → /king-status
        ├── My Bets → /my-bets
        ├── Leaderboard → /leaderboard
        ├── How to Play → /how-to-play
        └── Create a Chat → /create-chat
```

### First-Time User
```
/onboarding → Step 1 → Step 2 → Step 3 → Step 4 → / (Home)
                                                  ↑
                                          (Skip at any point)
```

### Back Navigation
All sub-pages (King Status, My Bets, Leaderboard, How to Play, Create a Chat, Chat, Predictions) use `navigate(-1)` for their back arrows, returning to the previous page in browser history.

---

## File Structure

```
src/
├── App.tsx                         # Route definitions
├── main.tsx                        # React DOM entry
├── index.css                       # Tailwind base + custom CSS vars + utilities
│
├── components/
│   ├── AppLayout.tsx               # Shared layout (Header + Outlet + BottomNav)
│   ├── Header.tsx                  # Top bar (logo + hamburger menu trigger)
│   ├── BottomNav.tsx               # Bottom 3-tab navigation
│   ├── MenuDrawer.tsx              # Hamburger slide-out drawer (right side)
│   ├── NavLink.tsx                 # NavLink wrapper utility
│   └── ui/                         # shadcn/ui component library (50+ components)
│
├── pages/
│   ├── Home.tsx                    # / — Main landing
│   ├── Chat.tsx                    # /chat/:chatId — Group chat
│   ├── Predictions.tsx             # /predictions/:gameId — Betting screen
│   ├── Friends.tsx                 # /friends — Friends & requests
│   ├── KingStatus.tsx              # /king-status — Crown & stats
│   ├── MyBets.tsx                  # /my-bets — Bet history
│   ├── Leaderboard.tsx             # /leaderboard — Rankings
│   ├── HowToPlay.tsx               # /how-to-play — Rules & tutorial
│   ├── CreateChat.tsx              # /create-chat — New chat form
│   ├── Onboarding.tsx              # /onboarding — First-time walkthrough
│   ├── NotFound.tsx                # 404
│   └── Index.tsx                   # Unused template fallback
│
├── data/
│   └── mockData.ts                 # All interfaces + mock data collections
│
├── hooks/
│   ├── use-mobile.tsx              # Mobile viewport detection
│   └── use-toast.ts                # Toast notification hook
│
├── lib/
│   └── utils.ts                    # cn() class merge utility
│
└── test/
    ├── setup.ts                    # Vitest config
    └── example.test.ts             # Example test
```

---

## Game Rules (In-App Logic)

These rules define the virtual economy. Currently displayed in How to Play and reflected in the UI, but not enforced by code (mock data only).

| Rule                  | Detail                                                |
|-----------------------|-------------------------------------------------------|
| Starting points       | 500 per user                                          |
| Win a bet             | Earn points equal to wager                            |
| Lose a bet            | Lose points equal to wager                            |
| Strikes per week      | 3 maximum                                             |
| Strike earned         | On each lost bet                                      |
| 3 strikes             | Locked out of betting until Monday reset              |
| King of chat          | Player with most points in a group chat               |
| Win streak bonus      | Bonus points at 5+ consecutive wins                   |
| Bet types             | Winner, Point Spread, Over/Under, Player Predictions  |
| Wager amounts         | 10, 25, 50, 100 points                               |

---

## State Management

**Current approach:** Local component state via `useState`. No global store.

| Page         | State Variables                                    |
|--------------|----------------------------------------------------|
| Home         | `activeFilter`                                     |
| Chat         | `message`                                          |
| Predictions  | `selectedBet`, `wager`, `showConfirm`              |
| Friends      | `friendCode`, `addCode`, `requests`, `copied`, `tab` |
| MyBets       | `filter`                                           |
| Leaderboard  | `timeFilter`, `scopeFilter`                        |
| CreateChat   | `name`, `description`, `selectedGame`              |
| Onboarding   | `step`                                             |
| Header       | `menuOpen`                                         |

**React Query:** Configured globally in App.tsx but not yet used. Ready for API integration.

---

## Future Considerations

These items are not yet implemented but may be added:

- Backend API integration (replace mock data with real endpoints)
- User authentication / login
- Real-time chat messaging (WebSocket)
- Push notifications
- Game data feeds (live scores)
- Bet settlement logic
- Point transaction history
- User profile editing
- Chat management (leave, invite, settings)
- Responsive desktop layout
- Comprehensive test suite
