import { Request, Response } from "express";
import paymentsService from "../services/payments-service";
import { CardPaymentInfo } from "../protocols";
import { AuthenticatedRequest } from "../middlewares";

export async function getTicketPayment(req: AuthenticatedRequest,res: Response){
    const paidTicket = await paymentsService.getTicketPayment(Number(req.query.ticketId), req.userId);
    //verificar se ticket existe
    res.send(paidTicket);
}

export async function postTicketPayment(req: AuthenticatedRequest,res: Response){
    const payment = req.body as CardPaymentInfo;
    const result = await paymentsService.postTicketPayment(payment, req.userId);
    res.send(result);
}