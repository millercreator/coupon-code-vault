"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";

export default function InstallPrompt() {
  const installPromptedRef = useRef(false);
  const deferredPromptRef = useRef<Event | null>(null);

  // Show iOS add-to-home screen toast
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      window.navigator.standalone === true;

    if (isInStandaloneMode) {
      return;
    }

    if (isIOS && !installPromptedRef.current) {
      toast.info(
        <div>
          <strong>Install CouponVault</strong>
          <div className="mt-1 text-sm text-muted-foreground">
            To install this app on your iOS device, tap the{" "}
            <span role="img" aria-label="share icon">
              ⎋
            </span>{" "}
            <b>Share</b> button and then <b>&quot;Add to Home Screen&quot;</b>{" "}
            <span role="img" aria-label="plus icon">
              ➕
            </span>
            .
          </div>
        </div>,
        { duration: 12000, position: "top-center" }
      );
      installPromptedRef.current = true;
    }
  }, []);

  // Listen for beforeinstallprompt for non-iOS devices
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    const isInStandaloneMode =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-ignore
      window.navigator.standalone === true;

    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      deferredPromptRef.current = e;

      if (!installPromptedRef.current && !isIOS && !isInStandaloneMode) {
        toast.info("Install CouponVault", {
          description:
            "Install this app on your device for a better experience.",
          action: {
            label: "Add to Home Screen",
            onClick: async () => {
              if (
                deferredPromptRef.current &&
                typeof (deferredPromptRef.current as any).prompt === "function"
              ) {
                await (deferredPromptRef.current as any).prompt();
              }
            },
          },
          duration: 18000,
          position: "top-center",
        });
        installPromptedRef.current = true;
      }
    }

    window.addEventListener(
      "beforeinstallprompt",
      handleBeforeInstallPrompt as any
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt as any
      );
    };
  }, []);

  return null;
}
