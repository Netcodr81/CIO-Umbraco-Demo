const e = "/App_Plugins/BackofficeThemes", s = [
  {
    type: "theme",
    alias: "umb-christmas-theme",
    name: "Christmas 🎄",
    css: `${e}/christmas.theme.css`,
    weight: 195
  },
  {
    type: "backofficeEntryPoint",
    alias: "ChristmasTheme.Effects.EntryPoint",
    name: "Christmas Effects",
    js: () => import("./effects.entrypoint-C7K7z-8f.js")
  },
  { type: "theme", alias: "umb-theme-neon", name: "Neon", css: `${e}/neon.theme.css`, weight: 190 },
  {
    type: "theme",
    alias: "umb-theme-cyberpunk",
    name: "Cyberpunk",
    css: `${e}/cyberpunk.theme.css`,
    weight: 189
  },
  { type: "theme", alias: "umb-theme-dracula", name: "Dracula", css: `${e}/dracula.theme.css`, weight: 186 },
  { type: "theme", alias: "umb-theme-monokai", name: "Monokai", css: `${e}/monokai.theme.css`, weight: 184 },
  {
    type: "theme",
    alias: "umb-theme-vs-blue",
    name: "VS Blue (Light)",
    css: `${e}/vs-blue.theme.css`,
    weight: 183
  },
  {
    type: "theme",
    alias: "umb-theme-cool-breeze",
    name: "VS Cool Breeze",
    css: `${e}/cool-breeze.theme.css`,
    weight: 181
  },
  {
    type: "theme",
    alias: "umb-theme-icy-mint",
    name: "VS Icy Mint",
    css: `${e}/icy-mint.theme.css`,
    weight: 180
  },
  {
    type: "theme",
    alias: "umb-state-of-nebraska",
    name: "State of Nebraska",
    css: `${e}/state-of-nebraska.theme.css`,
    weight: 179
  }
];
export {
  s as manifests
};
//# sourceMappingURL=umbraco-extension.js.map
