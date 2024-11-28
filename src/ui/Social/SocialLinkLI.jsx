import { Icon } from '@iconify/react';

const SocialLinkLI = ({ href, name, icon, showLabel = false }) => (
  <li>
    <a href={href} rel="noreferrer" target="_blank" className="text-primary transition hover:text-primary-lighter size-6;">
      <Icon icon={icon} className="size-6" />
      {showLabel && name}
    </a>
  </li>
);

export default SocialLinkLI