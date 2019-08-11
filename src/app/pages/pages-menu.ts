import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'HOME',
    group: true,
  },
  {
    title: 'Home',
    icon: 'nb-home',
    link: '/pages/home',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Find Jobs',
    icon: 'nb-search',
    children: [
      {
        title: 'Jobs',
        link: '/pages/hireprocess/jobs/all/all',
      },
    ],
  },
  {
    title: 'Hire Process',
    icon: 'nb-compose',
    children: [
      {
        title: 'Telephone Interview',
        link: '/pages/hireprocess/telephoneinterview',
      },
      {
        title: 'Technical Interview',
        link: '/pages/hireprocess/techinterview',
      },
      {
        title: 'Financial Negotiation',
        link: '/pages/hireprocess/financenegotiation',
      },
    ],
  },
  {
    title: 'Admin Panel',
    icon: 'nb-person',
    children: [
      {
        title: 'Applicants',
        link: '/pages/hireprocess/applicant',
      },
    ],
  },
  {
    title: 'Authentication',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/pages/auth/login',
      },
      {
        title: 'signup',
        link: '/pages/auth/signup',
      },
      {
        title: 'logout',
        link: '/pages/auth/logout',
      },
    ],
  },
];
