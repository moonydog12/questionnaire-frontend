export default function formatDate(date: Date | null): string {
  if (!date) {
    return '';
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Get month as 1-based
  const day = date.getDate();

  // Add leading zeros for months and days if necessary
  const formattedMonth = month < 10 ? '0' + month : month.toString();
  const formattedDay = day < 10 ? '0' + day : day.toString();

  return `${year}-${formattedMonth}-${formattedDay}`;
}
