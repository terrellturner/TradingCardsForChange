import { isValidObjectId } from "mongoose";

function checkObjectId(req, res, next) {
  if (!isValidObjectId(req.params.id)) {
    res.status(404);
    console.log(req.params);

    throw new Error(`Invalid ObjectId of:  ${req.params.id}`);
  }
  next();
}

export default checkObjectId;
