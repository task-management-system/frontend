import React from 'react';
import clsx from 'clsx';
import { List, ListItem, Typography, Checkbox, makeStyles } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    overflow: 'hidden',
    '&$outlined': {
      padding: theme.spacing(1),
      border: '1px solid rgba(0, 0, 0, 0.23)',
      borderRadius: theme.shape.borderRadius,
    },
  },
  outlined: {},
}));

const MarkdownView: React.FC<MarkdownViewProps> = ({ className, outlined = false, children }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, outlined && classes.outlined, className)}>
      <ScrollableArea>
        <ReactMarkdown plugins={plugins} renderers={renderers}>
          {children}
        </ReactMarkdown>
      </ScrollableArea>
    </div>
  );
};

export default MarkdownView;
