import type { MainNavigationConfig } from './index';

export const MAIN_NAVIGATION: MainNavigationConfig = [
  {
    title: 'Getting Started',
    id: '/getting-started',
    linkProps: {
      to: '/getting-started'
    }
  },
  {
    title: 'Guidance',
    items: [
      {
        id: '/guidance/guidance-1',
        linkProps: {
          to: '/guidance/guidance-1'
        },
        title: 'Guidance 1'
      },
      {
        id: '/guidance/guidance-2',
        linkProps: {
          to: '/guidance/guidance-2'
        },
        title: 'Guidance 2'
      }
    ]
  },
  {
    title: 'Components',
    hasDivider: true,
    items: [
      {
        collection: '/components/*',
        collectionId: 'components',
        order: 'alphabetical'
      }
    ]
  }
];
