import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, Code, Briefcase, BookOpen, Wrench } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GridGlobe from "@/components/ui/GridGlobe";
import { useResponsive } from "@/hooks/use-responsive";
import { Link } from "react-router-dom";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const BentoGrid = () => {
  const { toast } = useToast();
  const { isMobile, isTablet, isDesktop } = useResponsive();

  // Responsive grid classes matching the reference layout
  const getGridClasses = () => {
    if (isMobile) return 'grid-cols-1 grid-rows-1';
    if (isTablet) return 'grid-cols-4 grid-rows-1';
    return 'grid-cols-4 grid-rows-3';
  };

  // Card positioning classes matching reference bento style
  const getCardClasses = (cardType: string) => {
    const baseClasses = "relative overflow-hidden rounded-xl animate-fade-in-up group/bento bg-card border-border";

    const cardConfigs = {
      techEnthusiast: {
        mobile: "col-span-1",
        tablet: "col-span-2",
        desktop: "col-span-2 row-span-1"  // wide rectangle
      },
      photography: {
        mobile: "col-span-1",
        tablet: "col-span-2",
        desktop: "col-span-2 row-span-2"  // big square
      },
      work: {
        mobile: "col-span-1",
        tablet: "col-span-1",
        desktop: "col-span-1 row-span-1"  // small square
      },
      books: {
        mobile: "col-span-1",
        tablet: "col-span-1",
        desktop: "col-span-1 row-span-1"  // small square
      },
      codeSnippet: {
        mobile: "col-span-1",
        tablet: "col-span-2",
        desktop: "col-span-1 row-span-1"  // square
      },
      resources: {
        mobile: "col-span-1",
        tablet: "col-span-2",
        desktop: "col-span-2 row-span-1"  // rectangle
      },
      travel: {
        mobile: "col-span-1",
        tablet: "col-span-2",
        desktop: "col-span-1 row-span-1"  // square for globe
      },
      collaboration: {
        mobile: "col-span-1",
        tablet: "col-span-2",
        desktop: "col-span-2 row-span-1"  // rectangle
      },
      techStack: {
        mobile: "col-span-1",
        tablet: "col-span-2",
        desktop: "col-span-2 row-span-1"  // square
      }
    };

    const config = cardConfigs[cardType as keyof typeof cardConfigs];
    const responsiveClasses = isMobile ? config.mobile :
      isTablet ? config.tablet :
        config.desktop;

    return `${baseClasses} ${responsiveClasses}`;
  };

  const handleCopyEmail = (event: React.MouseEvent) => {
    navigator.clipboard.writeText("imprasannarajendran@gmail.com");
    toast({
      title: "Email copied!",
      description: "Email address has been copied to clipboard",
    });

    // Trigger confetti within the card
    const card = event.currentTarget.closest('.glass-card');
    if (card) {
      const confetti = document.createElement('img');
      confetti.src = '/assets/confetti.gif';
      confetti.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10;
        width: 200px;
        height: 200px;
      `;
      card.appendChild(confetti);

      setTimeout(() => {
        if (card.contains(confetti)) {
          card.removeChild(confetti);
        }
      }, 2000);
    }
  };

  const cardContent = {
    // ORIGINAL CARDS - Reference-inspired styling
    techEnthusiast: (
      <div className="h-full relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10">
        {/* Subtle grid background */}
        <div className="w-full h-full absolute opacity-20 dark:opacity-10">
          <img alt="grid" className="object-cover object-center w-full h-full" src="/assets/grid.webp" />
        </div>
        {/* Right side bottom image */}
        <div className="absolute right-0 -bottom-1">
          <img alt="bento-1-bg" width="220" height="200" className="object-cover object-center w-full h-full opacity-60 dark:opacity-30" src="/assets/bento-1-bg.svg" />
        </div>
        <div className="group-hover/bento:translate-x-2 transition duration-200 relative h-full flex flex-col justify-start p-6 lg:p-8 z-10">
          <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Tech enthusiast with a passion for development.
          </div>
          <div className="text-muted-foreground text-sm">
            Building innovative solutions
          </div>
        </div>
      </div>
    ),

    photography: (
      <div className="h-full p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10">
        <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700 dark:text-teal-300 mb-2">
              Travel & Explore
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              <Link to="/about#travel" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                Places I have been to. My travel diaries.
              </Link>
            </h3>
          </div>

          <div className="flex items-center justify-end flex-1">
            <GridGlobe UsedAt="Hero" />
          </div>

          <Link
            to="/about#travel"
            className="text-teal-700 dark:text-teal-300 text-sm hover:underline inline-flex items-center"
          >
            View travels →
          </Link>
        </div>
      </div>
    ),

    codeSnippet: (
      <div className="h-full p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-900/10">
        <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <Code className="h-6 w-6 text-emerald-700 dark:text-emerald-300" />
            <Badge variant="secondary" className="text-xs bg-emerald-200/50 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200 border-0">
              JavaScript
            </Badge>
          </div>
          <img
            src="/assets/bento-4-bg.svg"
            alt="bento-4-bg"
            width={220}
            height={200}
            className="absolute object-cover object-center w-full h-full top-0 md:top-10 opacity-40 dark:opacity-20"
          />
          <div className="text-xs text-emerald-700 dark:text-emerald-300 opacity-75 relative z-10">
            Clean code practices
          </div>
        </div>
      </div>
    ),

    collaboration: (
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(108, 0, 162)"
        gradientBackgroundEnd="rgb(0, 17, 82)"
        firstColor="18, 113, 255"
        secondColor="221, 74, 255"
        thirdColor="100, 220, 255"
        fourthColor="200, 50, 50"
        fifthColor="180, 180, 50"
        pointerColor="140, 100, 255"
        containerClassName="rounded-xl"
      >
        <div className="h-full p-6 lg:p-8 relative z-10">
          <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col">
            <div>
              <p className="text-sm font-medium text-white mb-2">
                Let's Collaborate
              </p>
              <h3 className="text-2xl font-bold text-white mb-4">
                Do you want to start a project together?
              </h3>
            </div>
            <div className="flex justify-start">
              <Button
                onClick={handleCopyEmail}
                className="bg-white text-purple-600 hover:bg-gray-100 border border-white w-fit transition-colors"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy my email address
              </Button>
            </div>
          </div>
        </div>
      </BackgroundGradientAnimation>
    ),

    techStack: (
      <div className="h-full relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10">
        <div className="group-hover/bento:translate-x-2 transition duration-200 relative h-full flex flex-col justify-between p-6 lg:p-8 z-10">
          <div>
            <div className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-2">Photography</div>
            <div className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              <Link to="/gallery" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                See the world through my eyes. Go through the gallery
              </Link>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="grid grid-cols-3 gap-2">
              <div className="w-12 h-12 bg-purple-200/60 dark:bg-purple-800/40 rounded-lg"></div>
              <div className="w-12 h-12 bg-purple-300/70 dark:bg-purple-700/50 rounded-lg"></div>
              <div className="w-12 h-12 bg-purple-200/60 dark:bg-purple-800/40 rounded-lg"></div>
              <div className="w-12 h-12 bg-purple-300/70 dark:bg-purple-700/50 rounded-lg"></div>
              <div className="w-12 h-12 bg-purple-400/80 dark:bg-purple-600/60 rounded-lg"></div>
              <div className="w-12 h-12 bg-purple-200/60 dark:bg-purple-800/40 rounded-lg"></div>
            </div>
          </div>
          <Link
            to="/gallery"
            className="text-purple-700 dark:text-purple-300 text-sm hover:underline inline-flex items-center mt-4"
          >
            Go to Gallery →
          </Link>
        </div>
      </div>
    ),

    travel: (
      <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10 relative overflow-hidden p-6">
        {/* Briefcase stack visual */}
        <div className="absolute top-2 right-2 opacity-30 dark:opacity-20">
          <div className="relative">
            <div className="w-8 h-6 bg-slate-400 dark:bg-slate-500 rounded-sm mb-1 transform rotate-12"></div>
            <div className="w-9 h-6 bg-slate-500 dark:bg-slate-400 rounded-sm mb-1 transform rotate-6"></div>
            <div className="w-10 h-7 bg-slate-600 dark:bg-slate-300 rounded-sm"></div>
          </div>
        </div>

        <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col justify-between">
          <div>
            <Briefcase className="h-8 w-8 text-emerald-600 dark:text-emerald-400 mb-3" />
            <div className="text-foreground text-lg font-bold mb-1">
              <Link to="/works" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                Work
              </Link>
            </div>
            <div className="text-muted-foreground text-sm">
              More than half a decade of professional experience.
            </div>
          </div>
          <Link
            to="/works"
            className="text-emerald-600 dark:text-emerald-400 text-sm hover:underline inline-flex items-center"
          >
            See my works →
          </Link>
        </div>
      </div>
    ),

    // NEW CARDS - Reference-inspired modern styling
    work: (
      <div className="h-full relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/10">
        {/* Bottom center grid background */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 scale-150 opacity-20 dark:opacity-10">
          <img alt="grid" className="object-cover object-center w-full h-full" src="/assets/grid.webp" />
        </div>
        <div className="group-hover/bento:translate-x-2 transition duration-200 relative h-full flex flex-col p-6 z-10">
          <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-2">Everyday is a learning day</div>
          <div className="text-2xl font-bold text-foreground mb-6">
            <Link to="/about#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              My Tech Stack
            </Link>
          </div>
          <Link
            to="/about#skills"
            className="text-blue-700 dark:text-blue-300 text-sm hover:underline inline-flex items-center mb-4"
          >
            See full list →
          </Link>

          {/* Tech badges positioned on the right */}
          <div className="absolute -right-12 md:right-4 top-0 md:top-24 flex flex-col gap-6 justify-start align-items-end h-full rotate-45">
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">.NET</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">React JS</span>
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">MS SQL</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">Typescript</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">AWS</span>
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">Web API</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">Javascript</span>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">AWS</span>
              <span className="px-3 py-2 bg-blue-200 dark:bg-blue-800 rounded-lg text-xs text-blue-800 dark:text-blue-200">Web API</span>
            </div>
          </div>
        </div>
      </div>
    ),

    books: (
      <div className="h-full bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-900/10 relative overflow-hidden p-6">
        {/* Stack of books visual */}
        <div className="absolute bottom-1 right-2 opacity-40 dark:opacity-30">
          <div className="relative">
            <div className="w-6 h-2 bg-amber-400 dark:bg-amber-600 rounded-sm mb-1 transform -rotate-3"></div>
            <div className="w-7 h-2 bg-amber-300 dark:bg-amber-500 rounded-sm mb-1 transform rotate-2"></div>
            <div className="w-8 h-2 bg-yellow-300 dark:bg-yellow-500 rounded-sm mb-1 transform -rotate-1"></div>
            <div className="w-7 h-2 bg-orange-300 dark:bg-orange-500 rounded-sm mb-1 transform rotate-1"></div>
            <div className="w-8 h-2 bg-amber-400 dark:bg-amber-600 rounded-sm"></div>
          </div>
        </div>

        <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col justify-between">
          <div>
            <BookOpen className="h-8 w-8 text-amber-700 dark:text-amber-300 mb-3" />
            <div className="text-foreground text-lg font-bold mb-1">
              <Link to="/about#books" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                Reading
              </Link>
            </div>
            <div className="text-amber-700 dark:text-amber-300 text-sm">
              Knowledge journey
            </div>
          </div>
          <Link
            to="/about#books"
            className="text-amber-700 dark:text-amber-300 text-sm hover:underline inline-flex items-center"
          >
            Books I've read →
          </Link>
        </div>
      </div>
    ),

    resources: (
      <div className="h-full p-6 lg:p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10">
        <div className="group-hover/bento:translate-x-2 transition duration-200 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Wrench className="h-6 w-6 text-green-700 dark:text-green-300" />
              <div className="text-sm font-medium text-green-700 dark:text-green-300">Developer Arsenal</div>
            </div>

            <div className="text-xl lg:text-2xl font-bold text-foreground mb-4">
              <Link to="/about#skills" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
                Tools & Resources That Power My Development
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {["VS Code", "Figma", "Postman", "Docker"].map((tool, index) => (
              <span key={index} className="text-xs px-3 py-1 bg-green-200/60 dark:bg-green-800/40 rounded-full text-green-800 dark:text-green-200">
                {tool}
              </span>
            ))}
          </div>
          <Link
            to="/about#skills"
            className="text-green-700 dark:text-green-300 text-sm hover:underline inline-flex items-center"
          >
            See full list →
          </Link>
        </div>
      </div>
    )
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className={`grid gap-6 ${getGridClasses()}`}>
          {/* Row 1: Tech Enthusiast (2x1) + Photography (1x3) + Work (1x1) */}
          <Card
            className={getCardClasses('techEnthusiast')}
            style={{ animationDelay: "0.1s" }}
          >
            {cardContent.techEnthusiast}
          </Card>

          <Card
            className={getCardClasses('photography')}
            style={{ animationDelay: "0.2s" }}
          >
            {cardContent.photography}
          </Card>

          <Card
            className={getCardClasses('work')}
            style={{ animationDelay: "0.3s" }}
          >
            {cardContent.work}
          </Card>

          {/* Books positioned in Row 1, column 3 continuation */}
          <Card
            className={getCardClasses('books')}
            style={{ animationDelay: "0.4s" }}
          >
            {cardContent.books}
          </Card>

          {/* Row 2: Code Snippet (2x1) */}
          <Card
            className={getCardClasses('codeSnippet')}
            style={{ animationDelay: "0.5s" }}
          >
            {cardContent.codeSnippet}
          </Card>

          {/* Row 3: Resources (1x1) + Travel (1x3) */}
          <Card
            className={getCardClasses('resources')}
            style={{ animationDelay: "0.6s" }}
          >
            {cardContent.resources}
          </Card>

          <Card
            className={getCardClasses('travel')}
            style={{ animationDelay: "0.7s" }}
          >
            {cardContent.travel}
          </Card>

          <Card
            className={getCardClasses('collaboration')}
            style={{ animationDelay: "0.8s" }}
          >
            {cardContent.collaboration}
          </Card>

          {/* Row 4: Tech Stack (2x1) */}
          <Card
            className={getCardClasses('techStack')}
            style={{ animationDelay: "0.9s" }}
          >
            {cardContent.techStack}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;