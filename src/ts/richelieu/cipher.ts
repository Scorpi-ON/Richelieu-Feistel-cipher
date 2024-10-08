const INVALID_GRID_ERROR = new Error('В решётке Ришелье должна быть хотя бы одна свободная клетка');

function getRandomCharacter(): string {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789.!?,;:—\'"«»()';
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

export function encrypt(text: string, gridSize: number, freeCellsIndexes: number[]): string {
    if (freeCellsIndexes.length === 0) {
        throw INVALID_GRID_ERROR;
    }

    let encryptedText = '';
    let textIndex = 0;

    while (textIndex < text.length) {
        for (let i = 0; i < gridSize; ++i) {
            if (freeCellsIndexes.includes(i)) {
                encryptedText += text[textIndex];
                ++textIndex;
            } else {
                encryptedText += getRandomCharacter();
            }
        }
    }
    return encryptedText;
}

export function decrypt(text: string, gridSize: number, freeCellsIndexes: number[]): string {
    let decryptedText = '';

    if (freeCellsIndexes.length === 0) {
        throw INVALID_GRID_ERROR;
    }

    for (let i = 0; i < text.length; ++i) {
        if (freeCellsIndexes.includes(i % gridSize)) {
            decryptedText += text[i];
        }
    }

    return decryptedText;
}
