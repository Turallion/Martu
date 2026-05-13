'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Particles from './Particles';

type Screen = 'intro' | 'no' | 'right' | 'gifts' | 'letter' | 'vinyl' | 'love';

const fade = { initial: { opacity: 0, y: 20, scale: .98 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -16, scale: .98 } };
const img = (name: string) => `/images/${name}.png`;
const vinylPhotos = ['/images/vinyl-photo-1.jpg'];
const bubblePositions = [
  { left: '50%', top: '4%' },
  { left: '76%', top: '14%' },
  { left: '88%', top: '38%' },
  { left: '82%', top: '66%' },
  { left: '64%', top: '86%' },
  { left: '36%', top: '86%' },
  { left: '18%', top: '66%' },
  { left: '12%', top: '38%' },
  { left: '24%', top: '14%' },
];
const gifts = [
  { id: 'letter' as Screen, title: 'A letter', image: img('gift-letter'), hint: 'something from my heart' },
  { id: 'vinyl' as Screen, title: 'A song', image: img('gift-vinyl'), hint: 'our tiny memory record' },
  { id: 'love' as Screen, title: 'You', image: img('gift-love'), hint: 'all the things I adore' },
];
const bubbles = ['your serious face', 'your mispronunciations', 'давааай', 'Threads memes', 'your music taste', 'your movie taste', 'your beautiful photos', 'your rules', 'your jokes'];

function RomanticImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <Image src={src} alt={alt} width={520} height={520} priority className={`mx-auto h-auto max-h-[46vh] w-auto rounded-[2rem] object-contain shadow-2xl shadow-pink-300/30 ${className}`} />;
}
function Button({ children, onClick, shy = false }: { children: React.ReactNode; onClick: () => void; shy?: boolean }) {
  return <motion.button whileHover={shy ? { x: 22, y: -10, rotate: -3 } : { scale: 1.06, y: -3 }} whileTap={{ scale: .96 }} onClick={onClick} className="rounded-full bg-white/70 px-7 py-3 font-bold text-pink-700 shadow-xl shadow-pink-300/30 ring-1 ring-white/70 transition hover:bg-white">{children}</motion.button>;
}
function Frame({ children }: { children: React.ReactNode }) {
  return <motion.section {...fade} transition={{ duration: .65, ease: 'easeOut' }} className="relative z-10 mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-5 py-10 text-center">{children}</motion.section>;
}

export default function AnniversarySite() {
  const [screen, setScreen] = useState<Screen>('intro');
  const [openLetter, setOpenLetter] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  const goToScreen = (nextScreen: Screen) => {
    if (nextScreen === 'vinyl') {
      audio.current?.play().catch(() => {});
    } else {
      audio.current?.pause();
      if (audio.current) audio.current.currentTime = 0;
    }
    setScreen(nextScreen);
  };

  useEffect(() => {
    if (screen !== 'vinyl') audio.current?.pause();
  }, [screen]);

  return <main className="relative min-h-screen overflow-hidden">
    <Particles />
    <audio ref={audio} src="/music/our-song.mp3" loop preload="auto" controls className={screen === 'vinyl' ? 'fixed bottom-5 left-1/2 z-30 w-[min(92vw,420px)] -translate-x-1/2 rounded-full bg-white/80 shadow-2xl shadow-pink-300/40' : 'hidden'} />
    <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-72 bg-gradient-to-b from-white/45 to-transparent" />
    <AnimatePresence mode="wait">
      {screen === 'intro' && <Frame key="intro"><motion.p initial={{opacity:0}} animate={{opacity:1}} className="mb-4 text-sm font-semibold uppercase tracking-[.35em] text-pink-500/80">tiny handmade website</motion.p><h1 className="mb-7 text-4xl font-black sm:text-6xl">I made something for you ❤️</h1><RomanticImage src={img('intro-main')} alt="intro" /><div className="mt-9 flex gap-4"><Button onClick={() => setScreen('right')}>Yes</Button><Button onClick={() => setScreen('no')}>No</Button></div></Frame>}
      {screen === 'no' && <Frame key="no"><h1 className="mb-7 text-5xl font-black">How dare you 😠</h1><RomanticImage src={img('no-choice')} alt="no choice" /><div className="mt-9"><Button shy onClick={() => setScreen('intro')}>Try again</Button></div></Frame>}
      {screen === 'right' && <Frame key="right"><h1 className="mb-7 text-4xl font-black sm:text-6xl">You made the right choice ❤️</h1><RomanticImage src={img('right-choice')} alt="right choice" /><div className="mt-9"><Button onClick={() => setScreen('gifts')}>Continue</Button></div></Frame>}
      {screen === 'gifts' && <Frame key="gifts"><h1 className="mb-9 text-4xl font-black sm:text-6xl">Choose your gift 🎁</h1><div className="grid w-full gap-5 sm:grid-cols-3">{gifts.map((g, i) => <motion.button key={g.id} onClick={() => goToScreen(g.id)} className="glass rounded-[2rem] p-5 text-left" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, delay: i * .35, repeat: Infinity }} whileHover={{ scale: 1.04, rotate: i - 1 }} whileTap={{ scale: .97 }}><Image src={g.image} alt={g.title} width={420} height={420} className="aspect-square w-full rounded-[1.5rem] object-contain" /><h2 className="mt-4 text-2xl font-black text-pink-800">{g.title}</h2><p className="text-pink-700/75">{g.hint}</p></motion.button>)}</div></Frame>}
      {screen === 'letter' && <Frame key="letter"><button onClick={() => { setOpenLetter(false); setScreen('gifts'); }} className="mb-5 text-pink-700/70">← gifts</button><div className="mt-7"><Button onClick={() => setOpenLetter(true)}>Open letter</Button></div><AnimatePresence>{openLetter && <motion.div initial={{ rotateX: -88, opacity: 0, y: -40 }} animate={{ rotateX: 0, opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: .9, ease: 'easeOut' }} className="paper-shadow mt-8 max-w-2xl rounded-[1.7rem] bg-[#fffaf1]/90 p-7 text-left leading-8 text-[#6b3d56] sm:p-10"><p className="whitespace-pre-line font-medium">{`My dear, happy 5.5 anniversary ❤️\n\nWe’ve already gone through such a long journey together, and I’m sure this is only the beginning of our story.\n\nThank you for your love, support, and care.\n\nI love your serious face, your funny mispronunciations, your iconic ‘давааай’, your Threads memes, your taste in music and movies, your jokes, and even your rules 😄\n\nThank you for making my life happier just by being рядом.\n\nI love you ❤️`}</p></motion.div>}</AnimatePresence></Frame>}
      {screen === 'vinyl' && <Frame key="vinyl"><button onClick={() => goToScreen('gifts')} className="mb-5 text-pink-700/70">← gifts</button><h1 className="mb-8 text-4xl font-black">Vinyl memory</h1><div className="relative h-[500px] w-full max-w-[500px] sm:h-[600px] sm:max-w-[600px]"><motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }} className="absolute inset-4 rounded-full shadow-[0_0_110px_rgba(236,72,153,.55)] sm:inset-6"><Image src={img('vinyl-record')} alt="vinyl" fill className="object-contain" /></motion.div><motion.div initial={{ rotate: -28 }} animate={{ rotate: [-22, -12, -16] }} transition={{ duration: 3.5, repeat: Infinity }} className="absolute right-9 top-12 h-52 w-3 origin-top rounded-full bg-gradient-to-b from-rose-200 to-pink-500 shadow-xl sm:right-14 sm:top-16 sm:h-60" /></div></Frame>}
      {screen === 'love' && <Frame key="love"><button onClick={() => goToScreen('gifts')} className="mb-5 text-pink-700/70">← gifts</button><h1 className="mb-7 text-4xl font-black">What I love about you</h1><div className="relative h-[620px] w-full max-w-3xl sm:h-[650px]"><Image src={img('her-photo')} alt="her" width={360} height={460} className="absolute left-1/2 top-1/2 z-10 max-h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] object-cover shadow-2xl shadow-pink-300/40 sm:max-h-[360px]" />{bubbles.map((b,i)=><motion.span key={b} className="glass absolute z-20 max-w-[138px] -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-bold text-pink-800 sm:max-w-none sm:px-4 sm:text-sm" style={bubblePositions[i]} animate={{ y:[0,-10,0], scale:[1,1.05,1] }} transition={{duration:3+(i%4), delay:i*.15, repeat:Infinity}}>{b}</motion.span>)}</div></Frame>}
    </AnimatePresence>
  </main>;
}
