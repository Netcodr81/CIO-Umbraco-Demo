/**
 * Theme bundle: popular VS/editor themes + Christmas (theme + effects).
 * Deploy dist/ and public/* to App_Plugins/ThemeBundle/.
 */
const pluginPath = "/App_Plugins/BackofficeThemes";

export const manifests = [
  {
    type: "theme",
    alias: "umb-christmas-theme",
    name: "Christmas 🎄",
    css: `${pluginPath}/christmas.theme.css`,
    weight: 195,
  },
  {
    type: "backofficeEntryPoint",
    alias: "ChristmasTheme.Effects.EntryPoint",
    name: "Christmas Effects",
    js: () => import("./christmas/effects.entrypoint"),
  },
  { type: "theme", alias: "umb-theme-neon", name: "Neon", css: `${pluginPath}/neon.theme.css`, weight: 190 },
  {
    type: "theme",
    alias: "umb-theme-cyberpunk",
    name: "Cyberpunk",
    css: `${pluginPath}/cyberpunk.theme.css`,
    weight: 189,
  },
  { type: "theme", alias: "umb-theme-dracula", name: "Dracula", css: `${pluginPath}/dracula.theme.css`, weight: 186 },
  { type: "theme", alias: "umb-theme-monokai", name: "Monokai", css: `${pluginPath}/monokai.theme.css`, weight: 184 },
  {
    type: "theme",
    alias: "umb-theme-vs-blue",
    name: "VS Blue (Light)",
    css: `${pluginPath}/vs-blue.theme.css`,
    weight: 183,
  },
  {
    type: "theme",
    alias: "umb-theme-cool-breeze",
    name: "VS Cool Breeze",
    css: `${pluginPath}/cool-breeze.theme.css`,
    weight: 181,
  },
  {
    type: "theme",
    alias: "umb-theme-icy-mint",
    name: "VS Icy Mint",
    css: `${pluginPath}/icy-mint.theme.css`,
    weight: 180,
  },
  {
    type: "theme",
    alias: "umb-state-of-nebraska",
    name: "State of Nebraska",
    css: `${pluginPath}/state-of-nebraska.theme.css`,
    weight: 179,
  },
];
