import { useEffect } from "react";
import { Layout } from "@/components/Layout";

const EFFECTIVE_DATE = "October 15, 2026";
const CONTACT_EMAIL = "hello@harunrashid.dev";

export default function HumPrivacyPolicy() {
  useEffect(() => {
    document.title = "Hum: Couples — Privacy Policy";
  }, []);

  return (
    <Layout>
      <div className="space-y-12 md:space-y-16">
        <div className="space-y-4 animate-in-up">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight">Hum: Couples — Privacy Policy</h1>
          <p className="font-mono text-xs text-muted-foreground">Effective {EFFECTIVE_DATE}</p>
        </div>

        <article className="prose prose-neutral dark:prose-invert prose-lg max-w-2xl leading-relaxed prose-headings:font-light prose-headings:tracking-tight prose-a:underline-offset-4 animate-in-up">
          <p>
            Hum: Couples ("Hum", "the app") is a private space for two people. It is built and operated by Harun
            Rashid ("I", "me"). This policy explains what information the app handles, why, where it goes, and the
            choices you have. I have tried to describe exactly what the app does, including its limits.
          </p>

          <h2>The short version</h2>
          <ul>
            <li>What you share with your partner (touches, notes, photos, voice notes, drawings, your status and your trips) is end-to-end encrypted on your phone. I cannot read it.</li>
            <li>There is no email, phone number or password. Hum uses an anonymous account.</li>
            <li>No ads, no analytics, no tracking, and no third-party SDKs other than the backend that relays your data. Nothing is sold or shared for advertising.</li>
            <li>Your location is shared only during a trip you start, only with your partner, and it is not stored on my servers.</li>
            <li>A few things are not end-to-end encrypted, and they are listed below so you know exactly what they are.</li>
          </ul>

          <h2>1. Information Hum handles</h2>

          <h3>What you share with your partner (end-to-end encrypted)</h3>
          <p>
            Touches, notes and captions, photos, voice notes, drawings and the live canvas, reactions, deletions, your
            status (energy, what you need, and an optional note), your "together since" date, name changes after
            pairing, and trip details (destination, start time, arrival time and live location) are encrypted on your
            device before they leave it. The two phones agree on a shared key using X25519 key agreement, and content
            is sealed with ChaCha20-Poly1305. The server only relays and briefly stores the encrypted data. It does
            not have the key.
          </p>
          <p>
            Photos are resized and re-encoded on your device before sending, and this does not carry over the
            original photo's embedded metadata, such as where it was taken.
          </p>

          <h3>Names (not end-to-end encrypted)</h3>
          <p>
            The display names you and your partner enter during pairing are stored on the server in readable form.
            They are used to connect the two of you and to show who a notification is from. Your partner's name
            appears as the title of the notifications you receive. The text of each notification (for example "is
            hugging you") is encrypted and only decrypted on the receiving phone.
          </p>

          <h3>Location</h3>
          <p>
            Hum uses your location only during a trip that you start with live location turned on. You can turn it
            off before starting a trip. While the trip is active, Hum sends your position, at most about every 15
            seconds, end-to-end encrypted, to your partner's phone only. It is not stored on the server. Sharing
            stops when you arrive, when you end the trip, or automatically after a time limit (at most three hours).
          </p>
          <p>
            To work out your arrival time, Hum sends your current location and destination to Apple Maps, and place
            searches you type go to Apple Maps too. Apple handles this under the{" "}
            <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple Privacy Policy</a>.
          </p>
          <p>
            So that your partner can follow your trip on their Lock Screen, the arrival time, start time and remaining
            distance (never your coordinates, your name or your destination) pass through my server to Apple's push
            notification service without end-to-end encryption. This is needed because Apple displays that
            information directly. It is not stored.
          </p>

          <h3>Technical data</h3>
          <ul>
            <li><strong>Anonymous account ID</strong>: created automatically when you pair, so the server knows which couple you belong to.</li>
            <li><strong>Encryption public key</strong>: shared through the server so your partner's phone can derive your shared key. Private keys never leave your device.</li>
            <li><strong>Push tokens</strong>: your device's notification token and, during a partner's trip, a Live Activity token, so the server can deliver notifications.</li>
            <li><strong>Delivery metadata</strong>: for each message, who sent it, who it is for, when, its size, and a notification category such as "touch" or "moment". The server needs this to deliver your messages. It does not include their content.</li>
            <li><strong>Pairing data</strong>: a temporary invite code, valid for 24 hours, and when it was used.</li>
            <li><strong>IP address</strong>: like any internet service, my hosting provider and Apple receive your IP address when your phone connects. Hum does not use it to identify or locate you.</li>
          </ul>

          <h3>What Hum does not collect</h3>
          <p>
            Hum does not collect your email address, phone number, contacts, advertising identifier, or usage
            analytics. It contains no advertising, analytics, crash-reporting or tracking SDKs, and it does not track
            you across other companies' apps or websites.
          </p>

          <h3>Demo mode</h3>
          <p>
            If you try Hum with a demo partner, the partner is simulated on your phone and nothing is sent to my
            server. If you start a trip in demo mode, Apple Maps is still used to calculate an arrival time, as
            described above.
          </p>

          <h2>2. How the information is used</h2>
          <p>
            Only to provide the app: to pair you with your partner, deliver what you send each other, show
            notifications and trip updates, and keep the service secure and working. Your information is not used for
            advertising or profiling and is never sold.
          </p>

          <h2>3. Permissions</h2>
          <p>Hum asks for each permission only when you use the feature that needs it. You can change them anytime in iOS Settings.</p>
          <ul>
            <li><strong>Camera</strong>: to take a photo for a moment, or to scan your partner's pairing code.</li>
            <li><strong>Photos</strong>: Hum uses the system photo picker, so it only receives the photo you choose.</li>
            <li><strong>Microphone</strong>: to record voice notes (up to 30 seconds).</li>
            <li><strong>Location (while using the app)</strong>: only for trips, as described above.</li>
            <li><strong>Local network and nearby interaction</strong>: to pair two phones held side by side. During nearby pairing, your name and a pairing request are exchanged directly with the other phone over an encrypted local connection.</li>
            <li><strong>Notifications</strong>: to let you know when your partner sends you something.</li>
          </ul>

          <h2>4. Service providers</h2>
          <ul>
            <li>
              <strong>Supabase</strong> hosts the backend: the database, anonymous sign-in, real-time relay, encrypted
              media storage, and the function that sends notifications. Supabase processes data on my behalf. See
              the{" "}
              <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a>.
            </li>
            <li>
              <strong>Apple</strong> provides push notifications, Live Activities and Apple Maps. See the{" "}
              <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple Privacy Policy</a>.
            </li>
          </ul>
          <p>
            Your information is not shared with anyone else, except where required by law. Because most of what you
            share is end-to-end encrypted, it cannot be disclosed in readable form even then.
          </p>

          <h2>5. How long information is kept</h2>
          <ul>
            <li><strong>Messages and media</strong>: deleted from the server as soon as your partner's phone receives them. Messages that are never delivered are deleted automatically after 30 days.</li>
            <li><strong>Live location</strong>: never stored on the server.</li>
            <li><strong>Trip Live Activity tokens</strong>: deleted when the trip ends, and automatically within a few hours.</li>
            <li><strong>Invite codes</strong>: expire after 24 hours and are then deleted.</li>
            <li>
              <strong>Your couple</strong>: names, public keys and pairing records stay on the server while you are
              paired. When either of you chooses <em>Unpair and erase everything</em>, the couple, both members'
              records, all queued messages and all stored media are deleted from the server. All of Hum's data on
              that phone is deleted too, and your partner's phone erases its copy when it receives the unpair.
            </li>
            <li>
              <strong>Residual technical records</strong>: your anonymous account ID and push token may remain on the
              server after you unpair, no longer linked to any couple or content. You can ask for them to be deleted
              at any time (see below).
            </li>
          </ul>
          <p>
            If you delete the app without unpairing, the couple stays on the server until your partner unpairs. Hum
            data on your phone is included in your device backups, according to your iOS backup settings.
          </p>

          <h2>6. Your choices and rights</h2>
          <ul>
            <li>Turn off live location before starting a trip, or end a trip at any time.</li>
            <li>Delete a moment for both of you from the moment itself.</li>
            <li>Unpair and erase everything from Settings in the app.</li>
            <li>Turn permissions and notifications on or off in iOS Settings.</li>
          </ul>
          <p>
            Depending on where you live (for example, under the GDPR in the EU and UK, or the CCPA in California),
            you may have the right to access, correct, delete or receive a copy of your personal information, and to
            object to or restrict how it is processed. To use any of these rights, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Because Hum has no accounts with email or
            phone numbers, I may need details from your app (such as your partner's name and when you paired) to find
            your records. Most content is end-to-end encrypted and cannot be read or exported from the server. You
            also have the right to complain to your local data protection authority.
          </p>
          <p>
            Where the GDPR applies, the legal basis for processing is to provide the service you asked for
            (performance of a contract), your consent for location, camera, microphone and notifications (which you
            can withdraw in iOS Settings), and my legitimate interest in keeping the service secure.
          </p>

          <h2>7. Security</h2>
          <p>
            Content between partners is end-to-end encrypted with modern cryptography. Data on the server is protected
            by access rules that let only the two members of a couple reach their own data. Encrypted media is kept in
            private storage. On your phone, keys are kept in the iOS Keychain and app files use iOS data protection.
          </p>
          <p>
            No system is perfectly secure. In particular, the two phones exchange public keys through my server, and
            Hum does not yet offer a way to verify those keys independently, for example by comparing a safety code.
          </p>

          <h2>8. Children</h2>
          <p>
            Hum is not directed at children under 13, and personal information from children under 13 is not
            knowingly collected. If you believe a child has used Hum, contact me and their data will be deleted.
          </p>

          <h2>9. International transfers</h2>
          <p>
            Hum's service providers may process information in countries other than yours, including where my hosting
            provider operates its data centers. Where this happens, I rely on the safeguards those providers offer for
            international transfers.
          </p>

          <h2>10. Changes to this policy</h2>
          <p>
            If this policy changes, the updated version will be posted on this page with a new effective date. If the
            changes are significant, they will also be explained in the app or its release notes.
          </p>

          <h2>11. Contact</h2>
          <p>
            Harun Rashid
            <br />
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </article>
      </div>
      <div className="grain" />
    </Layout>
  );
}
