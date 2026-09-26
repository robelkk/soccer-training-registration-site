import Image from "next/image";
import { ArrowRight, CalendarDays, Check, Clock3, MapPin, ShieldCheck, Sparkles, Target, Users } from "lucide-react";
import RegistrationForm from "@/components/registration-form";

const programs = [
  { age: "Ages 5–7", title: "Rookie Kickers", time: "Saturdays · 9:00 AM", detail: "Fun fundamentals, balance, coordination, and confidence with the ball." },
  { age: "Ages 8–11", title: "Skill Builders", time: "Saturdays · 10:15 AM", detail: "First touch, dribbling, passing, movement, and small-sided games." },
  { age: "Ages 12–15", title: "Next Level", time: "Sundays · 11:00 AM", detail: "Technical speed, decision-making, fitness, and game awareness." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Youth Soccer Training home">
          <span className="brand-mark">YS</span>
          <span><strong>Youth Soccer</strong><small>Training Academy</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#programs">Programs</a><a href="#approach">Our approach</a><a href="#register">Register</a>
        </nav>
        <a className="header-cta" href="#register">Register your child <ArrowRight size={16} /></a>
      </header>

      <section className="hero" id="top">
        <Image src="/soccer-training-hero.png" alt="Children practicing soccer skills with a coach on an outdoor field" fill priority sizes="100vw" className="hero-image" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="eyebrow"><Sparkles size={16} /> Registration is open</p>
          <h1>Strong skills.<br/><em>Confident players.</em></h1>
          <p className="hero-copy">Positive, age-appropriate soccer training where every child gets more touches, clear coaching, and room to grow.</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#register">Save a training spot <ArrowRight size={18} /></a>
            <a className="text-link" href="#programs">View age groups</a>
          </div>
          <div className="hero-facts">
            <span><MapPin size={17}/> Seattle area</span><span><Users size={17}/> Small groups</span><span><ShieldCheck size={17}/> Safe & supportive</span>
          </div>
        </div>
      </section>

      <section className="programs section" id="programs">
        <div className="section-heading"><div><p className="kicker">Find the right group</p><h2>Training built for their stage</h2></div><p>Each session balances individual technique, team play, and a love of the game.</p></div>
        <div className="program-grid">
          {programs.map((program, index) => (
            <article className="program-card" key={program.title}>
              <div className="program-number">0{index + 1}</div><span className="age-pill">{program.age}</span><h3>{program.title}</h3><p>{program.detail}</p>
              <div className="program-time"><Clock3 size={17}/>{program.time}</div><a href="#register">Choose this program <ArrowRight size={16}/></a>
            </article>
          ))}
        </div>
      </section>

      <section className="approach section" id="approach">
        <div className="approach-intro"><p className="kicker">More touches. Better habits.</p><h2>Coaching kids can feel good about</h2><p>We teach one clear idea at a time, let players practice it at speed, then help them use it in game-like situations.</p></div>
        <div className="approach-list">
          <div><Target/><span><strong>Purposeful practice</strong><small>Every drill connects to a skill your child can use in a game.</small></span></div>
          <div><Users/><span><strong>Personal attention</strong><small>Small groups help coaches see and support every player.</small></span></div>
          <div><CalendarDays/><span><strong>Consistent progress</strong><small>A simple weekly rhythm builds confidence without burnout.</small></span></div>
        </div>
      </section>

      <section className="register-section" id="register">
        <div className="register-copy"><p className="kicker light">Simple online registration</p><h2>Give your child a place to grow.</h2><p>Tell us about your player and choose a program. We’ll contact you to confirm the available session and next steps.</p>
          <ul><li><Check/> No payment required today</li><li><Check/> Parent confirmation before placement</li><li><Check/> Information stored securely</li></ul>
        </div>
        <RegistrationForm />
      </section>

      <footer><div className="brand footer-brand"><span className="brand-mark">YS</span><span><strong>Youth Soccer</strong><small>Training Academy</small></span></div><p>Seattle area youth soccer training</p><p>© 2026 Youth Soccer Training Academy</p></footer>
    </main>
  );
}
