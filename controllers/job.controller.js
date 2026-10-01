import { Job } from "../models/job.model.js";
// admin post karega job 
export const postJob=async(req,res)=>{
    try{
        const {title,discription,requirements,location,experience,salary,jobType,position,companyId}=req.body;
        const userId=req.id;
console.log({
    title,
    discription,
    requirements,
    location,
    experience,
    salary,
    jobType,
    position,
    companyId,
    userId
});
        if(!title || !discription || !requirements || !location || !experience || !salary || !jobType || !position || !companyId){
            return res.status(400).json({
                message:"All fields are required",
                success:false
            });
        }

        const job=await Job.create({
            title,
            discription,
            requirements:requirements.split(","),
            location,
            experience,
            salary,
            jobType,
            position,
            company: companyId ,
            created_by:userId
        });
        return res.status(201).json({
            message:"Job created successfully",
            success:true,
            job
        });
    } catch(error){
        console.log(error);
    }
};

//student
export const  getAllJobs=async(req,res)=>{
try {
    const keyword=req.query.keyword||"";
    const query={
        $or:[
            {title:{$regex:keyword,$options:"i"}},
             {description:{$regex:keyword,$options:"i"}}
        ]
    };
    const jobs=await Job.find(query)
    .populate("company")
    .sort({ createdAt: -1 });
    if(!jobs){
        return res.status(404).json(
            {
                message:"jobs not found",
                success:false
            }
        )
    }
    return res.status(200).json({
        jobs,
        success:true
    })
} catch (error) {
    
}
}
//student
export const getJobById=async(req,res)=>{
try {
    const jobId=req.params.id;
    const job=await Job.findById(jobId)
    if(!job){
      return  res.status(404).json({
            message:"job not found",
            success:false
        })
    }
    return res.status(200).json({job,success:true});
} catch (error) {
    console.log(error)
}
}

//admin kitne job create kiya h abhi tak
export const getAdminJobs=async(req,res)=>{
try {
    const adminId=req.id;
    const jobs=await Job.find({created_by:adminId})
    if(!jobs){
        return res.status(404).json({
            message:"jobs not found",
            success:false
        })
    }
    return res.status(200).json({jobs,success:true})
} catch (error) {
    console.log(error)
}
}