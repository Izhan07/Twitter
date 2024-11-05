/*
import cron from "node-cron"
import { Story } from "../models/story.models.js"
import {v2 as Cloudinary} from "cloudinary"

async function deleteExpiredStories() {
    console.log("Cron job started - checking for expired stories");
    
    const cutoff = new Date(Date.now()- 24 * 60 * 60 * 1000);
    
    try {
        const expiredStories = await Story.find({ createdAt: { $lte: cutoff } });
        console.log("Expired stories:", expiredStories);

        for (const story of expiredStories) {
            const publicId = story.story.split('/').pop().split('.')[0];
            console.log(`Extracted public ID: ${publicId}`);
            
            try {
                await Cloudinary.uploader.destroy(publicId);
                console.log(`Deleted story from Cloudinary with public ID: ${publicId}`);
                await Story.findByIdAndDelete(story._id)
            } catch (error) {
                console.error(`Failed to delete from Cloudinary: ${publicId}`, error);
            }
            
          
        }
    } catch (error) {
        console.error('Error deleting expired stories:', error);
    }
}


cron.schedule('0 * * * *', deleteExpiredStories);


deleteExpiredStories();
*/