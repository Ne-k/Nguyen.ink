import { embed, serialise, type Piece } from "../../lib/discord";

/** The oxide accent from globals.css, so the card is edged in the site's colour. */
const SIGNAL = "#b4331d";

type DiscordEmbedProps = {
  pieces: (Piece | null | undefined)[];
};

/**
 * Renders the payload Discord looks for. Server-rendered on purpose: Discord's
 * crawler never runs JavaScript, so a tag added in the browser is one it will
 * never see.
 *
 * Returns nothing when the embed would be refused, which leaves the Open Graph
 * tags in `Seo` to serve the ordinary card.
 */
const DiscordEmbed = ({ pieces }: DiscordEmbedProps) => {
  const json = serialise(embed(SIGNAL, pieces));

  if (!json) return null;

  return (
    <script
      id="discord:component-embed"
      type="application/json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
};

export { DiscordEmbed };
