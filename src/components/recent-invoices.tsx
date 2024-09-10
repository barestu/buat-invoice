import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInvoices } from '@/hooks/use-invoices';

export default function RecentInvoices() {
  const invoices = useInvoices();
  return (
    <div className="mb-4">
      <h2 className="font-bold text-lg mb-2">Recent Invoices</h2>

      {invoices.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
          No invoices found.
        </div>
      )}

      {invoices.length > 0 && (
        <div className="flex overflow-y-auto gap-3">
          {invoices.map((invoice) => (
            <Link key={invoice.code} to={`/preview/${invoice.code}`}>
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle className="text-base">
                    INV-{invoice.code}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-xs italic text-gray-600">
                  <p>Recipient: {invoice.receiverName}</p>
                  <p>Date: {format(invoice.issuedAt, 'dd MMM yyyy')}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
