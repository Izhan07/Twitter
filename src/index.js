import { Server } from 'socket.io';
import http from 'http';
import connectDB from './db/index.js';
import dotenv from 'dotenv';
import { app } from './app.js';
import {Message} from "./models/message.models.js"
import { Comment } from './models/comment.models.js';

dotenv.config({
    path: './env'
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true 
    }
});

io.on('connection', (socket) => {
    console.log('New client connected');

  
    socket.on('joinRoom', ({ userId, tweetId }) => {
        socket.join(userId);
        socket.join(tweetId)
        console.log(`User with ID ${userId} joined room.`);
    });

   
    socket.on('sendMessage', async ({ content, reciverId, ownerId }) => {
        const message = await Message.create({ content, owner: ownerId, reciver: reciverId });
        const sendedMessage = await Message.findById(message._id);

        if (sendedMessage) {
            console.log(sendedMessage)
            io.to(reciverId).emit('receiveMessage', sendedMessage);
            io.to(ownerId).emit('receiveMessage', sendedMessage); 
        }
    });

    socket.on('postComment', async ({content, postId, ownerId, avatar, username}) =>{
        const comment = await Comment.create({content, tweet: postId, owner: ownerId, avatar, username})
        const postedComment = await Comment.findById(comment._id)
        
        if(postedComment) {

            io.to(postId).emit('receiveComment', postedComment);
        }
    });
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log(`MongoDB connected and server is running on port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB Connection Failed !!!', error);
    });
