'use client';

import Editor, { OnMount } from '@monaco-editor/react';
import { useRef } from 'react';

interface CodeEditorProps {
    value: string;
    onChange?: (value: string | undefined) => void;
    language: string;
    readOnly?: boolean;
    theme?: "vs-dark" | "light";
}

export const CodeEditor = ({ value, onChange, language, readOnly = false, theme = "light" }: CodeEditorProps) => {
    const editorRef = useRef<any>(null);

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor;
    };

    return (
        <div className={`h-full w-full border rounded-lg overflow-hidden ${theme === 'vs-dark' ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
            <Editor
                height="100%"
                defaultLanguage="json"
                language={language}
                value={value}
                onChange={onChange}
                theme={theme}
                onMount={handleEditorDidMount}
                options={{
                    readOnly,
                    minimap: { enabled: false }, // Performance: Disable minimap for large files
                    folding: false,              // Performance: heavy on large files
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 },
                }}
            />
        </div>
    );
};
