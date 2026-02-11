import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

const AppLayout = () => (
  <div className="min-h-screen bg-background text-foreground max-w-md mx-auto relative">
    <Header />
    <Outlet />
    <BottomNav />
  </div>
);

export default AppLayout;
