/**
 * Logo Decorator.
 * Swaps the Umbraco logo for a festive version.
 */

const CHRISTMAS_LOGO_URL = "/App_Plugins/BackofficeThemes/santahatlogo.svg";

export class SantaHatDecorator {
    #originalSrc: string | null = null;
    #targetImg: HTMLImageElement | null = null;
    #observer: MutationObserver | null = null;
    #timer: ReturnType<typeof setTimeout> | null = null;
    #retries = 0;

    start() {
        this.#trySwap();
    }

    stop() {
        this.#restore();
        this.#observer?.disconnect();
        this.#observer = null;
        if (this.#timer) clearTimeout(this.#timer);
    }

    #trySwap() {
        const img = this.#findLogoImg();
        if (img) {
            this.#swap(img);
        } else if (this.#retries < 30) {
            this.#retries++;
            this.#timer = setTimeout(() => this.#trySwap(), 500);
        }
    }

    #findLogoImg(): HTMLImageElement | null {
        try {
            const app = document.querySelector("umb-app") as HTMLElement | null;
            if (!app?.shadowRoot) return null;

            let bo = app.shadowRoot.querySelector("umb-backoffice") as HTMLElement | null;
            if (!bo) {
                const rs = app.shadowRoot.querySelector("umb-router-slot") as HTMLElement | null;
                bo = rs?.shadowRoot?.querySelector("umb-backoffice") as HTMLElement | null;
            }
            if (!bo) bo = this.#deepQuery(app.shadowRoot, "umb-backoffice");
            if (!bo?.shadowRoot) return null;

            const hdr = bo.shadowRoot.querySelector("umb-backoffice-header") as HTMLElement | null;
            if (!hdr?.shadowRoot) return null;

            const logo = hdr.shadowRoot.querySelector("umb-backoffice-header-logo") as HTMLElement | null;
            if (!logo?.shadowRoot) return null;

            const appLogo = logo.shadowRoot.querySelector("umb-app-logo") as HTMLElement | null;
            if (!appLogo) return null;

            // umb-app-logo might have shadowRoot or not depending on createRenderRoot
            const img = appLogo.querySelector("img") || appLogo.shadowRoot?.querySelector("img");
            return img as HTMLImageElement | null;
        } catch {
            return null;
        }
    }

    #deepQuery(root: ShadowRoot, sel: string): HTMLElement | null {
        const d = root.querySelector(sel) as HTMLElement | null;
        if (d) return d;
        for (const el of Array.from(root.querySelectorAll("*"))) {
            if ((el as HTMLElement).shadowRoot) {
                const found = this.#deepQuery((el as HTMLElement).shadowRoot!, sel);
                if (found) return found;
            }
        }
        return null;
    }

    #swap(img: HTMLImageElement) {
        if (img.src.includes(CHRISTMAS_LOGO_URL)) return;

        this.#targetImg = img;
        this.#originalSrc = img.src;
        img.src = CHRISTMAS_LOGO_URL;

        // Re-apply if Umbraco's internal logic changes it back (e.g. on route change)
        this.#observer = new MutationObserver(() => {
            if (img.src !== CHRISTMAS_LOGO_URL && !img.src.includes(CHRISTMAS_LOGO_URL)) {
                img.src = CHRISTMAS_LOGO_URL;
            }
        });
        this.#observer.observe(img, { attributes: true, attributeFilter: ["src"] });
    }

    #restore() {
        if (this.#targetImg && this.#originalSrc) {
            this.#targetImg.src = this.#originalSrc;
        }
        this.#targetImg = null;
        this.#originalSrc = null;
    }
}

