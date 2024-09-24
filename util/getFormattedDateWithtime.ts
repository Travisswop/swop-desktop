export function formatTimestampWithTimeAndDate(timestamp: any) {
  const date = new Date(timestamp);

  // Extracting date parts
  const month = date.getMonth() + 1; // Months are 0-based, so we add 1
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Adds leading zero to minutes if necessary
  const ampm = hours >= 12 ? "PM" : "AM";

  // Converting 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert '0' to '12' for 12 AM/PM

  return `${month}/${day}/${year} ${hours}:${minutes}${ampm}`;
}
