import {
  GitHub,
  LinkedIn,
  Email,
  Code as CodeIcon,
  Storage as StorageIcon,
  Dns as ServerIcon,
  Brush as BrushIcon,
  Bolt as BoltIcon,
  Terminal as TerminalIcon,
} from '@mui/icons-material';

const getIconProps = (size, className) => {
  if (typeof size === 'number') {
    return { style: { fontSize: size }, className };
  }
  return { fontSize: size, className };
};

/** Resolve icon string -> MUI component */
export const socialIcon = (name, size = 20, className = '') => {
  const props = getIconProps(size, className);
  switch (name) {
    case 'github':
      return <GitHub {...props} />;
    case 'linkedin':
      return <LinkedIn {...props} />;
    case 'mail':
      return <Email {...props} />;
    default:
      return <CodeIcon {...props} />;
  }
};

export const skillIcon = (name, size = 26, className = '') => {
  const props = getIconProps(size, className);
  switch (name) {
    case 'code':
      return <CodeIcon {...props} />;
    case 'server':
      return <ServerIcon {...props} />;
    case 'database':
      return <StorageIcon {...props} />;
    default:
      return <CodeIcon {...props} />;
  }
};

export const techIcon = (name, size = 22, className = '') => {
  const props = getIconProps(size, className);
  switch (name) {
    case 'ui':
      return <BrushIcon {...props} />;
    case 'api':
      return <BoltIcon {...props} />;
    case 'node':
      return <TerminalIcon {...props} />;
    default:
      return <CodeIcon {...props} />;
  }
};