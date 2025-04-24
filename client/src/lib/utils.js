const formatTime = (time) => {
	const [hour, minute] = time.split(":").map(Number);
	const ampm = hour >= 12 ? "PM" : "AM";
	const formattedHour = hour % 12 || 12;
	return `${formattedHour}:${minute.toString().padStart(2, "0")} ${ampm}`;
};

export { formatTime };
