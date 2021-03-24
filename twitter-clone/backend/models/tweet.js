import mongoose from 'mongoose'

const tweetsSchema = mongoose.Schema({
    username: { type: String, required: true},
    message: {type: String, required: true},
}, {
    timestamps: true
})


const Tweet = mongoose.model('Tweet', tweetsSchema)

export default Tweet