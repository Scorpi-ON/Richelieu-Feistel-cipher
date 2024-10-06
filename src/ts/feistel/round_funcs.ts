function f(thread: bigint, key: bigint): bigint {
    return thread ^ key;
}

export function encryptRound(threads: bigint[], key: bigint): bigint[] {
    const processedFirstBlock = f(threads[0], key);
    threads = [
        threads[1] ^ processedFirstBlock,
        threads[2] ^ processedFirstBlock,
        threads[3] ^ processedFirstBlock,
        threads[0],
    ];
    return threads;
}

export function decryptRound(threads: bigint[], key: bigint): bigint[] {
    const processedFirstBlock = f(threads[3], key);
    threads = [
        threads[3],
        threads[0] ^ processedFirstBlock,
        threads[1] ^ processedFirstBlock,
        threads[2] ^ processedFirstBlock,
    ];
    return threads;
}
