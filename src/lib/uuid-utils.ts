export const generateUuidV4 = (options: {
  count: number;
  hyphens: boolean;
  uppercase: boolean;
  version: 'v4'; // Expandable later
}): string[] => {
  const { count, hyphens, uppercase } = options;
  const uuids: string[] = [];

  for (let i = 0; i < count; i++) {
    let uuid = crypto.randomUUID();
    
    if (!hyphens) {
      uuid = uuid.replace(/-/g, '');
    }
    
    if (uppercase) {
      uuid = uuid.toUpperCase();
    }
    
    uuids.push(uuid);
  }

  return uuids;
};
