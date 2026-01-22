/* eslint-disable @typescript-eslint/no-explicit-any */
import Papa from 'papaparse';
import yaml from 'js-yaml';
import * as toml from 'smol-toml';
import { ConverterMessage, ConverterResponse, ConversionFormat } from '../types/converter';

// We need to tell TS that this is a worker
const ctx: Worker = self as any;

const parseContent = (content: string, format: ConversionFormat): any => {
    switch (format) {
        case 'json':
            return JSON.parse(content);
        case 'yaml':
            return yaml.load(content);
        case 'toml':
            return toml.parse(content);
        case 'csv':
            const result = Papa.parse(content, { header: true, skipEmptyLines: true });
            if (result.errors.length > 0) {
                throw new Error(`CSV Parse Error: ${result.errors[0].message}`);
            }
            return result.data;
        default:
            throw new Error(`Unsupported input format: ${format}`);
    }
};

const stringifyContent = (data: any, format: ConversionFormat): string => {
    switch (format) {
        case 'json':
            return JSON.stringify(data, null, 2);
        case 'yaml':
            return yaml.dump(data, { indent: 2 });
        case 'toml':
            return toml.stringify(data);
        case 'csv':
            return Papa.unparse(data);
        default:
            throw new Error(`Unsupported output format: ${format}`);
    }
};

ctx.onmessage = (event: MessageEvent<ConverterMessage>) => {
    const { type, content, from, to, reqId } = event.data;

    if (type === 'CONVERT') {
        try {
            if (!content.trim()) {
                ctx.postMessage({ type: 'SUCCESS', result: '', reqId });
                return;
            }

            // 1. Parse Input -> Intermediate JS Object
            const data = parseContent(content, from);

            // 2. Stringify Object -> Output Format
            const result = stringifyContent(data, to);

            ctx.postMessage({ type: 'SUCCESS', result, reqId } as ConverterResponse);
        } catch (err: any) {
            ctx.postMessage({
                type: 'ERROR',
                error: err.message || 'Unknown conversion error',
                reqId
            } as ConverterResponse);
        }
    }
};
