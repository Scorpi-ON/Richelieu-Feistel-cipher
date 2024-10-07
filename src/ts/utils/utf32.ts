const WHITESPACE_CODES = [32, 0, 0, 0];
const BYTES_PER_ELEMENT = Uint32Array.BYTES_PER_ELEMENT;

function encode(text: string): Uint8Array {
    const buf = new ArrayBuffer(text.length * Uint32Array.BYTES_PER_ELEMENT);
    let bufView = new Uint32Array(buf);
    for (let i = 0; i < text.length; i++) {
        bufView[i] = text.charCodeAt(i);
    }
    return new Uint8Array(bufView.buffer);
}

function decode(encoded: Uint8Array): string {
    const bufView = new Uint32Array(encoded.buffer);
    return bufView.reduce((result, c) => result + String.fromCharCode(c), '');
}

export default {
    encode,
    decode,
    WHITESPACE_CODES,
    BYTES_PER_ELEMENT,
};
