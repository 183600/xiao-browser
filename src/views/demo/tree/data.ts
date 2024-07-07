export const treeData = [
  {
    label: 'parent 0-0',
    key: '0-0',
    children: [
      { label: 'leaf 0-0-0', key: '0-0-0', isLeaf: true },
      {
        label: 'children 0-0-1',
        key: '0-0-1',
        children: [
          {
            label: 'children 0-0-0-0',
            key: '0-0-0-0',
            children: [{ label: 'leaf 0-0-0-0-1', key: '0-0-0-0-1' }],
          },
          { label: 'leaf 0-0-0-1', key: '0-0-0-1', isLeaf: true },
        ],
      },
    ],
  },
  {
    label: 'parent 1-1',
    key: '1-1',
    children: [
      {
        label: 'leaf 1-1-0',
        key: '1-1-0',
        children: [
          { label: 'leaf 1-1-1-0', key: '1-1-1-0' },
          { label: 'leaf 1-1-1-1', key: '1-1-1-1' },
        ],
      },
      { label: 'leaf 1-1-1', key: '1-1-1', isLeaf: true },
    ],
  },
  {
    label: 'parent 2-2',
    key: '2-2',
    children: [
      { label: 'leaf 2-2-0 disabled', key: '2-2-0', disabled: true, isLeaf: true },
      { label: 'leaf 2-2-1', key: '2-2-1', isLeaf: true },
    ],
  },
]
