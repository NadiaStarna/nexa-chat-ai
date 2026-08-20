import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { HoverPreviewProvider } from "./context/HoverPreviewContext";
import { HoverPreviewPanel } from "./components/HoverPreviewPanel";
import { HoverPreviewRouteReset } from "./components/HoverPreviewRouteReset";
import { LoadingScreen } from "./components/LoadingScreen";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Characters } from "./pages/Characters";
import { History } from "./pages/History";
import { Favorites } from "./pages/Favorites";

function App() {
  return (
    <ThemeProvider>
      <HoverPreviewProvider>
        <BrowserRouter>
          <HoverPreviewRouteReset />
          <LoadingScreen />
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:characterId" element={<Chat />} />
              <Route path="/personajes" element={<Characters />} />
              <Route path="/historial" element={<History />} />
              <Route path="/favoritos" element={<Favorites />} />
            </Routes>
          </Layout>
          <HoverPreviewPanel />
        </BrowserRouter>
      </HoverPreviewProvider>
    </ThemeProvider>
  );
}

export default App;