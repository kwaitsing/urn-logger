export const getDateTimeString = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `Y/${year} M/${month} D/${day} ${hours}.${minutes}.${seconds}`;
}
export const hrTimeToDate = (hrTimeBigInt: bigint) => {
    // Convert bigint nanoseconds to milliseconds (1e6 nanoseconds in a millisecond)
    const milliseconds = Number(hrTimeBigInt / BigInt(1e6));
    const date = new Date(milliseconds);
    return date;
  };
  