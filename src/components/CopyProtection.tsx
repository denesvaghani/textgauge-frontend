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

  return null;
}
