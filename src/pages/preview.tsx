import { useEffect, useRef } from 'react';
import domtoimage from 'dom-to-image';
import { ArrowLeftIcon, DownloadIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Helmet } from 'react-helmet';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import NotFound from '@/components/not-found';
import { Card, CardContent } from '@/components/ui/card';
import { useProfile } from '@/hooks/use-profile';
import { useInvoiceDetails } from '@/hooks/use-invoice-details';
import { formatPrice } from '@/lib/utils';

const VIEWPORT_WIDTH = 576;

function PreviewPage() {
  const params = useParams();
  const profile = useProfile();
  const invoice = useInvoiceDetails(params.code);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const subTotal =
    invoice?.items
      .map((item) => item.price * item.qty)
      .reduce((a, b) => a + b, 0) ?? 0;

  const grandTotal =
    subTotal + (invoice?.shipmentPrice ?? 0) + (invoice?.packingPrice ?? 0);

  useEffect(() => {
    document
      .querySelector('meta[name="viewport"]')
      ?.setAttribute('content', `width=${VIEWPORT_WIDTH}px`);
    return () => {
      document
        .querySelector('meta[name="viewport"]')
        ?.setAttribute('content', 'width=device-width, initial-scale=1.0');
    };
  }, []);

  const handleDownload = async () => {
    try {
      const node = printAreaRef.current!;
      const scale = 2;
      const result = await domtoimage.toPng(node, {
        width: node.clientWidth * scale,
        height: node.clientHeight * scale * 1.5,
        style: {
          transform: 'scale(' + scale + ')',
          transformOrigin: 'top left',
        },
      });
      const link = document.createElement('a');
      link.href = result;
      link.download = `INV-${invoice!.code}.png`;
      link.click();
      toast.success('Invoice printed! Please check your Downloads folder');
    } catch (error) {
      console.log(error);
      toast.error('Something wrong happened');
    }
  };

  if (!invoice) {
    return <NotFound />;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="mx-auto p-2 max-w-xl">
        <Helmet>
          <title>{`INV-${invoice.code}`}</title>
          <meta name="description" content="Invoice preview" />
        </Helmet>

        <div className="flex justify-end gap-2 mt-3 mb-4">
          <Button variant="outline" asChild>
            <Link to="/">
              <ArrowLeftIcon size={20} className="mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="w-full"></div>
          <Button variant="default" onClick={handleDownload}>
            <DownloadIcon size={20} className="mr-2" />
            Download
          </Button>
        </div>

        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="border border-dashed rounded-md">
              <div ref={printAreaRef} className="p-4 bg-white">
                <div className="mb-4 text-right flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {profile?.companyLogo && (
                      <img
                        className="w-10 object-contain"
                        src={profile?.companyLogo}
                        alt="Company logo"
                      />
                    )}
                    <div className="text-sm font-bold">
                      {profile?.companyName}
                    </div>
                  </div>
                  <h1 className="text-5xl font-bold">Invoice</h1>
                </div>

                <div className="flex justify-between items-center">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold">Kepada</h3>
                    <div>
                      <p className="text-sm">{invoice.receiverName}</p>
                      <p className="text-sm">{invoice.receiverAddress}</p>
                      <p className="text-sm">{invoice.receiverPhone}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-right">INV-{invoice.code}</p>
                    <p className="text-sm text-right">
                      {format(invoice.issuedAt, 'dd MMM yyyy')}
                    </p>
                  </div>
                </div>

                <Table className="mb-8">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="bg-green-800 w-[60%]">
                        Nama Produk
                      </TableHead>
                      <TableHead className="bg-green-800 text-center">
                        Jumlah
                      </TableHead>
                      <TableHead className="bg-green-800 text-right">
                        Harga
                      </TableHead>
                      <TableHead className="bg-green-800 text-right">
                        Total Harga
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {invoice.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="border-r-0">
                          {item.name}
                        </TableCell>
                        <TableCell className="border-l-0 border-r-0 text-center">
                          {item.qty}
                        </TableCell>
                        <TableCell className="border-l-0 text-right">
                          {formatPrice(item.price)}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatPrice(item.qty * item.price)}
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell className="text-right font-bold" colSpan={3}>
                        Subtotal harga produk
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatPrice(subTotal)}
                      </TableCell>
                    </TableRow>

                    {Boolean(invoice.shipmentPrice) && (
                      <TableRow>
                        <TableCell className="text-right font-bold" colSpan={3}>
                          Ongkir
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatPrice(invoice.shipmentPrice)}
                        </TableCell>
                      </TableRow>
                    )}

                    {Boolean(invoice.packingPrice) && (
                      <TableRow>
                        <TableCell className="text-right font-bold" colSpan={3}>
                          Biaya Packing
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatPrice(invoice.packingPrice)}
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow className="bg-green-700/20">
                      <TableCell className="text-right font-bold" colSpan={3}>
                        Grand Total
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        {formatPrice(grandTotal)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div>
                  <h3 className="text-lg font-bold mb-1">Rekening</h3>
                  <ul className="space-y-1">
                    {profile?.banks.map((bank, idx) => (
                      <li key={idx}>
                        <p className="text-sm">{bank.name}</p>
                        <p className="text-sm">
                          {bank.accountNo} (a/n {bank.accountName})
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PreviewPage;
