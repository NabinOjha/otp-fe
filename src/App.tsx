import { createBrowserRouter, RouterProvider } from 'react-router';
import SignIn from './pages/Signin';
import NcellCenters from './pages/NcellCenters';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/ncell-centers',
    element: <NcellCenters />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
