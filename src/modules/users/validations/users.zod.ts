import { z } from 'zod';

export const zodCreateCustomerInput = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  birthdate: z.date(),
  password: z.string().min(8),
});
