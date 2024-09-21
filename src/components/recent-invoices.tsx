import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInvoices } from '@/hooks/use-invoices';

export default function RecentInvoices() {
  const invoices = useInvoices();
  return (
    <div className='ml-4 md:ml-8'>
      {invoices.length === 0 && (
        <div className="text-center text-gray-500 text-sm">
          No invoices found.
        </div>
      )}

      {invoices.length > 0 && (
        <div className="flex overflow-y-auto gap-3">
          {invoices.map((invoice) => (
            <Link
              key={invoice.code}
              to={`/preview/${invoice.code}`}
              className="last:mr-4 last:md:mr-8"
            >
              <Card className="hover:bg-gray-50">
                <CardHeader className="p-4 pb-0">
                  <CardTitle className="text-base text-nowrap">
                    INV-{invoice.code}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-1 text-xs italic text-gray-600">
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
