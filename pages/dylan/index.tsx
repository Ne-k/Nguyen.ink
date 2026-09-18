import type { NextPage } from "next";

import { DiscordEmbed } from "../../components/Misc/DiscordEmbed.component";
import { DylanHero } from "../../components/Dylan";
import { Seo } from "../../components/Misc/Seo.component";
import { buttons, headline } from "../../lib/discord";

const DylanPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Dylan Nguyen | Coming Soon"
        description="Dylan Nguyen's page at dylan.nguyen.ink is reserved and will launch here soon."
        url="https://dylan.nguyen.ink"
        image="https://nguyen.ink/assests/og-nguyen.png"
        imageAlt="nguyen.ink"
        icon="dn"
      />

      <DiscordEmbed
        pieces={[
          headline(
            "Dylan Nguyen",
            "https://dylan.nguyen.ink",
            ["Reserved. The full site will launch here."],
            { image: "https://nguyen.ink/assests/icon-dn-180.png" },
          ),
          buttons({ label: "nguyen.ink", url: "https://nguyen.ink" }),
        ]}
      />

      <main className="min-h-screen overflow-hidden">
        <DylanHero />
      </main>
    </>
  );
};

export default DylanPage;
