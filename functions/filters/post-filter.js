module.exports = (query) => {
  const filter = {};
  //name filter
  if (query.search) {
    filter.search = { $regex: query.search, $options: 'i' };
  }
  //coins filter
  if (query.startDate) {
    filter.startDate = { $gte: query.startDate };
  }
  if (query.endDate) {
    filter.query.endDate = { ...filter, endDate: { $lte: query.endDate } };
  }
  if (query.skillsRequired) {
    filter.skillsRequired = { $all: query.skillsRequired };
  }
  return filter;
};
