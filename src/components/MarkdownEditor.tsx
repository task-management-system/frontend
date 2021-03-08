import React from 'react';
import {
  FormatItalic,
  FormatBold,
  FormatStrikethrough,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
  Link,
  Image,
} from '@material-ui/icons';
import { Editor, Action, EditorProps } from 'components/common/Editor';
import { H1, H2, H3, H4, H5, H6 } from 'icons';

type MarkdownEditorProps = Omit<EditorProps, 'groupActions'>;

const formatLines = (
  string: string,
  formatter: (value: string, index: number, array: string[]) => string
) => string.split(/\n/g).map(formatter).join('\n');

// prettier-ignore
const groupActions: Action[][] = [
  [
    new Action(<H1 />, selection => `# ${selection}`),
    new Action(<H2 />, selection => `## ${selection}`),
    new Action(<H3 />, selection => `### ${selection}`),
    new Action(<H4 />, selection => `#### ${selection}`),
    new Action(<H5 />, selection => `##### ${selection}`),
    new Action(<H6 />, selection => `###### ${selection}`),
  ],
  [
    new Action(<FormatItalic />, selection => `*${selection}*`, true),
    new Action(<FormatBold />, selection => `**${selection}**`, true),
    new Action(<FormatStrikethrough />, selection => `~~${selection}~~`, true),
  ],
  [
    new Action(<FormatQuote />, selection => `> ${selection}`),
    new Action(<Link />, (selection, cursor) => `[${selection}](${cursor})`),
    new Action(<Image />, (selection, cursor) => `![${selection}](${cursor})`),
  ],
  [
    new Action(<FormatListBulleted />, selection => formatLines(selection, value => `- ${value}`)),
    new Action(<FormatListNumbered />, selection => formatLines(selection, (value, index) => `${index}. ${value}`)),
  ],
];

const MarkdownEditor: React.FC<MarkdownEditorProps> = props => (
  <Editor groupActions={groupActions} {...props} />
);

export default MarkdownEditor;
