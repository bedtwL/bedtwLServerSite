document.getElementById('hamburgerMenu').addEventListener('click', function() {
        this.classList.toggle('active');
        document.getElementById('mobileNav').classList.toggle('active');
        });

        let currentLang = 'en';

        function updateThemeButtonText() {
            const themeBtn = document.getElementById('themeBtn');
            const isLight = document.body.classList.contains('light-mode');
            const mode = isLight ? 'light' : 'dark';

            const newText = themeBtn.getAttribute(`data-${currentLang}-${mode}`);
            if (newText) {
                themeBtn.innerText = newText;
            }
        }

        function toggleTheme() {
            const body = document.body;
            body.classList.toggle('light-mode');
            updateThemeButtonText();
        }
        let currentLang = 'en';

        function toggleLanguage() {
        currentLang = (currentLang === 'en') ? 'zh' : 'en';
        const langBtn = document.getElementById('langBtn');
        if (langBtn) {
            langBtn.textContent = (currentLang === 'en') ? "EN / 繁中" : "繁中 / EN";
        }

        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            const enText = el.getAttribute('data-en');
            const zhText = el.getAttribute('data-zh');

            // Fallback: Use eng if lang missing
            const newText = (currentLang === 'zh') ? (zhText || enText) : enText;

            // Use innerHTML only if tags are present, otherwise textContent is safer/faster
            if (newText.includes('<')) {
                el.innerHTML = newText;
            } else {
                el.textContent = newText;
            }
        });
        updateThemeButtonText();
        }