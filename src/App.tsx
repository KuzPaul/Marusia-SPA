import { QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./Components/Layout/Layout/Layout";
import { queryClient } from "./utils/queryClient";
import { MainPage } from "./pages/MainPage/MainPage";
import { GenresPage } from "./pages/Genres";
import { InfoMoviePage } from "./pages/InfoMoviePage";
import { MoviesGenreList } from "./pages/MoviesGenreList";
import { Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserAccountPage } from "./pages/UserAccountPage";
import { ProtectedRoute } from "./routing/ProtectedRoute";
import { ErrorBoundary } from "./ErrorBoundary";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/movie/:id" element={<InfoMoviePage />} />
            <Route path="/genre/:genreName" element={<MoviesGenreList />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserAccountPage />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
