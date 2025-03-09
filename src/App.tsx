import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProfilePage from "./components/profile/ProfilePage";
import CommunitiesPage from "./components/communities/CommunitiesPage";
import RoutesPage from "./components/routes/RoutesPage";
import MarketplacePage from "./components/marketplace/MarketplacePage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/communities" element={<CommunitiesPage />} />
          <Route path="/routes" element={<RoutesPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
