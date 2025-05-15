/**
 * Generates a Mongoose datetime range filter for a given year and month.
 * @param {string} year - The year in "YYYY" format.
 * @param {string} month - The month in "MM" format (01-12).
 * @returns {Object} Mongoose filter object for the datetime field.
 */
export function getMonthDatetimeRangeFilter(year, month) {
	const monthMM = String(month).padStart(2, "0");
	const start = new Date(`${year}-${monthMM}-01T00:00:00Z`);
	// Calculate next month
	let nextYear = parseInt(year, 10);
	let nextMonth = parseInt(monthMM, 10) + 1;
	if (nextMonth > 12) {
		nextMonth = 1;
		nextYear += 1;
	}
	const nextMonthStr = String(nextMonth).padStart(2, "0");
	const end = new Date(`${nextYear}-${nextMonthStr}-01T00:00:00Z`);
	return {
		$gte: start,
		$lt: end,
	};
}

export function getYearDatetimeRangeFilter(year) {
	const start = new Date(`${year}-01-01T00:00:00Z`);
	const end = new Date(`${parseInt(year, 10) + 1}-01-01T00:00:00Z`);
	return {
		$gte: start,
		$lt: end,
	};
}
