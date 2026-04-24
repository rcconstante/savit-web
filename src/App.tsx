import { useState } from 'react';
import { Bookmark, FolderOpen, ClipboardList, Search, Star, ChevronRight, X } from 'lucide-react';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';

function ComingSoonModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white border border-gray-200 rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="w-16 h-16 bg-[#0D9488]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Bookmark size={32} className="text-[#0D9488]" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-900">iOS Coming Soon</h2>
        <p className="text-gray-500 text-base leading-relaxed">
          Savit for iPhone and iPad is currently in development.
          <br /><br />
          In the meantime, try it on Android — your personal content library.
        </p>
        <button
          onClick={onClose}
          className="mt-8 w-full inline-flex items-center justify-center gap-3 bg-[#0D9488] text-white px-6 py-3.5 rounded-2xl font-semibold text-sm hover:bg-[#0F766E] transition-colors"
        >
          Get it on Google Play
        </button>
        <button
          onClick={onClose}
          className="mt-3 w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

function App() {
  const [showIOSModal, setShowIOSModal] = useState(false);
  const path = window.location.pathname;
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/terms') return <TermsPage />;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {showIOSModal && <ComingSoonModal onClose={() => setShowIOSModal(false)} />}

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-[#FAFBFC]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,148,136,0.06)_0%,_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-28 lg:pb-40">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-14 lg:gap-16">
            {/* Left – phone mockup */}
            <div className="relative flex-shrink-0 w-72 sm:w-80 lg:w-[26rem] order-2 lg:order-1">
              <div className="relative z-10">
                <img
                  src="/hero_phone.png"
                  alt="Savit app on phone"
                  className="w-full drop-shadow-2xl"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-[#0D9488]/[0.05] blur-3xl -z-0" />
            </div>

            {/* Right – copy */}
            <div className="text-center lg:text-left max-w-xl w-full px-2 sm:px-0 order-1 lg:order-2">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-7">
                <img src="/icon.png" alt="Savit" className="w-12 h-12 rounded-2xl" />
                <img src="/savit.png" alt="Savit" className="h-8" />
              </div>
              <div className="inline-flex items-center gap-2 bg-[#0D9488]/10 backdrop-blur px-5 py-2 rounded-full text-sm font-medium mb-8 text-[#0D9488]">
                <Bookmark size={18} />
                Your Personal Content Library
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-[5.25rem] font-extrabold tracking-tight leading-[1.05] mb-8 text-gray-900">
                Save It.
                <br />
                <span className="text-[#0D9488]">Find It.</span>
                <br />
                Never Lose It.
              </h1>
              <p className="text-gray-500 text-xl sm:text-2xl leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
                Save links, images, and text from any app. Organize with collections and tags. Find anything instantly.
              </p>

              {/* Store buttons */}
              <div id="download" className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => setShowIOSModal(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-gray-800 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.82 9.3 4.8C10.6 4.78 11.83 5.64 12.62 5.64C13.41 5.64 14.92 4.59 16.48 4.76C17.14 4.79 18.93 5.03 20.1 6.7C19.98 6.78 17.75 8.08 17.77 10.82C17.8 14.1 20.58 15.17 20.61 15.18C20.58 15.27 20.1 16.88 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs leading-none opacity-70">Download on the</div>
                    <div className="text-base leading-tight font-bold">App Store</div>
                  </div>
                </button>
                <a
                  href="#download"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-[#0D9488] text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-[#0F766E] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.583 1.496c.572.331.572.87 0 1.2l-2.583 1.497-2.606-2.597 2.606-2.596zM5.864 3.465L16.8 9.798l-2.302 2.302-8.634-8.635z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs leading-none opacity-70">GET IT ON</div>
                    <div className="text-base leading-tight font-bold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── App Screenshots ─── */}
      <section className="bg-[#FAFBFC] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
              Built for how you browse.
            </h2>
            <p className="text-gray-500 text-lg sm:text-xl max-w-lg mx-auto">
              A clean, intuitive interface designed around your content.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-end justify-center gap-8 lg:gap-12">
            {[
              { img: '/firstscreen.png', title: 'Home Feed', desc: 'All your saves in one scrollable feed.' },
              { img: '/saveit.png', title: 'Collections', desc: 'Organize into colorful collections.' },
              { img: '/preview.png', title: 'Preview', desc: 'Rich previews for every link you save.' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center w-full sm:w-auto">
                <div className="relative bg-gray-900 border-[3px] border-gray-700 rounded-[3rem] overflow-hidden shadow-2xl mx-auto w-60 sm:w-64 lg:w-72 h-[480px] sm:h-[520px] lg:h-[576px]">
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-800 rounded-full z-10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 p-5">
                    <img src={item.img} alt={item.title} className="w-full h-full object-contain rounded-2xl" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-28 h-1.5 bg-gray-600 rounded-full" />
                </div>
                <div className="mt-6 text-center max-w-[270px]">
                  <h3 className="text-lg font-bold mb-1 text-gray-900">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
            Three steps. That's it.
          </h2>
          <p className="text-gray-500 text-lg sm:text-xl max-w-lg mx-auto">
            Start building your library in under a minute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[
            {
              step: '01',
              title: 'Copy Any Link',
              desc: 'From any app — browser, social, chat. Savit detects it automatically.',
              icon: ClipboardList,
            },
            {
              step: '02',
              title: 'Organize',
              desc: 'Add to collections, tag with colors, or let AI suggest the best fit.',
              icon: FolderOpen,
            },
            {
              step: '03',
              title: 'Find Instantly',
              desc: 'Search by tag, collection, or keyword. Your content, always within reach.',
              icon: Search,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative bg-white border border-gray-100 rounded-3xl p-10 text-center"
            >
              <div className="text-7xl font-black text-gray-100 absolute top-6 right-8">
                {item.step}
              </div>
              <div className="w-20 h-20 rounded-3xl bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-7">
                <item.icon size={34} className="text-[#0D9488]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-500 text-base leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-[#FAFBFC] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
              What people are saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Alex R.',
                text: "I used to lose links all the time. Now everything is in Savit — organized, tagged, and always findable.",
                rating: 5,
              },
              {
                name: 'Maria S.',
                text: 'The collections feature is beautiful. I have one for design inspiration, one for recipes, one for work. Love it.',
                rating: 5,
              },
              {
                name: 'James K.',
                text: 'Clean UI, fast search, and the auto-detect from clipboard is a game changer. Best bookmark app I have used.',
                rating: 5,
              },
              {
                name: 'Priya M.',
                text: 'Finally an app that understands how I browse. The tag colors make scanning so fast. Highly recommend.',
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-3xl p-8"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-base text-gray-900">{review.name}</span>
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, j) => (
                      <Star key={j} size={18} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-base leading-relaxed">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-24 lg:pb-32">
        <div className="relative bg-[#0D9488] rounded-3xl p-10 sm:p-16 lg:p-20 flex flex-col sm:flex-row items-center gap-10 overflow-hidden">
          <div className="absolute -right-16 -bottom-16 opacity-10">
            <img src="/icon.png" alt="" className="w-64 h-64" />
          </div>
          <div className="flex-1 relative z-10 text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Ready to start saving?
            </h2>
            <p className="text-white/80 text-lg max-w-lg">
              Download Savit today and never lose a link again. Free to start, premium features available.
            </p>
          </div>
          <button
            onClick={() => setShowIOSModal(true)}
            className="relative z-10 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#0D9488] px-10 py-5 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors whitespace-nowrap"
          >
            Get the App <ChevronRight size={22} />
          </button>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <img src="/icon.png" alt="Savit" className="w-11 h-11 rounded-xl" />
            <span className="font-semibold text-base text-gray-900">Savit</span>
          </div>
          <div className="flex items-center gap-8 text-base text-gray-400">
            <a href="/privacy" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-gray-900 transition-colors">
              Terms
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Made by{' '}
            <a
              href="https://rcconstante.dev"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Richmond Constante
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
