const yup = require('yup');

function validatePhoneNumber(message) {
  return this.matches(new RegExp(/^(\+4)?(07\d{2}|02\d{2}|03\d{2})([\s.-])?\d{3}([\s.-])?\d{3}$/), {
    message: message || 'Numărul de telefon nu este valid',
    name: 'phoneNumber',
    excludeEmptyString: true,
  });
}

yup.addMethod(yup.string, 'phoneNumber', validatePhoneNumber);

module.exports = yup;
module.exports.validatePhoneNumber = validatePhoneNumber;
