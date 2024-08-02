import foodModel from "../models/foodModel.js";
import {v2 as cloudinary} from "cloudinary";
import 'dotenv/config.js';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



//add food item
const addFoodItem = async (req, res) => {
    try {
      // Upload image to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "image" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
  
        // Pipe the image buffer into the upload stream
        uploadStream.end(req.file.buffer);
      });
  
      // Save food item with image URL from Cloudinary
      const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: result.secure_url, // Use Cloudinary URL
      });
  
      await food.save();
      res.json({ success: true, message: "Food Item Added Successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  // List All Food Items
  const listFood = async (req, res) => {
    try {
      const food = await foodModel.find();
      res.json({ success: true, data: food });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  // Remove Food Item
  const removeFoodItem = async (req, res) => {
    try {
      const food = await foodModel.findById(req.body.id);
  
      // Remove image from Cloudinary
      const publicId = food.image.match(/\/(?:v\d+\/)?([^/]+)\.[^/]+$/)[1]; // Extract publicId from URL
      await cloudinary.uploader.destroy(publicId);
  
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Item Deleted Successfully" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  
  export { addFoodItem, listFood, removeFoodItem };