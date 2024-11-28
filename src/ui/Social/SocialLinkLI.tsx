import React from "react";

// Social Link Component
interface SocialLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const SocialLinkLI: React.FC<SocialLinkProps> = ({ href, label, icon }) => (
  <li>
    <a
      href={href}
      rel="noreferrer"
      target="_blank"
      className="socialIco"
    >
      <span className="sr-only">{label}</span>
      {icon}
    </a>
  </li>
);

export default SocialLinkLI