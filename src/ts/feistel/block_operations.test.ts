import { blocksToText, textToBlocks } from './block_operations';
import { describe, test, expect, jest, afterEach } from '@jest/globals';
import { Bit, numberToBits, bitsToNumber } from './bitwise_operations';

jest.mock('./bitwise_operations');
const numberToBitsMocked = jest.mocked(numberToBits, { shallow: true });
const bitsToNumberMocked = jest.mocked(bitsToNumber, { shallow: true });

describe('Функции операций над текстом и блоками', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('textToBlocks', () => {
        test.each([
            ['A', [[1, 0, 0, 0, 0, 0, 1]] as Bit[][], [65n]],
            [
                'Test тесТ',
                [
                    [0, 1, 0, 1, 0, 1, 0, 0],
                    [0, 1, 1, 0, 0, 1, 0, 1],
                    [0, 1, 1, 1, 0, 0, 1, 1],
                    [0, 1, 1, 1, 0, 1, 0, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0],
                    [1, 1, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 1, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 0, 1, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 0, 0, 0, 1, 0],
                ] as Bit[][],
                [6686563212059320573771758293154n],
            ],
            [
                'Здесь несколько блоков',
                [
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 0, 1, 0, 1, 1, 1],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 0, 1, 0, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 0, 1, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 1, 1, 0, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 0, 1, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 1, 1, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 1],
                    [1, 1, 0, 1, 0, 0, 0, 1],
                    [1, 0, 0, 0, 1, 1, 0, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 1, 1, 0],
                    [0, 0, 1, 0, 0, 0, 0, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 0, 0, 0, 1],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 1],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 1, 1, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 0, 1, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 1, 1, 1, 0],
                    [1, 1, 0, 1, 0, 0, 0, 0],
                    [1, 0, 1, 1, 0, 0, 1, 0],
                ] as Bit[][],
                [
                    985052725666551366275468n,
                    43619143522835510521971956195525758160n,
                    248320261220283338410404641054589374642n,
                ],
            ],
        ])(
            'Если передан текст, то возвращает его разбиение на блоки',
            (text: string, bitSets: Bit[][], expected: bigint[]) => {
                bitSets.forEach((bitSet) => numberToBitsMocked.mockReturnValueOnce(bitSet));
                expected.forEach((block) => bitsToNumberMocked.mockReturnValueOnce(block));

                const result = textToBlocks(text);
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe('blocksToText', () => {
        test.each([
            [
                [65n],
                [
                    [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
                        0, 0, 1,
                    ],
                ] as Bit[][],
                [0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 65n],
                'A',
            ],
            [
                [6686563212059320573771758293154n],
                [
                    [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1,
                        1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0,
                        0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
                        0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0,
                        0, 1, 0,
                    ],
                ] as Bit[][],
                [
                    0n,
                    0n,
                    0n,
                    84n,
                    101n,
                    115n,
                    116n,
                    32n,
                    209n,
                    130n,
                    208n,
                    181n,
                    209n,
                    129n,
                    208n,
                    162n,
                ],
                'Test тесТ',
            ],
            [
                [
                    985052725666551366275468n,
                    43619143522835510521971956195525758160n,
                    248320261220283338410404641054589374642n,
                ],
                [
                    [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                        0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
                        1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1,
                        0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                        1, 0, 0,
                    ],
                    [
                        0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1,
                        1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0,
                        0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0,
                        1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1,
                        1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0,
                        0, 0, 0,
                    ],
                    [
                        1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0,
                        0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1,
                        0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1,
                        1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1,
                        0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0,
                        0, 1, 0,
                    ],
                ] as Bit[][],
                [
                    0n,
                    0n,
                    0n,
                    0n,
                    0n,
                    0n,
                    208n,
                    151n,
                    208n,
                    180n,
                    208n,
                    181n,
                    209n,
                    129n,
                    209n,
                    140n,
                    32n,
                    208n,
                    189n,
                    208n,
                    181n,
                    209n,
                    129n,
                    208n,
                    186n,
                    208n,
                    190n,
                    208n,
                    187n,
                    209n,
                    140n,
                    208n,
                    186n,
                    208n,
                    190n,
                    32n,
                    208n,
                    177n,
                    208n,
                    187n,
                    208n,
                    190n,
                    208n,
                    186n,
                    208n,
                    190n,
                    208n,
                    178n,
                ],
                'Здесь несколько блоков',
            ],
        ])(
            'Если переданы блоки, то возвращает текст, собранный из них',
            (blocks: bigint[], blockBitSets: Bit[][], bytes: bigint[], expected: string) => {
                blockBitSets.forEach((bitSet) => numberToBitsMocked.mockReturnValueOnce(bitSet));
                bytes.forEach((byte) => bitsToNumberMocked.mockReturnValueOnce(byte));

                const result = blocksToText(blocks);
                expect(result).toMatch(new RegExp(' *' + expected));
            }
        );
    });
});