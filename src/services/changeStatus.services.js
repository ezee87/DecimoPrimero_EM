import UserDao from "../persistence/daos/mongodb/dao/user.dao.js";
import { loggerDev } from "../utils/logger.js";

const usersDao = new UserDao();

export const changeStatusService = async (uid, role) => {
    try {
        const user = await usersDao.getUserByID(uid);
        if(!user) {
            throw new Error('User not found')
        }

        if(role === 'premium'){
            user.prodCreator = true;
            await user.save()
        }

        const updatedRole = await usersDao.updateStatus(uid, role);
        return updatedRole
        
    } catch (error) {
        loggerDev.error(error.message);
        throw error
    }
};