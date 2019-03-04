import XIcon from "@/assets/x.svg";
import LinkedinIcon from "@/assets/linkedin.svg";

type FooterProps = {
  fixed?: boolean; // if true, footer is fixed to bottom, else flows with the document
};

export default function Footer({ fixed = true }: FooterProps) {
  // Compose classes based on 'fixed' prop
  const footerClass = [
    fixed ? "fixed bottom-0 left-0 z-50" : "relative",
    "w-full py-4 border-t backdrop-blur-sm bg-background/70 max-sm:px-6",
  ].join(" ");

  return (
    <footer className={footerClass}>
      <div className="max-w-md mx-auto h-full w-full flex justify-between max-sm:flex-col max-sm:justify-center max-sm:items-center max-sm:gap-4 max-sm:text-center">
        <p className="text-sm md:text-xs font-mono uppercase text-foreground/70 tracking-widest">
          Made by Joshua Miller with cursor & vibe
        </p>
        <div className="flex gap-3">
          <a
            href="https://x.com/jme_creator"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter) profile"
          >
            <XIcon className="size-5" />
          </a>
          <a
            href="https://linkedin.com/in/millercreator"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
