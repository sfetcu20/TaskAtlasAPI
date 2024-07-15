const { isEmpty } = require('lodash');
const settings = require('../settings.json');
const getConvertedValue = require('../../../functions/get-converted-value');

const invoiceLines = async ({ package }) => {
  if (isEmpty(package)) {
    throw new Error('Missing package');
  }

  const price = await getConvertedValue(package.price, 'EUR');

  return [
    {
      ...settings.lines,
      name: package.name,
      quantity: 1,
      price,
    },
  ];
};

module.exports = invoiceLines;
