import { storageLocal, storageSession } from './cache'
import type { TokenInfo } from '~/types'
import { CacheKey } from '~/types'

/** token缓存名 */
const tokenCacheName = CacheKey.TOKEN_NAME_CACHE_KEY

/**
 * 获取缓存的 token
 */
export function getToken(): TokenInfo | null {
  const token = storageLocal().getItem<TokenInfo>(tokenCacheName)
  if (!token) {
    return storageSession().getItem<TokenInfo>(tokenCacheName)
  }
  return token
}

/**
 * 缓存 token
 * @param token token
 * @param remember 是否永久存储
 */
export function setToken(token?: TokenInfo, remember?: boolean) {
  if (!token) return
  removeToken()

  if (remember) {
    storageLocal().setItem<TokenInfo>(tokenCacheName, token)
  } else {
    storageSession().setItem<TokenInfo>(tokenCacheName, token)
  }
}

/**
 * 移除 token
 */
export function removeToken() {
  storageLocal().removeItem(tokenCacheName)
  storageSession().removeItem(tokenCacheName)
}
