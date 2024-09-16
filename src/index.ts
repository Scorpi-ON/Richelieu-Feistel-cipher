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
    const richelieuRadio: HTMLElement = document.getElementById('cipherMethodRadioRichelieu')!;
    const feistelRadio: HTMLElement = document.getElementById('cipherMethodRadioFeistel')!;
    const richelieuInfo: HTMLElement = document.getElementById('richelieuInfo')!;
    const feistelInfo: HTMLElement = document.getElementById('feistelInfo')!;
    const richelieuLabel: HTMLElement = document.getElementById('cipherMethodRadioRichelieuLabel')!;
    const feistelLabel: HTMLElement = document.getElementById('cipherMethodRadioFeistelLabel')!;

    richelieuRadio.addEventListener('change', () => {
        feistelInfo.classList.add('d-none');
        richelieuInfo.classList.remove('d-none');
        feistelLabel.classList.remove('fw-bold');
        richelieuLabel.classList.add('fw-bold');
    });
    feistelRadio.addEventListener('change', () => {
        richelieuInfo.classList.add('d-none');
        feistelInfo.classList.remove('d-none');
        richelieuLabel.classList.remove('fw-bold');
        feistelLabel.classList.add('fw-bold');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    addListenersOnTextareas();
    addListenersOnRadiobuttons();
});
