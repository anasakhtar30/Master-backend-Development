const restaurantModel = require("../models/restaurantModel");

//CREATE RESTURANT
const createResturantControoler = async (req,res) =>{
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,logoUrl,rating,ratingCount,code,coords} = req.body;

        //validation
        if(!title || !coords){
            return res.status(500).send({
                success:false,
                message:"Please provide title and address",
            })
        }

        const newResturant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        })

        await newResturant.save();

        res.status(201).send({
            success:true,
            message:"New Resturant Created Successfully"
        })
        
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Create Resturant API",
            error
        })
    }
}

//GET ALL RESTURANT

const getAllResturantController =async (req,res) => {
 try {
    const resturants = await restaurantModel.find({});
    if(!resturants){
        return res.status(404).send({
            success:false,
            message:"No Resturant Available"
        })
    }

    res.status(200).send({
        success:true,
        totalCount:resturants.length,
        resturants
    })
    
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in GET ALL Resturant API",
        error
    })
 }
}


//GET SINGLE RESTURANT

const getResturantByIdController = async (req,res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId){
            return res.statu(404).send({
                success:false,
                message:"Please Provide Resturant Id"
            })
        }
        //find Resturant
        const resturant = await restaurantModel.findById(resturantId);
        if(!resturant){
            return res.status(500).send({
                success:false,
                message:"No Resturant Found"
            })
        }

        res.status(200).send({
            success:true,
            message:"Fetched Successfully Single Resturant",
            resturant
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in GET Resturant by id API",
            error
        })
    }
}


//DELETE RESTURANT
const deleteResturantController = async (req,res) =>{
    try{
        resturantId = req.params.id;
        if(!resturantId){
            return res.status(404).send({
                success:false,
                message:"Please Provide Resturant ID"
            })
        }
        if(!resturantId) {
            return res.status(404).send({
                success:false,
                message:"No Resturant Found"
            })
        }

        await restaurantModel.findByIdAndDelete(resturantId);
        res.status(200).send({
            success:true,
            message:"Resturant Deleted Successfully"
        })


    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Delete Resturant API".
            error
        })
    }

}

module.exports = {createResturantControoler,getAllResturantController,getResturantByIdController,deleteResturantController}