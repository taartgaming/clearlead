/* lang.js
   Simple client-side language switcher.
   - Translations stored in the `translations` object.
   - Reads/writes `localStorage` key `lang`.
   - Applies translations to elements with `data-i18n` attribute.
   - Sets <html lang> and <html dir>.
   English is the primary/default language. Supported languages are whitelisted to avoid unexpected values.
*/

const translations = {
    en: {
        title: "Document",
        heading: "Welcome",
        welcome: "Welcome to the site.",
        button: "Click me",
        tagline: "Helping companies find innovative solutions.",
        footer_copyright: "© 2025 Your Company. All rights reserved.",
        nav_home: "Home",
        nav_about: "About",
        nav_portfolio: "Portfolio",
        nav_reserve: "Reserve",
        nav_contact: "Contact",
        nav_terms: "Terms",
        about_heading: "About Us",
    about_intro: "We help companies find innovative solutions. This page will list experiences and CVs when available.",
    cv_section: "Experiences & CVs",
    contact_heading: "Contact",
    contact_intro: "You can reach us via the following channels. For reservations use the reservation form.",
    contact_email_label: "Email:",
    contact_phone_label: "Phone:",
    contact_address_label: "Address:",
    reserve_title: "Reserve",
    reserve_heading: "Reserve / Request a callback",
    reserve_instructions: "Terugbel afspraak: leave a voicemail with instructions to visit our website. Voorkeurstijden worden afgestemd. Admin zal voorsteltijden en locatie (Doppio) voorstellen.",
    form_name: "Name",
    form_contact: "Phone or Email",
    form_prefs: "Preferred times (voorkeurstijden)",
    form_voicemail: "Voicemail with instructions to the website",
    form_admin: "Let admin propose times and location (Doppio)",
    form_submit: "Submit reservation",
    reserve_error_required: "Please provide name and contact.",
    reserve_success: "Reservation received — the admin will propose times and location (Doppio).",
    terms_title: "Terms",
    terms_heading: "Terms & Conditions",
    terms_intro: "Below are the standard terms and conditions. Replace with the final legal text when available.",
    terms_section_booking: "Booking & Reservations",
    terms_booking: "Reservations are made via our reservation form. Preference times are arranged between client and admin. Admin will propose times and location (Doppio).",
    terms_section_cancellation: "Cancellation",
    terms_cancellation: "Cancellations should be made at least 24 hours in advance. Specifics to be filled by the company.",
    portfolio_title: "Portfolio",
    portfolio_heading: "Portfolio",
    portfolio_intro: "Projects are displayed below. Click a card to learn more.",
    project_title_1: "Project 1",
    project_desc_1: "Short description — to be added.",
    project_title_2: "Project 2",
    project_desc_2: "Short description — to be added.",
    project_title_3: "Project 3",
    project_desc_3: "Short description — to be added.",
    learn_more: "Learn more",
    dir: "ltr"
    },
    nl: {
        title: "Document",
        heading: "Welkom",
        welcome: "Welkom op de site.",
        button: "Klik mij",
        tagline: "We helpen bedrijven innovatieve oplossingen te vinden.",
        footer_copyright: "© 2025 Uw Bedrijf. Alle rechten voorbehouden.",
        nav_home: "Home",
        nav_about: "Over",
        nav_portfolio: "Portfolio",
        nav_reserve: "Reserveren",
        nav_contact: "Contact",
        nav_terms: "Algemene voorwaarden",
        about_heading: "Over ons",
    about_intro: "We helpen bedrijven innovatieve oplossingen te vinden. Deze pagina zal ervaringen en CV's bevatten zodra beschikbaar.",
    cv_section: "Ervaringen & CV's",
    contact_heading: "Contact",
    contact_intro: "U kunt ons bereiken via de volgende kanalen. Voor reserveringen, gebruik het reserveringsformulier.",
    contact_email_label: "E-mail:",
    contact_phone_label: "Telefoon:",
    contact_address_label: "Adres:",
    reserve_title: "Reserveren",
    reserve_heading: "Reserveren / Terugbellen",
    reserve_instructions: "Terugbel afspraak: laat een voicemail achter met instructies om onze website te bezoeken. Voorkeurstijden worden afgestemd. Admin zal voorsteltijden en locatie (Doppio) voorstellen.",
    form_name: "Naam",
    form_contact: "Telefoon of E-mail",
    form_prefs: "Voorkeurstijden",
    form_voicemail: "Voicemail met instructies naar de website",
    form_admin: "Laat admin tijden en locatie (Doppio) voorstellen",
    form_submit: "Verstuur reservering",
    reserve_error_required: "Vul alstublieft naam en contact in.",
    reserve_success: "Reservering ontvangen — de admin zal tijden en locatie (Doppio) voorstellen.",
    terms_title: "Algemene voorwaarden",
    terms_heading: "Algemene voorwaarden",
    terms_intro: "Hieronder staan de standaard algemene voorwaarden. Vervang door definitieve juridische tekst wanneer beschikbaar.",
    terms_section_booking: "Boekingen & Reserveringen",
    terms_booking: "Reserveringen worden gemaakt via ons reserveringsformulier. Voorkeurstijden worden afgestemd tussen klant en admin. Admin zal voorsteltijden en locatie (Doppio) voorstellen.",
    terms_section_cancellation: "Annulering",
    terms_cancellation: "Annuleringen dienen minimaal 24 uur van tevoren te gebeuren. Details worden door het bedrijf ingevuld.",
    portfolio_title: "Portfolio",
    portfolio_heading: "Portfolio",
    portfolio_intro: "Projecten worden hieronder weergegeven. Klik op een kaart om meer te weten te komen.",
    project_title_1: "Project 1",
    project_desc_1: "Korte beschrijving — nog toe te voegen.",
    project_title_2: "Project 2",
    project_desc_2: "Korte beschrijving — nog toe te voegen.",
    project_title_3: "Project 3",
    project_desc_3: "Korte beschrijving — nog toe te voegen.",
    learn_more: "Lees meer",
    dir: "ltr"
    }
};

// Primary/default language
const DEFAULT_LANG = 'en';
// Whitelist of supported languages (order: primary first)
const SUPPORTED_LANGS = ['en', 'nl'];

function applyTranslations(lang){
    const dict = translations[lang] || translations[DEFAULT_LANG];
    // document title
    if(dict.title) document.title = dict.title;
    // html attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = dict.dir || 'ltr';

    // text content for data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = dict[key];
        if(typeof value === 'undefined') return;

        // set placeholder for inputs/textarea, otherwise set textContent
        const tag = el.tagName.toLowerCase();
        if((tag === 'input' || tag === 'textarea') && el.hasAttribute('placeholder')){
            el.placeholder = value;
        } else {
            el.textContent = value;
        }
    });

    // Update nav links text if present
    document.querySelectorAll('.nav-link[data-i18n]').forEach(a => {
        const key = a.getAttribute('data-i18n');
        if(dict[key]) a.textContent = dict[key];
    });

    // persist
    try{ localStorage.setItem('lang', lang); } catch(e) { /* ignore */ }

    // keep selector in sync
    const sel = document.getElementById('lang-select');
    if(sel && sel.value !== lang) sel.value = lang;
}

function determineInitialLang(){
    // saved preference (only accept supported langs)
    try{
        const saved = localStorage.getItem('lang');
        if(saved && SUPPORTED_LANGS.includes(saved)) return saved;
    }catch(e){ /* ignore */ }

    // browser preference (only if supported)
    const nav = (navigator.language || navigator.userLanguage || DEFAULT_LANG).split('-')[0];
    if(SUPPORTED_LANGS.includes(nav)) return nav;

    // fallback to default (English)
    return DEFAULT_LANG;
}

document.addEventListener('DOMContentLoaded', () => {
    const initial = determineInitialLang();

    applyTranslations(initial);

    // Wire up flag buttons if present
    function updateActiveButton(lang){
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if(btn.getAttribute('data-lang') === lang) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    }

    updateActiveButton(initial);

    const buttons = Array.from(document.querySelectorAll('.lang-btn'));
    if(buttons.length){
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const v = btn.getAttribute('data-lang');
                if(SUPPORTED_LANGS.includes(v)){
                    applyTranslations(v);
                    updateActiveButton(v);
                }
            });
        });
    }

    // Navigation toggle (hamburger)
    const toggles = Array.from(document.querySelectorAll('.nav-toggle'));
    toggles.forEach(toggle => {
        const menuId = toggle.getAttribute('aria-controls');
        const menu = document.getElementById(menuId);
        if(!menu) return;
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(!expanded));
            // Use attribute rather than property for CSS selectors
            if(expanded){
                menu.hidden = true;
                menu.classList.remove('open');
            } else {
                menu.hidden = false;
                menu.classList.add('open');
            }
        });
    });

    // Keep old select as fallback if present (progressive enhancement)
    const select = document.getElementById('lang-select');
    if(select){
        select.value = initial;
        select.addEventListener('change', (e) => {
            const v = e.target.value;
            if(SUPPORTED_LANGS.includes(v)){
                applyTranslations(v);
                updateActiveButton(v);
            }
        });
    }

    // small demo: use translated button label for an alert
    const action = document.getElementById('action');
    if(action){
        action.addEventListener('click', () => {
            const lang = document.documentElement.lang || DEFAULT_LANG;
            const msg = translations[lang]?.button || 'Clicked';
            alert(msg);
        });
    }

    // Reservation form handling (client-side storage)
    const reserveForm = document.getElementById('reserve-form');
    if(reserveForm){
        reserveForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(reserveForm);
            const entry = {
                id: Date.now(),
                name: formData.get('name') || '',
                contact: formData.get('contact') || '',
                prefs: formData.get('prefs') || '',
                voicemail: !!formData.get('voicemail'),
                admin_propose: !!formData.get('admin_propose'),
                createdAt: new Date().toISOString()
            };

            // Basic validation
            if(!entry.name || !entry.contact){
                const result = document.getElementById('reserve-result');
                if(result) result.textContent = translations[document.documentElement.lang]?.reserve_error_required || 'Please provide name and contact.';
                return;
            }

            try{
                const raw = localStorage.getItem('reservations');
                const arr = raw ? JSON.parse(raw) : [];
                arr.push(entry);
                localStorage.setItem('reservations', JSON.stringify(arr));
            }catch(err){ /* ignore storage errors */ }

            const result = document.getElementById('reserve-result');
            if(result){
                result.textContent = translations[document.documentElement.lang]?.reserve_success || 'Reservation received — the admin will propose times and location (Doppio).';
                reserveForm.reset();
            }
        });
    }
});
