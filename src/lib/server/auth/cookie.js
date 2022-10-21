import * as dotenv from 'dotenv';
dotenv.config();

export default samesite = process.env.NODE_ENV == 'production' ? ';SameSite=None' : '';
