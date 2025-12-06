import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error?.issues?.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.message || 'Unknown validation error',
      });
    }
  };
};