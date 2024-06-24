import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { DataProvider } from './context/data';
import { Toaster } from './components/ui/sonner';
import HomePage from './pages/home';
import PreviewPage from './pages/preview';
import CreatePage from './pages/create';
import DefaultLayout from './components/layout/default';
import NotFound from './components/not-found';

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
      {
        path: 'preview/:code',
        element: <PreviewPage />,
        errorElement: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
      <Toaster />
    </DataProvider>
  );
}
