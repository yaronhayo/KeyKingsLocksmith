/**
 * Timezone utilities for consistent Eastern Time (New York) formatting
 * across server, emails, and logs
 */

// Eastern Time timezone identifier
export const TIMEZONE = 'America/New_York';

/**
 * Get current date/time in Eastern Time
 */
export function getNowET(): Date {
  return new Date(new Date().toLocaleString('en-US', { timeZone: TIMEZONE }));
}

/**
 * Format date in Eastern Time
 * @param date - Date to format (defaults to now)
 * @param options - Intl.DateTimeFormatOptions
 */
export function formatDateET(
  date: Date = new Date(),
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: TIMEZONE,
    hour12: true,
  }
): string {
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

/**
 * Get ISO string in Eastern Time
 */
export function toISOStringET(date: Date = new Date()): string {
  const etDate = new Date(date.toLocaleString('en-US', { timeZone: TIMEZONE }));
  return etDate.toISOString();
}

/**
 * Format for email timestamps
 * Example: "January 5, 2025 at 2:30 PM EST"
 */
export function formatEmailTimestamp(date: Date = new Date()): string {
  const formatted = formatDateET(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: TIMEZONE,
    hour12: true,
  });

  // Determine if EST or EDT
  const month = date.getMonth();
  const isDST = month >= 2 && month <= 10; // March through November (approximate)
  const tzAbbr = isDST ? 'EDT' : 'EST';

  return `${formatted} ${tzAbbr}`;
}

/**
 * Format for log timestamps
 * Example: "2025-01-05 14:30:15 EST"
 */
export function formatLogTimestamp(date: Date = new Date()): string {
  const etDateStr = date.toLocaleString('en-US', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  // Parse and reformat to YYYY-MM-DD HH:MM:SS
  const parts = etDateStr.match(/(\d+)\/(\d+)\/(\d+),?\s+(\d+):(\d+):(\d+)/);
  if (!parts) return etDateStr;

  const [, month, day, year, hour, minute, second] = parts;

  // Determine if EST or EDT
  const monthNum = parseInt(month);
  const isDST = monthNum >= 3 && monthNum <= 11;
  const tzAbbr = isDST ? 'EDT' : 'EST';

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} ${hour}:${minute}:${second} ${tzAbbr}`;
}

/**
 * Format for server responses
 * Example: "2025-01-05T14:30:15-05:00"
 */
export function formatServerTimestamp(date: Date = new Date()): string {
  return date.toLocaleString('sv-SE', {
    timeZone: TIMEZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(' ', 'T') + getETOffset(date);
}

/**
 * Get ET offset string (-05:00 or -04:00 depending on DST)
 */
function getETOffset(date: Date): string {
  const month = date.getMonth();
  const isDST = month >= 2 && month <= 10;
  return isDST ? '-04:00' : '-05:00';
}
