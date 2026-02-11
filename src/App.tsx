import FinersPage from "./pages/finers-page";
import IntroductionPage from "./pages/introduction-page";
import StickyNav from "./components/StickyNav";

export default function App() {
  return (
    <div className="w-full">
      <StickyNav />
      <IntroductionPage />

      <FinersPage />
    </div>
  );
}
