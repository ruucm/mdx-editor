export interface TreeItem {
  id: string
  children: TreeItem[]
  collapsed?: boolean
}

export type TreeItems = TreeItem[]

export const initialItems: TreeItems = [
  {
    id: '👩‍🎨 Block { maxWidth: "1080px", margin: "0 auto", textAlign: "center" }',
    children: [
      { id: "# Title 2", children: [] },
      {
        id: `Lorem ipsum dolor sit amet, consectetur 
        
        
        adipiscing elit.`,
        children: [],
      },
      {
        id: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        children: [],
      },
    ],
  },
]

export const initialItems2: TreeItems = [
  {
    id: "👩‍🎨 Row 1",
    children: [
      { id: "# Title", children: [] },
      {
        id: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        children: [],
      },
      {
        id: "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        children: [],
      },
    ],
  },
  {
    id: "👩‍🎨 Row 2",
    children: [
      { id: "👩‍🎨 Column 1-1", children: [] },
      { id: "👩‍🎨 Column 1-2", children: [] },
      { id: "👩‍🎨 Column 1-3", children: [] },
    ],
  },
  {
    id: "👩‍🎨 Row 3",
    children: [
      {
        id: '👩‍🎨 Block { maxWidth: "1080px", margin: "0 auto", textAlign: "center" }',
        children: [
          { id: "👩‍🎨 Column 2-1", children: [] },
          { id: "👩‍🎨 Column 2-2", children: [] },
        ],
      },
    ],
  },
]

export const initialItems3: TreeItems = [
  {
    id: '👩‍🎨 Block { maxWidth: "1080px", margin: "0 auto" }',
    children: [
      {
        id: `👩‍🎨 Row { id: "row-1" }`,
        children: [
          { id: 'Spacing { height: "scale3200" }', children: [] },
          {
            id: `👩‍🎨 Column { id: "column-1" }`,
            children: [
              {
                id: `Video { src: "/interactive-design-system.mp4" }`,
                children: [],
              },
            ],
          },
          {
            id: `👩‍🎨 Column { id: "column-2" }`,
            children: [{ id: 'Spacing { width: "scale2400" }', children: [] }],
          },
          {
            id: `👩‍🎨 Column { id: "column-3" }`,
            children: [
              {
                id: `# Framer: The Complete Guide ─ Interactive Design Systems`,
                children: [],
              },
              { id: 'Spacing { height: "scale650" }', children: [] },
              {
                id: "Have you been creating design systems for your apps with static graphics only?",
                children: [],
              },
              {
                id: `Create a dynamic design system with the power of Framer's Smart Components.`,
                children: [],
              },
            ],
          },
        ],
      },
      { id: 'Spacing { height: "scale4800" }', children: [] },
      {
        id: `👩‍🎨 Row { id: "row-2" }`,
        children: [
          {
            id: '👩‍🎨 Block { maxWidth: "450px", margin: "0 auto", textAlign: "center" }',
            children: [
              {
                id: `## Use Framer to create various forms that range from simple to complex.`,
                children: [],
              },
              { id: 'Spacing { height: "scale700" }', children: [] },
              {
                id: `In this course, you'll use Framer to create simple Hover and Tap interactions, as well as Form interactions that receive complex user input.`,
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
]
