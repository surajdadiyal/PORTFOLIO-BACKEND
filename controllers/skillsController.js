import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Skill } from "../model/skillsSchema.js";
import { v2 as cloudinary } from 'cloudinary';

export const addNewSkills = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Skills Svg Required !", 400))
    }

    const { svg } = req.files;
    const { title, proficiency } = req.body;

    if (!title || !proficiency) {
        return next(new ErrorHandler("Please Fill Full Form !", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(svg.tempFilePath, { folder: "PROTFOLIO_SKILLS_SVG" })

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary error:",
            cloudinaryResponse.error || "unknown Cloudinary Error !")
    }

    const skills = await Skill.create({
        title,
        proficiency,
        svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(200)
        .json({
            success: true,
            message: "New Skill Added !",
            skills
        })
});

export const deleteSkills = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;

    const skills = await Skill.findById(id);
    if (!skills) {
        return next(new ErrorHandler("Skill Not Found !", 404))
    }

    const skillsSvgId = skills.svg.public_id
    await cloudinary.uploader.destroy(skillsSvgId)
    await skills.deleteOne();
    res.status(200)
        .json({
            success: true,
            message: "Skill Deleted !"
        })
});

export const updateSkills = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;

    let skill = await Skill.findById(id);
    
    if (!skill) {
        return next(new ErrorHandler("Skill Not Found !", 404))
    }

    const { proficiency } = req.body

    skill = await Skill.findByIdAndUpdate(id, { proficiency }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200)
        .json({
            success: true,
            message: "Skill Updated !",
            skill
        })
});

export const getAllSkills = catchAsyncErrors(async (req, res, next) => {
    const skills = await Skill.find();
    res.status(200)
        .json({
            success: true,
            skills
        })
});