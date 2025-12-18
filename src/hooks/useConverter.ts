'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ConversionFormat, ConverterMessage, ConverterResponse, ConversionState } from '../types/converter';

export function useConverter() {
    const workerRef = useRef<Worker | null>(null);
    const [state, setState] = useState<ConversionState>({
        isConverting: false,
        result: null,
        error: null,
    });

    useEffect(() => {
        // Initialize Worker
        workerRef.current = new Worker(new URL('../workers/converter.worker.ts', import.meta.url));

        workerRef.current.onmessage = (event: MessageEvent<ConverterResponse>) => {
            const { type, result, error } = event.data;

            if (type === 'SUCCESS') {
                setState(prev => ({ ...prev, isConverting: false, result: result || '', error: null }));
            } else {
                setState(prev => ({ ...prev, isConverting: false, error: error || 'Conversion failed' }));
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const convert = useCallback((content: string, from: ConversionFormat, to: ConversionFormat) => {
        if (!workerRef.current) return;

        setState(prev => ({ ...prev, isConverting: true, error: null }));

        const reqId = Date.now().toString();
        const message: ConverterMessage = {
            type: 'CONVERT',
            content,
            from,
            to,
            reqId
        };

        workerRef.current.postMessage(message);
    }, []);

    return {
        ...state,
        convert
    };
}
