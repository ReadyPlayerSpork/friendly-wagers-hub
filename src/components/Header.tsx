import { Menu, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import MenuDrawer from "@/components/MenuDrawer";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-background/95 backdrop-blur border-b border-border">
        <button onClick={() => navigate("/")} className="flex items-center gap-2">
          {location.pathname !== "/" ? (
            <Home className="w-5 h-5 text-foreground" />
          ) : (
            <span className="font-heading text-xl tracking-wide text-foreground">
              Chat<span className="text-primary">Kings</span>
            </span>
          )}
          {location.pathname !== "/" && (
            <span className="font-heading text-lg tracking-wide text-foreground">
              Chat<span className="text-primary">Kings</span>
            </span>
          )}
        </button>
        <button
          onClick={() => setMenuOpen(true)}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </header>
      <MenuDrawer open={menuOpen} onOpenChange={setMenuOpen} />
    </>
  );
};

export default Header;
