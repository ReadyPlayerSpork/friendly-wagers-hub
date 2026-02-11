import { useNavigate } from "react-router-dom";
import { betHistory } from "@/data/mockData";
import { ArrowLeft, Trophy, X as XIcon, Clock } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const filterOptions = ["All", "Wins", "Losses", "Pending"];

const MyBetsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");

  const filteredBets = betHistory.filter((bet) => {
    if (filter === "Wins") return bet.won === true;
    if (filter === "Losses") return bet.won === false;
    if (filter === "Pending") return bet.won === null;
    return true;
  });

  const stats = {
    totalBets: betHistory.length,
    wins: betHistory.filter((b) => b.won === true).length,
    losses: betHistory.filter((b) => b.won === false).length,
    pending: betHistory.filter((b) => b.won === null).length,
    totalWon: betHistory.filter((b) => b.won === true).reduce((sum, b) => sum + b.points, 0),
    totalLost: betHistory.filter((b) => b.won === false).reduce((sum, b) => sum + b.points, 0),
  };

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-heading text-sm text-foreground">My Bets</h2>
      </div>

      {/* Stats Overview */}
      <div className="mx-4 mt-4 grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <p className="text-lg font-heading text-primary">{stats.wins}</p>
          <p className="text-[10px] text-muted-foreground">Wins</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <p className="text-lg font-heading text-strike">{stats.losses}</p>
          <p className="text-[10px] text-muted-foreground">Losses</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <p className="text-lg font-heading text-gold">+{stats.totalWon - stats.totalLost}</p>
          <p className="text-[10px] text-muted-foreground">Net Pts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 mt-4 overflow-x-auto">
        {filterOptions.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors",
              filter === f
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Bet List */}
      <div className="px-4 mt-3 space-y-2">
        {filteredBets.map((bet) => (
          <div
            key={bet.id}
            className={cn(
              "p-3 rounded-xl border bg-card",
              bet.won === true && "border-primary/30",
              bet.won === false && "border-strike/30",
              bet.won === null && "border-border"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {bet.won === true && <Trophy className="w-3.5 h-3.5 text-gold" />}
                  {bet.won === false && <XIcon className="w-3.5 h-3.5 text-strike" />}
                  {bet.won === null && <Clock className="w-3.5 h-3.5 text-muted-foreground" />}
                  <p className="text-sm font-semibold text-foreground truncate">
                    {bet.description}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{bet.game}</p>
                <p className="text-[10px] text-muted-foreground">{bet.category} · {bet.date}</p>
              </div>
              <div className="text-right ml-3">
                <p
                  className={cn(
                    "text-sm font-heading",
                    bet.won === true && "text-primary",
                    bet.won === false && "text-strike",
                    bet.won === null && "text-muted-foreground"
                  )}
                >
                  {bet.won === true && "+"}
                  {bet.won === false && "-"}
                  {bet.points} pts
                </p>
                <p
                  className={cn(
                    "text-[10px] font-medium",
                    bet.won === true && "text-primary",
                    bet.won === false && "text-strike",
                    bet.won === null && "text-muted-foreground"
                  )}
                >
                  {bet.won === true ? "Won" : bet.won === false ? "Lost" : "Pending"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBetsPage;
