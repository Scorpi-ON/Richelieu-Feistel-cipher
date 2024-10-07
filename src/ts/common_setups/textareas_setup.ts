import * as richelieuCipher from '../richelieu/cipher.ts';
import * as feistelCipher from '../feistel/cipher.ts';

const FILE_READER = new FileReader();

function syncTextChange(
    cipherForm: HTMLFormElement,
    sourceTextarea: HTMLTextAreaElement,
    encryptedTextarea: HTMLTextAreaElement,
    mode: 'source' | 'encrypted'
): void {
    const formData = new FormData(cipherForm);
    const isFeistelCipherMethod: boolean = Boolean(formData.get('cipherMethodCheckbox'));

    const richelieuGridCheckboxes = Array.from(
        cipherForm.elements.namedItem('richelieuGrid')! as RadioNodeList
    ) as HTMLInputElement[];
    const richelieuFreeCellsIndexes = richelieuGridCheckboxes.reduce(
        (indexes: number[], element, index) => {
            if (!element.checked) {
                indexes.push(index);
            }
            return indexes;
        },
        []
    );

    if (mode === 'source') {
        const sourceText = sourceTextarea.value;
        if (isFeistelCipherMethod) {
            encryptedTextarea.value = feistelCipher.processText(
                'encrypt',
                sourceText,
                Array(8).fill(0n)
            );
        } else {
            if (richelieuFreeCellsIndexes.length > 0) {
                encryptedTextarea.value = richelieuCipher.encrypt(
                    sourceText,
                    richelieuGridCheckboxes.length,
                    richelieuFreeCellsIndexes
                );
            } else {
                encryptedTextarea.value = sourceText;
            }
        }
    } else {
        const encryptedText = encryptedTextarea.value;
        if (isFeistelCipherMethod) {
            sourceTextarea.value = feistelCipher.processText(
                'decrypt',
                encryptedText,
                Array(8).fill(0n)
            );
        } else {
            if (richelieuFreeCellsIndexes.length > 0) {
                sourceTextarea.value = richelieuCipher.decrypt(
                    encryptedText,
                    richelieuGridCheckboxes.length,
                    richelieuFreeCellsIndexes
                );
            } else {
                encryptedTextarea.value = encryptedText;
            }
        }
    }
}

function syncScroll(source: HTMLTextAreaElement, target: HTMLTextAreaElement): void {
    const sourceScrollHeight: number = source.scrollHeight - source.clientHeight;
    const targetScrollHeight: number = target.scrollHeight - target.clientHeight;

    const scrollPercentY: number =
        sourceScrollHeight > 0 ? source.scrollTop / sourceScrollHeight : 0;

    target.scrollTop = targetScrollHeight * scrollPercentY;
}

function fromFileToTextarea(fileInput: HTMLInputElement, textarea: HTMLTextAreaElement): void {
    if (fileInput.files!.length === 0) {
        return;
    }
    const file = fileInput.files![0];
    FILE_READER.onload = (event): void => {
        textarea.value = event.target!.result as string;
        textarea.dispatchEvent(new Event('input'));
        fileInput.value = '';
    };
    FILE_READER.readAsText(file, 'utf-32');
}

function fromTextareaToFile(textarea: HTMLTextAreaElement, filename: string): void {
    const text: string = textarea.value;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-32' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export default function setupTextareas(): void {
    const cipherForm: HTMLFormElement = document.forms.namedItem('cipherForm')!;
    const sourceTextarea = cipherForm.elements.namedItem('sourceText') as HTMLTextAreaElement;
    const encryptedTextarea = cipherForm.elements.namedItem('encryptedText') as HTMLTextAreaElement;
    const uploadSourceFileInput = cipherForm.elements.namedItem(
        'uploadSourceFileInput'
    ) as HTMLInputElement;
    const uploadEncryptedFileInput = cipherForm.elements.namedItem(
        'uploadEncryptedFileInput'
    ) as HTMLInputElement;
    const downloadSourceButton = cipherForm.elements.namedItem(
        'downloadSourceButton'
    ) as HTMLButtonElement;
    const downloadEncryptedButton = cipherForm.elements.namedItem(
        'downloadEncryptedButton'
    ) as HTMLButtonElement;

    sourceTextarea.oninput = (): void =>
        syncTextChange(cipherForm, sourceTextarea, encryptedTextarea, 'source');
    encryptedTextarea.oninput = (): void =>
        syncTextChange(cipherForm, sourceTextarea, encryptedTextarea, 'encrypted');

    sourceTextarea.onscroll = (): void => syncScroll(sourceTextarea, encryptedTextarea);
    encryptedTextarea.onscroll = (): void => syncScroll(encryptedTextarea, sourceTextarea);

    uploadSourceFileInput.onchange = (): void =>
        fromFileToTextarea(uploadSourceFileInput, sourceTextarea);
    uploadEncryptedFileInput.onchange = (): void =>
        fromFileToTextarea(uploadEncryptedFileInput, encryptedTextarea);

    downloadSourceButton.onclick = (): void => fromTextareaToFile(sourceTextarea, 'source.txt');
    downloadEncryptedButton.onclick = (): void =>
        fromTextareaToFile(encryptedTextarea, 'encrypted.txt');
}
