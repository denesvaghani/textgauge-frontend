import Papa from 'papaparse';

/**
 * Flattens a nested JSON object into a single level object with dot-notation keys.
 * Example: { a: { b: 1 } } -> { "a.b": 1 }
 */
function flattenJSON(obj: any, prefix = '', res: any = {}) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const val = obj[key];
            const newKey = prefix ? `${prefix}.${key}` : key;
            if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
                flattenJSON(val, newKey, res);
            } else {
                res[newKey] = val;
            }
        }
    }
    return res;
}

/**
 * Unflattens a dot-notation object back into nested JSON.
 * Example: { "a.b": 1 } -> { a: { b: 1 } }
 */
function unflattenJSON(data: any) {
    if (Object(data) !== data || Array.isArray(data)) return data;
    const result: any = {};
    for (const p in data) {
        let cur = result, prop = "", parts = p.split(".");
        for (let i = 0; i < parts.length; i++) {
            const idx = !isNaN(parseInt(parts[i]));
            cur = cur[prop] || (cur[prop] = (idx ? [] : {}));
            prop = parts[i];
        }
        cur[prop] = data[p];
    }
    return result[""] || result;
}

export const jsonToCsv = (jsonStr: string, flatten = true): string => {
    try {
        let data = JSON.parse(jsonStr);

        // Ensure data is an array for CSV conversion
        if (!Array.isArray(data)) {
            data = [data];
        }

        if (flatten) {
            data = data.map((item: any) => flattenJSON(item));
        }

        return Papa.unparse(data);
    } catch (e: any) {
        throw new Error(`JSON handling error: ${e.message}`);
    }
};

export const csvToJson = (csvStr: string): string => {
    const result = Papa.parse(csvStr, {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true, // Auto-detect numbers and booleans
    });

    if (result.errors && result.errors.length > 0) {
        throw new Error(`CSV Parse Error: ${result.errors[0].message}`);
    }

    // Note: Unflattening logic is complex to guess correctly for all CSVs. 
    // For now, we return the parsed objects. If strict unflattening is needed, 
    // we would need to implement the reverse of flattenJSON here, assuming dot notation in headers.

    // Attempt simple unflattening if headers contain dots
    const hasDots = result.meta.fields?.some(f => f.includes('.'));
    let data = result.data;

    if (hasDots) {
        // Basic unflattening implementation could go here, but for safety in V1 let's keep it flat 
        // or implement a robust unflat library usage if requested. 
        // The requirements asked for "unflatten/flatten options", so we should try.

        // Let's use a simpler unflatten approach on each row
        const unflatten = (obj: any) => {
            const result: any = {};
            for (const i in obj) {
                const keys = i.split('.');
                keys.reduce((acc, key, idx) => {
                    return acc[key] || (acc[key] = isNaN(Number(keys[idx + 1])) ? (keys.length - 1 === idx ? obj[i] : {}) : []);
                }, result);
            }
            return result;
        }
        data = data.map((item: any) => unflatten(item));
    }

    return JSON.stringify(data, null, 2);
};
