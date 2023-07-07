import { Ticket } from '@prisma/client';
import Joi from 'joi';

export const ticketsSchema = Joi.object<TicketTypeId>({
  ticketTypeId: Joi.number().required(),
});

export type TicketTypeId = Pick<Ticket, 'ticketTypeId'>;
