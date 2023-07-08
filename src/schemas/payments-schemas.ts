import Joi from 'joi';
import { CardPaymentInfo } from '../protocols';

export const paymentsSchema = Joi.object<CardPaymentInfo>({
  ticketId: Joi.number().required(),
  cardData: {
    issuer: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/
    ).messages({        
        "string.pattern.base": "ExpirationDate accepts only in MM/YY format"
      }),
    cvv: Joi.number().required()
  }
});
