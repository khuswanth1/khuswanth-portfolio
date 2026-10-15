import {
  SiReact, SiTypescript, SiJavascript, SiHtml5, SiTailwindcss, SiNextdotjs, SiMui, SiBootstrap,
  SiRedux, SiFastapi, SiFirebase, SiSpringboot, SiMysql, SiNodedotjs, SiPython, SiGit, SiPostman,
  SiVitest, SiDocker, SiFigma, SiLinux,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import {
  LuGithub, LuLinkedin, LuMail, LuLayoutDashboard, LuServer, LuWrench, LuPlug, LuListChecks, LuPill,
  LuTicket, LuChartLine, LuMessageCircle, LuMusic, LuGauge, LuLandmark, LuCircleHelp, LuCode,
} from 'react-icons/lu';

const ICONS = {
  // brands / tech
  react: SiReact, ts: SiTypescript, js: SiJavascript, html: SiHtml5, tailwind: SiTailwindcss,
  next: SiNextdotjs, mui: SiMui, bootstrap: SiBootstrap, redux: SiRedux, fastapi: SiFastapi,
  firebase: SiFirebase, spring: SiSpringboot, mysql: SiMysql, node: SiNodedotjs, python: SiPython,
  git: SiGit, postman: SiPostman, vitest: SiVitest, docker: SiDocker, figma: SiFigma, linux: SiLinux,
  java: FaJava,
  // socials
  github: LuGithub, linkedin: LuLinkedin, mail: LuMail,
  // categories & projects
  layout: LuLayoutDashboard, server: LuServer, tools: LuWrench, api: LuPlug, tasks: LuListChecks,
  pharmacy: LuPill, ticket: LuTicket, chart: LuChartLine, chat: LuMessageCircle, music: LuMusic,
  gauge: LuGauge, bank: LuLandmark, quiz: LuCircleHelp,
};

/** Resolve an icon name from the data file to a react-icons component. */
export default function Icon({ name, ...props }) {
  const Component = ICONS[name] || LuCode;
  return <Component aria-hidden="true" focusable="false" {...props} />;
}
