import { useParams, useNavigate } from "react-router-dom";
import { liveGames, upcomingGames, currentUser } from "@/data/mockData";
import { ArrowLeft, Tv, Zap, AlertTriangle, Trophy, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const strikes = 2;

const betOptions = {
  winner: [
    { label: "Home Team Wins", odds: "+120" },
    { label: "Away Team Wins", odds: "-140" },
  ],
  score: [
    { label: "Home -3.5", odds: "-110" },
    { label: "Away +3.5", odds: "-110" },
  ],
  overUnder: [
    { label: "Over 45.5", odds: "-110" },
    { label: "Under 45.5", odds: "-110" },
  ],
  player: [
    { label: "QB 250+ passing yards", odds: "+150", premium: true },
    { label: "RB 100+ rushing yards", odds: "+200", premium: true },
  ],
};

const PredictionsPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [selectedBet, setSelectedBet] = useState<{ label: string; odds: string; category: string } | null>(null);
  const [wager, setWager] = useState(25);
  const [showConfirm, setShowConfirm] = useState(false);

  const game = [...liveGames, ...upcomingGames].find((g) => g.id === gameId) || liveGames[0];

  const handleBetSelect = (label: string, odds: string, category: string) => {
    setSelectedBet({ label, odds, category });
    setShowConfirm(true);
  };

  return (
    <div className="pb-20 animate-fade-in relative">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-heading text-sm text-foreground">Pro-dictions</h2>
      </div>

      {/* Game Card */}
      <div className="mx-4 mt-4 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{game.sport}</span>
          {game.isLive && (
            <span className="flex items-center gap-1 text-xs text-live font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-live pulse-live" />
              LIVE · {game.time}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="text-center flex-1">
            <div className="w-12 h-12 rounded-full mx-auto mb-1 flex items-center justify-center text-2xl" style={{ backgroundColor: `hsl(${game.awayColor} / 0.2)` }}>
              {game.sport.includes("🏈") ? "🏈" : "🏀"}
            </div>
            <p className="font-heading text-sm text-foreground">{game.awayTeam}</p>
            {game.isLive && <p className="text-xl font-heading text-foreground">{game.awayScore}</p>}
          </div>
          <div className="text-muted-foreground font-heading text-lg px-3">VS</div>
          <div className="text-center flex-1">
            <div className="w-12 h-12 rounded-full mx-auto mb-1 flex items-center justify-center text-2xl" style={{ backgroundColor: `hsl(${game.homeColor} / 0.2)` }}>
              {game.sport.includes("🏈") ? "🏈" : "🏀"}
            </div>
            <p className="font-heading text-sm text-foreground">{game.homeTeam}</p>
            {game.isLive && <p className="text-xl font-heading text-foreground">{game.homeScore}</p>}
          </div>
        </div>
        {!game.isLive && (
          <p className="text-center text-xs text-muted-foreground mt-2">{game.date} · {game.time}</p>
        )}
        {game.channel && (
          <button className="flex items-center gap-1 mx-auto mt-2 px-3 py-1 rounded bg-secondary text-xs text-secondary-foreground">
            <Tv className="w-3 h-3" />
            Watch on {game.channel}
          </button>
        )}
      </div>

      {/* Point Balance & Strikes */}
      <div className="mx-4 mt-3 flex gap-3">
        <div className="flex-1 rounded-xl border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Available</p>
          <p className="text-xl font-heading text-gold">{currentUser.points}</p>
          <p className="text-xs text-muted-foreground mt-0.5">120 pts locked</p>
        </div>
        <div className="flex-1 rounded-xl border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Strikes</p>
          <div className="flex items-center gap-1 mt-1">
            {[0, 1, 2].map((i) => (
              <Zap key={i} className={cn("w-5 h-5", i < strikes ? "text-strike" : "text-muted")} fill={i < strikes ? "currentColor" : "none"} />
            ))}
          </div>
          {strikes >= 2 && (
            <div className="flex items-center gap-1 mt-1">
              <AlertTriangle className="w-3 h-3 text-strike" />
              <span className="text-[10px] text-strike font-medium">Last bet — use wisely!</span>
            </div>
          )}
        </div>
      </div>

      {/* Betting Categories */}
      <div className="mx-4 mt-4">
        <Accordion type="single" collapsible className="space-y-2">
          {[
            { key: "winner", title: "Winner", helper: "Pick who wins the game", options: betOptions.winner },
            { key: "score", title: "Point Spread", helper: "Predict the point spread", options: betOptions.score },
            { key: "overUnder", title: "Over / Under", helper: "Will total points be over or under?", options: betOptions.overUnder },
            { key: "player", title: "Player Predictions", helper: "Predict individual player stats", options: betOptions.player },
          ].map((cat) => (
            <AccordionItem key={cat.key} value={cat.key} className="rounded-xl border border-border bg-card overflow-hidden">
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <div className="text-left">
                  <p className="font-semibold text-sm text-foreground">{cat.title}</p>
                  <p className="text-xs text-muted-foreground">{cat.helper}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                <div className="space-y-2">
                  {cat.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleBetSelect(opt.label, opt.odds, cat.title)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors",
                        (opt as any).premium && "border-gold/30"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-foreground">{opt.label}</span>
                        {(opt as any).premium && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-gold/20 text-gold">PRO</span>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-primary">{opt.odds}</span>
                    </button>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Bet Confirmation Modal */}
      {showConfirm && selectedBet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md mx-4 mb-4 rounded-2xl border border-border bg-card p-6">
            <h3 className="font-heading text-lg text-foreground text-center mb-4">Confirm Your Bet</h3>

            <div className="bg-secondary rounded-xl p-4 mb-4">
              <p className="text-xs text-muted-foreground">{selectedBet.category}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{selectedBet.label}</p>
              <p className="text-xs text-primary font-medium mt-1">Odds: {selectedBet.odds}</p>
            </div>

            <div className="mb-4">
              <label className="text-xs text-muted-foreground">Wager Amount</label>
              <div className="flex items-center gap-2 mt-1">
                {[10, 25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setWager(amt)}
                    className={cn(
                      "flex-1 py-2 rounded-lg text-sm font-semibold transition-colors",
                      wager === amt ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                    )}
                  >
                    {amt}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">Points remaining after bet: <span className="text-gold font-semibold">{currentUser.points - wager}</span></p>
            </div>

            {strikes >= 2 && (
              <div className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-strike/10 border border-strike/20">
                <AlertTriangle className="w-4 h-4 text-strike" />
                <span className="text-xs text-strike">⚠️ This is your last bet before strike out!</span>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover-scale"
              >
                Confirm Bet 🎯
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionsPage;
