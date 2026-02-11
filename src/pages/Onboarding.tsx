import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Zap, AlertTriangle, Target, ChevronRight, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingStep {
  icon: React.ElementType;
  iconColor: string;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const steps: OnboardingStep[] = [
    {
      icon: Crown,
      iconColor: "text-gold",
      title: "Welcome to ChatKings",
      subtitle: "Where friends compete for the crown",
      content: (
        <div className="space-y-4">
          <div className="w-24 h-24 rounded-full bg-gold/20 mx-auto flex items-center justify-center">
            <Crown className="w-12 h-12 text-gold" />
          </div>
          <p className="text-sm text-foreground/80 text-center">
            Join group chats, make predictions on live games, and compete with friends
            to become the King of your chat.
          </p>
          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="text-center">
              <p className="text-2xl">🏈</p>
              <p className="text-[10px] text-muted-foreground mt-1">NFL</p>
            </div>
            <div className="text-center">
              <p className="text-2xl">🏀</p>
              <p className="text-[10px] text-muted-foreground mt-1">NBA</p>
            </div>
            <div className="text-center">
              <p className="text-2xl">🏈</p>
              <p className="text-[10px] text-muted-foreground mt-1">College</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Trophy,
      iconColor: "text-gold",
      title: "Point System",
      subtitle: "Earn points with every correct prediction",
      content: (
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Start with 500 pts</p>
                <p className="text-xs text-muted-foreground">Your starting bankroll</p>
              </div>
            </div>
            <div className="space-y-2 ml-[52px]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <p className="text-xs text-foreground/80">Win a bet = earn your wager</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-strike" />
                <p className="text-xs text-foreground/80">Lose a bet = lose your wager</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                <p className="text-xs text-foreground/80">Win streak bonus at 5+ wins</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gold/30 bg-gold/10 p-3 flex items-center gap-3">
            <Crown className="w-5 h-5 text-gold flex-shrink-0" />
            <p className="text-xs text-foreground/80">
              The player with the most points in a chat becomes the <strong className="text-gold">King</strong>!
            </p>
          </div>
        </div>
      ),
    },
    {
      icon: Zap,
      iconColor: "text-strike",
      title: "Strike System",
      subtitle: "Bet smart — strikes keep the game fair",
      content: (
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-4 py-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="text-center">
                <Zap
                  className={cn("w-10 h-10 mx-auto", i < 2 ? "text-strike" : "text-muted")}
                  fill={i < 2 ? "currentColor" : "none"}
                />
                <p className="text-[10px] text-muted-foreground mt-1">
                  {i < 2 ? "Strike" : "Safe"}
                </p>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-sm font-semibold text-foreground">3 Strikes Per Week</p>
              <p className="text-xs text-muted-foreground mt-1">
                Each lost bet adds a strike. At 3 strikes, you're locked out until Monday.
              </p>
            </div>
            <div className="rounded-xl border border-strike/30 bg-strike/10 p-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-strike flex-shrink-0" />
              <p className="text-xs text-foreground/80">
                Choose your bets carefully — quality over quantity!
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: Target,
      iconColor: "text-primary",
      title: "Place Your First Bet",
      subtitle: "Here's how it works",
      content: (
        <div className="space-y-3">
          {[
            { step: 1, text: "Find a game on the Home screen", emoji: "🏠" },
            { step: 2, text: "Tap to open Pro-dictions", emoji: "🎯" },
            { step: 3, text: "Choose a category and pick your prediction", emoji: "📊" },
            { step: 4, text: "Set your wager and confirm", emoji: "✅" },
            { step: 5, text: "Watch the game and see if you win!", emoji: "🏆" },
          ].map(({ step: stepNum, text, emoji }) => (
            <div
              key={stepNum}
              className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-heading text-primary flex-shrink-0">
                {stepNum}
              </div>
              <p className="text-sm text-foreground/80 flex-1">{text}</p>
              <span className="text-lg">{emoji}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const currentStep = steps[step];
  const isLast = step === steps.length - 1;
  const Icon = currentStep.icon;

  return (
    <div className="min-h-screen bg-background flex flex-col animate-fade-in">
      {/* Progress Bar */}
      <div className="flex gap-1.5 px-6 pt-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 h-1 rounded-full transition-colors",
              i <= step ? "bg-primary" : "bg-secondary"
            )}
          />
        ))}
      </div>

      {/* Skip */}
      <div className="flex justify-end px-4 pt-3">
        <button
          onClick={() => navigate("/")}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pt-4 pb-6 flex flex-col">
        <div className="text-center mb-6">
          <Icon className={cn("w-8 h-8 mx-auto mb-3", currentStep.iconColor)} />
          <h1 className="font-heading text-xl text-foreground">{currentStep.title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{currentStep.subtitle}</p>
        </div>

        <div className="flex-1">{currentStep.content}</div>
      </div>

      {/* Bottom Actions */}
      <div className="px-6 pb-8 space-y-3">
        <button
          onClick={() => (isLast ? navigate("/") : setStep(step + 1))}
          className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover-scale flex items-center justify-center gap-2"
        >
          {isLast ? "Let's Go!" : "Continue"}
          {!isLast && <ChevronRight className="w-4 h-4" />}
        </button>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
