function generateRichelieuGrid(height: number, width: number): HTMLTableElement {
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

function gridSizeChangeListener(): void {
    const richelieuInfo: HTMLElement = document.getElementById("richelieuInfo")!;
    const { height, width } = getGridSize();
    const table: HTMLTableElement = generateRichelieuGrid(height, width);

    document.getElementById("richelieuGridTable")?.remove();
    richelieuInfo.appendChild(table);
}

export default function setupRichelieuGrid(): void {
    const widthInput: HTMLElement = document.getElementById("richelieuGridSizeWidth")!;
    const heightInput: HTMLElement = document.getElementById("richelieuGridSizeHeight")!;

    widthInput.onchange = gridSizeChangeListener;
    heightInput.onchange = gridSizeChangeListener;
    gridSizeChangeListener();
}
