

# ChatKings — MVP UI Prototype Plan

## Design Direction
Dark & bold design inspired by DraftKings/FanDuel. Dark backgrounds (#0F1923-ish), bright accent colors (electric green for live indicators, gold for wins/points, red for strikes), and high-contrast white text. Team-thematic color accents in chat screens.

---

## Phase 1: Core Screens (This Build)

### 1. Home Screen
- **Header**: ChatKings logo + hamburger menu icon
- **Live Games Banner**: Dark card with pulsing green "LIVE" dot, horizontal scroll of live game cards (team names, scores, sport icon)
- **My Groupchats**: 2-column grid of chat cards with team imagery/colors, group name, and description
- **Followed Events**: 2-column grid of upcoming game cards with date, teams, and sport. Filter chips for "Live Now" / "Today" when many games exist
- All cards tappable to navigate to chat or pro-dictions

### 2. Chat Interface
- **Top bar**: Game title, live indicator, score display, "Watch Game" link
- **Messages area**: Alternating left/right bubbles with usernames, team-thematic bubble colors (e.g., navy/orange for Bears, blue/red for BYU/Utah)
- **Bet messages**: Special highlighted card style with "Take Bet" button, point amounts shown
- **Bet results**: Win celebrations with gold accents, loss messages
- **Points display**: Running point totals visible per user
- **Bottom**: Message input bar + send button + quick action FAB for placing bets
- **Chat info**: Tappable header to see group members, chat leaderboard, point balances

### 3. Pro-dictions (Betting) Screen
- **Game info card**: Teams, date/time, current score if live, "Watch Game" link
- **Point balance**: Large prominent display — available, locked in bets, total
- **Strike indicator**: Visual ⚡⚡○ display with warning text at 2 strikes
- **Betting categories**: Accordion sections (Winner, Score, Over/Under, Player Predictions) with helper text explaining each
- **Bet confirmation modal**: Full overlay showing bet details, point wager, "Confirm Bet" and "Cancel" buttons

---

## Phase 2: Supporting Screens (Follow-up builds)

### 4. Friends Page
- Add friend by code input + button
- Friend requests list with avatar, name, activity preview, Accept/Decline buttons

### 5. Menu (Hamburger Drawer)
- **King Status**: Total points, win streak, chats where user is "king" — celebratory design
- **My Bets**: Betting history list
- **Leaderboard**: Filterable views (lifetime, per-game, per-chat, weekly/monthly)
- **How to Play**: Rules, point system, strike system explained clearly
- **Create a Chat**: Quick action

### 6. Onboarding Flow
- Welcome screen, point system tutorial, strike system explainer, first bet walkthrough

---

## Mock Data
All screens will use hardcoded mock data: sample games (Bears/Eagles, BYU/Utah, etc.), sample users (Andy, Joe, etc.), sample bets and chat messages, point balances, and leaderboard rankings. No backend needed yet.

## Navigation
- Bottom or header-based navigation between Home, Friends, and Chat
- Hamburger menu for secondary features
- Smooth page transitions between screens
- Mobile-first responsive layout (optimized for phone screens)

## Key UX Details Included
- Pulsing green live indicator animation
- Team-thematic chat colors
- Bet confirmation flow to prevent accidental taps
- Strike count warnings
- Point balance always visible when betting
- Helper text on all betting categories
- Celebration styling for wins (gold accents, trophy icons)

