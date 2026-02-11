import { Home as HomeIcon, Users, MessageSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: HomeIcon, label: "Home", path: "/" },
  { icon: MessageSquare, label: "Chats", path: "/chat/c1" },
  { icon: Users, label: "Friends", path: "/friends" },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-background/95 backdrop-blur border-t border-border py-2 px-4">
      {navItems.map(({ icon: Icon, label, path }) => {
        const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path.split("/").slice(0, 2).join("/")));
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-1 rounded-lg transition-colors",
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
