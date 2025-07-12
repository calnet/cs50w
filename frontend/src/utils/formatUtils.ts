// Utility for formatting timestamps as 'YYYY-MM-DD HH:mm:ss'
export function formatTimestamp(dateValue: string | number | Date | undefined | null): string {
    if (!dateValue) return '';
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return String(dateValue);
    return d.toISOString().replace('T', ' ').slice(0, 19); // "YYYY-MM-DD HH:mm:ss"
}

export function pad4(val: string): string {
    return val != null ? String(val).padStart(4, '0') : '';
}