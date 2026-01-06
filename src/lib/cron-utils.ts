export const CRON_Presets = [
  { name: "Every Minute", value: "* * * * *" },
  { name: "Every 5 Minutes", value: "*/5 * * * *" },
  { name: "Every 15 Minutes", value: "*/15 * * * *" },
  { name: "Every Hour", value: "0 * * * *" },
  { name: "Every Day at Midnight", value: "0 0 * * *" },
  { name: "Every Day at 8AM", value: "0 8 * * *" },
  { name: "Every Monday at 9AM", value: "0 9 * * 1" },
  { name: "First of Month at Midnight", value: "0 0 1 * *" },
];

export function describeCron(cron: string): string {
  if (!cron) return "";
  
  const parts = cron.trim().split(/\s+/);
  if (parts.length < 5) return "Invalid format (needs 5 parts)";
  
  const [min, hour, dom, month, dow] = parts;

  // Simple English translation helper
  const translate = (val: string, unit: string) => {
    if (val === "*") return `every ${unit}`;
    if (val.includes("*/")) return `every ${val.split("/")[1]} ${unit}s`;
    return `at ${unit} ${val}`;
  };

  // Special case: Simple "every X"
  if (cron === "* * * * *") return "Every minute";
  if (cron === "0 * * * *") return "At minute 0 past every hour";

  let description = "Runs ";
  
  // Minute
  if (min === "*") description += "every minute";
  else if (min.startsWith("*/")) description += `every ${min.split("/")[1]} minutes`;
  else description += `at minute ${min}`;

  // Hour 
  if (hour !== "*") {
      if (hour.startsWith("*/")) description += `, past every ${hour.split("/")[1]} hours`;
      else description += `, past hour ${hour}`;
  }
  
  // Day of Month
  if (dom !== "*") description += `, on day ${dom} of the month`;
  
  // Month
  if (month !== "*") description += `, in month ${month}`;
  
  // Day of Week
  if (dow !== "*") description += `, on day of week ${dow}`;

  return description;
}
