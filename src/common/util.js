export const formatMoney = num => {
  if (num >= 1000000) {
    return num / 10000 + "万元";
  }
  return num + "元";
};
