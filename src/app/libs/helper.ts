export const formatDateTime = (dateIsoString: Date) => {
  const date = new Date(dateIsoString);

  const formatted = date
    .toLocaleString("en-GB", {
      timeZone: "Asia/Bangkok",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
  return formatted;
};

export const formatNumber = (value: number) => {
  return Number.isInteger(value) ? value.toString() : value.toFixed(2);
};
