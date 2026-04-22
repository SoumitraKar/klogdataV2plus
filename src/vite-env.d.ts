/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.PNG" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}