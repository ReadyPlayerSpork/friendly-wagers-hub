import { useState } from "react";
import { friendRequests, friends } from "@/data/mockData";
import { UserPlus, Check, X, Copy, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const FriendsPage = () => {
  const [friendCode] = useState("CK-7X92M");
  const [addCode, setAddCode] = useState("");
  const [requests, setRequests] = useState(friendRequests);
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"friends" | "requests">("friends");

  const handleCopy = () => {
    navigator.clipboard.writeText(friendCode).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAccept = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const handleDecline = (id: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="pb-20 animate-fade-in">
      {/* Add Friend Section */}
      <section className="px-4 py-4 bg-surface border-b border-border">
        <h2 className="font-heading text-sm tracking-wider uppercase text-foreground mb-3">
          Add a Friend
        </h2>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={addCode}
            onChange={(e) => setAddCode(e.target.value)}
            placeholder="Enter friend code..."
            className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
          />
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover-scale">
            <UserPlus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Your code:</span>
          <span className="text-xs font-mono font-bold text-primary">{friendCode}</span>
          <button
            onClick={handleCopy}
            className="p-1 rounded hover:bg-secondary transition-colors"
          >
            <Copy className="w-3 h-3 text-muted-foreground" />
          </button>
          {copied && <span className="text-xs text-primary">Copied!</span>}
        </div>
      </section>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setTab("friends")}
          className={cn(
            "flex-1 py-3 text-sm font-semibold text-center transition-colors",
            tab === "friends"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          )}
        >
          Friends ({friends.length})
        </button>
        <button
          onClick={() => setTab("requests")}
          className={cn(
            "flex-1 py-3 text-sm font-semibold text-center transition-colors relative",
            tab === "requests"
              ? "text-primary border-b-2 border-primary"
              : "text-muted-foreground"
          )}
        >
          Requests
          {requests.length > 0 && (
            <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-strike text-white">
              {requests.length}
            </span>
          )}
        </button>
      </div>

      {/* Friends List */}
      {tab === "friends" && (
        <section className="px-4 pt-3">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full bg-secondary rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                    {friend.avatar}
                  </div>
                  <div
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card",
                      friend.status === "online" ? "bg-live" : "bg-muted-foreground"
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {friend.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {friend.wins}W - {friend.losses}L
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-heading text-gold">{friend.points}</p>
                  <p className="text-[10px] text-muted-foreground">pts</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Friend Requests */}
      {tab === "requests" && (
        <section className="px-4 pt-3">
          {requests.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-2">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
                >
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                    {req.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {req.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{req.activity}</p>
                    <p className="text-xs text-gold font-semibold">{req.points} pts</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAccept(req.id)}
                      className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover-scale"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDecline(req.id)}
                      className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover-scale"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default FriendsPage;
