import Admin from '../../../models/admin'
import generateVerificationCode from '../../../utils/generateVerificationCode'
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
