export default function setupCipherMethodCheckbox(): void {
    const cipherMethodCheckbox = document.getElementById("cipherMethodCheckbox")! as HTMLInputElement;
    const richelieuInfo: HTMLElement = document.getElementById("richelieuInfo")!;
    const feistelInfo: HTMLElement = document.getElementById("feistelInfo")!;
    const richelieuLabel: HTMLElement = document.getElementById("cipherMethodCheckboxRichelieuLabel")!;
    const feistelLabel: HTMLElement = document.getElementById("cipherMethodCheckboxFeistelLabel")!;
    const sourceTextArea: HTMLElement = document.getElementById("sourceText")!;

    cipherMethodCheckbox.onchange = (): void => {
        const isFeistelChosen: boolean = cipherMethodCheckbox.checked;

        richelieuInfo.classList.toggle("hidden", isFeistelChosen);
        feistelInfo.classList.toggle("hidden", !isFeistelChosen);
        richelieuLabel.classList.toggle("font-bold", !isFeistelChosen);
        feistelLabel.classList.toggle("font-bold", isFeistelChosen);

        sourceTextArea.dispatchEvent(new Event("input"));
    };
}
