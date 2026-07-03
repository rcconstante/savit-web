import { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { applySeo, PAGE_SEO } from '../lib/seo';

export default function SupportPage() {
  useEffect(() => {
    return applySeo(PAGE_SEO.support);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="Savit" className="w-9 h-9 rounded-xl" />
            <span className="font-bold text-lg">Savit</span>
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <a href="/" className="inline-flex items-center gap-1 text-[#0D9488] text-sm font-medium mb-8 hover:underline">
          <ChevronLeft size={18} /> Back to home
        </a>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Support</h1>
        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          Need help with Savit? We are here for you. Reach out through any of the channels below.
        </p>

        <div className="space-y-8">
          <section className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold mb-2">Email Support</h2>
            <p className="text-gray-500 mb-4">For bug reports, feature requests, or general questions.</p>
            <a
              href="mailto:hello@getsavit.app"
              className="inline-flex items-center gap-2 text-[#0D9488] font-medium hover:underline"
            >
              hello@getsavit.app
            </a>
          </section>

          <section className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold mb-2">Frequently Asked Questions</h2>
            <div className="space-y-4 text-gray-600">
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 list-none flex items-center justify-between">
                  How do I save a link?
                  <span className="transition group-open:rotate-180">&#9662;</span>
                </summary>
                <p className="mt-2 text-gray-500">Copy any link to your clipboard, open Savit, and tap the plus button. Savit can also auto-detect links in your clipboard.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 list-none flex items-center justify-between">
                  Is my data stored locally?
                  <span className="transition group-open:rotate-180">&#9662;</span>
                </summary>
                <p className="mt-2 text-gray-500">Yes. All your saved content stays on your device. We do not collect, store, or transmit your data to any servers.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 list-none flex items-center justify-between">
                  Can I export my data?
                  <span className="transition group-open:rotate-180">&#9662;</span>
                </summary>
                <p className="mt-2 text-gray-500">Yes. Go to Settings in the app and use the Export feature to save all your links and collections as a JSON file.</p>
              </details>
              <details className="group">
                <summary className="cursor-pointer font-medium text-gray-900 list-none flex items-center justify-between">
                  How do I create collections?
                  <span className="transition group-open:rotate-180">&#9662;</span>
                </summary>
                <p className="mt-2 text-gray-500">Tap the Collections tab, then the plus button. Give your collection a name, pick an icon or emoji, and start adding links.</p>
              </details>
            </div>
          </section>

          <section className="border-t border-gray-100 pt-6">
            <h2 className="text-xl font-bold mb-2">Version & Troubleshooting</h2>
            <p className="text-gray-500 mb-2">Current app version: <span className="font-medium text-gray-900">1.0.0</span></p>
            <p className="text-gray-500">
              If the app crashes or behaves unexpectedly, try force-closing and reopening it. If the issue persists, email us with your device model and OS version.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="Savit" className="w-8 h-8 rounded-lg" />
            <span className="font-semibold text-sm text-gray-900">Savit</span>
          </div>
          <p className="text-sm text-gray-400">
            <a href="/" className="hover:text-gray-900 transition-colors">Back to home</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
