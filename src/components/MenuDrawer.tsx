import { useNavigate } from "react-router-dom";
import { currentUser } from "@/data/mockData";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Crown, History, Trophy, HelpCircle, Plus, LogOut } from "lucide-react";

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const menuItems = [
  { icon: Crown, label: "King Status", path: "/king-status", color: "text-gold" },
  { icon: History, label: "My Bets", path: "/my-bets", color: "text-primary" },
  { icon: Trophy, label: "Leaderboard", path: "/leaderboard", color: "text-gold" },
  { icon: HelpCircle, label: "How to Play", path: "/how-to-play", color: "text-primary" },
  { icon: Plus, label: "Create a Chat", path: "/create-chat", color: "text-primary" },
];

const MenuDrawer = ({ open, onOpenChange }: MenuDrawerProps) => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-background border-border w-72 p-0">
        <SheetHeader className="p-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
              {currentUser.avatar}
            </div>
            <div>
              <SheetTitle className="text-left font-heading text-base text-foreground">
                {currentUser.name}
              </SheetTitle>
              <p className="text-xs text-gold font-semibold">{currentUser.points} pts</p>
              <p className="text-[10px] text-muted-foreground">
                {currentUser.wins}W - {currentUser.losses}L
              </p>
            </div>
          </div>
        </SheetHeader>

        <nav className="py-2">
          {menuItems.map(({ icon: Icon, label, path, color }) => (
            <button
              key={path}
              onClick={() => handleNavigate(path)}
              className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-secondary/50 transition-colors"
            >
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-sm font-medium text-foreground">{label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border">
          <button className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuDrawer;
