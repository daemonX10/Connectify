import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { ApiErrResponse } from "../utils/ApiErrResponse.js";


const search = asyncHandler( async(req,res)=>{
    try {
        const {search} = req.params;
    
        if(!search){
            throw new ApiError(400,"Fill to search")
        }
    
        let response
        let responsePost
        if(search){
            response = await User.find({ $or : [{username: {$regex : search.toLowerCase()}},{fullName: {$regex : search.toLowerCase()}}]}).select("username ProfileImage Description")
        }
    
        if(response.length === 0){
            responsePost = await Post.find({title: {$regex : search}},{isPublished : true})
            // console.log(responsePost);
        }
    
        if(response.length <= 0 && responsePost.length <=0){
            throw new ApiError(400, `username ${search} does not exists also Post related to ${search} does not exist !!`)
        }
        // console.log(response);
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                response.length > 0 ? response : {post : responsePost},
                "Search successfully !!"
            )
        )
    } catch (error) {
           return res.json(
                new ApiErrResponse(error)
           )
    }
})

export {search}