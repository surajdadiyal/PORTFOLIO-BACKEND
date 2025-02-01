import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { softwareApplication } from "../model/softwareApplicationSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewApplication = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Software Application Icon/Svg Required !", 400))
    }

    const { svg } = req.files;
    const { name } = req.body;

    if (!name) {
        return next(new ErrorHandler("Software's Name is required !", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
        svg.tempFilePath, 
        { folder: "PROTFOLIO_SOFTWARE_APPLICATIONS" }
    )

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary error:",
            cloudinaryResponse.error || "unknown Cloudinary Error !")
    }

    const softwareApplications = await softwareApplication.create({
        name,
        svg: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });
    res.status(200)
        .json({
            success: true,
            message: "New Software Application Added !",
            softwareApplications
        })
});

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;

    const softwareApplications = await softwareApplication.findById(id);
    if (!softwareApplications) {
        return next(new ErrorHandler("Software Application Not Found !", 404))
    }

    const softwareApplicationSvgId = softwareApplications.svg.public_id
    await cloudinary.uploader.destroy(softwareApplicationSvgId)
    await softwareApplications.deleteOne();
    res.status(200)
        .json({
            success: true,
            message: "Software Applicated Deleted !"
        })
});

export const getAllApplications = catchAsyncErrors(async (req, res, next) => {

    const softwareApplications = await softwareApplication.find();
    res.status(200)
        .json({
            success: true,
            softwareApplications
        })
});