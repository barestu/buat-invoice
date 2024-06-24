import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-3">
          <h1 className="text-3xl font-bold">Not found</h1>
          <p className="text-sm">Page not found</p>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
