import jwt from "jsonwebtoken";

const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Please login to access this resource"
            });
        }
        const decoded=await jwt.verify(token,process.env.SECRET_KEY);
        if(!decoded){
            return res.status(401).json({
                success:false,
                message:"Invalid token"
            });
        }
        req.id=decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });
    }
};

export default isAuthenticated;