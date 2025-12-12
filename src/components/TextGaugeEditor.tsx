import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { useTheme } from '@/contexts/ThemeContext';
import { CLEAN_MONACO_OPTIONS } from '@/config/monaco';

interface TextGaugeEditorProps extends EditorProps {
    // Add any specific props if needed, for now extending base props
    className?: string;
}

export const TextGaugeEditor: React.FC<TextGaugeEditorProps> = ({
    options,
    theme: propTheme,
    className,
    ...props
}) => {
    const { theme } = useTheme();
    const editorTheme = propTheme || (theme === 'dark' ? 'vs-dark' : 'light');

    // Merge passed options with our clean defaults
    // passed options take precedence if specifically set (e.g. readOnly)
    const mergedOptions = {
        ...CLEAN_MONACO_OPTIONS,
        ...options,
    };

    return (
        <div className={className || "h-full w-full"}>
            <Editor
                theme={editorTheme}
                options={mergedOptions}
                {...props}
            />
        </div>
    );
};
