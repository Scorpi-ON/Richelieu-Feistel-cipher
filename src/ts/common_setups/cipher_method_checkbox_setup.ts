type Operation = 'add' | 'remove';

export default function setupCipherMethodCheckbox(): void {
    const cipherMethodCheckbox = document.getElementById(
        'cipherMethodCheckbox'
    )! as HTMLInputElement;
    const richelieuInfo: HTMLElement = document.getElementById('richelieuInfo')!;
    const feistelInfo: HTMLElement = document.getElementById('feistelInfo')!;
    const richelieuLabel: HTMLElement = document.getElementById(
        'cipherMethodCheckboxRichelieuLabel'
    )!;
    const feistelLabel: HTMLElement = document.getElementById('cipherMethodCheckboxFeistelLabel')!;
    const sourceTextArea: HTMLElement = document.getElementById('sourceText')!;

    cipherMethodCheckbox.onchange = (): void => {
        const isFeistelChosen: boolean = cipherMethodCheckbox.checked;
        const methods: Operation[] = isFeistelChosen ? ['add', 'remove'] : ['remove', 'add'];

        richelieuInfo.classList[methods[0]]('hidden');
        feistelInfo.classList[methods[1]]('hidden');
        richelieuLabel.classList[methods[1]]('font-bold');
        feistelLabel.classList[methods[0]]('font-bold');

        sourceTextArea.dispatchEvent(new Event('input'));
    };
}
