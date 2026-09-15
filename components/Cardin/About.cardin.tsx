import { Section } from "../Misc/Section.component";

const facts = [
  {
    label: "Studying",
    value: "Computer science, cybersecurity track",
    detail: "Portland Community College now, Oregon State after that",
  },
  {
    label: "Working",
    value: "C/C++ embedded developer at the OPEnS Lab",
    detail: "Firmware for Loom V4 and the Evaporometer, at Oregon State",
  },
  {
    label: "Volunteering",
    value: "AV crew at FIRST Robotics events",
    detail:
      "Same competitions I used to compete in, different side of the glass",
  },
  {
    label: "Shooting",
    value: "Sony A7R IV and A7 IV",
    detail: "Stills, video, and the occasional sports sideline",
  },
];

const About = () => {
  return (
    <Section id="about" index="01" meta="Background" title="About me">
      <div className="max-w-measure space-y-5 text-[0.9375rem] leading-[1.75]">
        <p>
          I got into this through robotics. In 2021 I joined FRC Team 7034 and
          FTC Team 10332 as a software developer, which in practice meant
          debugging autonomous routines at 11pm the night before a match with
          the whole team watching. Four seasons of that taught me more about
          shipping under pressure than any class has.
        </p>
        <p>
          Somewhere along the way I got curious about the other direction: not
          just making a system work, but figuring out where it gives. That
          curiosity is why I&apos;m on the cybersecurity track now, working
          through penetration testing and digital forensics.
        </p>
        <p>
          The rest of my time goes to backend projects, a couple of Linux
          servers I keep running for no good reason, and teaching kids to code.
          One of my old Discord bots quietly reached about six thousand servers
          before I archived it, which is still the strangest thing on my GitHub.
        </p>
        <p>
          Off the clock I&apos;m usually behind a camera. I shot video
          professionally for IConnect007 for two years, and I still take the A7R
          IV out most weekends.
        </p>
      </div>

      <dl className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="border-t border-ink pt-3">
            <dt className="label text-ink-faint">{fact.label}</dt>
            <dd className="mt-2 text-[0.9375rem] leading-snug font-medium text-ink">
              {fact.value}
            </dd>
            <dd className="mt-1.5 text-sm leading-[1.6] text-ink-faint">
              {fact.detail}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
};

export default About;
