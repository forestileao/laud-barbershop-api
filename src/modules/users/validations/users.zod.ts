import { z } from 'zod';

export const zodCreateCustomerInput = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  password: z.string().min(8),
});
