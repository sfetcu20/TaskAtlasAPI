const { error } = require('express-goodies/functions');
const { Identity } = require('../../models');
const { validate } = require('express-goodies/middleware');
const { createIdentitySchema } = require('../../schemas');
const { userExists } = require('express-goodies/middleware');
const { notifyIdentity } = require('../../functions');

const middlewares = [validate(createIdentitySchema), userExists(Identity)];

const createIdentity = async (req, res) => {
  const payload = { ...req.body, __t: req.body.role, active: true };

  const document = await Identity.create(payload);
  if (!document) {
    throw error(400, 'Error! Account has not been registered');
  }
  await notifyIdentity.confirmEmail({
    id: document._id,
    name: document.name,
    email: document.email,
  });
  return res.status(200).json({ data: document, message: 'Account registered' });
};
module.exports = [...middlewares, createIdentity];
