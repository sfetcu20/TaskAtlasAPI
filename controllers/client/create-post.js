const { error } = require('express-goodies/functions');
const { Post, Client } = require('../../models');
const { validate } = require('express-goodies/middleware');

const { createPostSchema } = require('../../schemas/post-schemas');
const { createKey, remove, upload } = require('../../plugins/aws/src');

const middlewares = [validate(createPostSchema)];

const createPost = async (req, res) => {
  const payload = {
    ...req.body,
    client: { _id: req.user.me, name: req.user.name },
  };

  let image = req?.files?.image ?? null;
  let key;
  if (image) {
    key = createKey(image?.name);
  }
  try {
    if (image?.data) {
      const { response, path } = await upload(key, image.data, { public: true });
      if (!response.$metadata.httpStatusCode === 200) {
        throw Error('Cover image not uploaded');
      }
      payload.cover = path;
    }
    const document = await Post.create(payload);
    if (!document) {
      throw error(400, 'Error! Post could not be created');
    }
    const client = await Client.findById(req.user.me);
    client.jobsPosted.push({
      _id: document._id,
      title: document.title,
      createdAt: document.createdAt,
    });
    await client.save();
    return res.status(200).json({ data: document, message: 'Post created succesfully' });
  } catch (err) {
    remove(key);
    throw error('Post not created');
  }
};
module.exports = [...middlewares, createPost];
