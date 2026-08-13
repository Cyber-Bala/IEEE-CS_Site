import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { DOMAINS, DOMAIN_MEMBERS } from '../data/memberData';
import './MemberReveal.css';

// ── TARGET DATE: change this to control the unlock time ──
const REVEAL_DATE = new Date('2026-08-14T18:07:00+05:30');

const MemberReveal = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedDomains, setMatchedDomains] = useState(new Set());
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedDomainModal, setSelectedDomainModal] = useState(null);
  const [viewedDomains, setViewedDomains] = useState(new Set());

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isTimerDone, setIsTimerDone] = useState(Date.now() >= REVEAL_DATE.getTime());

  const canvasRef = useRef(null);
  const timeoutRef = useRef(null);

  // ── Build shuffled deck ────────────────────────────────────────
  const initGame = () => {
    const pairs = [];
    DOMAINS.forEach(domain => {
      pairs.push(
        { instanceId: `${domain.id}-A`, domainId: domain.id, name: domain.name, icon: domain.icon, isFlipped: false, isMatched: false },
        { instanceId: `${domain.id}-B`, domainId: domain.id, name: domain.name, icon: domain.icon, isFlipped: false, isMatched: false }
      );
    });

    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }

    setCards(pairs);
    setFlippedCards([]);
    setMatchedDomains(new Set());
    setIsUnlocked(false);
    setViewedDomains(new Set());
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // ── Skip Game Option ──────────────────────────────────────────
  const handleSkipGame = () => {
    setCards(prev => prev.map(c => ({ ...c, isFlipped: true, isMatched: true })));
    const allDomainIds = new Set(DOMAINS.map(d => d.id));
    setMatchedDomains(allDomainIds);
    setIsUnlocked(true);
    triggerConfetti();
    showToast('Game Skipped! All Domain Teams Unlocked');
    setTimeout(() => {
      const el = document.getElementById('domain-selection-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    initGame();
  }, []);

  // ── Countdown timer ────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const diff = REVEAL_DATE.getTime() - now;

      if (diff <= 0) {
        setIsTimerDone(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // ── Particle network ──────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);

    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 1.5 + 0.8
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      nodes.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.fillStyle = 'rgba(255, 163, 0, 0.35)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const q = nodes[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.strokeStyle = `rgba(255, 163, 0, ${0.1 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(animId); };
  }, []);

  // ── Confetti burst ────────────────────────────────────────────
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const bits = Array.from({ length: 80 }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      vx: (Math.random() - 0.5) * 14,
      vy: (Math.random() - 0.7) * 14,
      size: Math.random() * 4 + 2,
      color: ['#FFA300', '#ffb733', '#ff7a00', '#FFFFFF', '#F0EFEB'][Math.floor(Math.random() * 5)],
      life: 1
    }));

    let frame = 0;
    const animate = () => {
      frame++;
      bits.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.3;
        p.life -= 0.015;
        if (p.life > 0) {
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });
      if (frame < 70) requestAnimationFrame(animate);
    };
    animate();
  };

  // ── Toast ─────────────────────────────────────────────────────
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ── Card click ────────────────────────────────────────────────
  const handleCardClick = (index) => {
    if (!isTimerDone) return; // Block clicks if timer is running

    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    // If 2 cards are already flipped (a mismatch waiting to reset), flip them back immediately
    if (flippedCards.length === 2) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      const [a, b] = flippedCards;
      setCards(prev => {
        const c = [...prev];
        c[a].isFlipped = false;
        c[b].isFlipped = false;
        c[index].isFlipped = true;
        return c;
      });
      setFlippedCards([index]);
      return;
    }

    const updated = [...cards];
    updated[index].isFlipped = true;
    setCards(updated);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [a, b] = newFlipped;

      if (cards[a].domainId === cards[b].domainId) {
        setTimeout(() => {
          setCards(prev => {
            const c = [...prev];
            c[a].isMatched = true;
            c[b].isMatched = true;
            return c;
          });
          setFlippedCards([]);
          setMatchedDomains(prev => {
            const next = new Set(prev);
            next.add(cards[a].domainId);
            showToast(`${cards[a].name} unlocked`);

            if (next.size === DOMAINS.length) {
              setIsUnlocked(true);
              triggerConfetti();
              setTimeout(() => {
                const el = document.getElementById('domain-selection-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 1000);
            }
            return next;
          });
        }, 300);
      } else {
        timeoutRef.current = setTimeout(() => {
          setCards(prev => {
            const c = [...prev];
            c[a].isFlipped = false;
            c[b].isFlipped = false;
            return c;
          });
          setFlippedCards([]);
          timeoutRef.current = null;
        }, 500);
      }
    }
  };

  // ── Modal ─────────────────────────────────────────────────────
  const openDomain = (domain) => {
    if (!isUnlocked) return;
    setSelectedDomainModal(domain);
    setViewedDomains(prev => new Set(prev).add(domain.id));
  };

  const closeModal = () => setSelectedDomainModal(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedDomainModal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedDomainModal]);

  return (
    <div className="reveal-page">
      <Navbar />

      {/* ── COUNTDOWN OVERLAY ────────────────────────── */}
      {!isTimerDone && (
        <div className="countdown-overlay">
          {/* Top Left Back Button */}
          <Link to="/" className="countdown-top-left-back">
            <i className="fas fa-arrow-left" />
            <span>BACK TO HOME</span>
          </Link>

          <div className="countdown-content">
            <span className="countdown-eyebrow">MEMBER REVEAL</span>
            <h1 className="countdown-heading">
              SOMETHING BIG IS <span className="gold">COMING.</span>
            </h1>

            <div className="countdown-code-badge">
              <span className="code-badge-text">6:07</span>
            </div>

            <p className="countdown-sub">
              The new team will be revealed when the countdown hits zero.
            </p>

            <div className="countdown-timer">
              <div className="countdown-unit">
                <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="countdown-label">DAYS</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">HOURS</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">MINS</span>
              </div>
              <span className="countdown-sep">:</span>
              <div className="countdown-unit">
                <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">SECS</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="reveal-bg-canvas" />
      <div className="reveal-cyber-grid" />

      <main className={`reveal-container ${!isTimerDone ? 'reveal-blurred' : ''}`}>

        {/* ── HERO ──────────────────────────────────────── */}
        <section className="reveal-hero">
          <span className="reveal-eyebrow">
            <span className="reveal-eyebrow-dot" />
            MEMBER REVEAL
          </span>

          <h1 className="reveal-title">
            THE NEW TEAM IS <span className="gold">HIDDEN.</span>
          </h1>

          <p className="reveal-subtitle">
            Match all the domains to unlock the new members of IEEE Computer Society.
          </p>

          <div className="reveal-progress-box">
            <div className="reveal-progress-label">
              <span>DOMAINS UNLOCKED</span>
              <span>{matchedDomains.size} / {DOMAINS.length}</span>
            </div>
            <div className="reveal-progress-track">
              <div
                className="reveal-progress-bar"
                style={{ width: `${(matchedDomains.size / DOMAINS.length) * 100}%` }}
              />
            </div>
          </div>

          {!isUnlocked && (
            <div className="hero-actions-row">
              <button className="skip-game-btn" onClick={handleSkipGame}>
                <i className="fas fa-forward" />
                <span>SKIP GAME &amp; REVEAL TEAM</span>
              </button>
            </div>
          )}
        </section>

        {/* Toast */}
        {toastMessage && (
          <div className="reveal-toast">
            <i className="fas fa-check-circle" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* ── MEMORY GRID ─────────────────────────────── */}
        <section className="memory-grid">
          {cards.map((card, idx) => (
            <div
              key={card.instanceId}
              className={`memory-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}`}
              style={{ animationDelay: `${idx * 40}ms` }}
              onClick={() => handleCardClick(idx)}
            >
              <div className="memory-card-inner">
                <div className="memory-card-face memory-card-front">
                  <span className="card-question-mark">?</span>
                </div>

                <div className="memory-card-face memory-card-back">
                  <i className={`card-domain-icon ${card.icon}`} />
                  <span className="card-domain-name">{card.name}</span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Skip option under game */}
        {!isUnlocked && (
          <div className="skip-game-container">
            <button className="skip-game-btn secondary" onClick={handleSkipGame}>
              <i className="fas fa-fast-forward" />
              <span>Don't want to play? Skip Game to View Results</span>
            </button>
          </div>
        )}

        {/* ── UNLOCK BANNER (Right After Game) ────────────────────────────── */}
        {isUnlocked && (
          <section className="unlock-celebration">
            <h2 className="unlock-title">
              Welcome to the <span className="gold">New Team</span>
            </h2>
            <p className="unlock-sub">
              THE NEXT CHAPTER STARTS NOW.
            </p>
            <button
              className="unlock-btn"
              onClick={() => {
                const el = document.getElementById('domain-selection-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>MEET THE TEAM</span>
              <i className="fas fa-arrow-down" />
            </button>
          </section>
        )}

        {/* ── DOMAIN SELECTION ─────────────────────────── */}
        <section className="domain-section" id="domain-selection-section">
          <div className="domain-section-header">
            <h2 className="domain-section-title">Meet the New Team</h2>
            <p className="domain-section-sub">
              {isUnlocked
                ? 'Select a domain to reveal the members behind it.'
                : 'Complete the memory game above to reveal all 9 domain categories.'}
            </p>
          </div>

          {!isUnlocked ? (
            <div className="domain-locked-overlay">
              <i className="fas fa-lock domain-locked-icon" />
              <div className="domain-locked-text">LOCKED</div>
              <p style={{ color: 'var(--muted)', margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem' }}>
                Match all 9 domain pairs in the memory game to unlock team access.
              </p>
            </div>
          ) : (
            <div className="domain-grid">
              {DOMAINS.map((domain, idx) => {
                const members = DOMAIN_MEMBERS[domain.id] || [];
                const viewed = viewedDomains.has(domain.id);

                return (
                  <div
                    key={domain.id}
                    className="domain-card"
                    style={{ animationDelay: `${idx * 70}ms` }}
                    onClick={() => openDomain(domain)}
                  >
                    <div className="domain-card-top">
                      <div className="domain-icon-wrap">
                        <i className={domain.icon} />
                      </div>
                      <span className="domain-count-badge">{members.length} MEMBERS</span>
                    </div>

                    <h3 className="domain-card-name">{domain.name}</h3>
                    <p className="domain-card-desc">{domain.desc}</p>

                    <div className="domain-card-footer">
                      <span className="domain-view-btn">
                        <span>EXPLORE</span>
                        <i className="fas fa-arrow-right" />
                      </span>
                      {viewed && <span className="domain-viewed-pill">VIEWED</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── MEMBER MODAL ─────────────────────────────── */}
        {selectedDomainModal && (
          <div className="member-modal-backdrop" onClick={closeModal}>
            <div className="member-modal-content" onClick={e => e.stopPropagation()}>
              <button className="member-modal-close" onClick={closeModal} aria-label="Close">
                <i className="fas fa-times" />
              </button>

              <div className="member-modal-header">
                <div className="member-modal-icon">
                  <i className={selectedDomainModal.icon} />
                </div>
                <div className="member-modal-title-group">
                  <h2>{selectedDomainModal.name} TEAM</h2>
                  <p>{selectedDomainModal.desc}</p>
                </div>
              </div>

              <div className="member-cards-grid">
                {(DOMAIN_MEMBERS[selectedDomainModal.id] || []).map((member, idx) => (
                  <div
                    key={`${selectedDomainModal.id}-${idx}`}
                    className={`member-card ${member.isLead ? 'is-lead' : ''}`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {member.isLead && <span className="member-lead-pill">TEAM LEAD</span>}
                    <div className="member-icon-circle">
                      <i className="fas fa-user" />
                    </div>
                    <h4 className="member-name">{member.name}</h4>
                    <span className="member-roll">{member.rollNo}</span>
                    {member.dept && <span className="member-dept">{member.dept}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


      </main>
    </div>
  );
};

export default MemberReveal;
