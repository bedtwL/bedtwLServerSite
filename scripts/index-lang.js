   /// REPEATED ON MAIN.JS, R4Q8 TOO DUMB by bedtwL
/*
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
        }*/
        window.currentLang = localStorage.getItem('preferredLang') || 'en';

        function toggleLanguage() {
            // Reference it via window to be 100% safe
            window.currentLang = (window.currentLang === 'en') ? 'zh' : 'en';
            localStorage.setItem('preferredLang', window.currentLang);

            const langBtn = document.getElementById('langBtn');
            if (langBtn) {
                langBtn.textContent = (window.currentLang === 'en') ? "EN / 繁中" : "繁中 / EN";
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
        /// FUCK WHO ADD THIS ERROR CODE
        /*
        document.getElementById('hamburgerMenu').addEventListener('click', function() {
                this.classList.toggle('active');
                document.getElementById('mobileNav').classList.toggle('active');
                });*/