import Admin from '../../../models/admin/index.js'
import generateVerificationCode from '../../../utils/generateVerificationCode/index.js'
export default async ( res, next) => {
    try {
        await Admin.createAdmin({
            firstName: "Alexandra",
            lastName: "Jane",
            email: "test@gmail.com",
            password: "adminpass",
            identifiant: "admin",
            phone: `+237${generateVerificationCode(10)}`
        });
    } catch (error) {
        console.log(error)
    }
}
