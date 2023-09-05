import TicketService from "../services/ticket.services.js";
import HttpResponse from '../utils/http.response.js';
import { loggerDev } from "../utils/logger.js";

const httpResponse = new HttpResponse();

export default class TicketController {
    async generateTicket (req, res) {
        const cartID = req.params.cid;
        const userID = req.user.email;

        try {
            const ticket = await TicketService.generateTicket(cid, uid)
            return (res.status(200).json({message: 'Purchase successfull', ticket}))    
        } catch (error){
            loggerDev.error(error.message)
            return httpResponse.ServerError(res, error)
        }
    }
};