const yup = require('yup');

const numberOptional = yup.number().strict();
const numberRequired = yup.number().strict().required();
const stringOptional = yup.string().strict().trim();
const stringRequired = yup.string().strict().trim().required();

module.exports = {
  numberOptional,
  numberRequired,
  stringOptional,
  stringRequired,
};
