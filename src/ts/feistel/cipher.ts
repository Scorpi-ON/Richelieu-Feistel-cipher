import { blockToThreads, threadsToBlock } from './bitwise_operations';
import { textToBlocks, blocksToText } from './block_operations';
import { encryptRound, decryptRound } from './round_funcs.ts';

type ProcessMode = 'encrypt' | 'decrypt';

export function processText(mode: ProcessMode, text: string, keys: readonly bigint[]): string {
    let blocks: bigint[] = textToBlocks(text);
    let roundFunc: (threads: bigint[], key: bigint) => bigint[];
    if (mode === 'decrypt') {
        keys = keys.toReversed();
        roundFunc = encryptRound;
    } else {
        roundFunc = decryptRound;
    }

    blocks = blocks.map((block) => {
        let threads: bigint[] = blockToThreads(block);
        keys.forEach((key) => {
            threads = roundFunc(threads, key);
        });
        return threadsToBlock(threads);
    });

    return blocksToText(blocks);
}
