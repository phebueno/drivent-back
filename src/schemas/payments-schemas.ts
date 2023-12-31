import Joi from 'joi';
import { CardPaymentInfo } from '../protocols';

export const paymentsSchema = Joi.object<CardPaymentInfo>({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.required(),
    cvv: Joi.number().required()
  }
});
