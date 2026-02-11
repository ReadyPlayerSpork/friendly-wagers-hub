import { useParams, useNavigate } from "react-router-dom";
import { chatMessages, groupChats, users, currentUser } from "@/data/mockData";
import { Send, Zap, Trophy, Star, ArrowLeft, Tv } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ChatPage = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const chat = groupChats.find((c) => c.id === chatId) || groupChats[0];
  const chatUsers = users.slice(0, 4);

  const teamColors = {
    left: chat.teamColor,
    right: "220 70% 40%",
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] animate-fade-in">
      {/* Top Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <button onClick={() => navigate("/")} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-sm text-foreground">{chat.name}</h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-live pulse-live" />
              <span className="text-xs text-live font-medium">LIVE</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">BYU vs Utah · Q3 8:42 · 
            <span className="text-foreground font-semibold"> 21-14</span>
          </p>
        </div>
        <button className="flex items-center gap-1 px-2 py-1 rounded bg-secondary text-xs text-secondary-foreground">
          <Tv className="w-3 h-3" />
          Watch
        </button>
      </div>

      {/* Points Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-card border-b border-border">
        {chatUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-1.5">
            <span className="text-sm">{user.avatar}</span>
            <div>
              <p className="text-xs font-medium text-foreground">{user.id === "u1" ? "You" : user.name}</p>
              <p className="text-xs text-gold font-semibold">{user.points} pts</p>
            </div>
          </div>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {chatMessages.map((msg) => {
          const isMe = msg.isCurrentUser;

          if (msg.type === "bet") {
            return (
              <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
                <div className="max-w-[80%] rounded-xl border border-accent/30 bg-card p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 text-gold" />
                    <span className="text-xs font-semibold text-gold">{msg.username}'s Bet</span>
                  </div>
                  <p className="text-sm text-foreground font-medium">{msg.betDetails?.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gold font-bold">{msg.betDetails?.points} pts</span>
                    {!isMe && (
                      <button className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold hover-scale">
                        Take Bet
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          if (msg.type === "bet-accepted") {
            return (
              <div key={msg.id} className="flex justify-center">
                <div className="px-3 py-1.5 rounded-full bg-secondary text-xs text-secondary-foreground">
                  <Zap className="w-3 h-3 inline mr-1 text-gold" />
                  {msg.betDetails?.takenBy} took {msg.username}'s bet · {msg.betDetails?.points} pts
                </div>
              </div>
            );
          }

          if (msg.type === "bet-result") {
            const won = msg.betDetails?.won;
            return (
              <div key={msg.id} className="flex justify-center">
                <div className={cn(
                  "px-4 py-2 rounded-xl text-sm font-semibold",
                  won ? "bg-gold/20 text-gold border border-gold/30" : "bg-strike/20 text-strike border border-strike/30"
                )}>
                  {won ? <Trophy className="w-4 h-4 inline mr-1" /> : null}
                  {msg.username} {won ? "won" : "lost"} the bet! {won ? "🎉" : "😢"} · {msg.betDetails?.points} pts
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={cn("flex", isMe ? "justify-end" : "justify-start")}>
              <div className="max-w-[75%]">
                {!isMe && <p className="text-xs text-muted-foreground mb-1 ml-1">{msg.username}</p>}
                <div
                  className={cn("px-3 py-2 rounded-2xl text-sm", isMe ? "rounded-br-sm" : "rounded-bl-sm")}
                  style={{
                    backgroundColor: isMe
                      ? `hsl(${teamColors.right} / 0.3)`
                      : `hsl(${teamColors.left} / 0.2)`,
                  }}
                >
                  <span className="text-foreground">{msg.text}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5 mx-1">{msg.timestamp}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 bg-card border-t border-border">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
          className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
        />
        <button className="p-2 rounded-full bg-primary text-primary-foreground hover-scale">
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate(`/predictions/g4`)}
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover-scale"
      >
        <Zap className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatPage;
