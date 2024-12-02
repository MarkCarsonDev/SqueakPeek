export const convertToYYYYMMDD = (mmddyyyy: string): string => {
  const [month, day, year] = mmddyyyy.split("/");
  return `${year}-${month}-${day}`;
};

export const convertToMMDDYYYY = (yyyymmdd: string): string => {
  const [year, month, day] = yyyymmdd.split("-");
  return `${month}/${day}/${year}`;
};
