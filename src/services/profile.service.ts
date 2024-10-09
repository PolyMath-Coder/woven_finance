import { Profile } from "../config/models"
import { v4 as uuidV4 } from 'uuid';
import { UserRoleEnum } from "../utils/enums";

const SeedAllUsers = async () => {
     await Profile.destroy({where: {}})

     const users = await Profile.bulkCreate([
        {
            name: 'Admin User',
            email: 'admin@admin.com',
            userRole: UserRoleEnum.ADMIN
        },
        {
           name: 'John Doe',
           email: 'johndoe@gmail.com',
           userRole: UserRoleEnum.CLIENT
        },
        {
            name: 'Viola Davis',
            email: 'viola_davis@gmail.com',
            userRole: UserRoleEnum.CONTRACTOR
        },
        {
            name: 'Johnny Depp',
            email: 'johndoe@gmail.com',
            userRole: UserRoleEnum.CLIENT
        },
        {
            name: 'Kevin Hart',
            email: 'johndoe@gmail.com',
            userRole: UserRoleEnum.CLIENT
        }
     ])
     return users;
}
export default SeedAllUsers;