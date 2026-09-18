import type { GetStaticProps, NextPage } from "next";

import {
  About,
  Contact,
  Footer,
  Header,
  Hero,
  Offline,
  Projects,
  Skills,
} from "../../components/Cardin";
import { DiscordEmbed } from "../../components/Misc/DiscordEmbed.component";
import { Seo } from "../../components/Misc/Seo.component";
import { buttons, gallery, headline } from "../../lib/discord";
import { getProjects } from "../../lib/github";
import type { Project } from "../../lib/github";
import { site } from "../../lib/site";

type CardinPageProps = {
  projects: Project[];
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.alias,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: "West Linn",
    addressRegion: "OR",
    addressCountry: "US",
  },
  sameAs: [site.github, site.linkedin, site.instagram],
  knowsAbout: [
    "Backend development",
    "Cybersecurity",
    "Penetration testing",
    "Digital forensics",
    "TypeScript",
    "Python",
  ],
};

const CardinPage: NextPage<CardinPageProps> = ({ projects }) => {
  return (
    <>
      <Seo
        title="Cardin Nguyen | Backend Developer & Cybersecurity Student"
        description="Cardin Nguyen (Nek) is a backend developer and cybersecurity student in the Portland, Oregon area, focused on penetration testing, digital forensics, and server-side systems."
        url={site.url}
        keywords="Cardin Nguyen, Nek, backend developer, cybersecurity, penetration testing, digital forensics, TypeScript, Python, Portland Oregon, portfolio"
        jsonLd={jsonLd}
        icon="cn"
      />

      <DiscordEmbed
        pieces={[
          gallery([
            {
              url: "https://cardin.nguyen.ink/assests/og-image.png",
              description: `${site.name}, ${site.role}`,
            },
          ]),
          headline(site.name, site.url, [`${site.role} · ${site.location}`], {
            image: "https://cardin.nguyen.ink/assests/icon-cn-180.png",
          }),
          buttons(
            { label: "Projects", url: `${site.url}/#projects` },
            { label: "GitHub", url: site.github },
            { label: "LinkedIn", url: site.linkedin },
          ),
        ]}
      />

      <a
        href="#about"
        className="label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2.5 focus:text-paper"
      >
        Skip to content
      </a>

      <Header />

      <main className="mx-auto w-full max-w-[72rem] px-5 sm:px-8">
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Offline />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<CardinPageProps> = async () => {
  let projects: Project[] = [];

  try {
    projects = await getProjects(9);
  } catch (error) {
    // A GitHub outage or rate limit should degrade the section, not fail the build.
    console.error("Failed to load GitHub projects:", error);
  }

  return {
    props: { projects },
    // Rebuild the page in the background at most once an hour.
    revalidate: 3600,
  };
};

export default CardinPage;
