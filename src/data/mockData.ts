export interface Game {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  sport: string;
  date: string;
  time: string;
  isLive: boolean;
  channel?: string;
  homeColor: string;
  awayColor: string;
}

export interface GroupChat {
  id: string;
  name: string;
  description: string;
  gameId?: string;
  teamColor: string;
  memberCount: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: string;
  type: "message" | "bet" | "bet-accepted" | "bet-result";
  betDetails?: {
    description: string;
    points: number;
    won?: boolean;
    takenBy?: string;
  };
  isCurrentUser?: boolean;
}

export interface User {
  id: string;
  name: string;
  points: number;
  avatar: string;
  wins: number;
  losses: number;
}

export const currentUser: User = {
  id: "u1",
  name: "You",
  points: 1250,
  avatar: "👤",
  wins: 18,
  losses: 7,
};

export const users: User[] = [
  currentUser,
  { id: "u2", name: "Andy", points: 980, avatar: "🧔", wins: 14, losses: 11 },
  { id: "u3", name: "Joe", points: 1420, avatar: "😎", wins: 22, losses: 5 },
  { id: "u4", name: "Mike", points: 760, avatar: "🤠", wins: 10, losses: 15 },
  { id: "u5", name: "Sarah", points: 1100, avatar: "👩", wins: 16, losses: 9 },
];

export const liveGames: Game[] = [
  {
    id: "g1",
    homeTeam: "Eagles",
    awayTeam: "Bears",
    homeScore: 21,
    awayScore: 14,
    sport: "🏈 NFL",
    date: "Now",
    time: "Q3 8:42",
    isLive: true,
    channel: "ESPN",
    homeColor: "160 60% 30%",
    awayColor: "25 90% 45%",
  },
  {
    id: "g2",
    homeTeam: "Knicks",
    awayTeam: "Clippers",
    homeScore: 88,
    awayScore: 92,
    sport: "🏀 NBA",
    date: "Now",
    time: "Q4 2:15",
    isLive: true,
    channel: "TNT",
    homeColor: "15 80% 45%",
    awayColor: "0 75% 50%",
  },
  {
    id: "g3",
    homeTeam: "Seahawks",
    awayTeam: "Broncos",
    homeScore: 7,
    awayScore: 10,
    sport: "🏈 NFL",
    date: "Now",
    time: "Q2 11:30",
    isLive: true,
    channel: "FOX",
    homeColor: "120 50% 25%",
    awayColor: "25 85% 50%",
  },
];

export const upcomingGames: Game[] = [
  { id: "g4", homeTeam: "Utah", awayTeam: "BYU", sport: "🏈 College", date: "Sep 22", time: "7:00 PM", isLive: false, homeColor: "0 75% 45%", awayColor: "220 70% 40%" },
  { id: "g5", homeTeam: "Packers", awayTeam: "Bears", sport: "🏈 NFL", date: "Oct 12", time: "1:00 PM", isLive: false, homeColor: "80 50% 30%", awayColor: "25 90% 45%" },
  { id: "g6", homeTeam: "Baylor", awayTeam: "BYU", sport: "🏈 College", date: "Oct 5", time: "3:30 PM", isLive: false, homeColor: "140 60% 30%", awayColor: "220 70% 40%" },
  { id: "g7", homeTeam: "Kansas", awayTeam: "BYU", sport: "🏈 College", date: "Oct 19", time: "12:00 PM", isLive: false, homeColor: "0 70% 40%", awayColor: "220 70% 40%" },
  { id: "g8", homeTeam: "Bills", awayTeam: "Bears", sport: "🏈 NFL", date: "Nov 2", time: "1:00 PM", isLive: false, homeColor: "220 65% 45%", awayColor: "25 90% 45%" },
  { id: "g9", homeTeam: "Rams", awayTeam: "Bears", sport: "🏈 NFL", date: "Nov 9", time: "4:25 PM", isLive: false, homeColor: "45 80% 50%", awayColor: "25 90% 45%" },
  { id: "g10", homeTeam: "Texans", awayTeam: "Bears", sport: "🏈 NFL", date: "Nov 16", time: "1:00 PM", isLive: false, homeColor: "0 65% 35%", awayColor: "25 90% 45%" },
  { id: "g11", homeTeam: "Colorado", awayTeam: "BYU", sport: "🏈 College", date: "Nov 23", time: "3:30 PM", isLive: false, homeColor: "45 60% 40%", awayColor: "220 70% 40%" },
];

export const groupChats: GroupChat[] = [
  { id: "c1", name: "BYU Bruthas", description: "BYU Football + Basketball", gameId: "g4", teamColor: "220 70% 40%", memberCount: 8 },
  { id: "c2", name: "Da Bears", description: "Bears predictions for Bears fans", gameId: "g5", teamColor: "25 90% 45%", memberCount: 12 },
  { id: "c3", name: "Family Trash Talk", description: "No mercy, all love", teamColor: "280 60% 50%", memberCount: 5 },
  { id: "c4", name: "Office Pool", description: "Weekly picks with coworkers", teamColor: "200 60% 40%", memberCount: 15 },
];

export const chatMessages: ChatMessage[] = [
  { id: "m1", userId: "u2", username: "Andy", text: "BYU is gonna destroy Utah this year 🔥", timestamp: "2:15 PM", type: "message" },
  { id: "m2", userId: "u3", username: "Joe", text: "You're dreaming bro, Utah's defense is insane", timestamp: "2:16 PM", type: "message" },
  {
    id: "m3", userId: "u2", username: "Andy", text: "", timestamp: "2:18 PM", type: "bet",
    betDetails: { description: "BYU wins by 10+", points: 50 },
  },
  { id: "m4", userId: "u3", username: "Joe", text: "You took Andy's Bet", timestamp: "2:19 PM", type: "bet-accepted", betDetails: { description: "BYU wins by 10+", points: 50, takenBy: "Joe" } },
  { id: "m5", userId: "u1", username: "You", text: "You're both crazy, I'm taking Utah ML", timestamp: "2:20 PM", type: "message", isCurrentUser: true },
  {
    id: "m6", userId: "u1", username: "You", text: "", timestamp: "2:22 PM", type: "bet", isCurrentUser: true,
    betDetails: { description: "Utah wins straight up", points: 30 },
  },
  { id: "m7", userId: "u4", username: "Mike", text: "Just wait till next year 😤", timestamp: "2:25 PM", type: "message" },
  { id: "m8", userId: "u2", username: "Andy", text: "Oh boy do I love winning 👑", timestamp: "2:30 PM", type: "message" },
  {
    id: "m9", userId: "u2", username: "Andy", text: "", timestamp: "2:35 PM", type: "bet-result",
    betDetails: { description: "BYU wins by 10+", points: 50, won: true },
  },
  { id: "m10", userId: "u5", username: "Sarah", text: "GG everyone, that was a wild game", timestamp: "2:40 PM", type: "message" },
];

export const friendRequests = [
  { id: "f1", name: "Tyler Johnson", avatar: "🏄", activity: "Crushing it in 3 chats", points: 890 },
  { id: "f2", name: "Emma Wilson", avatar: "🎯", activity: "5-game win streak!", points: 1340 },
  { id: "f3", name: "Carlos Rivera", avatar: "⚽", activity: "New to ChatKings", points: 100 },
];
