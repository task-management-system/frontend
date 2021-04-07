import React from 'react';
import { List, ListItem, Typography, Checkbox } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import Wrapper from 'components/common/Wrapper';
import ScrollableArea from 'components/common/ScrollableArea';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface MarkdownViewProps {
  className?: string;
  outlined?: boolean;
  children: string;
}

interface Renderer {
  children: React.ReactNode;
}

type HeadingRenderer = Renderer & { level: 1 | 2 | 3 | 4 | 5 | 6 };
type ParagraphRenderer = Renderer;
type LinkRenderer = Renderer & { href: string };
type ListRenderer = Renderer & { ordered: boolean };
type ListItemRenderer = Renderer & { ordered: boolean; checked?: boolean; index: number };

const plugins = [gfm];

const renderers = {
  heading: ({ children, level }: HeadingRenderer) => (
    <Typography variant={`h${level}` as Variant}>{children}</Typography>
  ),
  paragraph: ({ children }: ParagraphRenderer) => <Typography>{children}</Typography>,
  link: ({ children, href }: LinkRenderer) => (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  ),
  list: ({ children, ordered }: ListRenderer) => (
    <List component={ordered ? 'ol' : 'ul'} dense>
      {children}
    </List>
  ),
  // prettier-ignore
  listItem: ({ children, ordered, checked, index }: ListItemRenderer) => (
    <ListItem>
      {ordered && <>{index + 1}.</>} {checked !== null && checked !== undefined && (
        <Checkbox checked={checked} size="small" readOnly />
      )} {children}
    </ListItem>
  ),
};

const MarkdownView: React.FC<MarkdownViewProps> = ({ className, outlined = false, children }) => (
  <Wrapper className={className} outlined={outlined}>
    <ScrollableArea>
      <ReactMarkdown plugins={plugins} renderers={renderers}>
        {children}
      </ReactMarkdown>
    </ScrollableArea>
  </Wrapper>
);

export default MarkdownView;
