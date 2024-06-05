import { cryptoDecode, cryptoEncode } from './crypto'

/**
 * 缓存类
 */
class Cache {
  private storage: Storage
  /** 是否加密 */
  private hasEncrypt: boolean

  /** 构造方法 */
  constructor(storage: Storage, hasEncrypt: boolean) {
    this.storage = storage
    this.hasEncrypt = hasEncrypt
  }

  /**
   * 设置缓存数据
   * @param key 缓存名
   * @param value 缓存值
   */
  public setItem<T>(key: string, value: T) {
    if (value == null) return
    // 将缓存值转换成json字符串
    const stringData = JSON.stringify(value)
    const cacheData = this.hasEncrypt ? cryptoEncode(stringData) : stringData
    // 将字符串缓存到storage中
    this.storage.setItem(key, cacheData)
  }

  /**
   * 获取缓存数据
   * @param key 缓存名
   * @param def 获取不到数据时的默认值
   */
  public getItem<T>(key: string, def: any = null) {
    // 从storage中获取缓存值，如果值为空，则返回默认值
    const cacheData = this.storage.getItem(key)
    if (!cacheData) return def

    try {
      // 判断是否需要解密
      const stringData = this.hasEncrypt ? cryptoDecode(cacheData) : cacheData
      // 转换为指定泛型对象
      return JSON.parse(stringData) as T
    } catch (e) {
      return def
    }
  }

  /**
   * 删除缓存数据
   * @param key 缓存名
   */
  public removeItem(key: string) {
    this.storage.removeItem(key)
  }

  /**
   * 清空缓存数据
   */
  public clear() {
    this.storage.clear()
  }
}

/**
 * 自定义Storage缓存类
 * @param storage 缓存类型
 * @param hasEncrypt 数据是否加密
 * @return
 */
export function createStorage(storage: Storage, hasEncrypt = false) {
  return new Cache(storage, hasEncrypt)
}

/**
 * SessionStorage缓存类
 * @param hasEncrypt 数据是否加密
 * @return
 */
export function storageSession(hasEncrypt = true) {
  return createStorage(sessionStorage, hasEncrypt)
}

/**
 * localStorage缓存类
 * @param hasEncrypt 数据是否加密
 * @return
 */
export function storageLocal(hasEncrypt = true) {
  return createStorage(localStorage, hasEncrypt)
}
