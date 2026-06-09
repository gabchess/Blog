import type { PostDetail } from './posts'

export const FALLBACK_POSTS: PostDetail[] = [
  {
    _id: 'fallback-1',
    title: 'Welcome to the Octant blog',
    slug: 'welcome-to-the-octant-blog',
    excerpt: 'What we are building and why.',
    publishedAt: '2024-01-15T00:00:00.000Z',
    tag: 'Announcements',
    body: [
      {
        _type: 'block',
        _key: 'fb1b1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'fb1s1',
            text: 'Welcome to the official Octant blog. Here we share updates, insights, and stories from the Octant ecosystem.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'fb1b2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'fb1s2',
            text: 'Octant is a community-driven platform for funding public goods. Stay tuned for more updates.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'fallback-2',
    title: 'Funding public goods, round by round',
    slug: 'funding-public-goods-round-by-round',
    excerpt: 'A look at how Octant allocations work.',
    publishedAt: '2024-02-01T00:00:00.000Z',
    tag: 'Ecosystem',
    body: [
      {
        _type: 'block',
        _key: 'fb2b1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'fb2s1',
            text: 'Each funding round, Octant distributes rewards to vetted public goods projects based on community allocations.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'fb2b2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'fb2s2',
            text: 'The allocation mechanism ensures that community voice drives where resources flow, creating sustainable funding for open-source infrastructure.',
            marks: [],
          },
        ],
      },
    ],
  },
  {
    _id: 'fallback-3',
    title: 'Building with the community',
    slug: 'building-with-the-community',
    excerpt: 'How Octant involves its community in governance and product decisions.',
    publishedAt: '2024-03-01T00:00:00.000Z',
    tag: 'Governance',
    body: [
      {
        _type: 'block',
        _key: 'fb3b1',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'fb3s1',
            text: 'Octant governance puts decision-making power in the hands of token holders and community participants.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'fb3b2',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'fb3s2',
            text: 'From project onboarding to reward parameters, the community shapes the future of public goods funding.',
            marks: [],
          },
        ],
      },
      {
        _type: 'block',
        _key: 'fb3b3',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: 'fb3s3',
            text: 'Join us in building a more equitable funding landscape for open-source and public goods projects.',
            marks: [],
          },
        ],
      },
    ],
  },
]
