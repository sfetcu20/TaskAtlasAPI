const { error } = require('express-goodies/functions');
const { Post } = require('../../models');
const { JOB_STATUS } = require('../../constants');

const apply = async (req, res) => {
  const document = await Post.findOne({ _id: req.params.id, status: JOB_STATUS.OPEN }).populate(
    'client'
  );
  if (!document) {
    throw error(400, 'Error! Post not found!');
  }

  const application = {
    _id: req.user._id,
    name: req.user.name,
    message: req.body.message,
  };
  await document.updateOne({
    $push: { applications: application },
  });
  return res.status(200).json(document);
};
module.exports = apply;
