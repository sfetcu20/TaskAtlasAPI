const { error } = require('express-goodies/functions');
const { Post } = require('../../models');
const { JOB_STATUS, WORK_PREFERENCE_ENUM } = require('../../constants');
const { postFilter } = require('../../functions/filters');

const readMany = async (req, res) => {
  const filter = {
    ...postFilter(req.query),
    status: JOB_STATUS.OPEN,
    type: WORK_PREFERENCE_ENUM.on_site,
  };
  const documents = await Post.find(filter).paginate(req.query);
  if (!documents) {
    throw error(400, 'Error! Posts not found!');
  }

  return res.status(200).json(documents);
};
module.exports = readMany;
