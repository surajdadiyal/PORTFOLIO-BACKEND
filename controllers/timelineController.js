import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Timeline } from "../model/timelineSchema.js";

export const postTimeLine = catchAsyncErrors(async (req, res, next) => {
    const { title, description, from, to } = req.body;

    const newTimeline = await Timeline.create({
        title,
        description,
        timeline: { from, to }
    })
    res.status(200)
        .json({
            success: true,
            message: "Timeline Added !",
            newTimeline
        })
});

export const deleteTimeLine = catchAsyncErrors(async (req, res, next) => {

    const { id } = req.params;

    const timeline = await Timeline.findById(id);

    if (!timeline) {
        return next(new ErrorHandler("Timeline not found !", 404))
    }

    await timeline.deleteOne()
    res.status(200)
        .json({
            success: true,
            message: "Timeline deleted !"
        })

});

export const getAllTimeLine = catchAsyncErrors(async (req, res, next) => {

    const timeline = await Timeline.find();
    res.status(200)
        .json({
            success: true,
            timeline
        })
});