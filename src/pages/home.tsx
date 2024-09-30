import { Link } from 'react-router-dom';
import { PlusCircleIcon, MailIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecentInvoices from '@/components/recent-invoices';
import { Helmet } from 'react-helmet';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Buat Invoice</title>
        <meta
          name="description"
          content="Create invoice for your customers and clients."
        />
      </Helmet>

      <div className="relative bg-white min-h-[calc(100vh-64px-58px)] py-4">
        <section className="px-4 md:px-8 mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Buat Invoice</h1>
          </div>
          <p className="text-sm mb-2">
            Create invoice for your customers and clients.
          </p>
          <Button asChild>
            <Link to="/create">
              <PlusCircleIcon className="mr-2" size={20} /> Get Started
            </Link>
          </Button>
        </section>

        <section className="mb-6">
          <div className="px-4 md:px-8">
            <h2 className="font-bold text-lg mb-2">Recent Invoices</h2>
          </div>
          <RecentInvoices />
        </section>

        <section className="px-4 md:px-8 mb-6">
          <div>
            <h2 className="font-bold text-lg mb-2">Need Help?</h2>
          </div>
          <Button variant="outline" asChild>
            <a
              href="mailto:barestu.fandy@gmail.com?subject=Ask Buat Invoice"
              target="_blank"
              rel="noreferrer"
            >
              <MailIcon className="mr-2" size={20} /> Contact Us
            </a>
          </Button>
        </section>
      </div>
    </>
  );
}
