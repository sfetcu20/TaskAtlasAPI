const { error } = require('express-goodies/functions');
const { Post, Identity } = require('../../models');
const { JOB_STATUS } = require('../../constants');

const readOne = async (req, res) => {
  const document = await Post.findById(req.params.id);
  if (!document) {
    throw error(400, 'Error! Posts not found!');
  }
  await document.updateOne({ status: JOB_STATUS.COMPLETE });
  await document.save();
  await Identity.findByIdAndUpdate(document.user, {
    $push: { jobsCompleted: { ...document }, points: { $inc: document.budget } },
  });
  return res.status(200).json(document);
};
module.exports = readOne;
