import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function Error() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="mb-3">
          <h1 className="text-3xl font-bold">Error</h1>
          <p className="text-sm">Something went wrong</p>
        </div>
        <Button variant="ghost" asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
