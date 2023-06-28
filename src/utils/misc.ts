export const isRunningTests = process.env.NODE_ENV === "test";

export const formatNumber = (value: number | string) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
