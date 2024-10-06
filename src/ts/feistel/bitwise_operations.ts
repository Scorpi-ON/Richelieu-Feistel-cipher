import { Bit, BLOCK_SIZE, THREAD_SIZE, THREAD_COUNT, THREAD_MASK } from './constants.ts';

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

    let bits: Bit[] = Array(bitCount).fill(0);
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

export function bitsToNumber(bits: readonly Bit[]): bigint {
    return bits.reduce((num, bit, index) => {
        const reversedIndex = bits.length - index - 1;
        if (bit === 1) {
            num |= BigInt(bit) << BigInt(reversedIndex);
        }
        return num;
    }, 0n);
}

export function blockToThreads(block: bigint): bigint[] {
    if (block < 0n || block >= 1n << BigInt(BLOCK_SIZE)) {
        throw new Error(`Блок должен быть числом от 0 до 2^${BLOCK_SIZE} - 1`);
    }

    let threads: bigint[] = Array(THREAD_COUNT);
    for (let i = 0, offset = BLOCK_SIZE - THREAD_SIZE; offset >= 0; ++i, offset -= THREAD_SIZE) {
        threads[i] = (block >> BigInt(offset)) & THREAD_MASK;
    }
    return threads;
}

export function threadsToBlock(threads: readonly bigint[]): bigint {
    let offset = BLOCK_SIZE;
    return threads.reduce((block, thread) => {
        if (thread < 0 || thread >= 1n << BigInt(THREAD_SIZE)) {
            throw new Error(`Поток должен быть числом от 0 до 2^${THREAD_SIZE} - 1`);
        }

        offset -= THREAD_SIZE;
        if (thread > 0) {
            block |= thread << BigInt(offset);
        }
        return block;
    }, 0n);
}
