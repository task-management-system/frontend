import React from 'react';
import { List, ListItem, Typography, Checkbox } from '@material-ui/core';
import Wrapper from 'components/common/Wrapper';
import ScrollableArea from 'components/common/ScrollableArea';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { Components } from 'react-markdown/src/ast-to-react';

interface MarkdownViewProps {
  className?: string;
  outlined?: boolean;
  children: string;
}

const plugins = [gfm];

const components: Components = {
  h1: ({ children }) => <Typography variant="h1">{children}</Typography>,
  h2: ({ children }) => <Typography variant="h2">{children}</Typography>,
  h3: ({ children }) => <Typography variant="h3">{children}</Typography>,
  h4: ({ children }) => <Typography variant="h4">{children}</Typography>,
  h5: ({ children }) => <Typography variant="h5">{children}</Typography>,
  h6: ({ children }) => <Typography variant="h6">{children}</Typography>,
  p: ({ children }) => <Typography>{children}</Typography>,
  ul: ({ children }) => (
    <List component="ul" dense>
      {children}
    </List>
  ),
  ol: ({ children }) => (
    <List component="ol" dense>
      {children}
    </List>
  ),
  //  prettier-ignore
  li: ({ children, ordered, checked, index }) => (
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
      <ReactMarkdown plugins={plugins} components={components}>
        {children}
      </ReactMarkdown>
    </ScrollableArea>
  </Wrapper>
);

export default MarkdownView;
