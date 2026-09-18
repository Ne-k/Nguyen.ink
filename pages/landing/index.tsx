import type { NextPage } from "next";

import { DiscordEmbed } from "../../components/Misc/DiscordEmbed.component";
import { LandingHero } from "../../components/Landing";
import { Seo } from "../../components/Misc/Seo.component";
import { buttons, gallery, headline } from "../../lib/discord";

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

const LandingPage: NextPage = () => {
  return (
    <>
      <Seo
        title="nguyen.ink"
        description="The front door for nguyen.ink. Pick a subdomain: cardin.nguyen.ink for Cardin Nguyen's portfolio, or dylan.nguyen.ink."
        url="https://nguyen.ink"
        image="https://nguyen.ink/assests/og-nguyen.png"
        imageAlt="nguyen.ink"
      />

      <DiscordEmbed
        pieces={[
          gallery([
            {
              url: "https://nguyen.ink/assests/og-nguyen.png",
              description: "nguyen.ink",
            },
          ]),
          headline(
            "nguyen.ink",
            "https://nguyen.ink",
            ["Two people, one domain. Pick a subdomain."],
            { image: "https://nguyen.ink/assests/icon-n-180.png" },
          ),
          buttons(
            { label: "Cardin", url: "https://cardin.nguyen.ink" },
            { label: "Dylan", url: "https://dylan.nguyen.ink" },
          ),
        ]}
      />

      <main>
        <LandingHero />
      </main>

      {/* Plain tags: `config` below strips React, so next/script never runs here. */}
      {GA_ID ? (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(
                GA_ID,
              )},{page_path:window.location.pathname});`,
            }}
          />
        </>
      ) : null}
    </>
  );
};

/*
 * Every link here points at a different host and nothing holds state, so there
 * is no client navigation to preserve. Served as plain HTML and CSS.
 */
export const config = {
  unstable_runtimeJS: false,
};

export default LandingPage;
