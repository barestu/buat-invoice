import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { LocalDataProvider } from './context/local-data';

import { Toaster } from './components/ui/sonner';
import DefaultLayout from './components/layout/default';
import NotFound from './components/not-found';

import HomePage from './pages/home';
import PreviewPage from './pages/preview';
import CreatePage from './pages/create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'create',
        element: <CreatePage />,
      },
    ],
  },
  {
    path: '/preview/:code',
    element: <PreviewPage />,
    errorElement: <NotFound />,
  },
]);

// TODO: adjust overall app language to ID
export default function App() {
  return (
    <LocalDataProvider>
      <RouterProvider router={router} />
      <Toaster />
    </LocalDataProvider>
  );
}
