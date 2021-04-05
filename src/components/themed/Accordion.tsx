import { Accordion, AccordionSummary, AccordionDetails, withStyles } from '@material-ui/core';

export const TaskAccordion = withStyles(theme => ({
  root: {
    '&$expanded': {
      margin: 0,
    },
    '&:before': {
      display: 'none',
    },
  },
  expanded: {},
}))(Accordion);

export const TaskAccordionSummary = withStyles(theme => ({
  root: {
    minHeight: 'auto',
    padding: 0,
    '&$expanded': {
      minHeight: 'auto',
    },
  },
  content: {
    margin: 0,
    display: 'block',
    '&$expanded': {
      margin: 0,
    },
  },
  expanded: {},
}))(AccordionSummary);

export const TaskAccordionDetails = withStyles(theme => ({
  root: {
    padding: 0,
    display: 'block',
  },
}))(AccordionDetails);
