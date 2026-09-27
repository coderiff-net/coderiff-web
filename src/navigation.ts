import { getBlogPermalink } from "./utils/permalinks";

export const headerData = {
  links: [
    { text: "Services", href: "/#services" },
    { text: "About", href: "/#about" },
    { text: "Blog", href: getBlogPermalink() },
    { text: "Contact", href: "/#contact" },
  ],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: "Explore",
      links: [
        { text: "Services", href: "/#services" },
        { text: "About", href: "/#about" },
        { text: "Blog", href: getBlogPermalink() },
        { text: "Contact", href: "/#contact" },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: "© coderiff. Made with care.",
};
