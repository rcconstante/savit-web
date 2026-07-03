import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { applySeo, PAGE_SEO } from '../lib/seo';

export default function TermsPage() {
  useEffect(() => {
    return applySeo(PAGE_SEO.terms);
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
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-gray-900">Terms of Service</h1>
          <p className="text-gray-400 text-sm">Last updated: April 24, 2026</p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100 mb-12" />

        {/* Content */}
        <div className="prose max-w-none space-y-10 text-gray-600 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, or using Savit ("the App"), you agree to be bound by
              these Terms of Service. If you do not agree with any part of these terms, you must not
              use the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. License</h2>
            <p>
              Savit grants you a personal, non-exclusive, non-transferable, limited license to
              install and use the App on devices you own or control. This license is for personal,
              non-commercial use only. You may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Copy, modify, or distribute the App or any portion of it</li>
              <li>Reverse engineer, decompile, or disassemble the App</li>
              <li>Rent, lease, or lend the App to third parties</li>
              <li>Use the App for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Your Content</h2>
            <p>
              You retain full ownership of all content you save using Savit. We do not claim any rights
              over your saved links, images, notes, or collections. You are solely responsible for
              the content you choose to save and organize.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable Use</h2>
            <p>You agree not to use Savit to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Save or distribute illegal, harmful, or infringing content</li>
              <li>Violate any applicable local, national, or international laws</li>
              <li>Infringe upon the intellectual property rights of others</li>
              <li>Use the App in any way that could damage or overload our systems</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Disclaimer of Warranties</h2>
            <p>
              The App is provided "as is" without warranty of any kind, express or implied,
              including but not limited to warranties of merchantability, fitness for a particular
              purpose, or non-infringement. Savit does not guarantee uninterrupted or error-free
              operation of the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Savit and its developer shall not be liable
              for any indirect, incidental, special, consequential, or punitive damages, including
              loss of data or profits, arising from your use of or inability to use the App.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Updates & Changes</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Updated terms
              will be posted on this page with a revised date. Continued use of the App after
              changes constitutes your acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable law.
              Any disputes shall be resolved through the appropriate legal channels in the
              jurisdiction of the developer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Contact</h2>
            <p>For questions about these Terms, contact:</p>
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
          <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}
