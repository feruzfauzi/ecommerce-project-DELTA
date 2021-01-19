export default{
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/glovic',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingconfidential',
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID|| 'sb'
}