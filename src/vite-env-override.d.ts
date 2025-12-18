declare module '*.svg' {
  import React from 'react';
  const content: React.FC<React.SVGProps<SVGElement>>;
  export default content;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}
