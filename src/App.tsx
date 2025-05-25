import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import SignIn from './pages/Signin';
import NcellCenters from './pages/NcellCenters';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import Header from './layout/Header';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFDFD] px-4">
          <Header />
          <div className="max-w-7xl px-6 w-full mx-auto mt-6 flex justify-center">
            <Routes>
              <Route
                path="/sign-in"
                element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                }
              />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <NcellCenters />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
