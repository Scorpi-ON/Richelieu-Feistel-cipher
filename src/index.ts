window.addEventListener('DOMContentLoaded', () => {
    const cipherForm: HTMLFormElement = document.forms.namedItem('cipherForm')!;
    const sourceTextarea: HTMLElement = document.getElementById('sourceText')!;
    const encryptedTextarea: HTMLElement = document.getElementById('encryptedText')!;

    function onTextChange(mode: 'source' | 'encrypted'): void {
        const formData = new FormData(cipherForm);
        if (mode === 'source') {
            const sourceText = formData.get('sourceText') as string;
            encryptedTextarea.textContent = sourceText;
        } else {
            const encryptedText = formData.get('encryptedText') as string;
            sourceTextarea.textContent = encryptedText;
        }
    }

    sourceTextarea.addEventListener('change', () => onTextChange('source'));
    sourceTextarea.addEventListener('keypress', () => onTextChange('source'));
    encryptedTextarea.addEventListener('change', () => onTextChange('encrypted'));
    encryptedTextarea.addEventListener('keypress', () => onTextChange('encrypted'));

    const richelieuRadio: HTMLElement = document.getElementById('cipherMethodRadio_Richelieu')!;
    const feistelRadio: HTMLElement = document.getElementById('cipherMethodRadio_Feistel')!;
    const richelieuInfo: HTMLElement = document.getElementById('richelieuInfo')!;
    const feistelInfo: HTMLElement = document.getElementById('feistelInfo')!;
    richelieuRadio.addEventListener('change', () => {
        feistelInfo.classList.add('d-none');
        richelieuInfo.classList.remove('d-none');
    });
    feistelRadio.addEventListener('change', () => {
        richelieuInfo.classList.add('d-none');
        feistelInfo.classList.remove('d-none');
    });
});
