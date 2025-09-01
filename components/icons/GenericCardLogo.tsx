import React from 'react';

const GenericCardLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400" {...props}>
    <path d="M21.75 6.75a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6.75v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75z"></path>
    <path fill="#FFF" d="M2.25 9h19.5v1.5H2.25V9z"></path>
  </svg>
);

export default GenericCardLogo;
