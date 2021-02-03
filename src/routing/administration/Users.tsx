import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import UsersGrid from 'components/UsersGrid';
import TinyButton from 'components/themed/TinyButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { groupBy } from 'utils';
import { getUsers } from 'api/v1';
import { IUser } from 'types';

const useStyles = makeStyles(theme => ({
  root: {
    gap: theme.spacing(3),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  chapters: {
    gap: theme.spacing(0.5),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
  },
  group: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: 'max-content max-content',
  },
}));

const Users: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<IUser[]>([]);
  const [inProgress, trackedGetUsers] = usePromiseTrack(getUsers);

  useEffect(() => {
    trackedGetUsers().then(response => {
      setUsers(response.data?.list || []);
    });
  }, []);

  const groups = groupBy(users, user => user.username[0].toUpperCase());
  const chapters = [...groups.keys()].sort((a, b) => a.localeCompare(b));
  const references = chapters.reduce<{ [key: string]: React.RefObject<HTMLDivElement> }>(
    (accumulator, chapter) => {
      accumulator[chapter] = React.createRef();

      return accumulator;
    },
    {}
  );

  const handleChapterClick = (chapter: string) => {
    references[chapter].current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.root}>
      {/* <pre>{JSON.stringify({ inProgress, users }, null, 4)}</pre> */}
      <div className={classes.chapters}>
        {chapters.map(chapter => (
          <TinyButton color="primary" onClick={() => handleChapterClick(chapter)} key={chapter}>
            {chapter}
          </TinyButton>
        ))}
      </div>
      {chapters.map(chapter => (
        <div className={classes.group} ref={references[chapter]} key={chapter}>
          <Typography variant="h4">{chapter}</Typography>
          <UsersGrid users={groups.get(chapter)!} />
        </div>
      ))}
    </div>
  );
};

export default Users;
