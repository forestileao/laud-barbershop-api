import { BadRequestException } from "@nestjs/common";
import { ZodError, ZodObject, z } from "zod"

export const validate = async (input: any, validationSchema: ZodObject<any>) => {
  try {
    await validationSchema.parseAsync(input)
  }
  catch (err) {
    const error = err as ZodError;
    throw new BadRequestException(error.issues.map(issue => ({
      field: issue.path,
      message: issue.message,
    })));
  }
}
