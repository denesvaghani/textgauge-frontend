export type ConversionFormat = 'json' | 'yaml' | 'csv' | 'toml';

export interface ConverterMessage {
    type: 'CONVERT';
    content: string;
    from: ConversionFormat;
    to: ConversionFormat;
    reqId: string;
}

export interface ConverterResponse {
    type: 'SUCCESS' | 'ERROR';
    reqId: string;
    result?: string;
    error?: string;
}

export interface ConversionState {
    isConverting: boolean;
    result: string | null;
    error: string | null;
}
