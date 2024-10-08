import sequelize from "../db"
import Profile from "./profile.model";
import Contract from "./contract.model";

const databaseConnection = () => {
    sequelize.sync({ alter: true }).then(() => {
        console.log('database sync successful!')
    }).catch((error) => {
        console.error("Error syncing database:", error);
      });
};

export { Contract, Profile, databaseConnection};