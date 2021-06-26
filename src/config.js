import { config } from 'dotenv'
config()

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI
}