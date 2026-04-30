// Shared chrome — dark luxe edition with extensive tweaks
const NAV = [
  { href: "index.html", label: "Home" },
  { href: "services.html", label: "Services" },
  { href: "about.html", label: "About" },
  { href: "gallery.html", label: "Gallery" },
  { href: "contact.html", label: "Contact" },
];

function Wordmark() {
  return (
    <a href="index.html" className="wordmark">
      <span className="monogram">M</span>
      <span>
        <span className="name">Man vs Man</span>
        <span className="sub">Barbers</span>
      </span>
    </a>
  );
}

function CalIcon() {
  return (
    <svg className="ico" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="2" y="3" width="12" height="11"/>
      <line x1="2" y1="6" x2="14" y2="6"/>
      <line x1="5" y1="2" x2="5" y2="4"/>
      <line x1="11" y1="2" x2="11" y2="4"/>
    </svg>
  );
}

function TopBar({ active }) {
  React.useEffect(() => {
    const onScroll = () => {
      const tb = document.querySelector('.topbar');
      if (!tb) return;
      tb.classList.toggle('shrunk', window.scrollY > 30);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className="topbar">
      <Wordmark />
      <nav className="center">
        {NAV.map(n => (
          <a key={n.href} href={n.href} className={active === n.href ? "active" : ""}>{n.label}</a>
        ))}
      </nav>
      <div className="right">
        <a href="#book" className="book-pill"><CalIcon /> Book Appointment</a>
      </div>
    </header>
  );
}

function Marquee() {
  const items = [
    "Est. 2018", "Private Suite — Nottingham", "By Appointment Only",
    "Booksy · 7-day window", "NG1 · Lace Market", "Tue–Sat · 09:30–19:00",
  ];
  const all = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((t, i) => (
          <React.Fragment key={i}>
            <span className={i % 3 === 1 ? "acc" : ""}>{t}</span>
            <span className="star">✦</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div className="foot-grid">
        <div>
          <div className="foot-wordmark">Man vs <em>Man</em></div>
          <div style={{ maxWidth: "32ch", lineHeight: 1.8, color: "var(--ink-soft)", fontSize: 11, letterSpacing: "0.04em" }}>
            A private barber suite in Nottingham's Lace Market. Sharp cuts, hot-towel shaves — by appointment only.
          </div>
          <form className="foot-news" onSubmit={e => { e.preventDefault(); alert("Subscribed."); }}>
            <input placeholder="Email — for the slow newsletter" />
            <button type="submit">Join</button>
          </form>
        </div>
        <div>
          <h4>Visit</h4>
          <ul>
            <li>22a Stoney Street</li>
            <li>Lace Market, NG1 1LP</li>
            <li>Nottingham, UK</li>
            <li style={{ marginTop: 12, color: "var(--accent)" }}>Tue–Sat · 09:30—19:00</li>
            <li>Closed Sun &amp; Mon</li>
          </ul>
        </div>
        <div>
          <h4>Reach</h4>
          <ul>
            <li><a href="tel:+441159000000">+44 115 900 0000</a></li>
            <li><a href="mailto:hello@manvsmanbarbers.com">hello@manvsmanbarbers.com</a></li>
            <li><a href="#">@manvsmanbarbers</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">Booksy</a></li>
          </ul>
        </div>
        <div>
          <h4>Index</h4>
          <ul>
            {NAV.map(n => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Man vs Man Barbers Ltd · Co. No. 12345678</span>
        <span>Site by the chair · No cookies, no popups</span>
      </div>
    </footer>
  );
}

const MVM_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "brass",
  "pairing": "serif-mono",
  "heroLayout": "full",
  "heroEyebrow": "Classic Style · Modern Precision",
  "heroTitle": "Premium Barber Experience",
  "heroSub": "Sharp cuts. Expert beard work. Hot-towel shaves. Elevate your look — elevate your confidence.",
  "primaryCta": "Book Appointment",
  "secondaryCta": "View Services",
  "showMarquee": true,
  "showServices": true,
  "showPillars": true,
  "showTestimonials": true,
  "showCtaBar": true,
  "showLabels": false,
  "density": "regular",
  "iconStyle": "circle",
  "cardBorder": "thin",
  "italicAccent": true,
  "uppercaseTitle": true,
  "goldStrength": 100
}/*EDITMODE-END*/;

function MvmTweaks() {
  const [tweaks, setTweak] = window.useTweaks(MVM_TWEAK_DEFAULTS);
  React.useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-accent", tweaks.accent);
    root.setAttribute("data-pairing", tweaks.pairing);
    root.setAttribute("data-density", tweaks.density);
    root.setAttribute("data-icon-style", tweaks.iconStyle);
    root.setAttribute("data-card-border", tweaks.cardBorder);
    root.setAttribute("data-hero-layout", tweaks.heroLayout);
    document.body.classList.toggle("hide-labels", !tweaks.showLabels);
    document.body.classList.toggle("no-italic", !tweaks.italicAccent);
    document.body.classList.toggle("no-upper-title", !tweaks.uppercaseTitle);
    root.style.setProperty("--gold-strength", tweaks.goldStrength + "%");
  }, [tweaks]);

  // expose tweaks for components to read
  window.__mvmTweaks = tweaks;
  React.useEffect(() => {
    window.dispatchEvent(new CustomEvent("mvm-tweaks", { detail: tweaks }));
  }, [tweaks]);

  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle, TweakSlider, TweakText, TweakSelect } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Hero copy">
        <TweakText label="Eyebrow" value={tweaks.heroEyebrow} onChange={v => setTweak("heroEyebrow", v)} />
        <TweakText label="Title" value={tweaks.heroTitle} onChange={v => setTweak("heroTitle", v)} />
        <TweakText label="Subtitle" value={tweaks.heroSub} onChange={v => setTweak("heroSub", v)} />
        <TweakText label="Primary CTA" value={tweaks.primaryCta} onChange={v => setTweak("primaryCta", v)} />
        <TweakText label="Secondary CTA" value={tweaks.secondaryCta} onChange={v => setTweak("secondaryCta", v)} />
      </TweakSection>
      <TweakSection title="Hero layout">
        <TweakRadio
          value={tweaks.heroLayout}
          onChange={v => setTweak("heroLayout", v)}
          options={[
            { value: "full", label: "Full bleed" },
            { value: "split", label: "Split" },
            { value: "centered", label: "Centered" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Accent metal">
        <TweakRadio
          value={tweaks.accent}
          onChange={v => setTweak("accent", v)}
          options={[
            { value: "brass", label: "Brass" },
            { value: "champagne", label: "Champagne" },
            { value: "rose", label: "Rose" },
            { value: "silver", label: "Silver" },
          ]}
        />
        <TweakSlider label="Gold strength" value={tweaks.goldStrength} min={50} max={140} step={5} onChange={v => setTweak("goldStrength", v)} />
      </TweakSection>
      <TweakSection title="Type pairing">
        <TweakSelect
          value={tweaks.pairing}
          onChange={v => setTweak("pairing", v)}
          options={[
            { value: "serif-mono", label: "Serif + Mono (default)" },
            { value: "all-serif", label: "All serif" },
            { value: "grotesk-display", label: "Grotesk caps display" },
          ]}
        />
        <TweakToggle value={tweaks.uppercaseTitle} onChange={v => setTweak("uppercaseTitle", v)} label="Uppercase hero title" />
        <TweakToggle value={tweaks.italicAccent} onChange={v => setTweak("italicAccent", v)} label="Italic gold accent word" />
      </TweakSection>
      <TweakSection title="Density">
        <TweakRadio
          value={tweaks.density}
          onChange={v => setTweak("density", v)}
          options={[
            { value: "compact", label: "Compact" },
            { value: "regular", label: "Regular" },
            { value: "airy", label: "Airy" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Cards & icons">
        <TweakRadio
          value={tweaks.cardBorder}
          onChange={v => setTweak("cardBorder", v)}
          options={[
            { value: "thin", label: "Thin" },
            { value: "double", label: "Double" },
            { value: "none", label: "None" },
          ]}
        />
        <TweakRadio
          value={tweaks.iconStyle}
          onChange={v => setTweak("iconStyle", v)}
          options={[
            { value: "circle", label: "Circle" },
            { value: "square", label: "Square" },
            { value: "bare", label: "Bare" },
          ]}
        />
      </TweakSection>
      <TweakSection title="Sections (home)">
        <TweakToggle value={tweaks.showMarquee} onChange={v => setTweak("showMarquee", v)} label="Top marquee strip" />
        <TweakToggle value={tweaks.showServices} onChange={v => setTweak("showServices", v)} label="Services row" />
        <TweakToggle value={tweaks.showPillars} onChange={v => setTweak("showPillars", v)} label="Pillars strip" />
        <TweakToggle value={tweaks.showTestimonials} onChange={v => setTweak("showTestimonials", v)} label="Testimonials" />
        <TweakToggle value={tweaks.showCtaBar} onChange={v => setTweak("showCtaBar", v)} label="Bottom CTA bar" />
      </TweakSection>
      <TweakSection title="Misc">
        <TweakToggle value={tweaks.showLabels} onChange={v => setTweak("showLabels", v)} label="Image placeholder labels" />
      </TweakSection>
    </TweaksPanel>
  );
}

// Hook: subscribe to live tweak updates from MvmTweaks
function useMvmTweaks() {
  const [t, setT] = React.useState(() => window.__mvmTweaks || MVM_TWEAK_DEFAULTS);
  React.useEffect(() => {
    const handler = (e) => setT(e.detail);
    window.addEventListener("mvm-tweaks", handler);
    if (window.__mvmTweaks) setT(window.__mvmTweaks);
    return () => window.removeEventListener("mvm-tweaks", handler);
  }, []);
  return t;
}

Object.assign(window, { TopBar, Marquee, Footer, MvmTweaks, NAV, Wordmark, CalIcon, useMvmTweaks, MVM_TWEAK_DEFAULTS });
