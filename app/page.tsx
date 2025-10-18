'use client';

import { useEffect, useRef, useState } from 'react';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What are Claude Code Hooks?",
      answer: "Claude Code Hooks are shell commands that execute in response to events during your Claude Code sessions. They allow you to customize and extend Claude Code's behavior to fit your workflow."
    },
    {
      question: "How do I install a hook?",
      answer: "Simply browse the hooks library, copy the hook configuration, and add it to your Claude Code settings file. Most hooks can be installed with a single command or configuration update."
    },
    {
      question: "Can I create my own hooks?",
      answer: "Absolutely! You can create custom hooks using shell scripts or any executable command. Once you've created a hook you're proud of, submit it to the hub to share with the community."
    },
    {
      question: "Are hooks safe to use?",
      answer: "All hooks in the hub are reviewed by the community. However, always review the code before installing any hook to ensure it meets your security standards."
    },
    {
      question: "Do hooks slow down Claude Code?",
      answer: "Hooks are executed asynchronously and won't block Claude Code's main operations. However, complex hooks may take time to complete in the background."
    }
  ];

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-4 bg-slate-900/30 hover:bg-slate-900/50 transition-colors text-left"
            >
              <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
              <span className="text-indigo-400 text-2xl flex-shrink-0">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-slate-900/20">
                <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const raindrops: Array<{x: number; y: number; speed: number; length: number}> = [];

    for (let i = 0; i < 150; i++) {
      raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 3 + 2,
        length: Math.random() * 20 + 10
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.lineWidth = 1;

      raindrops.forEach(drop => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-5xl w-full">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
              Claude Code Hooks Hub
            </h1>
            <p className="text-2xl text-slate-300 mb-8">
              Discover, share and customize hooks for Claude Code
            </p>
            <div className="flex gap-4 justify-center">
              <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-indigo-500/50">
                Browse Hooks
              </button>
              <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 border border-slate-700">
                Submit Your Hook
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-all duration-200 hover:scale-105">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast Integration</h3>
              <p className="text-slate-400">
                Install hooks with a single command and start using them immediately
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-all duration-200 hover:scale-105">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold text-white mb-2">Customizable</h3>
              <p className="text-slate-400">
                Adapt hooks to your workflow with powerful configuration options
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-indigo-500 transition-all duration-200 hover:scale-105">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-white mb-2">Community Driven</h3>
              <p className="text-slate-400">
                Built by developers, for developers. Share your best hooks
              </p>
            </div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-white mb-6">Featured Hooks</h2>
            <div className="space-y-4">
              {[
                { name: 'Git Commit Helper', desc: 'Automatically format commit messages', downloads: '2.4k' },
                { name: 'Code Quality Check', desc: 'Run linters and formatters before commits', downloads: '1.8k' },
                { name: 'Rewinding Hook', desc: 'Time-travel debugging for Claude Code', downloads: '956' }
              ].map((hook, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-900/50 rounded-lg p-4 hover:bg-slate-900/70 transition-colors cursor-pointer">
                  <div>
                    <h4 className="text-lg font-semibold text-white">{hook.name}</h4>
                    <p className="text-slate-400 text-sm">{hook.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-indigo-400 font-semibold">{hook.downloads}</div>
                    <div className="text-slate-500 text-xs">downloads</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <FAQSection />
        </div>

        <footer className="relative z-10 border-t border-slate-700/50 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h4 className="text-white font-semibold text-lg mb-4">Claude Code Hooks</h4>
                <p className="text-slate-400 text-sm">
                  The ultimate hub for discovering and sharing Claude Code hooks.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Browse Hooks</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Submit Hook</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">API</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Getting Started</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Best Practices</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Examples</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Community</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">GitHub</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Discord</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Twitter</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-indigo-400 text-sm transition-colors">Blog</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-slate-500 text-sm">
                © 2025 Claude Code Hooks Hub. Built with ❤️ by the community.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy</a>
                <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms</a>
                <a href="#" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">License</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
}
