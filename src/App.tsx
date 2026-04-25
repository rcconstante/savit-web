import { useEffect, useRef, useState } from 'react';
import { Bookmark, FolderOpen, Search, Star, ChevronRight, ChevronLeft, Shield, Image, Smartphone, Tag, MessageSquareQuote } from 'lucide-react';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import LicensePage from './pages/License';
import SupportPage from './pages/Support';

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
                <a
                  href="https://apps.apple.com/us/app/savit-save-it-later-bookmark/id6763529989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold text-base hover:bg-gray-800 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-8 h-8 flex-shrink-0" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.82 9.3 4.8C10.6 4.78 11.83 5.64 12.62 5.64C13.41 5.64 14.92 4.59 16.48 4.76C17.14 4.79 18.93 5.03 20.1 6.7C19.98 6.78 17.75 8.08 17.77 10.82C17.8 14.1 20.58 15.17 20.61 15.18C20.58 15.27 20.1 16.88 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-xs leading-none opacity-70">Download on the</div>
                    <div className="text-base leading-tight font-bold">App Store</div>
                  </div>
                </a>
                <a
                  href="https://bit.ly/4txtOFX"
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

        {/* ─── Features Bento ─── */}
        <Slide>
          <section className="max-w-6xl mx-auto px-4 sm:px-8 py-24 lg:py-0">
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-gray-900">
            Save smarter.
          </h2>
          <p className="text-gray-500 text-lg max-w-lg">
            Everything you need to capture, organize, and rediscover content.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          {/* Large card — Share Sheet */}
          <div className="sm:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center">
                <Smartphone size={20} className="text-[#0D9488]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Save from Any App</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Use the share sheet or clipboard detection to instantly save links, text, and images from any app.</p>
            </div>
          </div>

          {/* Collections */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center">
                <FolderOpen size={20} className="text-[#0D9488]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Collections</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Organize into colorful folders with custom icons, emojis, or photos.</p>
            </div>
          </div>

          {/* Rich Previews */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center">
                <Image size={20} className="text-[#0D9488]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Rich Previews</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Every link gets a beautiful preview with title, image, and description.</p>
            </div>
          </div>

          {/* Search — dark accent */}
          <div className="bg-[#0D9488] rounded-3xl p-8 flex flex-col justify-between text-white hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Search size={20} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-1">Instant Search</h3>
              <p className="text-white/80 text-sm leading-relaxed">Find anything by title, tag, collection, or keyword in milliseconds.</p>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center">
                <Tag size={20} className="text-[#0D9488]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Color Tags</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Tag items with colors for instant visual scanning and grouping.</p>
            </div>
          </div>

          {/* Offline / Privacy */}
          <div className="sm:col-span-2 bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 flex items-center justify-center">
                <Shield size={20} className="text-[#0D9488]" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">100% Private & Offline</h3>
              <p className="text-gray-500 text-sm leading-relaxed">All your data stays on your device. No cloud, no tracking, no account needed. Your content is yours alone.</p>
            </div>
          </div>
        </div>
      </section>
        </Slide>

        {/* ─── Testimonials ─── */}
        <Slide>
          <section className="bg-[#FAFBFC] py-24 lg:py-0 w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12 text-gray-900 text-center lg:text-left">
            What people are saying
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Featured — left large */}
            <div className="bg-white border border-gray-100 rounded-3xl p-10 flex flex-col justify-between hover:shadow-lg transition-shadow">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <MessageSquareQuote size={32} className="text-[#0D9488]/40" />
                </div>
                <p className="text-gray-900 text-xl leading-relaxed mb-8">
                  "I used to lose links all the time. Now everything is in Savit — organized, tagged, and always findable. The collections feature completely changed how I save content from my phone."
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center text-[#0D9488] font-bold text-sm">AR</div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Alex R.</p>
                    <p className="text-gray-400 text-xs">2 days ago</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right stack */}
            <div className="flex flex-col gap-4">
              <div className="bg-white border border-gray-100 rounded-3xl p-7 flex flex-col justify-between hover:shadow-lg transition-shadow flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Best bookmark app</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">Maria S.</p>
                    <p className="text-gray-300 text-xs">1 day ago</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  "The collections feature is beautiful. I have one for design inspiration, one for recipes, one for work. Love it."
                </p>
              </div>

              <div className="bg-white border border-gray-100 rounded-3xl p-7 flex flex-col justify-between hover:shadow-lg transition-shadow flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Game changer</p>
                    <div className="flex gap-0.5 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs">James K.</p>
                    <p className="text-gray-300 text-xs">4 days ago</p>
                  </div>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                  "Clean UI, fast search, and the auto-detect from clipboard is a game changer. Best bookmark app I have used."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
        </Slide>

        {/* ─── Footer ─── */}
        <Slide>
          <footer className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-24 lg:py-0 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">
            {/* Left */}
            <div className="flex-1">
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                Your saves.
                <br />
                Organized. <span className="text-[#0D9488]">Always.</span>
              </h2>
              <p className="text-gray-500 text-lg mb-8">
                One-time download. Yours forever.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://apps.apple.com/us/app/savit-save-it-later-bookmark/id6763529989"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 21.99 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 21.99C7.79 22.03 6.8 20.68 5.96 19.47C4.25 16.56 2.93 11.3 4.7 7.72C5.57 5.94 7.36 4.82 9.3 4.8C10.6 4.78 11.83 5.64 12.62 5.64C13.41 5.64 14.92 4.59 16.48 4.76C17.14 4.79 18.93 5.03 20.1 6.7C19.98 6.78 17.75 8.08 17.77 10.82C17.8 14.1 20.58 15.17 20.61 15.18C20.58 15.27 20.1 16.88 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                  </svg>
                  App Store
                </a>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc0JIORyXh20qQ105wi2Gc3hlAmobqvR-klIKOfITP55nc_eg/viewform?usp=dialog"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.583 1.496c.572.331.572.87 0 1.2l-2.583 1.497-2.606-2.597 2.606-2.596zM5.864 3.465L16.8 9.798l-2.302 2.302-8.634-8.635z"/>
                  </svg>
                  Google Play
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-3 text-sm text-gray-400 lg:text-right">
              <a href="/privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
              <a href="/terms" className="hover:text-gray-900 transition-colors">Terms</a>
              <a href="/license" className="hover:text-gray-900 transition-colors">Licenses</a>
              <a href="/support" className="hover:text-gray-900 transition-colors">Support</a>
              <a
                href="https://rcconstante.dev"
                className="hover:text-gray-900 transition-colors mt-2 inline-flex items-center gap-1.5 lg:justify-end"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Web App
              </a>
            </div>
          </footer>
        </Slide>
      </div>

    </div>
  );
}

export default App;
