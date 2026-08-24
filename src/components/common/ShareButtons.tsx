"use client";
import React from "react";
import { Icon } from "@iconify/react";

type Props = {
  url: string;
  title?: string;
};

function openPopup(url: string) {
  window.open(url, "_blank", "noopener,noreferrer,width=600,height=500");
}

export default function ShareButtons({ url, title }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  const share = {
    facebook: () => openPopup(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`),
    messenger: () => {
      // Try native messenger scheme (mobile); fallback to Facebook sharer
      const native = `fb-messenger://share?link=${encodedUrl}`;
      const fallback = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      const w = window.open(native, "_blank", "noopener,noreferrer");
      setTimeout(() => {
        // If native didn't open, fallback to web sharing
        try {
          if (!w || w.closed) openPopup(fallback);
        } catch (e) {
          openPopup(fallback);
        }
      }, 500);
    },
    twitter: () => openPopup(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`),
    linkedin: () => openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`),
    whatsapp: () => openPopup(`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`),
    email: () => openPopup(`mailto:?subject=${encodedTitle}&body=${encodedUrl}`),
    copy: async () => {
      try {
        await navigator.clipboard.writeText(url);
        // Small user feedback; apps can replace this with a toast
        // eslint-disable-next-line no-alert
        alert("Link copied to clipboard");
      } catch (e) {
        // Fallback: prompt so user can manually copy
        // eslint-disable-next-line no-alert
        prompt("Copy this link", url);
      }
    },
  };

  const btnCls = "inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm border bg-white hover:bg-primary hover:text-white transition-colors";

  return (
    <div className="mt-8 print:hidden">
      <h4 className="font-semibold text-accent mb-3">Share This Page</h4>
      <div className="flex flex-wrap gap-2">
        <button onClick={share.facebook} aria-label="Share to Facebook" className={btnCls}>
          <Icon icon="mdi:facebook" className="w-4 h-4" /> Facebook
        </button>

        <button onClick={share.messenger} aria-label="Share to Messenger" className={btnCls}>
          <Icon icon="mdi:facebook-messenger" className="w-4 h-4" /> Messenger
        </button>

        <button onClick={share.twitter} aria-label="Share to Twitter" className={btnCls}>
          <Icon icon="mdi:twitter" className="w-4 h-4" /> Twitter
        </button>

        <button onClick={share.linkedin} aria-label="Share to LinkedIn" className={btnCls}>
          <Icon icon="mdi:linkedin" className="w-4 h-4" /> LinkedIn
        </button>

        <button onClick={share.whatsapp} aria-label="Share to WhatsApp" className={btnCls}>
          <Icon icon="mdi:whatsapp" className="w-4 h-4" /> WhatsApp
        </button>

        <button onClick={share.email} aria-label="Share via Email" className={btnCls}>
          <Icon icon="mdi:email" className="w-4 h-4" /> Email
        </button>

        <button onClick={share.copy} aria-label="Copy link" className={btnCls}>
          <Icon icon="mdi:link-variant" className="w-4 h-4" /> Copy Link
        </button>
      </div>
    </div>
  );
}
