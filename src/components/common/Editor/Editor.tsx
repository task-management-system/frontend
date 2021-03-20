import React, { useRef } from 'react';
import clsx from 'clsx';
import { ButtonGroup, Button, makeStyles } from '@material-ui/core';
import { Action } from './utils';
import { noop } from 'utils';

export interface EditorProps {
  className?: string;
  value?: string;
  groupActions?: Action[][];
  onChange?: (value: string) => void;
}

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    display: 'grid',
    gridTemplateRows: 'max-content',
    background: theme.palette.common.white,
  },
  toolbar: {
    padding: theme.spacing(1),
    gap: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderBottom: 'none',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    background: theme.palette.background.default,
  },
  wrapper: {
    minHeight: 240,
    padding: theme.spacing(1),
    border: '1px solid rgba(0, 0, 0, 0.23)',
    boxSizing: 'border-box',
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    display: 'grid',
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:focus-within': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
      '& > $textarea': {
        margin: -1,
      },
    },
  },
  textarea: {
    padding: 0,
    border: 'none',
    fontSize: 'inherit',
    fontFamily: 'inherit',
    background: 'transparent',
    resize: 'none',
    '&:focus': {
      outline: 'none',
    },
  },
}));

const Editor: React.FC<EditorProps> = ({
  className,
  value = '',
  groupActions = [],
  onChange = noop,
}) => {
  const classes = useStyles();
  const textarea = useRef<HTMLTextAreaElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  const handleClick = (action: Action) => {
    const { current: element } = textarea;
    if (element !== null) {
      const start = element.selectionStart;
      const end = element.selectionEnd;
      const result = action.run(element.value.slice(start, end));

      element.setRangeText(result.value, start, end);
      element.dispatchEvent(new Event('change', { bubbles: true }));
      element.focus();
      element.setSelectionRange(start + result.start, start + result.end);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      {groupActions.length > 0 && (
        <div className={classes.toolbar}>
          {groupActions.map((actions, index) => (
            <ButtonGroup
              size="small"
              color="secondary"
              variant="contained"
              disableElevation
              key={index}
            >
              {actions.map((action, index) => (
                <Button onClick={() => handleClick(action)} key={index}>
                  {action.content}
                </Button>
              ))}
            </ButtonGroup>
          ))}
        </div>
      )}
      <div className={classes.wrapper}>
        <textarea
          className={classes.textarea}
          value={value}
          onChange={handleChange}
          ref={textarea}
        ></textarea>
      </div>
    </div>
  );
};

export default Editor;
