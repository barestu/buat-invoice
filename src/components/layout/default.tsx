import { Outlet } from 'react-router-dom';

export default function DefaultLayout() {
  return (
    <div id="defaultLayout" className="bg-gray-100 min-h-screen">
      <header className="fixed z-50 w-full">
        <div className="px-2 py-2 h-16 bg-white shadow-md flex items-center justify-between">
          <div className="container">
            <h1 className="font-bold">Buat Invoice</h1>
          </div>
        </div>
      </header>

      <div className="pt-16 max-w-xl w-full mx-auto">
        <Outlet />
      </div>

      <div>
        <footer className="max-w-xl mx-auto p-4">
          <div className="flex flex-col">
            <p className="text-sm text-center">
              Made with ❤️ by{' '}
              <a href="https://github.com/barestu" className="hover:underline">
                barestu
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
