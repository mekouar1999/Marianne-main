import { useEffect, useState } from "react";

/**
 * Renders an email address assembled purely in the browser.
 * The full address never appears in server-rendered HTML, preventing
 * simple scraper bots from harvesting it.
 *
 * Props:
 *   user        – the part before @
 *   domain      – the part between @ and the last dot
 *   tld         – the TLD (default "fr")
 *   asLink      – render as <a href="mailto:…"> (default true)
 *   label       – custom display text; falls back to the assembled email
 *   className   – applied to the wrapping element
 */
export default function ObfuscatedEmail({
  user,
  domain,
  tld = "fr",
  asLink = true,
  label,
  className = "",
}) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Assembled only in the browser — never part of the static HTML payload
    setEmail(`${user}\u0040${domain}.${tld}`);
  }, [user, domain, tld]);

  if (!email) {
    // Placeholder while JS hydrates — keeps layout stable
    return <span className={className} aria-hidden="true">…</span>;
  }

  const text = label || email;

  if (!asLink) {
    return <span className={className}>{text}</span>;
  }

  return (
    <a href={`mailto:${email}`} className={className}>
      {text}
    </a>
  );
}
