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
    title: 'Hire Process',
    icon: 'nb-compose',
    children: [
      {
        title: 'jobs',
        link: '/pages/hireprocess/jobs/all/all',
      },
      {
        title: 'Telephone interview',
        link: '/pages/hireprocess/telephoneinterview',
      },
      {
        title: 'Applicants',
        link: '/pages/hireprocess/applicant',
      },
    ],
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
