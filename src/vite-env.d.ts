interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg?react" {
  import React from "react";
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module "*.svg" {
  const content: string;
  export default content;
}
