export const WHITESPACE_CODES = [32, 0];
const DECODER = new TextDecoder('utf-16le');

function encode(text: string): Uint8Array {
    const buf = new ArrayBuffer(text.length * 2);
    let bufView = new Uint16Array(buf);
    for (let i = 0; i < text.length; i++) {
        bufView[i] = text.charCodeAt(i);
    }
    return new Uint8Array(bufView.buffer);
}

function decode(bytes: Uint8Array): string {
    return DECODER.decode(bytes);
}

export default {
    encode,
    decode,
    WHITESPACE_CODES,
};
