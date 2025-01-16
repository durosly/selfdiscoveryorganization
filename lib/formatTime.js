function convertTo12HourFormat(time24) {
	// Split the time string into hours and minutes
	const [hours, minutes] = time24.split(":").map(Number);

	// Determine whether it's AM or PM
	const period = hours >= 12 ? "PM" : "AM";

	// Convert hours to 12-hour format
	const hours12 = hours % 12 || 12;

	// Format the time in 12-hour format
	const time12 = `${hours12}:${minutes
		.toString()
		.padStart(2, "0")} ${period}`;

	return time12;
}

export default convertTo12HourFormat;
