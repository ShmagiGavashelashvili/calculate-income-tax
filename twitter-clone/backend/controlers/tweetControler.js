import asyncHandler from 'express-async-handler'
import Tweet from '../models/tweet.js'

const getTweets = asyncHandler(async(req, res) => {
    try{
        // displays 10 random tweets on screen
        const tweets = await Tweet.aggregate([{$sample: {size: 10}}])
        res.json(tweets)
      } catch (error){
        res.status(404)
        throw new Error('Tweets Not Found')
      }
})

const createTweet = asyncHandler(async(req, res) => {
  const { username, message } = req.body
  
  const tweet = new Tweet({
    username,
    message
  })

 try {
   if(tweet){
     const createdTweet = await tweet.save()
     res.status(201).json(createdTweet)
   }
 } catch(error){
    throw new Error(error.message)
 }
})

export { getTweets, createTweet }