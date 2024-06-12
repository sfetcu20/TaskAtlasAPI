const safeSchema = require('./safe-schema');
const { stringRequired, stringOptional } = require('./yup-type-templates');
const yup = require('./custom-yup');

const createIdentitySchema = safeSchema({
  name: stringRequired,
  email: yup.string().email('Must be a valid email').required('Email is required'),
  role: stringRequired.oneOf(['user', 'client']),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  city: stringRequired,
  country: stringRequired,
  phoneNumber: yup.string().phoneNumber(),
  skills: yup
    .array()
    .of(yup.string())
    .when('role', {
      is: 'user',
      then: yup
        .array()
        .of(yup.string())
        .required('Skills are required for freelancers')
        .min(1, 'At least one skill is required'),
      otherwise: yup.array().of(yup.string()),
    }),
});
const reviewSchema = yup.object().shape({
  client: yup.string().required('Client is required'),
  comment: yup.string().required('Comment is required'),
  rating: stringRequired,
});
const updateIdentitySchema = safeSchema({
  name: stringOptional,
  city: stringOptional,
  country: stringOptional,
  phoneNumber: stringOptional,
  lastCoordonates: stringOptional,
  reviews: yup.array().of(reviewSchema),
  skills: yup.array().of(yup.string()),
  preferences: yup.array().of(yup.string()),
  highestEducation: stringOptional,
  certifications: yup.array().of(yup.string()),
  experience: stringOptional,
});

module.exports = {
  createIdentitySchema,
  updateIdentitySchema,
};
