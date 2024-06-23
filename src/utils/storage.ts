interface StorageInterface {
  storage: {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  };
  get(): string;
  set(value: string): void;
  remove(): void;
}

const genStorage = (
  key: string,
  storageName: 'localStorage' | 'sessionStorage'
): StorageInterface => ({
  storage: window[storageName],

  get(): string {
    return this.storage.getItem(key) || '';
  },

  set(value: string): void {
    this.storage.setItem(key, value);
  },

  remove(): void {
    this.storage.removeItem(key);
  },
});

const genLocalStorage = (key: string) => genStorage(key, 'localStorage');

const KEY_TOKEN = 'user_token';

export const tokenStorage =
  typeof window !== 'undefined' ? genLocalStorage(KEY_TOKEN) : null;
