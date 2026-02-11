import { useNavigate } from "react-router-dom";
import { currentUser, groupChats } from "@/data/mockData";
import { ArrowLeft, Crown, Flame, Trophy } from "lucide-react";

const kingChats = groupChats.slice(0, 2);

const KingStatusPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-heading text-sm text-foreground">King Status</h2>
      </div>

      {/* Crown Card */}
      <div className="mx-4 mt-4 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/10 to-card p-6 text-center">
        <div className="w-20 h-20 rounded-full bg-gold/20 mx-auto mb-3 flex items-center justify-center">
          <Crown className="w-10 h-10 text-gold" />
        </div>
        <h2 className="font-heading text-2xl text-gold mb-1">{currentUser.name}</h2>
        <p className="text-sm text-muted-foreground">ChatKings Member</p>

        <div className="flex items-center justify-center gap-6 mt-5">
          <div>
            <p className="text-2xl font-heading text-gold">{currentUser.points}</p>
            <p className="text-xs text-muted-foreground">Total Points</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-heading text-foreground">{currentUser.wins}</p>
            <p className="text-xs text-muted-foreground">Wins</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div>
            <p className="text-2xl font-heading text-foreground">{currentUser.losses}</p>
            <p className="text-xs text-muted-foreground">Losses</p>
          </div>
        </div>
      </div>

      {/* Win Streak */}
      <div className="mx-4 mt-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5 text-strike" />
          <h3 className="font-semibold text-sm text-foreground">Win Streak</h3>
        </div>
        <p className="text-3xl font-heading text-primary">5</p>
        <p className="text-xs text-muted-foreground mt-1">Best: 8 wins in a row</p>
      </div>

      {/* King of Chats */}
      <section className="mx-4 mt-3">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-gold" />
          <h3 className="font-heading text-sm tracking-wider uppercase text-foreground">
            King of These Chats
          </h3>
        </div>
        {kingChats.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            Win more bets to become king of a chat!
          </div>
        ) : (
          <div className="space-y-2">
            {kingChats.map((chat) => (
              <div
                key={chat.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-gold/20 bg-card"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                  style={{
                    background: `linear-gradient(135deg, hsl(${chat.teamColor}), hsl(${chat.teamColor} / 0.5))`,
                  }}
                >
                  <Crown className="w-4 h-4 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{chat.name}</p>
                  <p className="text-xs text-muted-foreground">{chat.memberCount} members</p>
                </div>
                <span className="text-xs font-bold text-gold">KING</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default KingStatusPage;
