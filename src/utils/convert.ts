
/** bytes转kb */
export function bytesToKB(bytes: number) {
  return bytes / 1024;
}

/** bytes转mb */
export function bytesToMB(bytes: number) {
  return bytes / (1024 * 1024);
}

/** bytes转gb */
export function bytesToGB(bytes: number) {
  return bytes / (1024 * 1024 * 1024);
}

/** kb转bytes */
export function KBToBytes(kb: number) {
  return kb * 1024;
}

/** mb转bytes */
export function MBToBytes(mb: number) {
  return mb * 1024 * 1024;
}

/** gb转bytes */
export function GBToBytes(gb: number) {
  return gb * 1024 * 1024 * 1024;
}
