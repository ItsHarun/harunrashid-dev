import { useEffect, type ReactNode } from "react";
import { Link } from "wouter";
import "./hum-landing.css";

// Set once the app is live, e.g. "https://apps.apple.com/app/id0000000000". Until then the CTA reads "Coming soon".
const APP_STORE_URL: string | null = null;

const META_DESCRIPTION =
  "Hum: Couples is a private space for the two of you. Send a touch they feel instantly, draw together live, share sealed moments and know when they're on the way.";

function setMetaDescription(content: string): () => void {
  let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  const created = !tag;
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = "description";
    document.head.append(tag);
  }
  const previous = tag.content;
  tag.content = content;
  return () => (created ? tag!.remove() : (tag!.content = previous));
}

function AppStoreCta() {
  return APP_STORE_URL ? (
    <a className="hum-cta hum-cta--primary" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
      Download on the App Store
    </a>
  ) : (
    <span className="hum-cta hum-cta--primary" aria-disabled="true">
      Coming soon to the App Store
    </span>
  );
}

interface PhoneProps {
  src: string;
  alt: string;
  float?: { src: string; alt: string; variant: "banner" | "activity" };
}

function Phone({ src, alt, float }: PhoneProps) {
  return (
    <figure className="hum-phone">
      <img src={src} alt={alt} width={660} height={1434} loading="lazy" />
      {float && (
        <div className={`hum-float hum-float--${float.variant}`}>
          <img src={float.src} alt={float.alt} loading="lazy" />
        </div>
      )}
    </figure>
  );
}

interface FeatureProps {
  eyebrow: string;
  title: ReactNode;
  body: string;
  phone: PhoneProps;
  flip?: boolean;
}

function Feature({ eyebrow, title, body, phone, flip }: FeatureProps) {
  return (
    <section className={`hum-feature${flip ? " hum-feature--flip" : ""}`}>
      <div className="hum-feature-copy">
        <p className="hum-eyebrow">{eyebrow}</p>
        <h2 className="hum-display">{title}</h2>
        <p>{body}</p>
      </div>
      <Phone {...phone} />
    </section>
  );
}

export default function HumLanding() {
  useEffect(() => {
    document.title = "Hum: Couples — Feel close, all day";
    return setMetaDescription(META_DESCRIPTION);
  }, []);

  return (
    <div className="hum">
      <div className="hum-wrap">
        <header className="hum-nav">
          <Link href="/hum-couple" className="hum-brand" aria-label="Hum: Couples home">
            <img src="/hum/icon.jpg" alt="" width={36} height={36} />
            <span>Hum</span>
          </Link>
          <Link href="/hum-couple-support" className="hum-nav-link">Support</Link>
        </header>

        <main>
          <section className="hum-hero">
            <div>
              <p className="hum-eyebrow">Hum: Couples · for iPhone</p>
              <h1 className="hum-display">Feel close, <em>all day.</em></h1>
              <p className="hum-lede">
                A private space for the two of you. Send a touch they feel instantly, draw together live, and know
                when they're on the way home.
              </p>
              <div className="hum-cta-row">
                <AppStoreCta />
                <a className="hum-cta hum-cta--quiet" href="#privacy">How it stays private</a>
              </div>
            </div>
            <Phone
              src="/hum/touch.jpg"
              alt="Hum home screen as a touch arrives: hearts float around Maya and Leo, with buttons for Thinking, Kiss, Hug, Miss you, Hot and Funny."
              float={{ src: "/hum/banner.jpg", alt: "Notification banner: Leo is thinking of you, with a Send back button.", variant: "banner" }}
            />
          </section>

          <Feature
            eyebrow="Live canvas"
            title={<>Draw together, <em>live.</em></>}
            body="Every stroke appears on their screen as you draw it, from anywhere. Keep the drawing as a moment when you're done."
            phone={{ src: "/hum/draw.jpg", alt: "The Draw tab, with two overlapping hearts drawn by each partner." }}
          />
          <Feature
            flip
            eyebrow="Moments"
            title={<>Little notes, <em>sealed with love.</em></>}
            body="Share a photo, a note, a voice message or a doodle. It arrives sealed and waits until they're ready to open it."
            phone={{ src: "/hum/moments.jpg", alt: "The Moments tab: a note about dinner tonight and two sealed drawings from Leo." }}
          />
          <Feature
            eyebrow="Trips"
            title={<>Know they're <em>on the way.</em></>}
            body="Heading home? They see your arrival time live on their Lock Screen and in the Dynamic Island. Location is shared only for that trip."
            phone={{
              src: "/hum/journey.jpg",
              alt: "A map showing Leo's route home.",
              float: { src: "/hum/live-activity.jpg", alt: "Lock Screen Live Activity: Leo is on the way, 1 mile away.", variant: "activity" },
            }}
          />
          <Feature
            flip
            eyebrow="Status"
            title={<>See how they <em>really are.</em></>}
            body="Their energy, what would help right now and their local time, right on Home. No asking, and it never sends a notification."
            phone={{ src: "/hum/status.jpg", alt: "Hum home screen showing how Leo is: okay energy, all good, and his local time." }}
          />

          <section id="privacy" className="hum-section hum-privacy">
            <p className="hum-eyebrow">Privacy</p>
            <h2 className="hum-display">Just the <em>two of you.</em></h2>
            <ul className="hum-cards">
              <li className="hum-card">
                <h3>End-to-end encrypted</h3>
                <p>Touches, notes, photos, voice notes and drawings are encrypted on your phone. Only your partner can read them.</p>
              </li>
              <li className="hum-card">
                <h3>No read receipts</h3>
                <p>Receiving love never creates a debt. Hum never tells anyone when you've opened something.</p>
              </li>
              <li className="hum-card">
                <h3>No sign-up, no tracking</h3>
                <p>No email, phone number or password. No ads, no analytics, and nothing sold.</p>
              </li>
            </ul>
            <p style={{ marginTop: "var(--space-6)" }}>
              <Link href="/hum-couple-privacy-policy" className="hum-text-link">Read the privacy policy</Link>
            </p>
          </section>

          <section className="hum-closing">
            <h2 className="hum-display">Two phones, <em>one tap.</em></h2>
            <p>
              Hold your phones together to pair, or share a code from anywhere. Want to look around first? Try Hum with
              a demo partner. Requires iOS 26.1 or later.
            </p>
            <div className="hum-cta-row">
              <AppStoreCta />
            </div>
          </section>
        </main>

        <footer className="hum-footer">
          <span>© {new Date().getFullYear()} Harun Rashid</span>
          <nav aria-label="Hum links">
            <Link href="/hum-couple-support">Support</Link>
            <Link href="/hum-couple-privacy-policy">Privacy Policy</Link>
            <a href="mailto:hello@harunrashid.dev">Contact</a>
            <Link href="/">harunrashid.dev</Link>
          </nav>
        </footer>
      </div>
    </div>
  );
}
