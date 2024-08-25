class DateUtils {
  formatDate(date, format = "dd-mm-yyyy") {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);

    if (format === "dd-mm-yyyy") {
      const [day, month, year] = formattedDate.split("/");
      return `${day}-${month}-${year}`;
    } else if (format === "mm-dd-yyyy") {
      const [month, day, year] = formattedDate.split("/");
      return `${month}-${day}-${year}`;
    } else if (format === "yyyy-mm-dd") {
      const [year, month, day] = formattedDate.split("/");
      return `${year}-${month}-${day}`;
    } else {
      return "Invalid format";
    }
  }
}

export default DateUtils;
