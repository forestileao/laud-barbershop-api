import { z } from 'zod';

export const zodCreateCustomerInput = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string().min(8),
});
