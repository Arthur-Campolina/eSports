export function convertHoursStringToMinutes(hour: string) {
  const [hours, minutes] = hour.split(":").map(Number);
  const minutesQuantity = hours * 60 + minutes;
  return minutesQuantity;
}
