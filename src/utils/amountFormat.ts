
export const formatRupiah = (num: number | null | undefined): string => {
  if (!num) return "";
  return num.toLocaleString("id-ID");
}

export const parseRupiah = (str: string): number => {
  const numericString = str.replace(/[^\d]/g, "");  
  return Number(numericString) || 0;
}
