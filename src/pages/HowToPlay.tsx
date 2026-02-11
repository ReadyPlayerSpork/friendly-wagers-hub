import { useNavigate } from "react-router-dom";
import { ArrowLeft, Zap, Trophy, AlertTriangle, MessageSquare, Target } from "lucide-react";

const sections = [
  {
    icon: Target,
    title: "Making Predictions",
    color: "text-primary",
    items: [
      "Navigate to any game from the home screen",
      "Choose a betting category (Winner, Spread, Over/Under, Player Props)",
      "Select your prediction and choose your wager amount",
      "Confirm your bet — be careful, bets are final!",
    ],
  },
  {
    icon: Trophy,
    title: "Point System",
    color: "text-gold",
    items: [
      "Everyone starts with 500 points",
      "Win a bet: earn points equal to your wager",
      "Lose a bet: lose points equal to your wager",
      "Bonus points for winning streaks (5+ in a row)",
      "King of the Chat: highest points in a group chat",
    ],
  },
  {
    icon: Zap,
    title: "Strike System",
    color: "text-strike",
    items: [
      "You get 3 strikes per week",
      "A strike is earned when you lose a bet",
      "At 3 strikes, you can't place bets until the weekly reset",
      "Strikes reset every Monday at midnight",
      "Use your bets wisely!",
    ],
  },
  {
    icon: MessageSquare,
    title: "Chat Bets",
    color: "text-primary",
    items: [
      "Create bets directly in group chats",
      "Friends can 'Take' your bet to accept the challenge",
      "Results are shown in the chat when the game ends",
      "Bragging rights are half the fun!",
    ],
  },
];

const HowToPlayPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-surface border-b border-border">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h2 className="font-heading text-sm text-foreground">How to Play</h2>
      </div>

      {/* Intro */}
      <div className="px-4 pt-4 pb-2">
        <h1 className="font-heading text-xl text-foreground mb-1">
          Welcome to Chat<span className="text-primary">Kings</span>
        </h1>
        <p className="text-sm text-muted-foreground">
          Make predictions on live games, compete with friends, and claim the crown.
        </p>
      </div>

      {/* Sections */}
      <div className="px-4 space-y-4 mt-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center gap-2 mb-3">
                <Icon className={`w-5 h-5 ${section.color}`} />
                <h3 className="font-heading text-sm text-foreground">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-muted-foreground mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Warning Card */}
      <div className="mx-4 mt-4 rounded-xl border border-strike/30 bg-strike/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-strike" />
          <h3 className="font-semibold text-sm text-strike">Remember</h3>
        </div>
        <p className="text-xs text-foreground/70">
          ChatKings uses virtual points only — no real money is involved. This is all about fun,
          bragging rights, and friendly competition!
        </p>
      </div>
    </div>
  );
};

export default HowToPlayPage;
