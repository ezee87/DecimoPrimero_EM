import { MessageModel } from "./models/messagesModel.js";

export default class MessageDaoMongoDB {

    async getAllMessages () {
        try{
            const response = await MessageModel.find({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };

    async addMessage (userName, message) {
        try{
            const newMessage = await MessageModel.create({
                userName: userName,
                message: message
            });
            return newMessage;
        }catch (error) {
            console.log(error)
        }
    };

    async deleteMessages () {
        try{
            const response = await MessageModel.deleteMany({});
            return response;
        }catch (error) {
            console.log(error)
        }
    };


};