const { error } = require('express-goodies/functions');
const { Post } = require('../../models');
const { JOB_STATUS } = require('../../constants');
const { remove, createKey, upload } = require('../../plugins/aws/src');

const updatePost = async (req, res) => {
  const filter = {
    status: JOB_STATUS.OPEN,
    _id: req.params.id,
    client: req.user._id,
  };
  let image = req?.files?.image ?? null;
  let key;
  if (image) {
    key = createKey(image?.name);
  }
  const payload = { ...req.body };
  if (req.body?.skillsRequired) {
    payload.skillsRequired = JSON.parse(req.body.skillsRequired);
  }
  if (req.body?.coordinates) {
    payload.coordinates = JSON.parse(req.body.coordinates);
  }
  delete payload.client;
  try {
    if (image?.data) {
      const { response, path } = await upload(key, image.data, { public: true });
      if (!response.$metadata.httpStatusCode === 200) {
        throw Error('Cover image not uploaded');
      }
      payload.cover = path;
    }
    const post = await Post.findOne(filter);
    if (!post) {
      throw error(400, 'Error! Post not found!');
    }
    await post.updateOne(payload);
    return res.status(200).json(post);
  } catch (err) {
    await remove(key);
    console.error(err);
    throw error(500, 'Post not updated ', err);
  }
};
module.exports = updatePost;
