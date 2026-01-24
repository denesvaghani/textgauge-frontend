import * as Diff from 'diff';

export interface DiffResult {
    originalLines: Array<{ text: string, type: string, pairIndex?: number }>;
    modifiedLines: Array<{ text: string, type: string, pairIndex?: number }>;
    stats: { added: number, removed: number };
}

export function calculateDiff(original: string, modified: string): DiffResult {
    if (!original && !modified) {
        return { originalLines: [], modifiedLines: [], stats: { added: 0, removed: 0 } };
    }

    const diffResult = Diff.diffLines(original, modified);

    // Calculate stats
    let added = 0;
    let removed = 0;
    diffResult.forEach((part) => {
        const lines = part.value.split("\n").filter(Boolean).length;
        if (part.added) added += lines;
        if (part.removed) removed += lines;
    });

    // Alignment Logic (Levenshtein)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const origLines: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modLines: any[] = [];
    
    let removedBuffer: string[] = [];
    let addedBuffer: string[] = [];
    
    // Optimized Levenshtein using only two rows
    const levenshtein = (a: string, b: string): number => {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        // Swap to save space
        if (a.length > b.length) {
            const tmp = a; a = b; b = tmp;
        }

        let row = Array(a.length + 1).fill(0).map((_, i) => i);
        
        for (let i = 1; i <= b.length; i++) {
            const newRow = [i];
            for (let j = 1; j <= a.length; j++) {
                const cost = a[j - 1] === b[i - 1] ? 0 : 1;
                newRow[j] = Math.min(
                    newRow[j - 1] + 1,      // insertion
                    row[j] + 1,             // deletion
                    row[j - 1] + cost       // substitution
                );
            }
            row = newRow;
        }
        return row[a.length];
    };

    const calculateSimilarity = (str1: string, str2: string): number => {
        if (!str1 && !str2) return 1;
        if (!str1 || !str2) return 0;
        const maxLength = Math.max(str1.length, str2.length);
        if (maxLength === 0) return 1.0;
        const distance = levenshtein(str1, str2);
        return 1 - (distance / maxLength);
    };

    const flushBuffers = () => {
        const maxLen = Math.max(removedBuffer.length, addedBuffer.length);
        for (let i = 0; i < maxLen; i++) {
            const hasRemoved = i < removedBuffer.length;
            const hasAdded = i < addedBuffer.length;
            
            if (hasRemoved && hasAdded) {
                const similarity = calculateSimilarity(removedBuffer[i], addedBuffer[i]);
                
                if (similarity > 0.4) {
                    const pairIdx = origLines.length;
                    origLines.push({ 
                        text: removedBuffer[i], 
                        type: "removed", 
                        pairIndex: pairIdx 
                    });
                    modLines.push({ 
                        text: addedBuffer[i], 
                        type: "added",
                        pairIndex: pairIdx
                    });
                } else {
                    origLines.push({ 
                        text: removedBuffer[i], 
                        type: "removed"
                    });
                    modLines.push({ 
                        text: "", 
                        type: "unchanged"
                    });
                    
                    origLines.push({ 
                        text: "", 
                        type: "unchanged"
                    });
                    modLines.push({ 
                        text: addedBuffer[i], 
                        type: "added"
                    });
                }
            } else if (hasRemoved) {
                origLines.push({ 
                    text: removedBuffer[i], 
                    type: "removed"
                });
                modLines.push({ 
                    text: "", 
                    type: "unchanged"
                });
            } else if (hasAdded) {
                origLines.push({ 
                    text: "", 
                    type: "unchanged"
                });
                modLines.push({ 
                    text: addedBuffer[i], 
                    type: "added"
                });
            }
        }
        removedBuffer = [];
        addedBuffer = [];
    };

    diffResult.forEach((part) => {
        const lines = part.value.split("\n").filter((l, i, arr) => l || i < arr.length - 1);
        
        if (part.removed) {
            removedBuffer.push(...lines);
        } else if (part.added) {
            addedBuffer.push(...lines);
        } else {
            flushBuffers();
            lines.forEach((line) => {
                origLines.push({ text: line, type: "unchanged" });
                modLines.push({ text: line, type: "unchanged" });
            });
        }
    });
    
    flushBuffers();

    while (origLines.length < modLines.length) {
        origLines.push({ text: "", type: "unchanged" });
    }
    while (modLines.length < origLines.length) {
        modLines.push({ text: "", type: "unchanged" });
    }

    return { originalLines: origLines, modifiedLines: modLines, stats: { added, removed } };
}
