import * as feistelCipher from "../feistel/cipher.ts";
import * as richelieuCipher from "../richelieu/cipher.ts";
import utf32 from "../utils/utf32.ts";

function parseFeistelKeys(text: string): bigint[] {
    return text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => BigInt(line));
}

function getRichelieuFreeCellsIndexes(richelieuGridCheckboxes: HTMLInputElement[]): number[] {
    const freeCellsIndexes: number[] = [];
    richelieuGridCheckboxes.forEach((checkbox, index) => {
        if (!checkbox.checked) {
            freeCellsIndexes.push(index);
        }
    });
    return freeCellsIndexes;
}

function syncTextChange(
    cipherForm: HTMLFormElement,
    cipherMethodCheckbox: HTMLInputElement,
    keysTextarea: HTMLTextAreaElement,
    sourceTextarea: HTMLTextAreaElement,
    encryptedTextarea: HTMLTextAreaElement,
    mode: "source" | "encrypted",
): void {
    const text = mode === "source" ? sourceTextarea.value : encryptedTextarea.value;
    const processMode = mode === "source" ? "encrypt" : "decrypt";
    const targetTextarea = mode === "source" ? encryptedTextarea : sourceTextarea;

    if (cipherMethodCheckbox.checked) {
        const keys = parseFeistelKeys(keysTextarea.value);
        targetTextarea.value =
            mode === "source"
                ? utf32.base64Encode(feistelCipher.processText(processMode, text, keys))
                : feistelCipher.processText(processMode, utf32.base64Decode(text), keys);
        return;
    }

    const richelieuGridCheckboxes = Array.from(cipherForm.elements.namedItem("richelieuGrid") as RadioNodeList);
    const richelieuFreeCellsIndexes = getRichelieuFreeCellsIndexes(richelieuGridCheckboxes);
    if (richelieuFreeCellsIndexes.length === 0) {
        targetTextarea.value = text;
        return;
    }

    targetTextarea.value =
        mode === "source"
            ? richelieuCipher.encrypt(text, richelieuGridCheckboxes.length, richelieuFreeCellsIndexes)
            : richelieuCipher.decrypt(text, richelieuGridCheckboxes.length, richelieuFreeCellsIndexes);
}

function syncScroll(source: HTMLTextAreaElement, target: HTMLTextAreaElement): void {
    const sourceScrollHeight: number = source.scrollHeight - source.clientHeight;
    const targetScrollHeight: number = target.scrollHeight - target.clientHeight;

    const scrollPercentY: number = sourceScrollHeight > 0 ? source.scrollTop / sourceScrollHeight : 0;

    target.scrollTop = targetScrollHeight * scrollPercentY;
}

function fromFileToTextarea(fileInput: HTMLInputElement, textarea: HTMLTextAreaElement): void {
    const file = fileInput.files?.[0];
    if (!file) {
        return;
    }
    const reader = new FileReader();
    reader.onload = (): void => {
        const result = reader.result;
        textarea.value = typeof result === "string" ? result : "";
        textarea.dispatchEvent(new Event("input"));
        fileInput.value = "";
    };
    reader.readAsText(file, utf32.NAME);
}

function fromTextareaToFile(textarea: HTMLTextAreaElement, filename: string): void {
    const text: string = textarea.value;
    const blob = new Blob([text], { type: "text/plain;charset=" + utf32.NAME });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export default function setupTextareas(): void {
    const cipherForm: HTMLFormElement = document.forms.namedItem("cipherForm")!;
    const cipherMethodCheckbox = cipherForm.elements.namedItem("cipherMethodCheckbox") as HTMLInputElement;
    const sourceTextarea = cipherForm.elements.namedItem("sourceText") as HTMLTextAreaElement;
    const encryptedTextarea = cipherForm.elements.namedItem("encryptedText") as HTMLTextAreaElement;
    const keysTextarea = cipherForm.elements.namedItem("keysText") as HTMLTextAreaElement;
    const uploadKeysFileInput = cipherForm.elements.namedItem("uploadKeysFileInput") as HTMLInputElement;
    const uploadSourceFileInput = cipherForm.elements.namedItem("uploadSourceFileInput") as HTMLInputElement;
    const uploadEncryptedFileInput = cipherForm.elements.namedItem("uploadEncryptedFileInput") as HTMLInputElement;
    const downloadKeysButton = cipherForm.elements.namedItem("downloadKeysButton") as HTMLButtonElement;
    const downloadSourceButton = cipherForm.elements.namedItem("downloadSourceButton") as HTMLButtonElement;
    const downloadEncryptedButton = cipherForm.elements.namedItem("downloadEncryptedButton") as HTMLButtonElement;

    sourceTextarea.oninput = (): void => {
        syncTextChange(cipherForm, cipherMethodCheckbox, keysTextarea, sourceTextarea, encryptedTextarea, "source");
    };
    encryptedTextarea.oninput = (): void => {
        syncTextChange(cipherForm, cipherMethodCheckbox, keysTextarea, sourceTextarea, encryptedTextarea, "encrypted");
    };

    sourceTextarea.onscroll = (): void => {
        syncScroll(sourceTextarea, encryptedTextarea);
    };
    encryptedTextarea.onscroll = (): void => {
        syncScroll(encryptedTextarea, sourceTextarea);
    };

    uploadSourceFileInput.onchange = (): void => {
        fromFileToTextarea(uploadSourceFileInput, sourceTextarea);
    };
    uploadEncryptedFileInput.onchange = (): void => {
        fromFileToTextarea(uploadEncryptedFileInput, encryptedTextarea);
    };
    uploadKeysFileInput.onchange = (): void => {
        fromFileToTextarea(uploadKeysFileInput, keysTextarea);
    };

    downloadKeysButton.onclick = (): void => {
        fromTextareaToFile(keysTextarea, "feistel-keys.txt");
    };
    downloadSourceButton.onclick = (): void => {
        fromTextareaToFile(sourceTextarea, "source.txt");
    };
    downloadEncryptedButton.onclick = (): void => {
        fromTextareaToFile(encryptedTextarea, "encrypted.txt");
    };
}
