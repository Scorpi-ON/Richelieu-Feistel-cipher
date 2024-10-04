type ColorScheme = 'light' | 'dark';

const COLOR_SCHEME_CAPTIONS = {
    light: '☀️',
    dark: '🌑',
};

const COLOR_SCHEME_MEDIA: MediaQueryList =
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

export default function setupTheming(): void {
    const themeSwitchButton: HTMLElement = document.getElementById('switchThemeButton')!;

    const switchToColorScheme = (scheme: ColorScheme): void => {
        themeSwitchButton.innerText =
            scheme === 'dark' ? COLOR_SCHEME_CAPTIONS.light : COLOR_SCHEME_CAPTIONS.dark;
        document.body.setAttribute('data-theme', scheme);
    };

    if (COLOR_SCHEME_MEDIA.matches) {
        switchToColorScheme('dark');
    }

    COLOR_SCHEME_MEDIA.onchange = (event: MediaQueryListEvent): void => {
        const newColorScheme: ColorScheme = event.matches ? 'dark' : 'light';
        switchToColorScheme(newColorScheme);
    };

    themeSwitchButton.onclick = (): void => {
        const newColorScheme: ColorScheme =
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        switchToColorScheme(newColorScheme);
    };
}
