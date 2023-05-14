module.exports = (query) => {
  const filter = {};
  //name filter
  if (query.name) {
    filter.name = { $regex: query.name, $options: 'i' };
  }
  //coins filter
  if (query.min_coins && query.max_coins) {
    filter.coins = { $gte: query.min_coins, $lte: query.max_coins };
  }
  if (query.min_coins) {
    filter.coins = { $gte: query.min_coins };
  }
  if (query.max_coins) {
    filter.coins = { $lte: query.max_coins };
  }

  //completted tasks filter
  if (query.min_tasks && query.max_tasks) {
    filter.completedTasks = { $gte: query.min_tasks, $lte: query.max_tasks };
  }
  if (query.min_tasks) {
    filter.completedTask = { $gte: query.min_tasks };
  }
  if (query.max_tasks) {
    filter.completedTask = { $lte: query.max_tasks };
  }
};
