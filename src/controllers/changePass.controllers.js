import { transporter, emailOptions } from '../services/email.services.js';
import { validPassword } from '../utils/utils.js';
import { createHash } from '../utils/utils.js';
import UserDao from '../persistence/daos/mongodb/dao/user.dao.js';

const userDao = new UserDao();

export const sendEmail = async (req, res) => {
    try {
        const response = await transporter.sendMail(emailOptions)
        res.json(response)
    } catch (error) {
        throw new Error(error)
    }
};

export const updatePass = async (req, res) => {
    const email = req.body.email;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
        return res.send('New and current pass do not match')
    }
    try {
        const user = await userDao.getUserByEmail(email)
        if(!user) {
            return res.status(404).send('User not found')
        }

        if(!validPassword(currentPassword, user)) {
            return res.send('Incorrect current password')
        }

        const newPassHash = createHash(newPassword);
        await userDao.updatePass(user._id, newPassHash)
        res.send('Password updated successfully')

    } catch (error) {
        throw new Error (error)
    }
};