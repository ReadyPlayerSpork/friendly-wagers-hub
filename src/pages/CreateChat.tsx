import { useNavigate } from "react-router-dom";
import { liveGames, upcomingGames } from "@/data/mockData";
import { ArrowLeft, Users, Gamepad2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const allGames = [...liveGames, ...upcomingGames];

const CreateChatPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-heading text-sm text-foreground">Create a Chat</h2>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Chat Name */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Chat Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Sunday Football Crew"
            className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this chat about?"
            className="w-full bg-secondary rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Link to Game (optional) */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Link to a Game (optional)
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {allGames.slice(0, 6).map((game) => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(selectedGame === game.id ? null : game.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl border bg-card text-left transition-colors",
                  selectedGame === game.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:bg-secondary/50"
                )}
              >
                <Gamepad2 className={cn("w-4 h-4", selectedGame === game.id ? "text-primary" : "text-muted-foreground")} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {game.awayTeam} vs {game.homeTeam}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {game.sport} · {game.date} · {game.time}
                  </p>
                </div>
                {game.isLive && (
                  <span className="flex items-center gap-1 text-[10px] text-live font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-live pulse-live" />
                    LIVE
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Invite Friends */}
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Invite Friends</h3>
          </div>
          <p className="text-xs text-muted-foreground">
            Share your chat code with friends after creating. They can join using the code on the Friends page.
          </p>
        </div>

        {/* Create Button */}
        <button
          className={cn(
            "w-full py-3 rounded-xl font-semibold text-sm transition-colors hover-scale",
            name.trim()
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
        >
          Create Chat
        </button>
      </div>
    </div>
  );
};

export default CreateChatPage;
