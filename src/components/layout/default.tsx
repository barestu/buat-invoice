import { Link, Outlet } from 'react-router-dom';
import { Button } from '../ui/button';
import { PlusCircleIcon } from 'lucide-react';

export default function DefaultLayout() {
  return (
    <div id="defaultLayout" className="bg-gray-100 min-h-screen">
      <header className="fixed w-full">
        <div className="px-2 py-2 h-16 bg-white shadow-md flex items-center justify-between">
          <div className="container">
            <h1 className="font-bold">Invoice Builder</h1>
          </div>

          <div>
            <Button asChild>
              <Link to="/create">
                <PlusCircleIcon className="mr-2" /> New Invoice
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="pt-16 max-w-xl w-full mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
