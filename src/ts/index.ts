import setupTheming from './common_setups/theming_setup.ts';
import setupCipherMethodCheckbox from './common_setups/cipher_method_checkbox_setup.ts';
import setupTextareas from './common_setups/textareas_setup.ts';
import setupRichelieuGrid from './richelieu/grid_setup.ts';

window.addEventListener('DOMContentLoaded', () => {
    setupTheming();
    setupCipherMethodCheckbox();
    setupTextareas();
    setupRichelieuGrid();
});
