import * as richelieuCipher from '../richelieu/cipher.ts';
import * as feistelCipher from '../feistel/cipher.ts';

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
            encryptedTextarea.value = feistelCipher.encrypt(sourceText);
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
            sourceTextarea.value = feistelCipher.decrypt(encryptedText);
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
    if (fileInput.files!.length === 0) return;
    const file = fileInput.files![0];
    const reader = new FileReader();
    reader.onload = (event): void => {
        textarea.value = event.target!.result as string;
        textarea.dispatchEvent(new Event('input'));
    };
    reader.readAsText(file);
}

export default function setupTextareas(): void {
    const cipherForm: HTMLFormElement = document.forms.namedItem('cipherForm')!;
    const sourceTextarea = cipherForm.elements.namedItem('sourceText') as HTMLTextAreaElement;
    const encryptedTextarea = cipherForm.elements.namedItem('encryptedText') as HTMLTextAreaElement;
    const sourceFileInput = cipherForm.elements.namedItem('sourceFileInput') as HTMLInputElement;
    const encryptedFileInput = cipherForm.elements.namedItem(
        'encryptedFileInput'
    ) as HTMLInputElement;

    sourceTextarea.oninput = (): void =>
        syncTextChange(cipherForm, sourceTextarea, encryptedTextarea, 'source');
    encryptedTextarea.oninput = (): void =>
        syncTextChange(cipherForm, sourceTextarea, encryptedTextarea, 'encrypted');

    sourceTextarea.onscroll = (): void => syncScroll(sourceTextarea, encryptedTextarea);
    encryptedTextarea.onscroll = (): void => syncScroll(encryptedTextarea, sourceTextarea);

    sourceFileInput.onchange = (): void => fromFileToTextarea(sourceFileInput, sourceTextarea);
    encryptedTextarea.onchange = (): void =>
        fromFileToTextarea(encryptedFileInput, encryptedTextarea);
}
