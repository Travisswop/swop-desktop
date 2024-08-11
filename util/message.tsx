export const is0xAddress = (address: string): boolean => {
  return address.startsWith("0x") && address.length === 42;
};

export const randomColorHex = (): string => {
  // Generate a random number between 0 and 16777215 (which corresponds to FFFFFF in hexadecimal)
  const randomColor = Math.floor(Math.random() * 16777216).toString(16);
  // Ensure the generated string has 6 characters by padding with zeros if necessary
  return "#" + randomColor.padStart(6, "0");
};

// convert timestamp to time ago
export const timeAgo = (time: number): string => {
  const now = new Date();
  const diff = Math.floor((now.getTime() - time) / 1000); // Convert to seconds

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    // get count of interval
    const count = Math.floor(diff / interval.seconds);
    // if count is greater than 1 return x interval ago
    if (count >= 1) {
      if (count === 1) {
        return `${count} ${interval.label} ago`;
      } else {
        return `${count} ${interval.label}s ago`;
      }
    }
  }

  return "just now"; // If the time is now or something went wrong
};

// convert 0x16ebc062A049631074257a1d0c62E1Ed5BCFB1b3 to 0x16eb...B1b3

export const shortenAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
