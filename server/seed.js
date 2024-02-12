import bcrypt from "bcrypt"
import {SuperAdmin} from "./models/SuperAdmin.js"
import "./db.js"


async function AdminAccount() {

    try {
        const superadminCount = await SuperAdmin.countDocuments()
        if(superadminCount === 0) {
            const hashPassword = await bcrypt.hash('superadminpassword', 10)
            const newSuperAdmin = new SuperAdmin({
                cnic: '3460242420189',
                password: hashPassword
            })
            await newSuperAdmin.save()
            console.log("Super Admin Created")
        }
        else {
            console.log("There is already a Super Admin")
        }
    } catch (error) {
        console.log(error)
    }
}

AdminAccount()