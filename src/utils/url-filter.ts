export class URLFilter {
  private whitelist: string[] = [];
  private blacklist: string[] = [];

  setWhitelist(patterns: string[]): void {
    this.whitelist = patterns.filter(p => this.isValidPattern(p));
  }

  setBlacklist(patterns: string[]): void {
    this.blacklist = patterns.filter(p => this.isValidPattern(p));
  }

  addToWhitelist(pattern: string): void {
    if (this.isValidPattern(pattern) && !this.whitelist.includes(pattern)) {
      this.whitelist.push(pattern);
    }
  }

  addToBlacklist(pattern: string): void {
    if (this.isValidPattern(pattern) && !this.blacklist.includes(pattern)) {
      this.blacklist.push(pattern);
    }
  }

  isAllowed(url: string): boolean {
    if (this.whitelist.length > 0) {
      return this.matchesWhitelist(url);
    }

    if (this.blacklist.length > 0) {
      return !this.matchesBlacklist(url);
    }

    return true;
  }

  private matchesWhitelist(url: string): boolean {
    return this.whitelist.some(pattern => this.matches(url, pattern));
  }

  private matchesBlacklist(url: string): boolean {
    return this.blacklist.some(pattern => this.matches(url, pattern));
  }

  private matches(url: string, pattern: string): boolean {
    try {
      const regex = this.patternToRegex(pattern);
      return regex.test(url);
    } catch (error) {
      console.warn('[URLFilter] Invalid pattern:', pattern, error);
      return false;
    }
  }

  private patternToRegex(pattern: string): RegExp {
    let regexPattern = pattern
      .replace(/\./g, '\\.')
      .replace(/\*/g, '.*')
      .replace(/\?/g, '.');
    
    return new RegExp(regexPattern, 'i');
  }

  private isValidPattern(pattern: string): boolean {
    return typeof pattern === 'string' && pattern.trim().length > 0;
  }

  getWhitelist(): string[] {
    return [...this.whitelist];
  }

  getBlacklist(): string[] {
    return [...this.blacklist];
  }

  clear(): void {
    this.whitelist = [];
    this.blacklist = [];
  }
}
