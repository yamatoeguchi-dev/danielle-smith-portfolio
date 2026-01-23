
/**
 * Formats a date according to AP style guidelines.
 *
 * @param dateInput - The date to format, either as a Date object or a string.
 * @returns A string representing the formatted date.
 */
export function formatAPDate(dateInput: Date | string): string {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

    const month = date.toLocaleString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();

    const apMonths: Record<string, string> = {
        Jan: "Jan.",
        Feb: "Feb.",
        Mar: "March",
        Apr: "April",
        May: "May",
        Jun: "June",
        Jul: "July",
        Aug: "Aug.",
        Sep: "Sept.",
        Oct: "Oct.",
        Nov: "Nov.",
        Dec: "Dec.",
    };

    return `${apMonths[month]} ${day}, ${year}`;
}