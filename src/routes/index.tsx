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
  Star,
  Menu,
  X,
} from "lucide-react";

import logoAsset from "@/assets/logo.png.asset.json";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import sBalayage from "@/assets/service-balayage.jpg";
import sOmbre from "@/assets/service-ombre.jpg";
import sBlonde from "@/assets/service-blonde.jpg";
import sColor from "@/assets/service-color.jpg";
import sTreatment from "@/assets/service-treatment.jpg";
import sBridal from "@/assets/service-bridal.jpg";
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
        content: "Luxury Hair Transformations by Eranga — Where Hair Meets Perfection.",
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-blush/85 backdrop-blur-xl border-b border-ink/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src={logoAsset.url} alt="Hair Magic by Eranga" className="h-8 sm:h-10 md:h-12 w-auto" />
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[560px] md:min-h-[720px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury hair transformation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blush/40 via-blush/20 to-blush/80" />
        <div className="absolute inset-0 bg-ink/10" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col">
        <div className="flex-1 flex items-center pt-20 md:pt-0">
          <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="editorial-eyebrow text-ink-soft mb-4 sm:mb-6 text-[0.6rem] sm:text-[0.7rem]"
            >
              ✦ Luxury Hair Studio · Sri Lanka
            </motion.p>

            <h1 className="editorial-headline text-ink text-[3.25rem] sm:text-[5rem] md:text-[10vw] lg:text-[8.5vw] leading-[0.88] max-w-[1300px]">
              <SplitReveal text="Where Hair" />
              <span className="block italic font-serif text-gold mt-1">
                <SplitReveal text="Meets Perfection." delay={0.25} />
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mt-6 sm:mt-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6 sm:gap-8 max-w-[1100px]"
            >
              <p className="font-serif text-base sm:text-xl md:text-2xl text-ink-soft max-w-md leading-snug">
                Luxury hair transformations <em className="text-gold">by Eranga</em> — crafted with
                the care of a couture atelier.
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-3 bg-ink text-blush px-5 py-3 sm:px-8 sm:py-4 text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition-colors duration-500"
                >
                  Book Appointment
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#gallery"
                  className="group inline-flex items-center gap-3 border border-ink text-ink px-5 py-3 sm:px-8 sm:py-4 text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase hover:bg-ink hover:text-blush transition-colors duration-500"
                >
                  View Transformations
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="pb-10 flex justify-center"
        >
          <div className="flex flex-col items-center gap-3 text-ink-soft">
            <span className="text-[0.65rem] tracking-[0.4em] uppercase">Scroll</span>
            <div className="relative h-12 w-px bg-ink/20 overflow-hidden">
              <span className="absolute inset-x-0 top-0 h-3 bg-ink scroll-dot" />
            </div>
          </div>
        </motion.div>
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
    <div className="border-y border-ink/15 bg-blush py-6 overflow-hidden">
      <div className="flex marquee-track whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="font-display italic text-3xl md:text-5xl text-ink mx-10 inline-flex items-center gap-10"
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
    <section className="bg-cream py-24 lg:py-32">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        <Reveal>
          <p className="editorial-eyebrow text-gold mb-4">— By the numbers</p>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mt-10">
          {STATS.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.1}>
              <div className="border-t border-ink/20 pt-6">
                <div className="font-display text-5xl md:text-6xl lg:text-7xl text-ink leading-none">
                  {s.n}
                </div>
                <div className="mt-4 text-sm tracking-[0.15em] uppercase text-ink-soft">
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

const SERVICES = [
  { no: "01", name: "Balayage", img: sBalayage, blurb: "Hand-painted highlights for a sun-kissed glow that grows out beautifully." },
  { no: "02", name: "Ombre", img: sOmbre, blurb: "A seamless gradient — depth at the roots, light at the ends." },
  { no: "03", name: "Blonde Transformations", img: sBlonde, blurb: "From any base to your most luminous blonde, protected and pristine." },
  { no: "04", name: "Hair Coloring", img: sColor, blurb: "Custom-mixed couture color crafted for your skin, eyes and lifestyle." },
  { no: "05", name: "Hair Treatments", img: sTreatment, blurb: "Salon rituals that restore shine, strength and softness." },
  { no: "06", name: "Bridal Hair Styling", img: sBridal, blurb: "Editorial bridal styling — timeless, photogenic, unforgettable." },
];

function Services() {
  return (
    <section id="services" className="bg-blush py-28 lg:py-40">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-6">— What we do</p>
            <h2 className="editorial-headline text-ink text-6xl md:text-8xl lg:text-9xl">
              Signature
              <span className="block italic font-serif text-gold">Services.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif text-xl text-ink-soft max-w-md leading-relaxed">
              Six house specialties — every appointment begins with a private
              consultation and ends with a transformation worth sharing.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={(i % 3) * 0.1}>
              <article className="group cursor-pointer">
                <div className="hover-zoom relative aspect-[3/4] bg-cream">
                  <img
                    src={s.img}
                    alt={s.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 font-display text-blush text-sm tracking-widest mix-blend-difference">
                    {s.no}
                  </div>
                  <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-blush flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-ink" />
                  </div>
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <h3 className="font-display text-2xl md:text-3xl text-ink leading-tight">
                    {s.name}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-ink-soft leading-relaxed max-w-sm">{s.blurb}</p>
              </article>
            </Reveal>
          ))}
        </div>
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
    <section id="gallery" className="bg-ink text-blush py-28 lg:py-40">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-6">— Real Results</p>
            <h2 className="editorial-headline text-blush text-6xl md:text-8xl lg:text-[9rem]">
              Real
              <span className="block italic font-serif text-gold">Results.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="font-serif text-xl text-blush/70 max-w-md leading-relaxed">
              No filters. No retouching. Just real transformations from inside
              the studio.
            </p>
          </Reveal>
        </div>

        {/* Masonry via CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08} className="mb-6 break-inside-avoid">
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
          <div className="mt-16 flex justify-center">
            <a
              href="https://www.instagram.com/hairmagic_by_eranga/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-blush/40 text-blush px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-blush hover:text-ink transition-colors duration-500"
            >
              See more on Instagram
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
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
    <section id="about" ref={ref} className="bg-cream py-28 lg:py-40 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/5] bg-blush overflow-hidden">
            <motion.img
              style={{ y }}
              src={aboutImg}
              alt="Eranga — Founder"
              loading="lazy"
              className="w-full h-[115%] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-blush px-6 py-4 border border-ink/10">
              <div className="font-display italic text-2xl text-ink">Eranga</div>
              <div className="text-[0.65rem] tracking-[0.3em] uppercase text-ink-soft mt-1">
                Founder · Hair Artist
              </div>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-6">— The artist</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="editorial-headline text-ink text-5xl md:text-7xl lg:text-[5.5rem]">
              The Art Behind
              <span className="block italic font-serif text-gold">Every Transformation.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 space-y-6 font-serif text-xl text-ink-soft leading-relaxed max-w-[55ch]">
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
            <div className="mt-12 grid grid-cols-2 gap-8 max-w-md">
              <div>
                <div className="font-display text-4xl text-ink">10+</div>
                <div className="text-xs tracking-[0.25em] uppercase text-ink-soft mt-2">
                  Years Experience
                </div>
              </div>
              <div>
                <div className="font-display text-4xl text-ink">5★</div>
                <div className="text-xs tracking-[0.25em] uppercase text-ink-soft mt-2">
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

/* ─────────────────────────────────────────── */
/* Testimonials                                */
/* ─────────────────────────────────────────── */

const REVIEWS = [
  {
    quote:
      "Eranga is a genuine artist. My balayage looks unreal — I've never had so many compliments in my life.",
    name: "Nadeesha P.",
    src: "Google Review",
  },
  {
    quote:
      "I flew in from Dubai for my wedding hair. Worth every mile. The most luxurious salon experience.",
    name: "Aisha R.",
    src: "Instagram",
  },
  {
    quote:
      "Walked in with damaged hair, walked out feeling like a magazine cover. This place is pure magic.",
    name: "Hiruni W.",
    src: "Google Review",
  },
];

function Testimonials() {
  return (
    <section className="relative bg-blush py-28 lg:py-40 overflow-hidden">
      {/* decorative gradient */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/20 blur-[120px]" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold/15 blur-[120px]" />

      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-20">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-6">— Social proof</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="editorial-headline text-ink text-5xl md:text-7xl lg:text-8xl">
              Loved By Our
              <span className="italic font-serif text-gold"> Community.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <article className="glass-card p-10 h-full flex flex-col">
                <div className="flex gap-1 text-gold mb-6">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="font-serif text-2xl text-ink leading-snug flex-1">
                  “{r.quote}”
                </blockquote>
                <footer className="mt-8 pt-6 border-t border-ink/10 flex items-center justify-between">
                  <div className="font-display text-lg text-ink">{r.name}</div>
                  <div className="text-[0.65rem] tracking-[0.3em] uppercase text-ink-soft">
                    {r.src}
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* Instagram scroller                          */
/* ─────────────────────────────────────────── */

function InstagramRow() {
  const IMGS = [g1, g3, g6, g2, g5, g4, g1, g6];
  return (
    <section className="bg-cream py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
        <Reveal>
          <p className="editorial-eyebrow text-gold mb-6">— @hairmagic_by_eranga</p>
          <h2 className="editorial-headline text-ink text-5xl md:text-7xl">
            Latest from
            <span className="italic font-serif text-gold"> Instagram.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <a
            href="https://www.instagram.com/hairmagic_by_eranga/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-ink link-underline text-sm tracking-[0.25em] uppercase"
          >
            <Instagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </Reveal>
      </div>

      <div className="overflow-x-auto scrollbar-none px-6 lg:px-10">
        <div className="flex gap-5 pb-4 min-w-max">
          {IMGS.map((src, i) => (
            <a
              key={i}
              href="https://www.instagram.com/hairmagic_by_eranga/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-[280px] md:w-[340px] aspect-[4/5] flex-shrink-0 hover-zoom"
            >
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-500 flex items-center justify-center">
                <Instagram className="w-8 h-8 text-blush opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* TikTok                                      */
/* ─────────────────────────────────────────── */

function TikTokSection() {
  useEffect(() => {
    const id = "tiktok-embed-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.async = true;
    s.src = "https://www.tiktok.com/embed.js";
    document.body.appendChild(s);
  }, []);

  return (
    <section className="bg-blush py-28 lg:py-36">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <Reveal className="lg:col-span-6">
          <p className="editorial-eyebrow text-gold mb-6">— On TikTok</p>
          <h2 className="editorial-headline text-ink text-5xl md:text-7xl">
            Watch The
            <span className="block italic font-serif text-gold">Magic Happen.</span>
          </h2>
          <p className="mt-8 font-serif text-xl text-ink-soft leading-relaxed max-w-md">
            Behind-the-scenes reels from inside the studio — color formulas,
            blow-outs, and full transformation reveals.
          </p>
          <a
            href="https://www.tiktok.com/@hairmagicbyeranga"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 group inline-flex items-center gap-3 bg-ink text-blush px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition-colors duration-500"
          >
            Open TikTok
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-6">
          <div className="glass-card p-4 md:p-6 mx-auto max-w-[400px]">
            <blockquote
              className="tiktok-embed"
              cite="https://www.tiktok.com/@hairmagicbyeranga"
              data-unique-id="hairmagicbyeranga"
              data-embed-type="creator"
              style={{ maxWidth: 780, minWidth: 288 }}
            >
              <section>
                <a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@hairmagicbyeranga">
                  @hairmagicbyeranga
                </a>
              </section>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────── */
/* Location / Contact                          */
/* ─────────────────────────────────────────── */

function Location() {
  return (
    <section id="contact" className="bg-cream py-28 lg:py-40">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <Reveal>
            <p className="editorial-eyebrow text-gold mb-6">— Visit the studio</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="editorial-headline text-ink text-5xl md:text-7xl lg:text-8xl">
              Come See
              <span className="italic font-serif text-gold"> Us.</span>
            </h2>
          </Reveal>
        </div>

        <Reveal>
          <div className="bg-blush border border-ink/10 overflow-hidden grid lg:grid-cols-5">
            <div className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-between gap-10">
              <div>
                <img src={logoAsset.url} alt="" className="h-14 w-auto -ml-2" />
                <h3 className="font-display text-4xl text-ink mt-6">Hair Magic by Eranga</h3>
                <p className="font-serif italic text-gold text-lg mt-1">
                  Where Hair Meets Perfection.
                </p>
              </div>

              <ul className="space-y-5 text-ink-soft">
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
                    <div className="text-sm opacity-70">Sunday by appointment</div>
                  </div>
                </li>
              </ul>

              <a
                href="https://www.google.com/maps/place/Hair+Magic+by+Eranga"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-ink text-blush px-8 py-4 text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-ink transition-colors duration-500 self-start"
              >
                Get Directions
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="lg:col-span-3 min-h-[400px] lg:min-h-0">
              <iframe
                title="Hair Magic by Eranga location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0006160802036!2d79.86749697598697!3d6.890528118787383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25b85704fe2b3%3A0x4e7ae64cb7df4e74!2sHair%20Magic%20by%20Eranga!5e0!3m2!1sen!2slk!4v1780925711413!5m2!1sen!2slk"
                className="w-full h-full min-h-[400px] grayscale-[30%]"
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
    <section className="relative bg-ink text-blush py-32 lg:py-48 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src={g1} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
      </div>
      <div className="relative max-w-[1500px] mx-auto px-6 lg:px-10 text-center">
        <Reveal>
          <p className="editorial-eyebrow text-gold mb-8">— Your turn</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="editorial-headline text-blush text-6xl md:text-8xl lg:text-[10rem]">
            Ready For Your Next
            <span className="block italic font-serif text-gold">Transformation?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/94000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-blush text-ink px-10 py-5 text-xs tracking-[0.25em] uppercase hover:bg-gold transition-colors duration-500"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-blush/40 text-blush px-10 py-5 text-xs tracking-[0.25em] uppercase hover:bg-blush hover:text-ink transition-colors duration-500"
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
    <footer className="bg-blush border-t border-ink/15">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <img src={logoAsset.url} alt="Hair Magic by Eranga" className="h-16 w-auto -ml-2" />
          <p className="font-serif italic text-xl text-ink mt-4 max-w-sm">
            Where Hair Meets Perfection.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="editorial-eyebrow text-ink-soft mb-5">Menu</p>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="link-underline text-ink">{n.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="editorial-eyebrow text-ink-soft mb-5">Follow</p>
          <ul className="space-y-3">
            <li>
              <a
                href="https://www.instagram.com/hairmagic_by_eranga/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 link-underline text-ink"
              >
                <Instagram className="w-4 h-4" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@hairmagicbyeranga"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-ink"
              >
                TikTok
              </a>
            </li>
            <li className="inline-flex items-center gap-3 text-ink">
              <MapPin className="w-4 h-4" /> Colombo, Sri Lanka
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs tracking-[0.2em] uppercase text-ink-soft">
          <div>© {new Date().getFullYear()} Hair Magic by Eranga · All rights reserved</div>
          <div>Crafted with care in Sri Lanka</div>
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
      <Marquee />
      <Stats />
      <Services />
      <Gallery />
      <About />
      <Testimonials />
      <InstagramRow />
      <TikTokSection />
      <Location />
      <FinalCTA />
      <Footer />
    </main>
  );
}
