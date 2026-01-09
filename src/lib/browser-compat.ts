export type BrowserKey = 'chrome' | 'firefox' | 'safari' | 'safari_ios' | 'chrome_android'

export interface BrowserSupport {
  supported: boolean
  version?: string
}

export interface BrowserCompatResult {
  chrome: BrowserSupport
  firefox: BrowserSupport
  safari: BrowserSupport
  safari_ios: BrowserSupport
  chrome_android: BrowserSupport
}

const BROWSERS: BrowserKey[] = ['chrome', 'firefox', 'safari', 'safari_ios', 'chrome_android']

// Cache for CDN fetched compat data by compatKey
const compatCache = new Map<string, BrowserCompatResult | null>()
// Single promise for the full BCD data fetch to avoid duplicate requests
let bcdDataPromise: Promise<unknown> | null = null
let bcdData: unknown = null

// jsDelivr URL for MDN browser-compat-data (using latest for freshest data)
const BCD_CDN_URL = 'https://cdn.jsdelivr.net/npm/@mdn/browser-compat-data/data.json'

/**
 * Fetch the full BCD data from jsDelivr CDN (cached)
 */
async function fetchBcdData(): Promise<unknown> {
  if (bcdData) return bcdData
  if (bcdDataPromise) return bcdDataPromise

  bcdDataPromise = fetch(BCD_CDN_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`BCD fetch failed: ${res.status}`)
      return res.json()
    })
    .then((data) => {
      bcdData = data
      return data
    })
    .catch((err) => {
      bcdDataPromise = null // Allow retry on next call
      throw err
    })

  return bcdDataPromise
}

/**
 * Verify the fetched compat entry has the expected shape
 */
function verifyCompatEntry(compat: unknown): compat is { support: Record<string, unknown> } {
  if (!compat || typeof compat !== 'object') return false
  const c = compat as Record<string, unknown>
  if (!c.support || typeof c.support !== 'object') return false
  return true
}

/**
 * Parse browser support from a verified compat entry
 */
function parseCompatResult(compat: { support: Record<string, unknown> }): BrowserCompatResult {
  const result: BrowserCompatResult = {
    chrome: { supported: false },
    firefox: { supported: false },
    safari: { supported: false },
    safari_ios: { supported: false },
    chrome_android: { supported: false },
  }

  for (const browser of BROWSERS) {
    const support = compat.support[browser]
    if (support) {
      // Support can be an object or array of objects
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const entry = Array.isArray(support) ? support[0] : (support as any)
      const versionAdded = entry?.version_added

      if (versionAdded === true) {
        result[browser] = { supported: true }
      } else if (typeof versionAdded === 'string') {
        result[browser] = { supported: true, version: versionAdded }
      } else {
        result[browser] = { supported: false }
      }
    }
  }

  return result
}

/**
 * Look up browser compatibility data by MDN path (e.g., "api.EyeDropper")
 * Returns null synchronously if data not yet loaded; use getBrowserCompatAsync for async loading.
 */
export function getBrowserCompat(compatKey: string): BrowserCompatResult | null {
  // Return cached result if available
  if (compatCache.has(compatKey)) {
    return compatCache.get(compatKey) ?? null
  }

  // If BCD data is loaded synchronously, parse it
  if (bcdData) {
    const result = extractCompatFromData(bcdData, compatKey)
    compatCache.set(compatKey, result)
    return result
  }

  // Data not yet loaded - trigger async load and return null for now
  fetchBcdData().then(() => {
    // Cache will be populated on next call
  }).catch(() => {
    // Silently fail - UI will show unavailable state
  })

  return null
}

/**
 * Async version that waits for CDN data to load
 */
export async function getBrowserCompatAsync(compatKey: string): Promise<BrowserCompatResult | null> {
  // Return cached result if available
  if (compatCache.has(compatKey)) {
    return compatCache.get(compatKey) ?? null
  }

  try {
    const data = await fetchBcdData()
    const result = extractCompatFromData(data, compatKey)
    compatCache.set(compatKey, result)
    return result
  } catch {
    compatCache.set(compatKey, null)
    return null
  }
}

/**
 * Extract compat result from BCD data by path
 */
function extractCompatFromData(data: unknown, compatKey: string): BrowserCompatResult | null {
  try {
    const parts = compatKey.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = data

    for (const part of parts) {
      if (!current || typeof current !== 'object') return null
      current = current[part]
    }

    // Get the __compat object which contains support info
    const compat = current?.__compat
    if (!verifyCompatEntry(compat)) return null

    return parseCompatResult(compat)
  } catch {
    return null
  }
}

export const BROWSER_INFO: Record<BrowserKey, { name: string; shortName: string }> = {
  chrome: { name: 'Chrome', shortName: 'Chr' },
  firefox: { name: 'Firefox', shortName: 'FF' },
  safari: { name: 'Safari', shortName: 'Saf' },
  safari_ios: { name: 'Safari iOS', shortName: 'iOS' },
  chrome_android: { name: 'Chrome Android', shortName: 'And' },
}
