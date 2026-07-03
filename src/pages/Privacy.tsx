import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { applySeo, PAGE_SEO } from '../lib/seo';

export default function PrivacyPage() {
  useEffect(() => {
    return applySeo(PAGE_SEO.privacy);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-10"
        >
          <ChevronLeft size={16} />
          Back to Savit
        </a>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <img src="/icon.png" alt="Savit" className="w-10 h-10 rounded-xl" />
            <img src="/savit.png" alt="Savit" className="h-7" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-gray-900">Privacy Policy</h1>
          <p className="text-gray-400 text-sm">Last updated: April 24, 2026</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-12" />

        {/* Content */}
        <div className="prose max-w-none space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Overview</h2>
            <p>
              Savit is designed with privacy as a core principle. Your saved content — links, images,
              notes, and collections — belongs to you. We do not collect, sell, or share your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. Data We Do Not Collect</h2>
            <p>Savit does <strong className="text-gray-900">not</strong> collect any of the following:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Saved links, images, or text content</li>
              <li>Collection names or tag data</li>
              <li>Personal identifiers (name, email, phone number)</li>
              <li>Location data</li>
              <li>Device identifiers or advertising IDs</li>
              <li>Usage analytics or behavioral data without explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Local-First Storage</h2>
            <p>
              By default, all your saved content is stored locally on your device. Nothing is uploaded
              to our servers unless you explicitly enable cloud sync (if available). You own your data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Optional Cloud Sync</h2>
            <p>
              If you choose to enable cloud sync, your data is encrypted before transmission and stored
              securely. You can delete your cloud data at any time from the app settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Services</h2>
            <p>
              Savit may use third-party services for link previews (fetching page titles and images).
              These requests are made anonymously — no user identifiers are sent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Children's Privacy</h2>
            <p>
              Savit does not knowingly collect data from children under 13. Since data is stored locally
              by default, the app is safe for all age groups.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy occasionally. Any changes will be posted on this page
              with an updated date. Continued use of the app after changes constitutes acceptance
              of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, you can contact us at:
            </p>
            <div className="mt-3 border-l-2 border-gray-100 py-2 pl-5">
              <p className="font-semibold text-gray-900">Richmond Constante</p>
              <p className="text-sm text-gray-400 mt-1">
                Portfolio:{' '}
                <a href="https://rcconstante.dev" className="text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                  rcconstante.dev
                </a>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                GitHub:{' '}
                <a href="https://github.com/rcconstante" className="text-gray-900 hover:underline" target="_blank" rel="noopener noreferrer">
                  github.com/rcconstante
                </a>
              </p>
            </div>
          </section>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mt-16 mb-8" />

        {/* Footer mini */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>© 2026 Savit</span>
          <a href="/terms" className="hover:text-gray-900 transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  );
}
