
export const formatRupiah = (num: number | null | undefined): string => {
  if (!num) return "";
  return num.toLocaleString("id-ID");
}

export const parseRupiah = (str: string): number => {
  const numericString = str.replace(/[^\d]/g, "");  
  return Number(numericString) || 0;
}



  export const formatRupiahList = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };


  export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
