import { Application } from "../models/application.model.js";
export const applyForJob = async (req, res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }
        // check if the user has already applied for the job
        const existingApplication=await Application.findOne({user:userId,job:jobId});
        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }
        // check if the job exists
        job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        // create a new application
        const application=await Application.create({
            job:jobId,
            applicant:userId
        });
       
        job.applications.push(application._id);
        await job.save();
        return res.status(201).json({
            message: "Application submitted successfully",
            success: true,
            application
        });
    }
    catch (error) {
        console.log(error)
    }
}


export const getAppliedJobs = async (req, res) => {
    try{
        const applications = await Application.find({applicant:userId}).sort({ createdAt: -1 }).populate({
            path:"job",
            options:{sort:{ createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{ createdAt:-1}}
            }
        });
        if(!applications){
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }
        return res.status(200).json({
            applications,
            success: true
        });
    }
    catch (error) {
        console.log(error)
    }
}


// admin dekhega kitna user ne apply kiya h 
export const getApplicants = async (req, res) => {
    try{

        const jobId = req.params.id; 
        const job=await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{ createdAt:-1}},
            populate:{
                path:"applicant",
                options:{sort:{ createdAt:-1}}
            }
        });
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        }); 
    }
    catch (error) {
        console.log(error)
    }
}

export const updateStatus=async (req, res) => {
    try{
        const {status}=req.body; 
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        // find the application by ID
        const application = await Application.findOne({_id:applicationId}).populate("job");
        if(!application){
            return res.status(404).json({
                message: "Application not found",
                success: false
            });
        }

        // update the application status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
         
        });
    }catch (error) {
        console.log(error)
    }
}