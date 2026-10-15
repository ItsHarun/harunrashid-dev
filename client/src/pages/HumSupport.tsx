import { useEffect } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";

const CONTACT_EMAIL = "hello@harunrashid.dev";

export default function HumSupport() {
  useEffect(() => {
    document.title = "Hum: Couples — Support";
  }, []);

  return (
    <Layout>
      <div className="space-y-12 md:space-y-16">
        <div className="space-y-4 animate-in-up">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Hum: Couples — Support</h1>
          <p className="text-muted-foreground max-w-lg">
            Help with pairing, touches, moments and trips. Can't find an answer? Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=Hum%20support`} className="underline underline-offset-4 decoration-1 hover:text-foreground transition-colors">
              {CONTACT_EMAIL}
            </a>.
          </p>
        </div>

        <article className="prose prose-neutral dark:prose-invert prose-lg max-w-2xl leading-relaxed prose-headings:font-light prose-headings:tracking-tight prose-a:underline-offset-4 animate-in-up">
          <h2>Contact</h2>
          <p>
            Email <a href={`mailto:${CONTACT_EMAIL}?subject=Hum%20support`}>{CONTACT_EMAIL}</a> with your iPhone
            model, your iOS version and what happened. I read every message. Please don't send photos, notes or other
            private content from the app. They're not needed to help you.
          </p>

          <h2>Getting started</h2>
          <h3>What do I need?</h3>
          <p>
            An iPhone running iOS 26.1 or later, for each of you. Hum connects exactly two people, and both of you
            need the app.
          </p>

          <h3>How do we pair?</h3>
          <p>Open Hum on both phones and enter your name. On the "Connect with your person" screen, choose one way:</p>
          <ul>
            <li><strong>Hold your phones together</strong>: when you're side by side. Both phones need to be on this screen, with Wi-Fi and Bluetooth on. Allow Hum to find devices on your local network when asked.</li>
            <li><strong>Invite your person</strong>: shows a QR code and an 8-character code. Send the invite, or let them scan it. The code works for 24 hours.</li>
            <li><strong>Scan their code</strong>: if your partner created the invite. You can also tap <em>Enter the code instead</em> and type it.</li>
          </ul>

          <h3>Can I try Hum before my partner installs it?</h3>
          <p>
            Yes. Tap <em>Try it with a demo partner</em>. A simulated partner sends touches, draws with you and shares
            moments, and nothing leaves your phone. To pair with your real person later, open your profile (top
            right on Home) and choose <em>Unpair and erase everything</em>, then pair as above.
          </p>

          <h2>Touches and notifications</h2>
          <h3>How do I send a touch?</h3>
          <p>
            On Home, under <em>Send a touch</em>, tap Thinking, Kiss, Hug, Miss you, Hot or Funny. Your partner feels
            a gentle haptic and sees it arrive. When one arrives for you, tap <em>Send back</em> to reply in one tap.
          </p>

          <h3>I'm not getting notifications</h3>
          <ul>
            <li>Open iOS Settings → Notifications → Hum and make sure notifications are allowed.</li>
            <li>Check that a Focus mode isn't silencing Hum.</li>
            <li>Make sure your phone is online. If Home shows <em>Reconnecting</em>, Hum is waiting for a connection and will catch up once it's back.</li>
            <li>Hum asks to send notifications right after you pair. If you declined, turn them on in iOS Settings.</li>
          </ul>

          <h3>How do I tell my partner how I'm doing?</h3>
          <p>
            On Home, tap the <em>You</em> button to set your energy and what would help. Your partner sees it on their
            Home screen. It never sends a notification.
          </p>

          <h2>Moments and drawing</h2>
          <h3>What can I share?</h3>
          <p>
            Photos, notes, voice notes (up to 30 seconds) and doodles. Tap <strong>+</strong> on the Moments tab. Moments arrive
            sealed, and your partner opens them when they're ready. To love a moment, open it and tap <em>Love it</em>,
            or touch and hold it.
          </p>

          <h3>How do I delete a moment?</h3>
          <p>
            Touch and hold a moment you sent and choose <em>Delete for both</em>. It's removed from both phones.
          </p>

          <h3>How does live drawing work?</h3>
          <p>
            Open the Draw tab. Every stroke appears on your partner's screen as you draw it, and theirs on yours.
            Tap the send button to keep the drawing as a moment.
          </p>

          <h2>Trips and live location</h2>
          <h3>How do I let my partner know I'm on the way?</h3>
          <p>
            On Home, tap <em>Heading over</em>, choose where you're going and roughly when you'll arrive, then start
            the trip. Your partner sees your arrival time on their Lock Screen and in the Dynamic Island. Tap{" "}
            <em>Arrived</em> when you get there. Trips also end on their own after a while, at most three hours.
          </p>

          <h3>Do I have to share my location?</h3>
          <p>
            No. Turn off <em>Share live location</em> before starting a trip, and your partner sees only the arrival
            time you chose. When it's on, your location is shared only for that trip and stops when you arrive.
          </p>

          <h3>My partner's trip isn't showing on my Lock Screen</h3>
          <p>
            Open iOS Settings → Hum and make sure Live Activities are allowed. Your partner's phone also needs Location
            access set to <em>While Using the App</em> for live arrival times.
          </p>

          <h2>Widgets</h2>
          <p>
            Touch and hold your Home Screen or Lock Screen, tap <em>Edit</em>, then <em>Add Widget</em>, and choose Hum.
            The widget shows your partner, their latest touch and how many days you've been together.
          </p>

          <h2>Privacy and your data</h2>
          <h3>Who can see what we share?</h3>
          <p>
            Only the two of you. Touches, notes, photos, voice notes, drawings and trips are end-to-end encrypted.
            Hum has no ads, analytics or tracking. The full details are in the{" "}
            <Link href="/hum-couple-privacy-policy">privacy policy</Link>.
          </p>

          <h3>How do I unpair or delete my data?</h3>
          <p>
            On Home, tap your profile (top right) and choose <em>Unpair and erase everything</em>. This disconnects you
            from your partner and deletes your couple's data from the server and from both phones. It can't be
            undone.
          </p>
          <p>
            Please unpair before deleting the app. If you delete the app first, your couple stays connected on the
            server until your partner unpairs. To ask for any remaining data to be deleted, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}?subject=Hum%20data%20deletion`}>{CONTACT_EMAIL}</a>.
          </p>
        </article>
      </div>
      <div className="grain" />
    </Layout>
  );
}
