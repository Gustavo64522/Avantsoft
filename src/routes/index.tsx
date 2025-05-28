import type { JSX } from "react";

import { useAuth } from "../hooks/useAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "../pages/Auth";
import Stats from "../pages/Stats";
import RegisterClient from "../pages/RegisterClient";
import ClientList from "../pages/ClientList";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { signed, loading } = useAuth();

  if (loading) return null; // ou um spinner, se quiser

  return signed ? children : <Navigate to="/signin" />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { signed, loading } = useAuth();

  if (loading) return null;

  return signed ? <Navigate to="/stats" /> : children;
};

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Auth mode="signin" />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Auth mode="signup" />
            </PublicRoute>
          }
        />

        <Route
          path="/stats"
          element={
            <PrivateRoute>
              <Stats />
            </PrivateRoute>
          }
        />
        <Route
          path="/register-client"
          element={
            <PrivateRoute>
              <RegisterClient />
            </PrivateRoute>
          }
        />
        <Route
          path="/client-list"
          element={
            <PrivateRoute>
              <ClientList />
            </PrivateRoute>
          }
        />

        {/* Esse aqui sem wrapper, fora de qualquer rota de autenticação */}
        <Route
          path="*"
          element={
            <Navigate
              to={localStorage.getItem("user_token") ? "/stats" : "/signin"}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
