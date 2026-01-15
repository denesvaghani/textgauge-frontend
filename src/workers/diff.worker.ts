
import * as Diff from 'diff';

self.onmessage = (e: MessageEvent) => {
    const { original, modified } = e.data;

    try {
        if (!original && !modified) {
            self.postMessage({ originalLines: [], modifiedLines: [], stats: { added: 0, removed: 0 } });
            return;
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
        const origLines: any[] = [];
        const modLines: any[] = [];
        
        let removedBuffer: string[] = [];
        let addedBuffer: string[] = [];
        
        const levenshtein = (a: string, b: string): number => {
            const matrix = [];
            for (let i = 0; i <= b.length; i++) matrix[i] = [i];
            for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

            for (let i = 1; i <= b.length; i++) {
                for (let j = 1; j <= a.length; j++) {
                    if (b.charAt(i - 1) === a.charAt(j - 1)) {
                        matrix[i][j] = matrix[i - 1][j - 1];
                    } else {
                        matrix[i][j] = Math.min(
                            matrix[i - 1][j - 1] + 1,
                            Math.min(
                                matrix[i][j - 1] + 1,
                                matrix[i - 1][j] + 1
                            )
                        );
                    }
                }
            }
            return matrix[b.length][a.length];
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

        self.postMessage({ originalLines: origLines, modifiedLines: modLines, stats: { added, removed } });

    } catch (error: any) {
        self.postMessage({ error: error.message });
    }
};
