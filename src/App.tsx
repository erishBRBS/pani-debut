import FinersPage from "./pages/finers-page";
import IntroductionPage from "./pages/introduction-page";
import StickyNav from "./components/StickyNav";
import EventPage from "./pages/event-page";

export default function App() {
  return (
    <div className="w-full bg-white">
      <StickyNav />
      <IntroductionPage />

      <FinersPage />

      <EventPage />
    </div>
  );
}
