import { createBrowserRouter } from 'react-router-dom';

// Components
import DefaultLayout from './components/layout/default';
import Error from './components/error';
import NotFound from './components/not-found';

// Pages
import HomePage from './pages/home';
import CreatePage from './pages/create';
import PreviewPage from './pages/preview';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <Error />,
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
