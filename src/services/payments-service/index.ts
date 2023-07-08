import { Payment } from '@prisma/client';
import { CardPaymentInfo } from '../../protocols';
import paymentsRepository from '../../repositories/payments-repository';
import ticketsRepository from '../../repositories/tickets-repository';
import { notFoundError, unauthorizedError } from '../../errors';
import ticketsService from '../ticket-service';

async function getTicketPayment() {
  return paymentsRepository.getTicketPaymentDB();
}

async function postTicketPayment(payment: CardPaymentInfo, userId: number) {
  const userTicket = await ticketsService.getUserTickets(userId);
  if (userTicket.id !== payment.ticketId) {
    const ticketExists = await ticketsRepository.getTicketById(payment.ticketId);
    if (!ticketExists) throw notFoundError(); //não existe ticket
    else throw unauthorizedError(); //ticket não é do usuário
  }
  const paymentInfo = mountCardPaymentInfo(payment, userTicket.TicketType.price);
  const result = await paymentsRepository.postTicketPaymentDB(paymentInfo);
  return result;
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
