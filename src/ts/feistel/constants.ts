export const BYTE_SIZE = 8;
export const THREAD_SIZE = BYTE_SIZE << 2;
export const THREAD_COUNT = 4;
export const THREAD_MASK = (1n << BigInt(THREAD_SIZE)) - 1n;
export const BLOCK_SIZE = THREAD_SIZE * THREAD_COUNT;

export type Bit = 0 | 1;
