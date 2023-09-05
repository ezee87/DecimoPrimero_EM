import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
import { changeStatusService } from "../services/changeStatus.services.js";
import { loggerDev } from "../utils/logger.js";
import HttpResponse from "../utils/http.response.js";

const userDao = new UserDao();

export const changeStatus = async (req, res, next) => {
    try {

        const { uid } = req.params;
        const user = await userDao.getUserByID(uid)
        const newRole = user.role === 'user' ? 'premium' : 'user';
        const updatedRole = await changeStatusService(uid, newRole);
        res.json({ message: 'Role updated successfully', newRole: updatedRole});

    } catch (error) {
        
        loggerDev.error(error.message)
        HttpResponse.ServerError(res, error)
    }
};