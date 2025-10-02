function getDateRange() {
  const today = new Date();
  const lastWeek = new Date();

  // set lastWeek to 7 days before today
  lastWeek.setDate(today.getDate() - 7);

  // format as YYYY-MM-DD (NewsAPI expects this format)
  const formatDate = (date) => date.toISOString().split("T")[0];

  return {
    today: formatDate(today),
    lastWeek: formatDate(lastWeek),
  };
}

module.exports = getDateRange;
