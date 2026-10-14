import jwt from "jsonwebtoken";

const isAuthenticated=async(req,res,next)=>{
    try {
        const token=req.cookies.token;
        console.log("COOKIES:", req.cookies);
console.log("TOKEN:", token);
console.log("TOKEN TYPE:", typeof token);
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
            console.log("JWT ERROR:", error);
    console.log("JWT MESSAGE:", error.message);
        return res.status(401).json({
            success:false,
            message:"Invalid token"
        });
    }
};

export default isAuthenticated;