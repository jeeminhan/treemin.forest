import { Tree } from '@/components/tree/tree';
import { Roots } from '@/components/tree/roots';
import { Particles } from '@/components/tree/particles';
import { AboutSection } from '@/components/sections/about-section';
import { ResumeSection } from '@/components/sections/resume-section';
import { MinistrySection } from '@/components/sections/ministry-section';
import { CreativeSection } from '@/components/sections/creative-section';
import { ContactSection } from '@/components/sections/contact-section';

export default function Home() {
  return (
    <main>
      <Particles />

      {/* Hero: Tree */}
      <section className="min-h-svh flex flex-col items-center justify-center px-4 relative z-1">
        {/* Name & tagline */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-semibold tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            Jeemin Han
          </h1>
          <p
            className="text-sm mt-2 max-w-md mx-auto"
            style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-body)' }}
          >
            I look at how things currently work, see what they could be, and redesign them.
          </p>
        </div>

        {/* Tree */}
        <Tree />

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            scroll to explore
          </span>
          <span className="text-lg" style={{ color: 'var(--text-tertiary)' }}>↓</span>
        </div>
      </section>

      {/* Roots navigation */}
      <Roots />

      {/* Root content sections */}
      <div className="relative z-1">
        <AboutSection />
        <ResumeSection />
        <MinistrySection />
        <CreativeSection />
        <ContactSection />
      </div>

      {/* Footer */}
      <footer className="text-center py-12">
        <p className="text-xs" style={{ color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          © {new Date().getFullYear()} Jeemin Han
        </p>
      </footer>
    </main>
  );
}
