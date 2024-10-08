import sequelize from "../db"
import Profile from "./profile.model";

const databaseConnection = () => {
    sequelize.sync({ alter: true }).then(() => {
        console.log('database sync successful!')
    }).catch((error) => {
        console.error("Error syncing database:", error);
      });
};

export { Profile, databaseConnection};