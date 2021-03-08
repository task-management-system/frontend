import React from 'react';
import clsx from 'clsx';
import { List, ListItem, Typography, Checkbox, makeStyles } from '@material-ui/core';
import { Variant } from '@material-ui/core/styles/createTypography';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

interface MarkdownViewProps {
  className?: string;
  children: string;
}

interface Renderer {
  children: React.ReactNode;
}

type HeadingRenderer = Renderer & { level: 1 | 2 | 3 | 4 | 5 | 6 };
type ParagraphRenderer = Renderer;
type ListRenderer = Renderer & { ordered: boolean };
type ListItemRenderer = Renderer & { ordered: boolean; checked?: boolean; index: number };

const plugins = [gfm];

const renderers = {
  heading: ({ children, level }: HeadingRenderer) => (
    <Typography variant={`h${level}` as Variant}>{children}</Typography>
  ),
  paragraph: ({ children }: ParagraphRenderer) => <Typography>{children}</Typography>,
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
    padding: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: theme.shape.borderRadius,
    display: 'grid',
    overflow: 'hidden',
  },
  wrapper: {
    overflow: 'auto',
  },
}));

const MarkdownView: React.FC<MarkdownViewProps> = ({ className, children }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.wrapper}>
        <ReactMarkdown plugins={plugins} renderers={renderers}>
          {children}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownView;
