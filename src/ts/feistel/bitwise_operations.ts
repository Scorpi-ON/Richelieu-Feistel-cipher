export const BYTE_SIZE = 8;
export const THREAD_SIZE = BYTE_SIZE << 2;
export const THREAD_COUNT = 4;
export const THREAD_MASK = (1n << BigInt(THREAD_SIZE)) - 1n;
export const BLOCK_SIZE = THREAD_SIZE * THREAD_COUNT;

export type Bit = 0 | 1;

export function numberToBits(num: number, bitCount: number): Bit[];
export function numberToBits(num: bigint, bitCount: number): Bit[];
export function numberToBits(num: number | bigint, bitCount: number): Bit[] {
    if (num < 0) {
        throw new Error('Конвертируемое число должно быть неотрицательным числом');
    } else if (num > 1n << BigInt(bitCount)) {
        throw new Error(
            'Переданное количество битов должно быть больше или равно реальному количеству битов числа'
        );
    }

    let bits = Array<Bit>(bitCount).fill(0);
    let i = bitCount - 1;

    if (typeof num === 'bigint') {
        for (; num > 0n; --i) {
            bits[i] = Number(num & 1n) as Bit;
            num >>= 1n;
        }
    } else {
        for (; num > 0; --i) {
            bits[i] = (num & 1) as Bit;
            num >>= 1;
        }
    }

    return bits;
}

export function bitsToNumber(bits: Bit[]): bigint {
    let num = 0n;
    bits.reverse().forEach((bit, index) => {
        if (bit === 1) {
            num |= BigInt(bit) << BigInt(index);
        }
    });
    return num;
}

export function blockToThreads(block: bigint): bigint[] {
    let threads: bigint[] = [];
    for (let offset = BLOCK_SIZE - THREAD_SIZE; offset >= 0; offset -= THREAD_SIZE) {
        const thread = (block >> BigInt(offset)) & THREAD_MASK;
        threads.push(thread);
    }
    return threads;
}

export function threadsToBlock(threads: bigint[]): bigint {
    let block = 0n;
    let offset = 0;
    threads.reverse().forEach((thread) => {
        if (thread > 0) {
            block |= thread << BigInt(offset);
        }
        offset += THREAD_SIZE;
    });
    return block;
}
