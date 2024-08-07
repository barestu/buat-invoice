import { RouterProvider } from 'react-router-dom';
import { LocalDataProvider } from './context/local-data';
import { Toaster } from './components/ui/sonner';
import { router } from './router';

// TODO: adjust overall app language to ID
export default function App() {
  return (
    <LocalDataProvider>
      <RouterProvider router={router} />
      <Toaster />
    </LocalDataProvider>
  );
}
