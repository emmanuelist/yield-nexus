import { ChevronRight, Sparkles, Bitcoin } from "lucide-react";
import { useRef, useEffect } from "react";

export const YieldNexusNewsletterSection: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newsletter signup logic here
    if (inputRef.current) {
      console.log('Email submitted:', inputRef.current.value);
      // Reset form
      inputRef.current.value = '';
    }
  };

  // Enhanced geometric animation effect for newsletter background
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const scale = window.devicePixelRatio || 1;
      canvas.width = width * scale;
      canvas.height = height * scale;
      ctx.scale(scale, scale);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Shape definition
    interface Shape {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      colorIndex: number;
      type: 'hexagon' | 'diamond' | 'square' | 'bitcoin';
    }

    // Create shapes array
    const shapes: Shape[] = [];
    const numShapes = 35;

    // Yield Nexus themed color palette - works for both themes
    const darkColors = [
      'rgba(247, 147, 26, 0.3)',     // Bitcoin orange
      'rgba(234, 179, 8, 0.25)',     // Gold
      'rgba(147, 51, 234, 0.2)',     // Purple
      'rgba(79, 70, 229, 0.25)',     // Indigo
      'rgba(16, 185, 129, 0.2)'      // Emerald
    ];

    const lightColors = [
      'rgba(247, 147, 26, 0.4)',     // Bitcoin orange (stronger for light)
      'rgba(234, 179, 8, 0.3)',      // Gold
      'rgba(147, 51, 234, 0.25)',    // Purple
      'rgba(79, 70, 229, 0.3)',      // Indigo
      'rgba(16, 185, 129, 0.25)'     // Emerald
    ];

    // Create geometric shapes with varied properties
    for (let i = 0; i < numShapes; i++) {
      const x = Math.random() * canvas.width / window.devicePixelRatio;
      const y = Math.random() * canvas.height / window.devicePixelRatio;
      const size = 5 + Math.random() * 25;
      const colorIndex = Math.floor(Math.random() * darkColors.length);
      
      // Add some Bitcoin symbols for Yield Nexus branding
      const typeRandom = Math.random();
      let type: Shape['type'];
      if (typeRandom < 0.15) type = 'bitcoin';
      else if (typeRandom < 0.4) type = 'hexagon';
      else if (typeRandom < 0.7) type = 'diamond';
      else type = 'square';

      shapes.push({
        x,
        y,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.005,
        opacity: 0.1 + Math.random() * 0.3,
        colorIndex,
        type
      });
    }

    // Animation variables
    let animationFrame: number;

    // Check if dark mode
    const isDarkMode = () => document.documentElement.classList.contains('dark');

    // Animation function
    const animate = () => {
      const colors = isDarkMode() ? darkColors : lightColors;
      
      // Clear canvas with appropriate background
      if (isDarkMode()) {
        ctx.fillStyle = 'rgba(10, 10, 50, 0.1)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      }
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

      // Draw and update shapes
      shapes.forEach(shape => {
        // Update rotation
        shape.rotation += shape.rotationSpeed;
        const currentColor = colors[shape.colorIndex];

        // Draw shape
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation);

        switch (shape.type) {
          case 'hexagon':
            drawHexagon(ctx, 0, 0, shape.size, currentColor, shape.opacity);
            break;
          case 'diamond':
            drawDiamond(ctx, 0, 0, shape.size, currentColor, shape.opacity);
            break;
          case 'bitcoin':
            drawBitcoinSymbol(ctx, 0, 0, shape.size, currentColor, shape.opacity);
            break;
          default:
            // Square
            ctx.fillStyle = currentColor.replace(/[\d.]+(?=\))/, shape.opacity.toString());
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            ctx.strokeStyle = currentColor.replace(/[\d.]+(?=\))/, (shape.opacity * 1.5).toString());
            ctx.lineWidth = 0.5;
            ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
        }

        ctx.restore();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    // Helper function to draw hexagon
    const drawHexagon = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI * 2 / 6 * i;
        const pointX = x + size * Math.cos(angle);
        const pointY = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(pointX, pointY);
        } else {
          ctx.lineTo(pointX, pointY);
        }
      }
      ctx.closePath();
      ctx.fillStyle = color.replace(/[\d.]+(?=\))/, opacity.toString());
      ctx.fill();
      ctx.strokeStyle = color.replace(/[\d.]+(?=\))/, (opacity * 1.5).toString());
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    // Helper function to draw diamond
    const drawDiamond = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - size / 2); // Top
      ctx.lineTo(x + size / 2, y); // Right
      ctx.lineTo(x, y + size / 2); // Bottom
      ctx.lineTo(x - size / 2, y); // Left
      ctx.closePath();
      ctx.fillStyle = color.replace(/[\d.]+(?=\))/, opacity.toString());
      ctx.fill();
      ctx.strokeStyle = color.replace(/[\d.]+(?=\))/, (opacity * 1.5).toString());
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    // Helper function to draw Bitcoin symbol (simplified ₿)
    const drawBitcoinSymbol = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      const radius = size / 2;
      
      // Draw circle background
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color.replace(/[\d.]+(?=\))/, (opacity * 0.5).toString());
      ctx.fill();
      ctx.strokeStyle = color.replace(/[\d.]+(?=\))/, (opacity * 1.5).toString());
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw simplified ₿ symbol
      ctx.strokeStyle = color.replace(/[\d.]+(?=\))/, (opacity * 2).toString());
      ctx.lineWidth = Math.max(1, size / 15);
      ctx.lineCap = 'round';
      
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(x - radius * 0.2, y - radius * 0.6);
      ctx.lineTo(x - radius * 0.2, y + radius * 0.6);
      ctx.moveTo(x + radius * 0.2, y - radius * 0.6);
      ctx.lineTo(x + radius * 0.2, y + radius * 0.6);
      
      // Horizontal curves (simplified B shape)
      ctx.moveTo(x - radius * 0.3, y - radius * 0.3);
      ctx.lineTo(x + radius * 0.1, y - radius * 0.3);
      ctx.moveTo(x - radius * 0.3, y);
      ctx.lineTo(x + radius * 0.2, y);
      ctx.moveTo(x - radius * 0.3, y + radius * 0.3);
      ctx.lineTo(x + radius * 0.1, y + radius * 0.3);
      
      ctx.stroke();
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 from-slate-100 via-slate-200 to-slate-300 rounded-t-3xl py-12">
      {/* Canvas background with Yield Nexus themed geometric shapes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full dark:opacity-60 opacity-40"
      />

      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Yield Nexus themed glow accents */}
        <div className="absolute -top-24 -right-24 w-64 h-64 dark:bg-[#F7931A]/10 bg-[#F7931A]/15 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 dark:bg-purple-500/15 bg-purple-500/20 rounded-full filter blur-3xl"></div>

        {/* Accent lines with Yield Nexus gradient */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent dark:via-[#F7931A]/30 via-[#F7931A]/50 to-transparent"></div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent dark:via-purple-500/30 via-purple-500/50 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto backdrop-blur-sm dark:bg-black/20 bg-white/30 p-6 border dark:border-[#F7931A]/10 border-[#F7931A]/20 rounded-2xl shadow-xl dark:shadow-[#F7931A]/5 shadow-[#F7931A]/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full dark:bg-[#F7931A]/20 bg-[#F7931A]/30 border dark:border-[#F7931A]/30 border-[#F7931A]/40 dark:text-[#F7931A] text-orange-700 text-xs font-medium mb-3 backdrop-blur-sm">
                <Bitcoin className="w-3.5 h-3.5 mr-1.5" />
                sBTC Yield Intelligence
              </div>

              <h3 className="text-xl font-bold dark:text-white text-slate-800 mb-2">
                Stay Ahead with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r dark:from-[#F7931A] dark:to-purple-400 from-[#F7931A] to-purple-600">
                  Bitcoin Yield Insights
                </span>
              </h3>

              <p className="dark:text-slate-300 text-slate-600 text-sm leading-relaxed">
                Get exclusive weekly updates on the best sBTC yield opportunities, 
                Stacks DeFi strategies, and multi-chain expansion insights from our research team.
              </p>
            </div>

            <div className="md:w-1/2 w-full">
              <div className="relative">
                <div className="flex rounded-lg overflow-hidden shadow-lg dark:shadow-[#F7931A]/10 shadow-[#F7931A]/20">
                  <input
                    ref={inputRef}
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow px-4 py-3 dark:bg-slate-800/80 bg-white/80 dark:border-[#F7931A]/20 border-[#F7931A]/30 dark:text-white text-slate-800 dark:placeholder-slate-400 placeholder-slate-500 focus:outline-none focus:ring-2 dark:focus:ring-[#F7931A]/30 focus:ring-[#F7931A]/50 backdrop-blur-sm border-r-0"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-gradient-to-r from-[#F7931A] to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-medium transition-all flex items-center justify-center shadow-lg shadow-[#F7931A]/20 hover:shadow-[#F7931A]/30 hover:scale-105"
                  >
                    <span className="hidden sm:inline mr-1">Subscribe</span>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
                <p className="dark:text-slate-400 text-slate-500 text-xs mt-2 ml-1 flex items-center">
                  <Sparkles className="w-3 h-3 mr-1 text-[#F7931A]" />
                  Join 12,000+ Bitcoin holders. No spam, just valuable sBTC insights.
                </p>
              </div>
            </div>
          </div>

          {/* Yield Nexus trust indicators */}
          <div className="mt-6 pt-4 border-t dark:border-slate-700/30 border-slate-300/50 flex flex-wrap items-center justify-center gap-6 text-xs dark:text-slate-400 text-slate-600">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-[#F7931A] mr-2"></div>
              <span>Bitcoin Security</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              <span>Stacks Native</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
              <span>Multi-Chain Vision</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <span>Research-Backed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldNexusNewsletterSection;