const { addDays } = require('date-fns');
const invoiceLines = require('./invoice-lines');
const settings = require('../settings.json');

const invoiceBody = async (data) => {
  const { __t: type, createdAt, dueAt, payer, series } = data;

  if (!type) {
    throw new Error('Missing payer type');
  }

  let name = payer?.name;
  if (!name) {
    name = `${payer?.lastname} ${payer?.firstname}`;
  }

  const products = await invoiceLines(data);

  const payload = {
    ...settings.body,
    companyVatCode: process.env.SMARTBILL_CUI,
    client: {
      name,
      address: payer?.address,
      email: payer?.email,
      phone: payer?.phone,
      vatCode: payer?.cui,
      country: 'Romania',
      saveToDb: false,
      isTaxPayer: false,
    },
    dueDate: dueAt || addDays(Date.now(), 14),
    isDraft: false,
    sendEmail: true,
    issueDate: createdAt || Date.now(),
    precision: 2,
    products,
    seriesName: series,
  };

  // Special payload for development environments
  if (process.env.NODE_ENV !== 'production') {
    payload.seriesName = 'TEST';
    payload.isDraft = true;
  }

  return payload;
};

module.exports = invoiceBody;
