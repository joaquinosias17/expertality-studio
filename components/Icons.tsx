type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "square" as const };
export const Check = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7" {...base} strokeWidth={2} /></svg>);
export const Arrow = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" {...base} /></svg>);
export const Flag = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M5 21V4h12l-2.5 4.5L17 13H5" {...base} /></svg>);
export const Play = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M7 4.5l12 7.5-12 7.5z" fill="currentColor" /></svg>);
export const Plus = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M12 5v14M5 12h14" {...base} /></svg>);
export const Doc = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6" {...base} /></svg>);
export const Music = ({ className }: P) => (<svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M9 18V6l10-2v12" {...base} /><circle cx="6.5" cy="18" r="2.5" {...base} /><circle cx="16.5" cy="16" r="2.5" {...base} /></svg>);
