type StorageKey = "access_token" | "refresh_token";

class Storage {
  private static isWindowAvailable() {
    return typeof window !== "undefined";
  }

  static getItem(key: StorageKey) {
    if (this.isWindowAvailable()) return localStorage.getItem(key);
  }

  static setItem(key: StorageKey, value: string) {
    if (!this.isWindowAvailable()) return;
    localStorage.setItem(key, value);
  }

  static delItem(key: StorageKey) {
    if (!this.isWindowAvailable) return;
    localStorage.removeItem(key);
  }

  static clear() {
    if (this.isWindowAvailable()) localStorage.clear();
  }
}

export default Storage;
