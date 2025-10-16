import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/About";
import InteractiveGlobe from "@/components/InteractiveGlobe";
import Footer from "@/components/Footer";
import TravelCards from "@/components/ui/travel-cards";
import Books from "@/components/book/Books";

// const techStack = [
//   { label: "HTML", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" } },
//   { label: "CSS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" } },
//   { label: "SCSS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" } },
//   { label: "Bootstrap", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" } },
//   { label: "TailwindCSS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" } },
//   { label: "jQuery", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" } },
//   { label: "React", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" } },
//   { label: "Next.js", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" } },
//   { label: "Vue.js", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" } },
//   { label: "TypeScript", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" } },
//   { label: "Vite", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg" } },
//   { label: "Redux", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" } },
//   { label: "Zustand", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zustand/zustand-original.svg" } },
//   { label: "Axios", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" } },
//   { label: "Zod", img: { src: "https://zod.dev/_next/image?url=%2Flogo%2Flogo-glow.png&w=256&q=100" } },
//   { label: "GraphQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" } },

//   { label: "C#", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" } },
//   { label: "VB", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualbasic/visualbasic-original.svg" } },
//   { label: ".NET Core / .NET 8", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg " } },
//   { label: ".NET Framework 4.8", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg" } },
//   { label: "Entity Framework Core", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/blob/v2.17.0/icons/entityframeworkcore/entityframeworkcore-original.svg" } },
//   // { label: "LINQ", img: { src: "" } },
//   { label: "Node.js", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" } },
//   { label: "Express JS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" } },
//   { label: "Python", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" } },
//   { label: "Ocelot API Gateway", img: { src: "https://raw.githubusercontent.com/ThreeMammals/Ocelot/refs/heads/assets/images/ocelot_logo.png" } },
//   { label: "YARP", img: { src: "https://dotnet.github.io/yarp/logo.svg" } },
//   { label: "IIS", img: { src: "https://images.seeklogo.com/logo-png/48/1/microsoft-iis-logo-png_seeklogo-484624.png" } },
//   { label: "OAuth2", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oauth/oauth-original.svg" } },
//   { label: "Google OAuth", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" } },

//   { label: "MSSQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" } },
//   { label: "PostgreSQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" } },
//   { label: "MySQL", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" } },
//   { label: "MongoDB", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" } },
//   { label: "Redis", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" } },
//   { label: "Azure Blob Storage", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" } },
//   { label: "Amazon S3", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg" } },

//   { label: "Docker", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" } },
//   { label: "Jenkins", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" } },
//   { label: "Github", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" } },
//   { label: "SonarQube", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sonarqube/sonarqube-original.svg" } },
//   { label: "HashiCorp Vault", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vault/vault-original.svg" } },
//   { label: "xUnit", img: { src: "" } },
//   { label: "NUnit", img: { src: "" } },
//   { label: "Jest", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" } },

//   { label: "Azure", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" } },
//   { label: "AWS", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" } },
//   { label: "GCP", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" } },

//   { label: "Figma", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" } },
//   { label: "Photoshop", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" } },
//   { label: "NPM", img: { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" } },
// ];
// <div className="text-center mb-12" id="skills">
//             <h2 className="text-4xl font-bold mb-6">
//               I can <span className="text-primary">work</span> with
//             </h2>
//             <div className="flex justify-center flex-wrap w-[100%] gap-2 my-8">
//               {techStack.map((tech) => (
//                 <div
//                   key={tech.label}
//                   className="mr-2 mb-2 p-2 rounded-full hover:-translate-y-1 bg-white bg-opacity-10 border transition hover:border-white"
//                 >
//                   <img
//                     src={tech.img.src}
//                     alt={tech.label}
//                     className="rounded-full shadow-lg w-12 h-12 object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

const About = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />

      <main className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Section Header */}
          <div className="text-center md:mb-16">
            <p className="text-primary text-sm font-medium tracking-wide uppercase mb-4">
              Get to know
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            {/* <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
              A passionate developer and project manager from Chennai, India, who loves creating beautiful digital experiences and capturing the world through photography.
            </p> */}
          </div>

          <AboutSection />

          {/* Books Section */}
          <section className="py-20" id="books">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Books I <span className="gradient-text">Recommend</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                A curated collection of books that have shaped my thinking and
                approach to life, technology, and personal growth.
              </p>
            </div>
            <div className="flex justify-center">
              <Books />
            </div>
          </section>

          {/* Globe Section */}
          {/* TODO - Hidden for now */}
          <section className="py-20 hidden">
            <div className="px-4">
              <div className="text-center mb-4">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Find Me{" "}
                  <span className="gradient-text">Around The World</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Interactive globe showing places I have travelled to and my
                  journey around the world
                </p>
              </div>
              <div className="relative h-[500px] rounded-2xl overflow-hidden glass-card max-w-4xl mx-auto">
                <InteractiveGlobe />
              </div>
            </div>
          </section>

          {/* Travel Section */}
          <section id="travel" className="py-20">
            <div className="px-4">
              <TravelCards />
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl floating-animation" />
        <div
          className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl floating-animation"
          style={{ animationDelay: "4s" }}
        />
      </div>
    </div>
  );
};

export default About;
