import * as feistelCipher from "../feistel/cipher.ts";
import * as richelieuCipher from "../richelieu/cipher.ts";
import utf32 from "../utils/utf32.ts";

const FILE_READER = new FileReader();

function syncTextChange(
    cipherForm: HTMLFormElement,
    sourceTextarea: HTMLTextAreaElement,
    encryptedTextarea: HTMLTextAreaElement,
    mode: "source" | "encrypted",
): void {
    const formData = new FormData(cipherForm);
    const isFeistelCipherMethod = Boolean(formData.get("cipherMethodCheckbox"));

    const richelieuGridCheckboxes = Array.from(cipherForm.elements.namedItem("richelieuGrid")! as RadioNodeList);
    const richelieuFreeCellsIndexes = richelieuGridCheckboxes.reduce((indexes: number[], element, index) => {
        if (!element.checked) {
            indexes.push(index);
        }
        return indexes;
    }, []);

    const text = mode === "source" ? sourceTextarea.value : encryptedTextarea.value;
    const processMode = mode === "source" ? "encrypt" : "decrypt";
    let result: string;
    let textarea: HTMLTextAreaElement;

    if (isFeistelCipherMethod) {
        const keys = (document.getElementById("keysText")! as HTMLTextAreaElement).value.split("\n").map(BigInt);
        if (mode === "source") {
            result = utf32.base64Encode(feistelCipher.processText(processMode, text, keys));
            textarea = encryptedTextarea;
        } else {
            result = feistelCipher.processText(processMode, utf32.base64Decode(text), keys);
            textarea = sourceTextarea;
        }
    } else if (richelieuFreeCellsIndexes.length > 0) {
        if (mode === "source") {
            result = richelieuCipher.encrypt(text, richelieuGridCheckboxes.length, richelieuFreeCellsIndexes);
            textarea = encryptedTextarea;
        } else {
            result = richelieuCipher.decrypt(text, richelieuGridCheckboxes.length, richelieuFreeCellsIndexes);
            textarea = sourceTextarea;
        }
    } else {
        textarea = mode === "source" ? encryptedTextarea : sourceTextarea;
        result = text;
    }
    textarea.value = result;
}

function syncScroll(source: HTMLTextAreaElement, target: HTMLTextAreaElement): void {
    const sourceScrollHeight: number = source.scrollHeight - source.clientHeight;
    const targetScrollHeight: number = target.scrollHeight - target.clientHeight;

    const scrollPercentY: number = sourceScrollHeight > 0 ? source.scrollTop / sourceScrollHeight : 0;

    target.scrollTop = targetScrollHeight * scrollPercentY;
}

function fromFileToTextarea(fileInput: HTMLInputElement, textarea: HTMLTextAreaElement): void {
    if (fileInput.files!.length === 0) {
        return;
    }
    const file = fileInput.files![0];
    FILE_READER.onload = (event): void => {
        textarea.value = event.target!.result as string;
        textarea.dispatchEvent(new Event("input"));
        fileInput.value = "";
    };
    FILE_READER.readAsText(file, utf32.NAME);
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
        syncTextChange(cipherForm, sourceTextarea, encryptedTextarea, "source");
    };
    encryptedTextarea.oninput = (): void => {
        syncTextChange(cipherForm, sourceTextarea, encryptedTextarea, "encrypted");
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
