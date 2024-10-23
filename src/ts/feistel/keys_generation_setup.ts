import { THREAD_MASK } from './constants.ts';

function genKeys(count: number): number[] {
    return Array(count)
        .fill(0)
        .map(() => Math.floor(Math.random() * (Number(THREAD_MASK) + 1)));
}

export default function setupKeysGeneration(): void {
    const genFeistelKeysBtn: HTMLElement = document.getElementById('genFeistelKeysBtn')!;
    const keysTextArea = document.getElementById('keysText')! as HTMLTextAreaElement;
    const sourceTextArea: HTMLElement = document.getElementById('sourceText')!;

    genFeistelKeysBtn.onclick = (): void => {
        keysTextArea.value = genKeys(8).join('\n');
        sourceTextArea.dispatchEvent(new Event('input'));
    };
    keysTextArea.oninput = (): void => {
        sourceTextArea.dispatchEvent(new Event('input'));
    };
}
