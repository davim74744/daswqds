import React from 'react';

const AmexLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" {...props}>
    <path fill="#006FCF" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
    <path fill="#FFF" d="M10.9 14.1H8.6l-.4 1.4H6l3.3-8.8h2.2l3.3 8.8h-2.3zm-1.6-1.3h2.4l-1.2-4-1.2 4zm11.7.1h-4.3l-1.1 1.2h2.5l-.9 2.5h-5.1l3.3-8.8h2.2l3.4 8.8h-2.3l-.7-2.7zm-2-1.3l.9-2.7-.9-2.7-1.6 5.4h1.6zm8.8 2.5h-2.1l3.3-8.8h2.2l-4.7 12.5h-2.4l-1.1-3.7h4.8v-2.5h-5.2z"></path>
  </svg>
);

export default AmexLogo;
