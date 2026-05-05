export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//format(DD/MM/YYYY)
export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

//format date for  (YYYY-MM-DD)
export const formatDateForApi = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
