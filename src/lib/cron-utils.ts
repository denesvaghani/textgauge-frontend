export const CRON_Presets = [
  { name: "Every Minute", value: "* * * * *" },
  { name: "Every 30 Minutes", value: "*/30 * * * *" },
  { name: "Every Hour", value: "0 * * * *" },
  { name: "Every Day at Midnight", value: "0 0 * * *" },
  { name: "Every Day at 7AM", value: "0 7 * * *" },
  { name: "Every Monday at Midnight", value: "0 0 * * 1" },
  { name: "Every 18th of Month", value: "0 0 18 * *" },
  { name: "First of Month at Midnight", value: "0 0 1 * *" },
];

export function describeCron(cron: string): string {
  if (!cron) return "";
  
  const parts = cron.trim().split(/\s+/);
  if (parts.length < 5) return "Invalid format (needs 5 parts)";
  
  const [min, hour, dom, month, dow] = parts;



  // Validation Helper
  const isValidPart = (part: string): boolean => {
    // Regex allows: * , / - 0-9 
    // It should NOT allow letters unless they are months/days (JAN, MON) - but for simplicity we might restrict to numbers unless extended
    // The user's issue was "*e". 'e' is not valid.
    // Allowed chars: 0-9, *, /, -, , (comma)
    // Also strictly speaking, names (JAN-DEC, SUN-SAT) are valid in some crons.
    // Let's allow A-Z for now but check structure.
    // Actually, "e" is not a valid day or month. 
    // A simple robust check: must match ^[\d\*\/\-,\w]+$ AND if it has letters, they must be valid names?
    // Let's start with a regex that forbids likely typos like *e
    // Valid: * or */5 or 1-5 or 1,2 or MON or JAN
    // Invalid: *e, *5, e*, 5*
    
    // Very basic check: 
    // 1. Must contain only valid characters: 0-9, *, /, -, , (comma)
    // We are deliberately excluding letters for now to prevent "ee", "e", etc. being valid.
    // If we support names like JAN, MON later, we will add specific checks.
    if (!/^[\d\*\/\-,]+$/.test(part)) return false;
    
    // 2. Specific bad patterns from typos
    if (part.includes("*") && part.length > 1) {
        // if it has *, it must be "*" or "*/N"
        if (!part.startsWith("*/")) return false; // Reject *e, *5 
    }
    
    return true;
  };
  
  if (!parts.every(isValidPart)) return "Invalid cron expression";

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
