import Joi from "joi";
import { BorrowStatus } from "@prisma/client";

export const validateIdSchema = Joi.object({
  id: Joi.string().guid().required(),
});

export const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.string().required(),
  category: Joi.string().required(),
  copies: Joi.number().integer().required(),
  shelf: Joi.string().required(),
  price: Joi.number().required(),
  coverImage: Joi.string().optional(),
  description: Joi.string().required(),
  stockStatus: Joi.string().valid("IN_STOCK", "OUT_OF_STOCK").required(),
});

export const updateBookSchema = Joi.object({
  title: Joi.string().optional(),
  author: Joi.string().optional(),
  isbn: Joi.string().optional(),
  category: Joi.string().optional(),
  copies: Joi.number().integer().optional(),
  shelf: Joi.string().optional(),
  price: Joi.number().optional(),
  coverImage: Joi.string().optional(),
  description: Joi.string().optional(),
  stockStatus: Joi.string().valid("IN_STOCK", "OUT_OF_STOCK").optional(),
});

export const statusSchema = Joi.object({
  status: Joi.string().valid(...Object.values(BorrowStatus)).required(),
  rejectionReason: Joi.string().when('status', {
    is: BorrowStatus.REJECTED,
    then: Joi.string().required(),
    otherwise: Joi.string().optional().allow(null),
  }),
});