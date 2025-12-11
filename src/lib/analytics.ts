export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (win.gtag) {
      win.gtag("event", action, {
        event_category: category,
        event_label: label,
        value,
      });
    }
  }
};
