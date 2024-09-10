import { Link } from 'react-router-dom';
import { PlusCircleIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecentInvoices from '@/components/recent-invoices';

// TODO: add apps menu
export default function HomePage() {
  return (
    <div className="relative container bg-white min-h-[calc(100vh-64px-58px)] p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Buat Invoice</h1>
        <p className="text-sm mb-4">
          Create invoice for your customers and clients.
        </p>
        <Button asChild>
          <Link to="/create">
            <PlusCircleIcon className="mr-2" size={20} /> Get Started
          </Link>
        </Button>
      </div>

      <RecentInvoices />

      <div className="mb-4">
        <h2 className="font-bold text-lg mb-2">Need Help?</h2>
        <Button variant="outline" asChild>
          <a
            href="mailto:barestu.fandy@gmail.com?subject=Ask Buat Invoice"
            target="_blank"
            rel="noreferrer"
          >
            <MailIcon className="mr-2" size={20} /> Contact Us
          </a>
        </Button>
      </div>
    </div>
  );
}
