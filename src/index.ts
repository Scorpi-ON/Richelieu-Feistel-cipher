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

    sourceTextarea.addEventListener('change', (e) => onTextChange('source'));
    sourceTextarea.addEventListener('keypress', (e) => onTextChange('source'));
    encryptedTextarea.addEventListener('change', (e) => onTextChange('encrypted'));
    encryptedTextarea.addEventListener('keypress', (e) => onTextChange('encrypted'));
});
