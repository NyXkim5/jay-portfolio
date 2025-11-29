import Section from "../components/layout/Section";
import Keypad from "../components/ui/Keypad";

const AboutSection = () => {
  return (
    <Section id="about" kicker="Who I am" title="About">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
        {/* Text column */}
        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
          <p>
            I'm a third year at{" "}
            <span className="text-orange-400 font-semibold">UC Irvine</span>{" "}
            studying Computer Engineering. I enjoy full-stack development and
            designing products that feel clean and functional.
          </p>
          <p>
            Most of my time goes into building web apps, working on UAV systems,
            and experimenting with UI design. I like projects where the
            interface matters just as much as what's running underneath.
          </p>

          <div className="mt-6 space-y-4 text-sm text-zinc-400">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-orange-500/80">
                Languages &amp; tools
              </h3>
              <p className="mt-2">
                TypeScript, JavaScript, C, C++, Python, SQL, React, Tailwind
                CSS, Node.js, PostgreSQL, Git, Raspberry Pi.
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.26em] text-orange-500/80">
                Interests
              </h3>
              <p className="mt-2">
                <span className="text-orange-400">Full-stack development</span>,
                UAV systems,{" "}
                <span className="text-orange-400">UI/UX design</span>, defense
                tech, and building products that solve real problems.
              </p>
            </div>
          </div>
        </div>

        {/* Keypad column */}
        <div className="flex justify-center lg:justify-end">
          <Keypad />
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
