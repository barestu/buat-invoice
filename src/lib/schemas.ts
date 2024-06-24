import { z } from 'zod';

export const profileSchema = z.object({
  companyName: z.string(),
  companyLogo: z.string(),
  banks: z
    .array(
      z.object({
        name: z.string(),
        accountNo: z.string(),
        accountName: z.string(),
      })
    )
    .min(1),
});

export type Profile = z.infer<typeof profileSchema>;

export const invoiceSchema = z.object({
  code: z.string(),
  issuedAt: z.date(),
  receiverName: z.string(),
  receiverPhone: z.string(),
  receiverAddress: z.string(),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        qty: z.coerce.number().min(1),
        price: z.coerce.number(),
      })
    )
    .min(1),
  shipmentPrice: z.coerce.number(),
  packingPrice: z.coerce.number(),
});

export type Invoice = z.infer<typeof invoiceSchema>;
