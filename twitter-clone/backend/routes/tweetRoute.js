import express from 'express'
import { createTweet, getTweets } from '../controlers/tweetControler.js'
const router = express.Router()

router.route('/').get(getTweets).post(createTweet)

export default router;