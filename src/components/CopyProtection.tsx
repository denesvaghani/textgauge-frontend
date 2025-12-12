'use client';

import { useEffect } from 'react';

export function CopyProtection() {
  useEffect(() => {
    // 1. Prevent Right Click (Context Menu)
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Allow on inputs, textareas, and contenteditable elements (like Monaco)
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.closest('.monaco-editor') ||
        target.closest('.allow-copy') // Escape hatch class
      ) {
        return;
      }

      e.preventDefault();
    };

    // 2. Prevent Keyboard Shortcuts (Ctrl+U, Ctrl+S, Ctrl+P)
    // Note: Ctrl+C is intentionally allowed so users don't feel broken, but selection is limited via CSS.
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow normal usage if focused on inputs
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Block View Source (Cmd+Option+U or Ctrl+U), Save (Ctrl+S), Print (Ctrl+P)
      if (
        ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 's' || e.key === 'p')) ||
        e.key === 'F12' // DevTools
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <style jsx global>{`
      /* Disable selection generally */
      body {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      /* Re-enable selection for inputs and editors */
      input, textarea, [contenteditable="true"], .allow-select, .selectable-text {
        -webkit-user-select: text !important;
        user-select: text !important;
        cursor: text;
      }
      
      /* Monaco specific handling: Ensure its internal parts work but don't force visibility */
      .monaco-editor, .monaco-editor .inputarea {
        -webkit-user-select: text !important;
        user-select: text !important;
      }
        /* Ensure Monaco Editor's hidden textarea doesn't show up or have resize handles, 
           and doesn't obstruct the view (force small size) */
        .monaco-editor textarea {
          color: transparent !important;
          background: transparent !important;
          resize: none !important;
          outline: none !important;
          box-shadow: none !important;
          border: none !important;
          width: 1px !important; /* Force small so no resize handle appears */
          height: 1px !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }
      
      /* Aggressively hide Monaco "decorations" that look like border lines */
      .monaco-editor .current-line, 
      .monaco-editor .current-line-exact {
        border: none !important;
        background: transparent !important;
        display: none !important;
      }
      
      /* Ensure no focus outline on the editor container */
      .monaco-editor-container:focus,
      .monaco-editor:focus,
      .monaco-editor .inputarea:focus {
        outline: none !important;
        box-shadow: none !important;
      }

      /* Ensure images are not draggable (prevents saving by drag) */
      img {
        -webkit-user-drag: none;
        user-drag: none;
        pointer-events: none; /* simple protection */
      }
    `}</style>
  );
}
