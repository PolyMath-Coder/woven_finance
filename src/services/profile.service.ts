import { Profile } from "../config/models"
import { v4 as uuidV4 } from 'uuid';
import { UserRoleEnum } from "../utils/enums";
import { ProfileInfo } from "../utils/interface";

export const SeedAllUsers = async () => {
     await Profile.destroy({where: {}})

     const users = await Profile.bulkCreate([
        {
            name: 'Admin User',
            email: 'admin@admin.com',
            user_role: UserRoleEnum.ADMIN
        },
        {
           name: 'John Doe',
           email: 'johndoe@gmail.com',
           user_role: UserRoleEnum.CLIENT
        },
        {
            name: 'Viola Davis',
            email: 'viola_davis@gmail.com',
            user_role: UserRoleEnum.CONTRACTOR
        },
        {
            name: 'Johnny Depp',
            email: 'johndoe@gmail.com',
            user_role: UserRoleEnum.CLIENT
        },
        {
            name: 'Kevin Hart',
            email: 'johndoe@gmail.com',
            user_role: UserRoleEnum.CLIENT
        }
     ])
     return users;
}

export const FindUserById = async (profile_id: string): Promise<ProfileInfo> => {
    try {
        const profile = await Profile.findByPk(profile_id) as Profile
        return {
            profile_id,
            name: profile.name,
            email: profile.email,
            user_role: profile.user_role,
            balance: profile.balance
        }
    } catch(error) {
        throw new Error(`System error: ${error.message}`);
    }
    
};