import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/AppLayout";
import Home from "@/pages/Home";
import Chat from "@/pages/Chat";
import Predictions from "@/pages/Predictions";
import Friends from "@/pages/Friends";
import KingStatus from "@/pages/KingStatus";
import MyBets from "@/pages/MyBets";
import Leaderboard from "@/pages/Leaderboard";
import HowToPlay from "@/pages/HowToPlay";
import CreateChat from "@/pages/CreateChat";
import Onboarding from "@/pages/Onboarding";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/predictions/:gameId" element={<Predictions />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/king-status" element={<KingStatus />} />
            <Route path="/my-bets" element={<MyBets />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/create-chat" element={<CreateChat />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
