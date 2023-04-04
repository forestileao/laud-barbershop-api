import { z } from 'zod';

export const zodCreateAppointmentInput = z.object({
  startDate: z.date(),
  endDate: z.date(),
  customerId: z.string().uuid(),
  barberId: z.string().uuid(),
  barberShopId: z.string().uuid(),
});

export const zodUpdateAppointmentInput = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  barberId: z.string().uuid().optional(),
});
