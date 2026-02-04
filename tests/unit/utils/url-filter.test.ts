import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { URLFilter } from '../../../src/utils/url-filter';

describe('URLFilter', () => {
  let urlFilter: URLFilter;

  beforeEach(() => {
    urlFilter = new URLFilter();
  });

  afterEach(() => {
    urlFilter.clear();
  });

  describe('setWhitelist', () => {
    it('should set whitelist patterns', () => {
      const patterns = ['example.com', 'test.com'];
      urlFilter.setWhitelist(patterns);

      expect(urlFilter.getWhitelist()).toEqual(patterns);
    });

    it('should filter invalid patterns', () => {
      urlFilter.setWhitelist(['', 'test.com', null as any]);

      expect(urlFilter.getWhitelist()).toEqual(['test.com']);
    });
  });

  describe('setBlacklist', () => {
    it('should set blacklist patterns', () => {
      const patterns = ['spam.com', 'ads.com'];
      urlFilter.setBlacklist(patterns);

      expect(urlFilter.getBlacklist()).toEqual(patterns);
    });

    it('should filter invalid patterns', () => {
      urlFilter.setBlacklist(['', 'spam.com', null as any]);

      expect(urlFilter.getBlacklist()).toEqual(['spam.com']);
    });
  });

  describe('addToWhitelist', () => {
    it('should add pattern to whitelist', () => {
      urlFilter.addToWhitelist('example.com');

      expect(urlFilter.getWhitelist()).toContain('example.com');
    });

    it('should not add duplicate patterns', () => {
      urlFilter.addToWhitelist('example.com');
      urlFilter.addToWhitelist('example.com');

      expect(urlFilter.getWhitelist()).toHaveLength(1);
    });
  });

  describe('addToBlacklist', () => {
    it('should add pattern to blacklist', () => {
      urlFilter.addToBlacklist('spam.com');

      expect(urlFilter.getBlacklist()).toContain('spam.com');
    });

    it('should not add duplicate patterns', () => {
      urlFilter.addToBlacklist('spam.com');
      urlFilter.addToBlacklist('spam.com');

      expect(urlFilter.getBlacklist()).toHaveLength(1);
    });
  });

  describe('isAllowed', () => {
    it('should allow all urls when lists are empty', () => {
      expect(urlFilter.isAllowed('http://example.com')).toBe(true);
      expect(urlFilter.isAllowed('http://test.com')).toBe(true);
    });

    it('should block urls matching blacklist', () => {
      urlFilter.setBlacklist(['spam.com', 'ads.com']);

      expect(urlFilter.isAllowed('http://spam.com')).toBe(false);
      expect(urlFilter.isAllowed('http://ads.com')).toBe(false);
      expect(urlFilter.isAllowed('http://other.com')).toBe(true);
    });

    it('should only allow urls matching whitelist when whitelist is set', () => {
      urlFilter.setWhitelist(['allowed.com']);

      expect(urlFilter.isAllowed('http://allowed.com')).toBe(true);
      expect(urlFilter.isAllowed('http://blocked.com')).toBe(false);
      expect(urlFilter.isAllowed('http://sub.allowed.com')).toBe(true);
    });

    it('should use wildcard patterns', () => {
      urlFilter.setBlacklist(['*.evil.com']);

      expect(urlFilter.isAllowed('http://test.evil.com')).toBe(false);
      expect(urlFilter.isAllowed('http://good.com')).toBe(true);
    });

    it('should be case insensitive', () => {
      urlFilter.setBlacklist(['Spam.com']);

      expect(urlFilter.isAllowed('http://spam.com')).toBe(false);
      expect(urlFilter.isAllowed('http://SPAM.COM')).toBe(false);
    });

    it('should handle regex special characters', () => {
      urlFilter.setWhitelist(['test*.com']);

      expect(urlFilter.isAllowed('http://test1.com')).toBe(true);
      expect(urlFilter.isAllowed('http://prefix.test.com')).toBe(true);
    });

    it('should handle invalid regex gracefully', () => {
      urlFilter.setWhitelist(['(())invalid', 'test.com']);

      expect(urlFilter.isAllowed('http://test.com')).toBe(true);
    });
  });

  describe('clear', () => {
    it('should clear all lists', () => {
      urlFilter.setWhitelist(['test.com']);
      urlFilter.setBlacklist(['spam.com']);

      urlFilter.clear();

      expect(urlFilter.getWhitelist()).toEqual([]);
      expect(urlFilter.getBlacklist()).toEqual([]);
    });
  });

  describe('getWhitelist', () => {
    it('should return copy of whitelist', () => {
      urlFilter.setWhitelist(['test.com']);

      const whitelist = urlFilter.getWhitelist();

      expect(whitelist).not.toBe(urlFilter.getWhitelist());
      whitelist.push('new');

      expect(urlFilter.getWhitelist()).not.toContain('new');
    });
  });

  describe('getBlacklist', () => {
    it('should return copy of blacklist', () => {
      urlFilter.setBlacklist(['spam.com']);

      const blacklist = urlFilter.getBlacklist();

      expect(blacklist).not.toBe(urlFilter.getBlacklist());
      blacklist.push('new');

      expect(urlFilter.getBlacklist()).not.toContain('new');
    });
  });
});
