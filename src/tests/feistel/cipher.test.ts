import { describe, test, expect, jest, afterEach } from '@jest/globals';
import { encryptRound, decryptRound } from '../../ts/feistel/round_funcs.ts';
import { processText } from '../../ts/feistel/cipher';

describe('Функции непосредственно шифра Фейстеля', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('encryptRound', () => {
        test.each([
            [[0n, 0n, 0n, 0n], 0n, [0n, 0n, 0n, 0n]],
            [[0n, 0n, 0n, 0n], 1n, [1n, 1n, 1n, 0n]],
            [[0b110n, 0b10n, 0b11n, 0b1001n], 0b1001n, [0b1101n, 0b1100n, 0b110n, 0b110n]],
            [[0b1101n, 0b101n, 0b1001n, 0b10111n], 0b100n, [0b1100n, 0n, 0b11110n, 0b1101n]],
        ])(
            'Если на вход поступают потоки, то возвращает корректное перемешивание',
            (threads: bigint[], key: bigint, expected: readonly bigint[]) => {
                const result = encryptRound(threads, key);
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe('decryptRound', () => {
        test.each([
            [[0n, 0n, 0n, 0n], 0n, [0n, 0n, 0n, 0n]],
            [[1n, 1n, 1n, 0n], 1n, [0n, 0n, 0n, 0n]],
            [[0b1101n, 0b1100n, 0b110n, 0b110n], 0b1001n, [0b110n, 0b10n, 0b11n, 0b1001n]],
            [[0b1100n, 0n, 0b11110n, 0b1101n], 0b100n, [0b1101n, 0b101n, 0b1001n, 0b10111n]],
        ])(
            'Если на вход поступают перемешанные потоки, то возвращает корректное восстановление',
            (threads: bigint[], key: bigint, expected: readonly bigint[]) => {
                const result = decryptRound(threads, key);
                expect(result).toStrictEqual(expected);
            }
        );
    });

    describe('processText', () => {
        test.each([
            ['Test', Array(8).fill(0n)],
            ['Тест', Array(8).fill(5n)],
            ['ТестБезПробелаСНесколькимиБлокамиИКлючами', [4n, 23n, 8n, 5n, 7n, 1n, 0n, 7n]],
            ['Test$', Array(8).fill(0n)],
            [
                'Наконец-то моя прелесть работает, ну вы не поверите',
                [5n, 3n, 11n, 15n, 7n, 0n, 10n, 17n],
            ],
            ['Наконец-то моя прелесть работает, ну вы не поверите', Array(8).fill(0n)],
            ['АЙ МИШАНЯ🔥🔥💪 ЧИСТО В КОНДИЦИИ ВОШЕЛ🦁🦁🦁☝️АЙ ЛЕВ ГЛАВНОЕ ВОШЁЛ ТИХО И АККУРАТНЕНЬКО 🔥🔥🔥☝️☝️КРАСАВЧИК ДВИГАЕШЬСЯ РОВНЫМИ ДВИЖЕНИЯМИ АЙ ХОРОШ😈😈💪💪💪☝️🔥🦁🦁 САНЕЧКА ВОТЕТА СУЕТА\n' +
            '\n' +
            'ай красавчик литвинчик 😈😈😈💪💪🔥 на кандициях суета родная полетела💪🏼😈😈 в моменте просто айяй 💪💪💪😈😈🔥 а главная аккуратненько двигается 🔥🔥🔥 это уже межгалактический уровень братка😈😈😈\n' +
            '\n' +
            'Ай ай ай🔥🔥🔥 Обезьяна чисто на кондициях суету наводит😂😂😂\n' +
            'Чисто кросава обезьяна ровный поцан\n' +
            '\n' +
            'Чо за межконтинентальный уровень братишка 🥷🥷🥷☝️☝️☝️к какие кондиции мощные и главное аккуратно в конце набрал 😹😹👊👊👊🔥🔥🔥 братишка\n' +
            '\n' +
            'Ай Мишаня родной суеты раздал как🔥🔥🔥🔥эликсира захлебнул и кондиций аккуратненько набрал в моменте🔥🔥💪💪☝️братка ни дня без суеты😎😎🔥', Array(8).fill(0n)],
        ])(
            'Если на вход поступает текст, то возвращает корректную шифровку',
            (text: string, keys: bigint[]) => {
                const encrypted = processText('encrypt', text, keys);
                const decrypted = processText('decrypt', encrypted, keys);
                expect(decrypted.trimStart()).toBe(text);
            }
        );
    });
});
