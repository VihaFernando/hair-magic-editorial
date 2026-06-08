import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Instagram,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Menu,
  X,
  Sun,
  Waves,
  Sparkles,
  Palette,
  Droplets,
  Crown,
  type LucideIcon,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import salonLogo from "@/assets/logo-primary.png";
import footerLogo from "@/assets/footer-logo.png";
import heroImg from "@/assets/hero.jpg";
import erangaImg from "@/assets/eranga.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hair Magic by Eranga — Where Hair Meets Perfection" },
      {
        name: "description",
        content:
          "Luxury hair salon in Sri Lanka by Eranga. Balayage, ombre, blonde transformations, bridal styling and premium hair treatments.",
      },
      { property: "og:title", content: "Hair Magic by Eranga" },
      {
        property: "og:description",
        content: "Luxury Hair Transformations by Eranga - Where Hair Meets Perfection.",
      },
    ],
  }),
  component: Home,
});

/* ─────────────────────────────────────────── */
/* Reveal helpers                              */
/* ─────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] as const } },
};

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────── */
/* Navigation                                  */
/* ─────────────────────────────────────────── */

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2 }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-blush/85 backdrop-blur-xl border-b border-ink/5 py-3"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src={salonLogo} alt="Hair Magic by Eranga" className="h-8 sm:h-10 md:h-12 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="link-underline text-[0.78rem] tracking-[0.25em] uppercase text-ink-soft font-medium"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-ink text-blush px-6 py-3 text-[0.72rem] tracking-[0.25em] uppercase font-medium hover:bg-gold hover:text-ink transition-colors duration-500"
          >
            Book Appointment
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="lg:hidden text-ink"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="lg:hidden overflow-hidden bg-blush/95 backdrop-blur-xl"
      >
        <nav className="flex flex-col gap-5 px-6 py-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-[0.25em] uppercase text-ink"
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 bg-ink text-blush px-6 py-3 text-xs tracking-[0.25em] uppercase text-center"
          >
            Book Appointment
          </a>
        </nav>
      </motion.div>
    </motion.header>
  );
}

/* ─────────────────────────────────────────── */
/* Hero                                        */
/* ─────────────────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const services = [
    "Balayage",
    "Ombre",
    "Blonde Transformations",
    "Bridal Styling",
    "Hair Treatments",
    "Premium Coloring",
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative overflow-hidden bg-[#f5f0eb]"
    >
      <motion.div style={{ opacity }} className="relative flex min-h-[100svh] flex-col">
        <motion.div style={{ y: bgY }} className="absolute inset-0">
          <img
            src={heroImg}
            alt="Hair Experience Like No Other"
            className="h-full w-full object-cover object-[68%_top] sm:object-[72%_top] lg:object-right-top"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(245,240,235,0.82)_0%,rgba(245,240,235,0.7)_18%,rgba(245,240,235,0.88)_55%,rgba(245,240,235,0.98)_100%)] lg:bg-[linear-gradient(90deg,rgba(245,240,235,0.96)_0%,rgba(245,240,235,0.9)_34%,rgba(245,240,235,0.62)_58%,rgba(245,240,235,0.16)_100%)]" />
        </motion.div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 px-4 pt-24 sm:px-6 sm:pt-28 lg:px-10 lg:pt-24">
          <div className="grid w-full content-center items-center gap-8 md:gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
            <div className="relative z-10 mx-auto w-full max-w-2xl lg:col-span-6 lg:mx-0 lg:max-w-none xl:col-span-5">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="editorial-eyebrow mb-5 text-center text-[0.6rem] text-ink-soft sm:mb-6 sm:text-[0.7rem] lg:text-left"
              >
                ✦ Luxury Hair Studio · Sri Lanka
              </motion.p>

              <h1 className="editorial-headline mx-auto max-w-[11ch] text-center text-[2.85rem] leading-[0.88] text-ink sm:text-[4.25rem] md:max-w-[12ch] md:text-[4.8rem] lg:mx-0 lg:max-w-[10ch] lg:text-left lg:text-[5.1vw] xl:text-[5.4vw]">
                <SplitReveal text="Hair Experience" />
                <span className="mt-1 block italic font-serif text-gold">
                  <SplitReveal text="Like No Other." delay={0.2} />
                </span>
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="mx-auto mt-6 max-w-[34ch] text-center font-serif text-[0.98rem] leading-relaxed text-ink-soft sm:mt-7 sm:text-lg md:max-w-[40ch] lg:mx-0 lg:text-left"
              >
                Luxury hair transformations <em className="text-gold">by Eranga</em> - crafted with
                the care of a couture atelier.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="mt-8 flex flex-col items-center gap-4 sm:mt-9 md:flex-row md:flex-wrap md:justify-center lg:items-start lg:justify-start"
              >
                <a
                  href="#contact"
                  className="group inline-flex min-w-[16rem] items-center justify-center gap-3 bg-ink px-6 py-3.5 text-[0.65rem] uppercase tracking-[0.25em] text-blush transition-colors duration-500 hover:bg-gold hover:text-ink sm:min-w-0 sm:px-8 sm:py-4 sm:text-xs lg:justify-start"
                >
                  Book Appointment
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#gallery"
                  className="group inline-flex min-w-[16rem] items-center justify-center gap-3 border border-ink px-6 py-3.5 text-[0.65rem] uppercase tracking-[0.25em] text-ink transition-colors duration-500 hover:bg-ink hover:text-blush sm:min-w-0 sm:px-8 sm:py-4 sm:text-xs lg:justify-start"
                >
                  View Transformations
                </a>
              </motion.div>
            </div>

            <div className="hidden lg:col-span-6 xl:col-span-7 lg:block" />
          </div>
        </div>

        <div className="relative z-10 mt-auto overflow-hidden border-t border-ink/15 bg-[#f5f0eb]/85 py-3 backdrop-blur-sm sm:py-4">
          <div className="flex marquee-track whitespace-nowrap">
            {[...Array(3)].flatMap((_, r) =>
              services.map((service, i) => (
                <span
                  key={`${r}-${i}`}
                  className="mx-5 inline-flex items-center gap-4 font-display text-sm italic text-ink sm:mx-8 sm:text-lg md:text-xl"
                >
                  {service}
                  <span className="text-gold not-italic">✦</span>
                </span>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function SplitReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay: 0.4 + delay, ease: [0.22, 0.61, 0.36, 1] as const }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}

/* ─────────────────────────────────────────── */
/* Marquee                                     */
/* ─────────────────────────────────────────── */

function Marquee() {
  const items = [
    "Balayage",
    "Ombre",
    "Blonde Transformations",
    "Bridal Styling",
    "Hair Treatments",
    "Premium Coloring",
  ];
  const row = [...items, ...items, ...items];
  return (
    <div className="border-y border-ink/15 bg-blush py-4 sm:py-6 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display italic text-xl sm:text-3xl md:text-5xl text-ink mx-5 sm:mx-10 inline-flex items-center gap-5 sm:gap-10"
          >
            {t}
            <span className="text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────── */
/* Stats                                       */
/* ─────────────────────────────────────────── */

const STATS = [
  { n: "1250+", l: "Hair Transformations" },
  { n: "7300+", l: "Instagram Followers" },
  { n: "100%", l: "Client Focus" },
  { n: "Premium", l: "Hair Expertise" },
];

function Stats() {
  return (
    <section className="bg-cream py-16 sm:py-24 lg:py-32">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <Reveal>
          <p className="editorial-eyebrow text-gold mb-4">— By the numbers</p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 mt-8 sm:mt-10">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <div className="border-t border-ink/20 pt-4 sm:pt-6">
                <div className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-none">
                  {s.n}
                </div>
                <div className="mt-3 sm:mt-4 text-[0.7rem] sm:text-sm tracking-[0.15em] uppercase text-ink-soft">
                  {s.l}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* Services                                    */
/* ─────────────────────────────────────────── */

const SERVICES: { no: string; name: string; blurb: string; icon: LucideIcon }[] = [
  { no: "01", name: "Balayage", icon: Sun, blurb: "Hand-painted highlights for a sun-kissed glow that grows out beautifully." },
  { no: "02", name: "Ombre", icon: Waves, blurb: "A seamless gradient — depth at the roots, light at the ends." },
  { no: "03", name: "Blonde Transformations", icon: Sparkles, blurb: "From any base to your most luminous blonde, protected and pristine." },
  { no: "04", name: "Hair Coloring", icon: Palette, blurb: "Custom-mixed couture color crafted for your skin, eyes and lifestyle." },
  { no: "05", name: "Hair Treatments", icon: Droplets, blurb: "Salon rituals that restore shine, strength and softness." },
  { no: "06", name: "Bridal Hair Styling", icon: Crown, blurb: "Editorial bridal styling — timeless, photogenic, unforgettable." },
];

function Services() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => api.scrollNext(), 4000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    startAutoplay();

    const container = api.containerNode();
    container?.addEventListener("mouseenter", stopAutoplay);
    container?.addEventListener("mouseleave", startAutoplay);
    container?.addEventListener("focusin", stopAutoplay);
    container?.addEventListener("focusout", startAutoplay);

    return () => {
      stopAutoplay();
      container?.removeEventListener("mouseenter", stopAutoplay);
      container?.removeEventListener("mouseleave", startAutoplay);
      container?.removeEventListener("focusin", stopAutoplay);
      container?.removeEventListener("focusout", startAutoplay);
    };
  }, [api]);

  return (
    <section id="services" className="bg-blush py-20 sm:py-28 lg:py-40">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 mb-12 sm:mb-20">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-4 sm:mb-6">— What we do</p>
            <h2 className="editorial-headline text-ink text-4xl sm:text-6xl md:text-8xl lg:text-9xl">
              Signature
              <span className="block italic font-serif text-gold">Services.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif text-base sm:text-xl text-ink-soft max-w-md leading-relaxed">
              Six house specialties — every appointment begins with a private
              consultation and ends with a transformation worth sharing.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 sm:-ml-6">
                {SERVICES.map((s) => {
                  const Icon = s.icon;
                  return (
                    <CarouselItem
                      key={s.no}
                      className="pl-4 sm:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                    >
                      <article className="group flex h-full min-h-[280px] flex-col border border-ink/10 bg-cream p-6 transition-colors duration-500 hover:border-gold/40 sm:min-h-[300px] sm:p-8">
                        <div className="mb-6 flex items-start justify-between gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold/25 bg-blush transition-colors duration-500 group-hover:border-gold/50 group-hover:bg-gold/10">
                            <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                          </div>
                          <span className="editorial-eyebrow text-ink/25">{s.no}</span>
                        </div>
                        <h3 className="font-display text-2xl text-ink leading-tight sm:text-3xl">
                          {s.name}
                        </h3>
                        <p className="mt-3 flex-1 font-serif text-sm leading-relaxed text-ink-soft sm:mt-4 sm:text-base">
                          {s.blurb}
                        </p>
                        <div className="mt-6 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                      </article>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>

            <div className="mt-8 sm:mt-10 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center justify-center gap-3 sm:justify-start">
                {SERVICES.map((s, i) => (
                  <button
                    key={s.no}
                    type="button"
                    aria-label={`Go to ${s.name}`}
                    aria-current={i === current ? "true" : undefined}
                    onClick={() => api?.scrollTo(i)}
                    className={`h-px transition-all duration-500 ${
                      i === current
                        ? "w-10 bg-gold"
                        : "w-6 bg-ink/20 hover:bg-ink/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 sm:justify-end sm:gap-6">
                <span className="editorial-eyebrow text-ink-soft tabular-nums">
                  {String(current + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </span>
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    aria-label="Previous service"
                    onClick={() => api?.scrollPrev()}
                    className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border border-ink/20 text-ink transition-colors duration-500 hover:bg-ink hover:text-blush"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next service"
                    onClick={() => api?.scrollNext()}
                    className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center border border-ink/20 text-ink transition-colors duration-500 hover:bg-ink hover:text-blush"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* Gallery (masonry)                           */
/* ─────────────────────────────────────────── */

const GALLERY = [
  { src: g1, label: "Warm Auburn", category: "Balayage" },
  { src: g2, label: "Chocolate Waves", category: "Color" },
  { src: g3, label: "Honey Curls", category: "Treatment" },
  { src: g4, label: "Editorial Black", category: "Cut & Style" },
  { src: g5, label: "Bridal Updo", category: "Bridal" },
  { src: g6, label: "Beach Ombre", category: "Ombre" },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-ink text-blush py-20 sm:py-28 lg:py-40">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10 mb-12 sm:mb-20">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-4 sm:mb-6">— Real Results</p>
            <h2 className="editorial-headline text-blush text-4xl sm:text-6xl md:text-8xl lg:text-[9rem]">
              Real
              <span className="block italic font-serif text-gold">Results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif text-base sm:text-xl text-blush/70 max-w-md leading-relaxed">
              No filters. No retouching. Just real transformations from inside
              the studio.
            </p>
          </Reveal>
        </div>

        {/* Masonry via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08} className="mb-4 sm:mb-6 break-inside-avoid">
              <figure className="group relative hover-zoom">
                <img src={g.src} alt={g.label} loading="lazy" className="w-full h-auto" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <div>
                    <div className="text-[0.65rem] tracking-[0.3em] uppercase text-gold">
                      {g.category}
                    </div>
                    <div className="font-display text-2xl text-blush">{g.label}</div>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-blush" />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 sm:mt-24 flex flex-col items-center gap-8">
            <div className="flex items-center gap-4 w-full max-w-xs">
              <div className="h-px flex-1 bg-blush/20" />
              <p className="editorial-eyebrow text-blush/50 whitespace-nowrap">See more of our work</p>
              <div className="h-px flex-1 bg-blush/20" />
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="https://www.instagram.com/hairmagic_by_eranga/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-blush/30 text-blush px-6 py-4 text-[0.65rem] tracking-[0.2em] uppercase hover:bg-blush hover:text-ink transition-colors duration-500 min-w-[220px] justify-between"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <div className="text-[0.6rem] tracking-[0.2em] uppercase opacity-60 leading-none mb-0.5">Instagram</div>
                    <div>@hairmagic_by_eranga</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://www.tiktok.com/@hairmagicbyeranga"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-blush/30 text-blush px-6 py-4 text-[0.65rem] tracking-[0.2em] uppercase hover:bg-blush hover:text-ink transition-colors duration-500 min-w-[220px] justify-between"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[0.6rem] tracking-[0.2em] uppercase opacity-60 leading-none mb-0.5">TikTok</div>
                    <div>@hairmagicbyeranga</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://www.facebook.com/p/Hair-Magic-By-Eranga-100094330872177/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border border-blush/30 text-blush px-6 py-4 text-[0.65rem] tracking-[0.2em] uppercase hover:bg-blush hover:text-ink transition-colors duration-500 min-w-[220px] justify-between"
              >
                <div className="flex items-center gap-3">
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div className="text-left">
                    <div className="text-[0.6rem] tracking-[0.2em] uppercase opacity-60 leading-none mb-0.5">Facebook</div>
                    <div>Hair Magic By Eranga</div>
                  </div>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* About                                       */
/* ─────────────────────────────────────────── */

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" ref={ref} className="bg-cream py-20 sm:py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-20 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] bg-blush overflow-hidden">
            <motion.img
              style={{ y }}
              src={erangaImg}
              alt="Eranga — Founder"
              loading="lazy"
              className="w-full h-[115%] object-cover"
            />
            <div className="absolute bottom-3 right-3 sm:-bottom-4 sm:-right-4 bg-blush px-4 py-3 sm:px-6 sm:py-4 border border-ink/10">
              <div className="font-display italic text-xl sm:text-2xl text-ink">Eranga</div>
              <div className="text-[0.6rem] sm:text-[0.65rem] tracking-[0.3em] uppercase text-ink-soft mt-1">
                Founder · Hair Artist
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-4 sm:mb-6">— The artist</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="editorial-headline text-ink text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]">
              The Art Behind
              <span className="block italic font-serif text-gold">Every Transformation.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 sm:mt-10 space-y-4 sm:space-y-6 font-serif text-base sm:text-xl text-ink-soft leading-relaxed max-w-[55ch]">
              <p>
                Eranga is a hair artist obsessed with the small things — the
                slope of a balayage, the warmth in a tone, the way a curl falls
                after a final mist of finishing spray.
              </p>
              <p>
                Hair Magic Saloon was born from that obsession: a studio in Sri
                Lanka built to feel less like a salon and more like a private
                atelier, where every appointment is a one-of-one commission.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 sm:mt-12 grid grid-cols-2 gap-6 sm:gap-8 max-w-md">
              <div>
                <div className="font-display text-3xl sm:text-4xl text-ink">10+</div>
                <div className="text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase text-ink-soft mt-2">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="font-display text-3xl sm:text-4xl text-ink">5★</div>
                <div className="text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase text-ink-soft mt-2">
                  Google Rated
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  useEffect(() => {
    if (document.querySelector('script[data-elfsight-google-reviews]')) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    script.setAttribute("data-elfsight-google-reviews", "true");
    document.body.appendChild(script);
  }, []);

  return (
    <section className="relative bg-blush py-20 sm:py-28 lg:py-40 overflow-hidden">
      {/* decorative gradient */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold/15 blur-[120px]" />

      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-12 sm:mb-20">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-4 sm:mb-6">— Social proof</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="editorial-headline text-ink text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
              Loved By Our
              <span className="italic font-serif text-gold"> Community.</span>
            </h2>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-ink/10 bg-cream/80 p-4 shadow-[0_24px_80px_rgba(53,35,26,0.08)] sm:p-6 lg:p-8">
          <div className="elfsight-app-e8f49eae-d1b3-41b3-bb45-5fbf7107b4f0 min-h-[520px]" data-elfsight-app-lazy />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* TikTok                                      */
/* ─────────────────────────────────────────── */

const TIKTOK_EMBED_SCRIPT_ID = "tiktok-embed-script";

function loadTikTokEmbedScript() {
  return new Promise<void>((resolve, reject) => {
    document.getElementById(TIKTOK_EMBED_SCRIPT_ID)?.remove();

    const script = document.createElement("script");
    script.id = TIKTOK_EMBED_SCRIPT_ID;
    script.src = `https://www.tiktok.com/embed.js?t=${Date.now()}`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("TikTok embed script failed to load"));
    document.body.appendChild(script);
  });
}

function patchTikTokEmbed(blockquote: HTMLElement) {
  const observer = new MutationObserver(() => {
    const iframe = blockquote.querySelector("iframe");
    const dummy = blockquote.querySelector("[data-tiktok-dummy]");

    if (iframe && !dummy) {
      const placeholder = document.createElement("div");
      placeholder.setAttribute("data-tiktok-dummy", "");
      placeholder.hidden = true;
      blockquote.insertBefore(placeholder, iframe);
    }
  });

  observer.observe(blockquote, { childList: true });
  return () => observer.disconnect();
}

function TikTokSection() {
  const embedRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const blockquote = embedRef.current;
    if (!blockquote) return;

    let cancelled = false;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    const maxAttempts = 6;
    const unpatch = patchTikTokEmbed(blockquote);

    const hasIframe = () => Boolean(blockquote.querySelector("iframe"));

    const tryLoad = async () => {
      if (cancelled || hasIframe()) return;

      attempts += 1;

      try {
        await loadTikTokEmbedScript();
        await new Promise((resolve) => window.setTimeout(resolve, 600));

        if (!cancelled && !hasIframe() && attempts < maxAttempts) {
          retryTimer = window.setTimeout(tryLoad, 800 * attempts);
        }
      } catch {
        if (!cancelled && attempts < maxAttempts) {
          retryTimer = window.setTimeout(tryLoad, 1000 * attempts);
        }
      }
    };

    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        void tryLoad();
      });
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
      if (retryTimer) window.clearTimeout(retryTimer);
      unpatch();
    };
  }, []);

  return (
    <section className="bg-blush py-20 sm:py-28 lg:py-36">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 grid lg:grid-cols-12 gap-10 sm:gap-12 items-start">
        <Reveal className="lg:col-span-5">
          <p className="editorial-eyebrow text-gold mb-4 sm:mb-6">— On TikTok</p>
          <h2 className="editorial-headline text-ink text-4xl sm:text-5xl md:text-7xl">
            Watch The
            <span className="block italic font-serif text-gold">Magic Happen.</span>
          </h2>
          <p className="mt-6 sm:mt-8 font-serif text-base sm:text-xl text-ink-soft leading-relaxed max-w-md">
            Behind-the-scenes reels from inside the studio — color formulas,
            blow-outs, and full transformation reveals.
          </p>
          <a
            href="https://www.tiktok.com/@hairmagicbyeranga"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 sm:mt-10 group inline-flex items-center gap-3 bg-ink text-blush px-6 sm:px-8 py-3 sm:py-4 text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition-colors duration-500"
          >
            Open TikTok
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <div className="w-full lg:col-span-7">
          <div className="glass-card h-fit w-full p-5 sm:p-6 md:p-8 lg:p-10">
            <div className="h-fit w-full [&_.tiktok-embed]:!mx-0 [&_.tiktok-embed]:!mb-0 [&_.tiktok-embed]:!max-w-full [&_.tiktok-embed]:!w-full [&_iframe]:!block [&_iframe]:!max-w-full [&_iframe]:!w-full">
              <blockquote
                ref={embedRef}
                className="tiktok-embed"
                cite="https://www.tiktok.com/@hairmagicbyeranga"
                data-unique-id="hairmagicbyeranga"
                data-embed-type="creator"
                data-embed-from="oembed"
                style={{ maxWidth: "100%", minWidth: 325, width: "100%" }}
              >
                <section>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.tiktok.com/@hairmagicbyeranga?refer=creator_embed"
                  >
                    @hairmagicbyeranga
                  </a>
                </section>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* Location / Contact                          */
/* ─────────────────────────────────────────── */

function Location() {
  return (
    <section id="contact" className="bg-cream py-20 sm:py-28 lg:py-40">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center mb-10 sm:mb-16">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-4 sm:mb-6">— Visit the studio</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="editorial-headline text-ink text-4xl sm:text-5xl md:text-7xl lg:text-8xl">
              Come See
              <span className="italic font-serif text-gold"> Us.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="bg-blush border border-ink/10 overflow-hidden grid lg:grid-cols-5">
            <div className="lg:col-span-2 p-6 sm:p-10 lg:p-14 flex flex-col justify-between gap-8 sm:gap-10">
              <div>
                <img src={salonLogo} alt="" className="h-12 sm:h-14 w-auto -ml-2" />
                <h3 className="font-display text-2xl sm:text-4xl text-ink mt-4 sm:mt-6">Hair Magic by Eranga</h3>
                <p className="font-serif italic text-gold text-base sm:text-lg mt-1">
                  Where Hair Meets Perfection.
                </p>
              </div>

              <ul className="space-y-4 sm:space-y-5 text-ink-soft text-sm sm:text-base">
                <li className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <span className="font-body">Colombo, Sri Lanka</span>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <a href="tel:+94000000000" className="link-underline">+94 00 000 0000</a>
                </li>
                <li className="flex items-start gap-4">
                  <MessageCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <a
                    href="https://wa.me/94000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    WhatsApp us
                  </a>
                </li>
                <li className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <div>Mon – Sat · 9:00 – 19:00</div>
                    <div className="text-xs sm:text-sm opacity-70">Sunday by appointment</div>
                  </div>
                </li>
              </ul>

              <a
                href="https://www.google.com/maps/place/Hair+Magic+by+Eranga"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-ink text-blush px-6 sm:px-8 py-3 sm:py-4 text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition-colors duration-500 self-start"
              >
                Get Directions
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="lg:col-span-3 min-h-[300px] sm:min-h-[400px] lg:min-h-0">
              <iframe
                title="Hair Magic by Eranga location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0006160802036!2d79.86749697598697!3d6.890528118787383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b85704fe2b3%3A0x4e7ae64cb7df4e74!2sHair%20Magic%20by%20Eranga!5e0!3m2!1sen!2slk!4v1780925711413!5m2!1sen!2slk"
                className="w-full h-full min-h-[300px] sm:min-h-[400px] grayscale-[30%]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* CTA                                         */
/* ─────────────────────────────────────────── */

function FinalCTA() {
  return (
    <section className="relative bg-ink text-blush py-24 sm:py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={g1} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
      </div>
      <div className="relative max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <Reveal>
          <p className="editorial-eyebrow text-gold mb-6 sm:mb-8">— Your turn</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="editorial-headline text-blush text-4xl sm:text-6xl md:text-8xl lg:text-[10rem]">
            Ready For Your Next
            <span className="block italic font-serif text-gold">Transformation?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 sm:mt-14 flex flex-wrap justify-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/94000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-blush text-ink px-6 sm:px-10 py-4 sm:py-5 text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold transition-colors duration-500"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-blush/40 text-blush px-6 sm:px-10 py-4 sm:py-5 text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase hover:bg-blush hover:text-ink transition-colors duration-500"
            >
              Contact Us
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* Footer                                      */
/* ─────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="bg-ink text-blush overflow-hidden">
      {/* Top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      {/* Main body */}
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        {/* Brand + tagline — full width top row */}
        <div className="border-b border-blush/10 pb-12 sm:pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <img src={footerLogo} alt="Hair Magic by Eranga" className="h-12 sm:h-16 w-auto" />
            <p className="font-serif italic text-2xl sm:text-3xl text-blush/80 mt-5 max-w-sm leading-snug">
              Where Hair Meets<br />
              <span className="text-gold">Perfection.</span>
            </p>
          </div>
          <a
            href="#contact"
            className="group self-start lg:self-end inline-flex items-center gap-3 border border-blush/20 text-blush px-7 py-4 text-[0.65rem] tracking-[0.25em] uppercase hover:border-gold hover:text-gold transition-colors duration-500"
          >
            Book Appointment
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Three columns */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 sm:gap-12 pt-12 sm:pt-16">

          {/* Navigate */}
          <div className="col-span-2 sm:col-span-1 md:col-span-3">
            <p className="editorial-eyebrow text-gold mb-6">Navigate</p>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-blush/60 hover:text-blush transition-colors duration-300 tracking-wide"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow */}
          <div className="col-span-2 sm:col-span-1 md:col-span-3">
            <p className="editorial-eyebrow text-gold mb-6">Follow</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/hairmagic_by_eranga/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 text-sm text-blush/60 hover:text-blush transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4 shrink-0" />
                  @hairmagic_by_eranga
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@hairmagicbyeranga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-blush/60 hover:text-blush transition-colors duration-300"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                  </svg>
                  @hairmagicbyeranga
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/p/Hair-Magic-By-Eranga-100094330872177/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-blush/60 hover:text-blush transition-colors duration-300"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Hair Magic By Eranga
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-6">
            <p className="editorial-eyebrow text-gold mb-6">Visit Us</p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-blush/60">
                <MapPin className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                Colombo, Sri Lanka
              </li>
              <li className="flex items-start gap-3 text-sm text-blush/60">
                <Phone className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <a href="tel:+94713740231" className="hover:text-blush transition-colors duration-300">+94 71 374 0231</a>
              </li>
              <li className="flex items-start gap-3 text-sm text-blush/60">
                <Clock className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                <span>Mon – Sat · 9:00 – 19:00<br /><span className="text-blush/40 text-xs">Sunday by appointment</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blush/10">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.6rem] tracking-[0.2em] uppercase text-blush/30 text-center">
          <div>© {new Date().getFullYear()} Hair Magic by Eranga · All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────── */
/* Page                                        */
/* ─────────────────────────────────────────── */

function Home() {
  return (
    <main className="bg-blush text-ink overflow-x-hidden">
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <TikTokSection />
      <Location />
      <FinalCTA />
      <Footer />
    </main>
  );
}
