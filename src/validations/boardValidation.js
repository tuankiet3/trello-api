import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    // custom message:
    // https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages/68092831#68092831
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      "any.required": "title is required",
      "string.empty": "title is not alow to be empty",
      "string.min": "title length must be least 3 characters",
      "string.max": "title length must be less than or equal to 5 characters",
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
  });
  try {
    console.log(req.body);
    // abortEarly: trả về nhiều lỗi nếu có
    await correctCondition.validateAsync(req.body, { abortEarly: false });
    // next();
    res.status(StatusCodes.CREATED).json({ message: "created successfully" });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: new Error(error).message,
    });
  }
};

export const boardValidation = {
  createNew,
};
