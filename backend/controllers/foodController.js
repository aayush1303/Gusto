import foodModel from "../models/foodModel.js";
import fs from "fs";


//add food item

const addFoodItem = async (req, res) => {
    
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        image: image_filename,
    });
    try{
        await food.save();
        res.json({success: true, message: "Food Item Added Successfully"});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

// all food list

const listFood = async (req, res) => {
    try{
        const food = await foodModel.find();
        res.json({success: true, data:food});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

const removeFoodItem = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id); //id that is created in mongodb
        fs.unlink(`uploads/${food.image}`,() => {})
        
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Food Item Deleted Successfully"});
    }catch(error){
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

export { addFoodItem,listFood,removeFoodItem };

// 2