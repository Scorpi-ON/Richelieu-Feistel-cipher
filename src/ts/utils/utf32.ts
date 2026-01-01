const NAME = "utf-8";
const WHITESPACE_CODES = [32, 0, 0, 0];
const BYTES_PER_ELEMENT = Uint32Array.BYTES_PER_ELEMENT;

function encode(text: string): Uint8Array {
    const buf = new ArrayBuffer(text.length * Uint32Array.BYTES_PER_ELEMENT);
    const bufView = new Uint32Array(buf);
    for (let i = 0; i < text.length; i++) {
        bufView[i] = text.charCodeAt(i);
    }
    return new Uint8Array(bufView.buffer);
}

function decode(encoded: Uint8Array): string {
    const bufView = new Uint32Array(encoded.buffer);
    return bufView.reduce((result, c) => result + String.fromCharCode(c), "");
}

function base64Encode(text: string): string {
    const utf8Array = encode(text);
    const utf8String = utf8Array.reduce((str, byte) => str + String.fromCharCode(byte), "");
    return window.btoa(utf8String);
}

function base64Decode(encodedText: string): string {
    const base64String = window.atob(encodedText);
    const len = base64String.length;
    const utf8Array = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        utf8Array[i] = base64String.charCodeAt(i);
    }
    return decode(utf8Array);
}

export default {
    encode,
    decode,
    base64Encode,
    base64Decode,
    NAME,
    WHITESPACE_CODES,
    BYTES_PER_ELEMENT,
};
