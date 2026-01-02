function generateRichelieuGrid(height: number, width: number, onGridChange: () => void): HTMLTableElement {
    const table: HTMLTableElement = document.createElement("table");
    table.id = "richelieuGridTable";
    table.classList.add("table", "w-8", "mt-3");
    for (let i = 0; i < height; ++i) {
        const tr: HTMLTableRowElement = table.insertRow();
        for (let j = 0; j < width; ++j) {
            const td: HTMLTableCellElement = tr.insertCell();
            const input: HTMLInputElement = document.createElement("input");
            input.name = "richelieuGrid";
            input.type = "checkbox";
            input.checked = true;
            input.classList.add("checkbox", "w-9", "h-9", "-m-3");
            td.appendChild(input);
        }
    }
    table.addEventListener("change", onGridChange);
    return table;
}

function getGridSize(): { height: number; width: number } {
    const cipherForm: HTMLFormElement = document.forms.namedItem("cipherForm")!;
    const formData = new FormData(cipherForm);

    const size: unknown[] = formData.getAll("richelieuGridSize");
    const height = Number(size[0]);
    const width = Number(size[1]);
    return { height, width };
}

function gridSizeChangeListener(onGridChange: () => void): void {
    const richelieuInfo: HTMLElement = document.getElementById("richelieuInfo")!;
    const { height, width } = getGridSize();
    const table: HTMLTableElement = generateRichelieuGrid(height, width, onGridChange);

    document.getElementById("richelieuGridTable")?.remove();
    richelieuInfo.appendChild(table);
    onGridChange();
}

export default function setupRichelieuGrid(): void {
    const widthInput: HTMLElement = document.getElementById("richelieuGridSizeWidth")!;
    const heightInput: HTMLElement = document.getElementById("richelieuGridSizeHeight")!;
    const sourceTextArea = document.getElementById("sourceText")! as HTMLTextAreaElement;

    const handleGridChange = (): void => {
        sourceTextArea.dispatchEvent(new Event("input"));
    };

    widthInput.onchange = (): void => {
        gridSizeChangeListener(handleGridChange);
    };
    heightInput.onchange = (): void => {
        gridSizeChangeListener(handleGridChange);
    };
    gridSizeChangeListener(handleGridChange);
}
