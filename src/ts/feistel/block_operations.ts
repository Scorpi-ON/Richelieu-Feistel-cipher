import { Bit, BYTE_SIZE, BLOCK_SIZE, numberToBits, bitsToNumber } from './bitwise_operations.ts';

export function textToBlocks(text: string): bigint[] {
    const encodedText: number[] = Array.from(new TextEncoder().encode(text));
    let bits = encodedText.reduce<Bit[]>(
        (accumulator, byte) => [...accumulator, ...numberToBits(byte, BYTE_SIZE)],
        []
    );

    const placeholdersCount = BLOCK_SIZE - (bits.length % BLOCK_SIZE);
    if (placeholdersCount < BLOCK_SIZE) {
        bits = [...Array(placeholdersCount).fill(0), ...bits];
    }

    const blockCount = bits.length / BLOCK_SIZE;
    const blocks = Array<bigint>(blockCount).fill(0n);
    for (let index = 0, offset = 0; index < blockCount; ++index) {
        const blockBits = bits.slice(offset, (offset += BLOCK_SIZE));
        blocks[index] = bitsToNumber(blockBits);
    }

    return blocks;
}

export function blocksToText(blocks: bigint[]): string {
    let decodedText = new Uint8Array((BLOCK_SIZE / BYTE_SIZE) * blocks.length);
    const bits = blocks.reduce<Bit[]>(
        (accumulator, block) => [...accumulator, ...numberToBits(block, BLOCK_SIZE)],
        []
    );

    for (let index = 0, offset = 0; offset < bits.length; ++index) {
        const byteBits = bits.slice(offset, (offset += BYTE_SIZE));
        const decodedTextByte = bitsToNumber(byteBits);

        decodedText[index] = Number(decodedTextByte);
    }

    return new TextDecoder().decode(decodedText);
}
