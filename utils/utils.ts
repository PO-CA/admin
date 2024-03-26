export const toDateTimeString = (dateTimeISOString: string) => {
  if (!dateTimeISOString) {
    return "";
  }
  return `${dateTimeISOString.slice(0, 10)} ${dateTimeISOString.slice(
    11,
    13
  )}시 ${dateTimeISOString.slice(14, 16)}분`;
};

export const toDateString = (dateTimeISOString: string) => {
  if (!dateTimeISOString) {
    return "";
  }
  return `${dateTimeISOString.slice(0, 10)}`;
};
