import { Payment } from '@prisma/client';
import { CardPaymentInfo } from '../../protocols';
import paymentsRepository from '../../repositories/payments-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import { notFoundError, unauthorizedError } from '../../errors';
import ticketsService from '../tickets-service';
import { invalidQueryError } from './errors';

async function getTicketPayment(ticketId: number, userId: number) {
  if (isNaN(ticketId)) throw invalidQueryError();
  const result = await paymentsRepository.getTicketPaymentDB(ticketId, userId);
  if (!result) await verifyTicketStatus(ticketId);
  return result;
}

async function postTicketPayment(payment: CardPaymentInfo, userId: number) {
  const userTicket = await ticketsRepository.getUserTicketWithUserIdDB(userId);
  if (!userTicket) await verifyTicketStatus(payment.ticketId);
  if (userTicket.status === 'RESERVED') {
    const paymentInfo = mountCardPaymentInfo(payment, userTicket.TicketType.price);
    const result = await paymentsRepository.postTicketPaymentDB(paymentInfo);
    await paymentsRepository.updateTicketPaidStatusDB(payment.ticketId);
    return result;
  }
  //else se estiver pago não retorna nada
}

async function verifyTicketStatus(ticketId: number) {
  const ticketExists = await ticketsRepository.getTicketById(ticketId);
  if (!ticketExists) throw notFoundError(); //não existe ticket
  else throw unauthorizedError(); //ticket não é do usuário
}

function mountCardPaymentInfo(payment: CardPaymentInfo, value: number) {
  //Aqui há necessidade de tratar bignumbers
  const paymentModel: PaymentModel = {
    ticketId: payment.ticketId,
    value,
    cardIssuer: payment.cardData.issuer,
    cardLastDigits: String(payment.cardData.number).slice(-4),
    createdAt: new Date(),
  };
  return paymentModel;
}

export type PaymentModel = Omit<Payment, 'id' | 'updatedAt'>;

const paymentsService = { getTicketPayment, postTicketPayment };

export default paymentsService;
