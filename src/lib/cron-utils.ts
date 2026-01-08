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

// Validation Helper
const isValidPart = (part: string, minVal: number, maxVal: number): boolean => {
    // 1. Basic Character Check: 0-9, *, /, -, ,
    if (!/^[\d\*\/\-,]+$/.test(part)) return false;

    // 2. Specific bad patterns
    if (part.includes("*") && part.length > 1 && !part.startsWith("*/")) return false; // Reject *e, *5, 5*

    // 3. Logic Validation (Ranges, Lists, Steps)
    // Split by comma for lists
    const listItems = part.split(",");
    
    for (const item of listItems) {
        // Step check
        if (item.includes("/")) {
            const [base, step] = item.split("/");
            // Base must be * or a range/number
            // Step must be a positive integer
            if (!/^\d+$/.test(step) || parseInt(step) <= 0) return false;
            
            if (base !== "*" && !isValidRangeOrNumber(base, minVal, maxVal)) return false;
            continue;
        }

        if (!isValidRangeOrNumber(item, minVal, maxVal)) return false;
    }

    return true;
};

const isValidRangeOrNumber = (item: string, minVal: number, maxVal: number): boolean => {
    // Range check
    if (item.includes("-")) {
        const [start, end] = item.split("-");
        // Both must be numbers
        if (!/^\d+$/.test(start) || !/^\d+$/.test(end)) return false;
        
        const s = parseInt(start);
        const e = parseInt(end);
        
        return s >= minVal && s <= maxVal && e >= minVal && e <= maxVal && s <= e;
    }

    // Number check
    if (/^\d+$/.test(item)) {
        const val = parseInt(item);
        return val >= minVal && val <= maxVal;
    }
    
    // Wildcard
    if (item === "*") return true;

    return false;
};

export function describeCron(cron: string): string {
  if (!cron) return "";
  
  const parts = cron.trim().split(/\s+/);
  if (parts.length < 5) return "Invalid format (needs 5 parts)";
  
  const [min, hour, dom, month, dow] = parts;

  // Strict Validation Constraints
  if (!isValidPart(min, 0, 59)) return "Invalid cron expression";
  if (!isValidPart(hour, 0, 23)) return "Invalid cron expression";
  if (!isValidPart(dom, 1, 31)) return "Invalid cron expression";
  if (!isValidPart(month, 1, 12)) return "Invalid cron expression";
  if (!isValidPart(dow, 0, 6)) return "Invalid cron expression";

  // Special case: Simple "every X"
  if (cron === "* * * * *") return "Every minute";
  if (cron === "0 * * * *") return "At minute 0 past every hour";
  if (cron === "0 0 * * *") return "Every Day at Midnight";

  const translate = (val: string, unit: string) => {
    if (val === "*") return `every ${unit}`;
    if (val.includes("*/")) return `every ${val.split("/")[1]} ${unit}s`;
    return `at ${unit} ${val}`;
  };

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
