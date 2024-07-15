const { error } = require('express-goodies/functions');
const { Post, Client } = require('../../models'); // Assuming Client model is also in '../../models'
const { Types } = require('mongoose');

const readOne = async (req, res) => {
  const postId = req.params.id;

  // Find the post by ID and populate the client
  const document = await Post.findOne({ _id: postId, client: Types.ObjectId(req.user.me) })
    .populate('client')
    .lean();
  if (!document) {
    throw error(400, 'Error! Post not found!');
  }

  // Extract the client ID from the populated client field in the document
  const clientId = document.client._id;

  // Update the client document to remove the post from jobsPosted array
  await Client.findByIdAndUpdate(
    clientId,
    { $pull: { jobsPosted: { _id: postId } } },
    { new: true }
  );

  // Remove the post itself
  await Post.findByIdAndRemove(postId);

  return res.status(200).json({ message: 'Post removed successfully' });
};

module.exports = readOne;
