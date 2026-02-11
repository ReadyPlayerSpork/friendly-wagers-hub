import { useNavigate } from "react-router-dom";
import { liveGames, upcomingGames, groupChats } from "@/data/mockData";
import { Tv, ChevronRight } from "lucide-react";
import { useState } from "react";

const filters = ["All", "Live Now", "Today"];

const HomePage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredGames = activeFilter === "Live Now"
    ? upcomingGames.filter(() => false)
    : upcomingGames;

  return (
    <div className="pb-20 animate-fade-in">
      {/* Live Games Banner */}
      <section className="px-4 py-4 bg-surface">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-live pulse-live" />
          <h2 className="font-heading text-sm tracking-wider uppercase text-foreground">Live Games</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
          {liveGames.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(`/predictions/${game.id}`)}
              className="flex-shrink-0 w-52 rounded-lg border border-border bg-card p-3 hover-scale"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{game.sport}</span>
                <span className="flex items-center gap-1 text-xs text-live font-semibold">
                  <div className="w-1.5 h-1.5 rounded-full bg-live pulse-live" />
                  {game.time}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-foreground">
                  {game.awayTeam} @ {game.homeTeam}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-heading text-foreground">{game.awayScore} - {game.homeScore}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Tv className="w-3 h-3" />
                  {game.channel}
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* My Groupchats */}
      <section className="px-4 pt-5 pb-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-heading text-sm tracking-wider uppercase text-foreground">My Groupchats</h2>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {groupChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="rounded-lg border border-border bg-card overflow-hidden hover-scale text-left"
            >
              <div
                className="h-16 flex items-center justify-center text-2xl"
                style={{ background: `linear-gradient(135deg, hsl(${chat.teamColor}), hsl(${chat.teamColor} / 0.5))` }}
              >
                {chat.name === "BYU Bruthas" ? "🏈🐆" : chat.name === "Da Bears" ? "🐻🏈" : chat.name === "Family Trash Talk" ? "👨‍👩‍👧‍👦" : "💼"}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">{chat.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{chat.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{chat.memberCount} members</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Followed Events */}
      <section className="px-4 pt-5 pb-4">
        <h2 className="font-heading text-sm tracking-wider uppercase text-foreground mb-3">Followed Events</h2>
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(`/predictions/${game.id}`)}
              className="rounded-lg border border-border bg-card p-3 hover-scale text-left"
            >
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs text-muted-foreground">{game.sport}</span>
              </div>
              <h3 className="font-semibold text-sm text-foreground">
                {game.awayTeam} vs {game.homeTeam}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">{game.date} · {game.time}</p>
              <button
                onClick={(e) => { e.stopPropagation(); navigate(`/predictions/${game.id}`); }}
                className="mt-2 text-xs text-primary font-medium"
              >
                Quick Bet →
              </button>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
