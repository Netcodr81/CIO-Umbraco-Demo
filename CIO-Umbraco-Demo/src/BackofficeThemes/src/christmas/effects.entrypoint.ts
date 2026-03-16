/**
 * Christmas Effects Entry Point.
 *
 * Orchestrates snow, Santa hat, and Christmas lights.
 * Listens to UMB_THEME_CONTEXT so effects only run when the Christmas theme is active.
 */

import type {
    UmbEntryPointOnInit,
    UmbEntryPointOnUnload,
} from "@umbraco-cms/backoffice/extension-api";
import { UMB_THEME_CONTEXT } from "@umbraco-cms/backoffice/themes";

import { SnowRenderer } from "./effects/snow-renderer";
import { SnowAccumulation } from "./effects/snow-accumulation";
import { SantaHatDecorator } from "./effects/santa-hat-decorator";
import { ChristmasLightsRenderer } from "./effects/christmas-lights";
import { ShadowSnowStyles } from "./effects/shadow-snow-styles";
import { ChristmasTree } from "./effects/christmas-tree";
import { WorkspaceHeaderBalls } from "./effects/workspace-header-balls";

const CHRISTMAS_ALIAS = "umb-christmas-theme";

let snow: SnowRenderer | null = null;
let accumulation: SnowAccumulation | null = null;
let snowOverlay: HTMLDivElement | null = null;
let hat: SantaHatDecorator | null = null;
let lights: ChristmasLightsRenderer | null = null;
let shadowSnow: ShadowSnowStyles | null = null;
let tree: ChristmasTree | null = null;
let workspaceBalls: WorkspaceHeaderBalls | null = null;
let active = false;
let subscription: { unsubscribe(): void } | null = null;

function startAll() {
    if (active) return;
    active = true;
    console.log("[ChristmasTheme] 🎄 Ho ho ho! Starting Christmas effects!");

    snowOverlay = document.createElement("div");
    Object.assign(snowOverlay.style, {
        position: "fixed",
        inset: "0",
        pointerEvents: "none",
        zIndex: "2147483646",
    });
    document.body.appendChild(snowOverlay);

    accumulation = new SnowAccumulation();
    accumulation.start(snowOverlay);

    snow = new SnowRenderer();
    snow.start(undefined, snowOverlay);

    hat = new SantaHatDecorator();
    hat.start();

    lights = new ChristmasLightsRenderer();
    lights.start();

    shadowSnow = new ShadowSnowStyles();
    shadowSnow.start();

    tree = new ChristmasTree();
    tree.start();

    workspaceBalls = new WorkspaceHeaderBalls();
    workspaceBalls.start();
}

function stopAll() {
    if (!active) return;
    active = false;
    console.log("[ChristmasTheme] Stopping Christmas effects");

    snow?.stop();
    snow = null;
    accumulation?.stop();
    accumulation = null;
    snowOverlay?.remove();
    snowOverlay = null;
    hat?.stop();
    hat = null;
    lights?.stop();
    lights = null;
    shadowSnow?.stop();
    shadowSnow = null;
    tree?.stop();
    tree = null;
    workspaceBalls?.stop();
    workspaceBalls = null;
}

function onThemeChange(alias: string | undefined) {
    if (alias === CHRISTMAS_ALIAS) {
        startAll();
    } else {
        stopAll();
    }
}

export const onInit: UmbEntryPointOnInit = (host) => {
    host.getContext(UMB_THEME_CONTEXT).then((ctx) => {
        if (!ctx) return;
        subscription = ctx.theme.subscribe((alias) => {
            onThemeChange(alias);
        });
    });
};

export const onUnload: UmbEntryPointOnUnload = () => {
    subscription?.unsubscribe();
    subscription = null;
    stopAll();
};
