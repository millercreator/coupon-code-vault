import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Monitor, Moon, Sun, Info } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

// Values from src/app/layout.tsx metadata:
const SITE_NAME = "CouponVault";
const TAGLINE = "Secure Digital Coupon Storage & Management";
const DESCRIPTION =
  "CouponVault is your secure digital coupon vault for storing, managing, and organizing all your digital coupons in one place. Never miss a discount or lose a coupon again.";
const WEBSITE_URL = "https://my-coupon-vault.vercel.app/";
const AUTHOR_NAME = "Joshua Miller";
const AUTHOR_GITHUB = "https://github.com/millercreator";
const REPO_URL = "https://github.com/millercreator/coupon-code-vault";

type MainMenuProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

export function MainMenu({ open, onOpenChange, children }: MainMenuProps) {
  const { setTheme, resolvedTheme } = useTheme();
  const [aboutDialogOpen, setAboutDialogOpen] = React.useState(false);

  // Icon according to theme
  const themeIcon =
    resolvedTheme === "dark" ? (
      <Moon className="size-4" />
    ) : resolvedTheme === "light" ? (
      <Sun className="size-4" />
    ) : (
      <Monitor className="size-4" />
    );

  return (
    <>
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={8}
          align="end"
          className="min-w-[200px]"
        >
          {/* Theme Mode section */}
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="justify-between"
          >
            <span className="flex items-center gap-2">
              {themeIcon}
              <span>Theme mode</span>
            </span>
            <Switch
              checked={resolvedTheme === "dark"}
              onCheckedChange={(checked) =>
                setTheme(checked ? "dark" : "light")
              }
              aria-label="Toggle theme mode"
            />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* About */}
          <DropdownMenuItem
            className="gap-2"
            onSelect={() => {
              setAboutDialogOpen(true);
              onOpenChange(false);
            }}
          >
            <Info className="size-4" />
            <span>About</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={aboutDialogOpen} onOpenChange={setAboutDialogOpen}>
        <DialogContent showCloseButton fullScreen={false}>
          <DialogHeader>
            <DialogTitle>About {SITE_NAME}</DialogTitle>
            <DialogDescription>{DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <div className="mt-2 space-y-4 text-sm">
            <section>
              <header className="font-semibold mb-1">Technology</header>
              <p>
                Built with <span className="font-semibold">Next.js</span> (
                <a
                  href={REPO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted hover:text-primary"
                >
                  see code on GitHub
                </a>
                , see <code>package.json</code>
                ).
              </p>
            </section>
            <section>
              <header className="font-semibold mb-1">PWA</header>
              <p>
                This website is a{" "}
                <span className="font-semibold">Progressive Web App (PWA)</span>
                {" — "}
                you can install it to your device for an app-like experience.
              </p>
            </section>
            <section>
              <header className="font-semibold mb-1">Author</header>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Created by</span>
                <a
                  href={AUTHOR_GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontWeight: 500, fontSize: "0.95em" }}
                >
                  <Image
                    src="/me.jpeg"
                    alt="Author"
                    width={40}
                    height={40}
                    className="rounded-full inline-block align-middle"
                  />
                  <span>{AUTHOR_NAME}</span>
                </a>
              </div>
            </section>
            <section>
              <header className="font-semibold mb-1">Official Website</header>
              <a
                href={WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted hover:text-primary"
              >
                {WEBSITE_URL}
              </a>
            </section>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
