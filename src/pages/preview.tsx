import { useContext, useEffect, useMemo } from 'react';
import domtoimage from 'dom-to-image';
import { PrinterIcon } from 'lucide-react';
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
import { LocalDataContext, useSelectInvoice } from '@/context/local-data';
import NotFound from '@/components/not-found';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

function PreviewPage() {
  const params = useParams();
  const { profile } = useContext(LocalDataContext);
  const invoice = useSelectInvoice(params.code);

  const subTotal = useMemo(() => {
    return (
      invoice?.items
        .map((item) => item.price * item.qty)
        .reduce((a, b) => a + b, 0) ?? 0
    );
  }, [invoice]);

  const grandTotal = useMemo(() => {
    return (
      subTotal + (invoice?.shipmentPrice ?? 0) + (invoice?.packingPrice ?? 0)
    );
  }, [subTotal, invoice]);

  useEffect(() => {
    document
      .querySelector('meta[name="viewport"]')
      ?.setAttribute('content', 'width=500px');
    return () => {
      document
        .querySelector('meta[name="viewport"]')
        ?.setAttribute('content', 'width=device-width, initial-scale=1.0');
    };
  }, []);

  const handleExport = async () => {
    try {
      const node = document.getElementById('printArea');
      const result = await domtoimage.toPng(node!);
      const link = document.createElement('a');
      link.href = result;
      link.download = 'invoice.png';
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
    <div className="container p-2 md:p-8 md:max-w-2xl">
      <Helmet>
        <title>{`INV-${invoice.code}`}</title>
        <meta name="description" content="Invoice preview" />
      </Helmet>

      <div className="flex justify-end gap-2 mt-3 mb-4">
        <Button variant="link" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
        <Button variant="default" onClick={handleExport}>
          <PrinterIcon size={20} className="mr-2" />
          Export
        </Button>
      </div>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="border border-dashed rounded-md">
            <div id="printArea" className="p-4 bg-white">
              <div className="mb-4 text-right flex justify-between items-center">
                <div className="text-sm md:text-xl font-bold">
                  {profile?.companyName}
                </div>
                <h1 className="text-xl md:text-5xl font-bold">Invoice</h1>
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
                    <TableHead className="w-[60%]">Nama Produk</TableHead>
                    <TableHead className="text-center">Jumlah</TableHead>
                    <TableHead className="text-right">Harga</TableHead>
                    <TableHead className="text-right">Total Harga</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="border-r-0">{item.name}</TableCell>
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

                  <TableRow className="bg-yellow-300 hover:bg-yellow-300">
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
  );
}

export default PreviewPage;
