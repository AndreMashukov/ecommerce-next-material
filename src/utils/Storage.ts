export const retrieveItem = <T>(recordName: string): (T | undefined) => {
  if (process.browser) {
    try {
      const record = localStorage.getItem(recordName);
      if (record !== 'null') {
        return JSON.parse(record);
      } else {
        return null;
      }
    } catch (err) {
      return null;
    }
  }
};

export const storeItem = <T>(recordName: string, item: T): void => {
  if (process.browser) {
    localStorage.setItem(recordName, JSON.stringify(item));
  }
};

export const removeItem = (recordName: string): void => {
  if (process.browser) {
    localStorage.removeItem(recordName);
  }
};