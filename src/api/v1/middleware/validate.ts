import { Request, Response, NextFunction } from "express";
import Joi from "joi";

/**
 * Defines the structure of a validation schema used for a route.
 * Each key (body, params, query) corresponds to a Joi schema.
 */
export interface RequestSchema {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
}

/**
 * Generic validation middleware.
 * It checks body, params, and query against their corresponding Joi schemas.
 */
export const validateRequest = (schema: RequestSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (schema.body) {
        const { error } = schema.body.validate(req.body, { abortEarly: false });
        if (error) {
          res.status(400).json({
            success: false,
            message: "Validation error in body",
            details: error.details.map((d) => d.message),
          });
          return;
        }
      }

      if (schema.params) {
        const { error } = schema.params.validate(req.params);
        if (error) {
          res.status(400).json({
            success: false,
            message: "Validation error in params",
            details: error.details.map((d) => d.message),
          });
          return;
        }
      }

      if (schema.query) {
        const { error } = schema.query.validate(req.query);
        if (error) {
          res.status(400).json({
            success: false,
            message: "Validation error in query",
            details: error.details.map((d) => d.message),
          });
          return;
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};
