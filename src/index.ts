function addListenersOnTextareas(): void {
    const cipherForm: HTMLFormElement = document.forms.namedItem('cipherForm')!;
    const sourceTextarea = document.getElementById('sourceText')! as HTMLTextAreaElement;
    const encryptedTextarea = document.getElementById('encryptedText')! as HTMLTextAreaElement;

    function onTextChange(mode: 'source' | 'encrypted'): void {
        const formData = new FormData(cipherForm);
        if (mode === 'source') {
            const sourceText = formData.get('sourceText') as string;
            encryptedTextarea.value = sourceText;
        } else {
            const encryptedText = formData.get('encryptedText') as string;
            sourceTextarea.value = encryptedText;
        }
    }

    function syncScroll(source: HTMLTextAreaElement, target: HTMLTextAreaElement): void {
        target.scrollTop = source.scrollTop;
        target.scrollLeft = source.scrollLeft;
    }

    sourceTextarea.addEventListener('input', () => onTextChange('source'));
    encryptedTextarea.addEventListener('input', () => onTextChange('encrypted'));
    sourceTextarea.addEventListener('scroll', () => syncScroll(sourceTextarea, encryptedTextarea));
    encryptedTextarea.addEventListener('scroll', () => syncScroll(encryptedTextarea, sourceTextarea));
}

function addListenersOnRadiobuttons(): void {
    const cipherMethodCheckbox: HTMLInputElement = document.getElementById(
        'cipherMethodCheckbox'
    )! as HTMLInputElement;
    const richelieuInfo: HTMLElement = document.getElementById('richelieuInfo')!;
    const feistelInfo: HTMLElement = document.getElementById('feistelInfo')!;
    const richelieuLabel: HTMLElement = document.getElementById('cipherMethodCheckboxRichelieuLabel')!;
    const feistelLabel: HTMLElement = document.getElementById('cipherMethodCheckboxFeistelLabel')!;

    cipherMethodCheckbox.addEventListener('change', function () {
        if (this.checked) {
            richelieuInfo.classList.add('hidden');
            feistelInfo.classList.remove('hidden');
            richelieuLabel.classList.remove('font-bold');
            feistelLabel.classList.add('font-bold');
        } else {
            feistelInfo.classList.add('hidden');
            richelieuInfo.classList.remove('hidden');
            feistelLabel.classList.remove('font-bold');
            richelieuLabel.classList.add('font-bold');
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    addListenersOnTextareas();
    addListenersOnRadiobuttons();
});
