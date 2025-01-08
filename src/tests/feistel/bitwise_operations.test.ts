import { describe, test, expect } from '@jest/globals';
import {
    numberToBits,
    bitsToNumber,
    blockToThreads,
    threadsToBlock,
} from '../../ts/feistel/bitwise_operations';
import { Bit, BLOCK_SIZE, THREAD_SIZE, THREAD_COUNT } from '../../ts/feistel/constants';

describe('Функции операций с блоками, потоками и битами', () => {
    describe('numberToBits', () => {
        test.each([
            [0, 4, [0, 0, 0, 0] as Bit[]],
            [1, 3, [0, 0, 1] as Bit[]],
            [8, 4, [1, 0, 0, 0] as Bit[]],
            [30, 5, [1, 1, 1, 1, 0] as Bit[]],
        ])(
            'Если передано число, то возвращает его побитовое представление с нужным количеством нулей-заполнителей в начале',
            (number: number, bitCount: number, expected: readonly Bit[]) => {
                const result = numberToBits(number, bitCount);
                expect(result).toStrictEqual(expected);
            }
        );

        test.each([
            [(1n << 20n) - 1n, 20, Array(20).fill(1)],
            [
                BigInt(0b101001010001110011110010010011010000110001),
                42,
                '101001010001110011110010010011010000110001'.split('').map(Number) as Bit[],
            ],
        ])(
            'Если передано большое число, то возвращает его побитовое представление с нужным количеством нулей-заполнителей в начале',
            (number: bigint, bitCount: number, expected: readonly Bit[]) => {
                const result = numberToBits(number, bitCount);
                expect(result).toStrictEqual(expected);
            }
        );

        test.each([
            [-8, 10],
            [-10, 10],
        ])(
            'Если переводимое число отрицательное, то возникает ошибка',
            (number: number, bitCount: number) => {
                expect(() => numberToBits(number, bitCount)).toThrowError();
            }
        );

        test.each([
            [8, 1],
            [10, 2],
            [0, -6],
        ])(
            'Если указанное количество битов меньше реального количества битов числа, то возникает ошибка',
            (number: number, bitCount: number) => {
                expect(() => numberToBits(number, bitCount)).toThrowError();
            }
        );
    });

    describe('bitsToNumber', () => {
        test.each([
            [[] as Bit[], 0n],
            [[0, 0, 0] as Bit[], 0n],
            [[1, 1, 1, 1] as Bit[], 15n],
            [[0, 0, 1, 0, 1, 0] as Bit[], 10n],
            [
                6686563212059320573771758293154n.toString(2).split('').map(Number) as Bit[],
                6686563212059320573771758293154n,
            ],
        ])(
            'Если передан массив битов, то возвращает их числовое представление',
            (bits: readonly Bit[], expected: bigint) => {
                const result = bitsToNumber(bits);
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe('blockToThreads', () => {
        test.each([
            [
                (1n << BigInt(BLOCK_SIZE)) - 1n,
                Array(THREAD_COUNT).fill((1n << BigInt(THREAD_SIZE)) - 1n),
            ],
            [
                BigInt(
                    '0b' +
                        '0'.repeat(THREAD_SIZE) +
                        '10100101111000010110000101110101' +
                        '1'.repeat(THREAD_SIZE) +
                        '11110100111100001110010001100101'
                ),
                [
                    0n,
                    BigInt(0b10100101111000010110000101110101),
                    (1n << BigInt(THREAD_SIZE)) - 1n,
                    BigInt(0b11110100111100001110010001100101),
                ],
            ],
        ])(
            'Если передан блок, то возвращает его потоки',
            (block: bigint, expected: readonly bigint[]) => {
                const result = blockToThreads(block);
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe('threadsToBlock', () => {
        test.each([
            [
                Array(THREAD_COUNT).fill((1n << BigInt(THREAD_SIZE)) - 1n),
                (1n << BigInt(BLOCK_SIZE)) - 1n,
            ],
            [
                [
                    0n,
                    BigInt(0b10100101111000010110000101110101),
                    (1n << BigInt(THREAD_SIZE)) - 1n,
                    BigInt(0b11110100111100001110010001100101),
                ],
                BigInt(
                    '0b' +
                        '0'.repeat(THREAD_SIZE) +
                        '10100101111000010110000101110101' +
                        '1'.repeat(THREAD_SIZE) +
                        '11110100111100001110010001100101'
                ),
            ],
        ])(
            'Если переданы потоки, то возвращает блок из них',
            (threads: readonly bigint[], expected: bigint) => {
                const result = threadsToBlock(threads);
                expect(result).toStrictEqual(expected);
            }
        );
    });
});
