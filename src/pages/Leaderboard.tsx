import { useNavigate } from "react-router-dom";
import { leaderboard } from "@/data/mockData";
import { ArrowLeft, Crown, Medal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const timeFilters = ["Lifetime", "Weekly", "Monthly"];
const scopeFilters = ["Global", "Per Chat"];

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("Lifetime");
  const [scopeFilter, setScopeFilter] = useState("Global");

  const getRankStyle = (rank: number) => {
    if (rank === 1) return "text-gold";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-muted-foreground";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-gold" />;
    if (rank <= 3) return <Medal className="w-5 h-5" />;
    return <span className="text-sm font-heading w-5 text-center">{rank}</span>;
  };

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-heading text-sm text-foreground">Leaderboard</h2>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-3 px-4 pt-6 pb-4">
        {/* 2nd Place */}
        <div className="flex-1 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-2 flex items-center justify-center text-2xl border-2 border-gray-400">
            {leaderboard[1]?.avatar}
          </div>
          <p className="text-xs font-semibold text-foreground truncate">{leaderboard[1]?.name}</p>
          <p className="text-xs text-gray-300 font-heading">{leaderboard[1]?.points} pts</p>
          <div className="h-16 bg-gray-400/20 rounded-t-lg mt-2 flex items-center justify-center">
            <span className="text-lg font-heading text-gray-300">2</span>
          </div>
        </div>

        {/* 1st Place */}
        <div className="flex-1 text-center">
          <div className="relative">
            <Crown className="w-6 h-6 text-gold mx-auto mb-1" />
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-2 flex items-center justify-center text-3xl border-2 border-gold">
              {leaderboard[0]?.avatar}
            </div>
          </div>
          <p className="text-xs font-semibold text-foreground truncate">{leaderboard[0]?.name}</p>
          <p className="text-xs text-gold font-heading">{leaderboard[0]?.points} pts</p>
          <div className="h-24 bg-gold/20 rounded-t-lg mt-2 flex items-center justify-center">
            <span className="text-lg font-heading text-gold">1</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="flex-1 text-center">
          <div className="w-14 h-14 rounded-full bg-secondary mx-auto mb-2 flex items-center justify-center text-2xl border-2 border-orange-400">
            {leaderboard[2]?.avatar}
          </div>
          <p className="text-xs font-semibold text-foreground truncate">{leaderboard[2]?.name}</p>
          <p className="text-xs text-orange-400 font-heading">{leaderboard[2]?.points} pts</p>
          <div className="h-12 bg-orange-400/20 rounded-t-lg mt-2 flex items-center justify-center">
            <span className="text-lg font-heading text-orange-400">3</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 flex gap-2 mb-1">
        {timeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setTimeFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              timeFilter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="px-4 flex gap-2 mb-3 mt-2">
        {scopeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setScopeFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
              scopeFilter === f
                ? "bg-gold/20 text-gold border border-gold/30"
                : "bg-secondary text-secondary-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Full Leaderboard */}
      <div className="px-4 space-y-2">
        {leaderboard.map((entry) => (
          <div
            key={entry.userId}
            className={cn(
              "flex items-center gap-3 p-3 rounded-xl border bg-card",
              entry.userId === "u1" ? "border-primary/30" : "border-border"
            )}
          >
            <div className={cn("w-7 flex items-center justify-center", getRankStyle(entry.rank))}>
              {getRankIcon(entry.rank)}
            </div>
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-lg">
              {entry.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm font-semibold truncate", entry.userId === "u1" ? "text-primary" : "text-foreground")}>
                {entry.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {entry.wins} wins · {entry.winRate}% win rate
              </p>
            </div>
            <p className="text-sm font-heading text-gold">{entry.points}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;
