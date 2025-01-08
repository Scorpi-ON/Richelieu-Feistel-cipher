import { Bit, BYTE_SIZE, BLOCK_SIZE } from './constants.ts';
import { numberToBits, bitsToNumber } from './bitwise_operations.ts';
import utf32 from '../utils/utf32.ts';

const BLOCK_BYTE_SIZE = BLOCK_SIZE / BYTE_SIZE;

function textToBlockBytes(text: string): number[] {
    let textBytes: number[] = Array.from(utf32.encode(text));

    const placeholderBytesCount = BLOCK_BYTE_SIZE - (textBytes.length % BLOCK_BYTE_SIZE);
    if (placeholderBytesCount < BLOCK_BYTE_SIZE) {
        const placeholderBytes: number[] = Array(placeholderBytesCount / utf32.BYTES_PER_ELEMENT)
            .fill(utf32.WHITESPACE_CODES)
            .flat();
        textBytes = [...placeholderBytes, ...textBytes];
    }

    return textBytes;
}

export function textToBlocks(text: string): bigint[] {
    const textBytes: number[] = textToBlockBytes(text);
    const bits: Bit[] = textBytes.map((byte) => numberToBits(byte, BYTE_SIZE)).flat();

    const blockCount = bits.length / BLOCK_SIZE;
    const blocks: bigint[] = Array(blockCount);
    for (let index = 0, offset = 0; index < blockCount; ++index) {
        const blockBits = bits.slice(offset, (offset += BLOCK_SIZE));
        blocks[index] = bitsToNumber(blockBits);
    }

    return blocks;
}

export function blocksToText(blocks: readonly bigint[]): string {
    let textBytes = new Uint8Array(BLOCK_BYTE_SIZE * blocks.length);
    const bits: Bit[] = blocks.map((block) => numberToBits(block, BLOCK_SIZE)).flat();

    for (let index = 0, offset = 0; offset < bits.length; ++index) {
        const byteBits = bits.slice(offset, (offset += BYTE_SIZE));
        const decodedTextByte = bitsToNumber(byteBits);

        textBytes[index] = Number(decodedTextByte);
    }

    return utf32.decode(textBytes);
}
