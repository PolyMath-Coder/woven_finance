import dotenv from 'dotenv';
dotenv.config()

const config = {
    database: {
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      name: process.env.DB_NAME || 'woven',
    },
    server: {
      port: process.env.PORT || 3000,
    }
  };

  export default config;