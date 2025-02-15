//CREATE CATEGORY
const categoryModel = require("../models/categoryModel");

const createCatController =async (req,res) =>{
    try {
        const {title,imageUrl} = req.body;
        //validation
        if(!title){
            return res.status(505).send({
                success:false,
                message:"Please Provide Category title or imageUrl"
            })
        }

        const newCategory = new categoryModel({
            title,
            imageUrl
        })

        await newCategory.save();
        res.status(200).send({
            success:true,
            message:"Category Created Successfully",
            newCategory
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Create Cat API",
            error
        })
    }
}

const getAllCatController = async (req,res) =>{
    try {
        const categories = await categoryModel.find({});
        if(!categories){
            return res.status(404).send({
                success:false,
                message:"No Categories found"
            })
        }
        res.status(200).send({
            success:true,
            totalCat : categories.length,
            categories
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get Category API",
            error
        })
    }
}

//UPDATE CAT
const updateCatController = async (req,res) => {
    try {
        const {id} = req.params;
        const {title,imageUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true})

        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:"No Category Found"
            })
        }

        res.status(200).send({
            success:true,
            message:"Category Updated Successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in update cat api",
            error
        })
    }
}

//DELETE CAT
const deleteCatController = async (req,res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(500).send({
                success:false,
                message:"Please Provide Category ID"
            })
        }

        const category = await categoryModel.findById(id);
        if(!category){
            return res.status(500).send({
                success:false,
                message:"No Categories Found with this ID"
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category Deleted Successfully",
            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete Cat API"
        })
    }
}


module.exports = {createCatController,getAllCatController,updateCatController,deleteCatController}