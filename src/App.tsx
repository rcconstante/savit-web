import { useEffect, useRef, useState } from 'react';
import { Bookmark, FolderOpen, ClipboardList, Search, Star, ChevronRight, X, ChevronLeft } from 'lucide-react';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import LicensePage from './pages/License';
import SupportPage from './pages/Support';

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

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function HorizontalScreenshots() {
  const { ref, visible } = useInView(0.15);
  const images = ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png', '/6.png'];
  const [start, setStart] = useState(0);
  const showCount = 4;
  const maxStart = images.length - showCount;
  const scrollRef = useRef<HTMLDivElement>(null);

  const goNext = () => setStart((s) => Math.min(s + 1, maxStart));
  const goPrev = () => setStart((s) => Math.max(s - 1, 0));

  return (
    <div ref={ref} className="relative">
      <div
        ref={scrollRef}
        className="overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4"
      >
        <div className="flex gap-1 px-1 min-w-max">
          {images.map((src, i) => {
            const inWindow = i >= start && i < start + showCount;
            return (
              <div
                key={src}
                className={`snap-center flex-shrink-0 transition-all duration-700 ease-out ${
                  visible && inWindow ? 'opacity-100 translate-y-0 scale-100' : inWindow ? 'opacity-0 translate-y-8 scale-95' : 'opacity-0 scale-95 hidden'
                }`}
                style={{ transitionDelay: `${(i - start) * 80}ms` }}
              >
                <img
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  className="w-[220px] sm:w-[260px] lg:w-[300px] rounded-[1.75rem] shadow-xl shadow-black/5"
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={goPrev}
        disabled={start === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-12 h-12 rounded-full border border-gray-200 bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 disabled:opacity-0 disabled:scale-75 transition-all"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goNext}
        disabled={start >= maxStart}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-12 h-12 rounded-full border border-gray-200 bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-gray-700 hover:bg-white hover:scale-105 disabled:opacity-0 disabled:scale-75 transition-all"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex items-center justify-center gap-2 mt-6">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setStart(Math.min(i, maxStart))}
            className={`h-2 rounded-full transition-colors ${
              i >= start && i < start + showCount ? 'bg-[#0D9488] w-4' : 'bg-gray-300 w-2'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Slide({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <div
      id={id}
      className="w-full lg:min-w-[100vw] lg:h-screen lg:flex lg:items-center lg:justify-center lg:overflow-y-auto hide-scrollbar"
    >
      {children}
    </div>
  );
}

function App() {
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const path = window.location.pathname;

  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/terms') return <TermsPage />;
  if (path === '/license') return <LicensePage />;
  if (path === '/support') return <SupportPage />;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (window.innerWidth < 1024) return;
      const idx = Math.round(el.scrollLeft / window.innerWidth);
      setActiveSlide(Math.max(0, Math.min(idx, 5)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let target = el.scrollLeft;
    let current = el.scrollLeft;
    let raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const animate = () => {
      current = lerp(current, target, 0.1);
      if (Math.abs(target - current) > 0.5) {
        el.scrollLeft = current;
        raf = requestAnimationFrame(animate);
      } else {
        el.scrollLeft = target;
        raf = 0;
      }
    };
    const onWheel = (e: WheelEvent) => {
      if (window.innerWidth < 1024) return;
      e.preventDefault();
      target += (e.deltaY + e.deltaX) * 2;
      target = Math.max(0, Math.min(target, el.scrollWidth - el.clientWidth));
      if (!raf) raf = requestAnimationFrame(animate);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(raf);
    };
  }, []);

  const scrollToSlide = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (window.innerWidth < 1024) return;
      if (e.key === 'ArrowRight') scrollToSlide(Math.min(activeSlide + 1, 5));
      if (e.key === 'ArrowLeft') scrollToSlide(Math.max(activeSlide - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSlide]);

  return (
    <div className="min-h-screen lg:min-h-0 lg:h-screen bg-white text-gray-900 relative">
      {showIOSModal && <ComingSoonModal onClose={() => setShowIOSModal(false)} />}

      <div
        ref={containerRef}
        className="w-full lg:h-screen lg:overflow-x-auto lg:flex lg:flex-nowrap hide-scrollbar"
      >
        {/* ─── Hero ─── */}
        <Slide id="hero">
          <section className="relative overflow-hidden bg-[#FAFBFC]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(13,148,136,0.06)_0%,_transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-20 pb-12 lg:pb-20">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14">
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
        </Slide>

        {/* ─── App Screenshots ─── */}
        <Slide>
          <section className="bg-[#FAFBFC] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
              Built for how you browse.
            </h2>
            <p className="text-gray-500 text-lg sm:text-xl max-w-lg mx-auto">
              A clean, intuitive interface designed around your content.
            </p>
          </div>

          <HorizontalScreenshots />
        </div>
      </section>
        </Slide>

        {/* ─── How It Works ─── */}
        <Slide>
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
        </Slide>

        {/* ─── Testimonials ─── */}
        <Slide>
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
        </Slide>

        {/* ─── CTA Banner ─── */}
        <Slide>
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
        </Slide>

        {/* ─── Footer ─── */}
        <Slide>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-24 lg:py-0">
            <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-black/5 p-10 sm:p-14 flex flex-col items-center text-center gap-8">
              <div className="flex items-center gap-3">
                <img src="/icon.png" alt="Savit" className="w-14 h-14 rounded-2xl" />
                <span className="font-bold text-2xl text-gray-900">Savit</span>
              </div>
              <p className="text-gray-500 text-lg max-w-md leading-relaxed">
                Your personal content library. Save links, organize collections, and find anything instantly.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6 text-base font-medium text-gray-500">
                <a href="/privacy" className="hover:text-[#0D9488] transition-colors">Privacy</a>
                <a href="/terms" className="hover:text-[#0D9488] transition-colors">Terms</a>
                <a href="/license" className="hover:text-[#0D9488] transition-colors">Licenses</a>
                <a href="/support" className="hover:text-[#0D9488] transition-colors">Support</a>
              </div>
              <div className="h-px w-24 bg-gray-100" />
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
          </div>
        </Slide>
      </div>

    </div>
  );
}

export default App;
