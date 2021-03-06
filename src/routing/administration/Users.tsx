import React, { useState, useEffect } from 'react';
import { Typography, Fade, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Container from 'components/common/Container';
import UsersGrid from 'components/user/UsersGrid';
import LightSkeleton from 'components/themed/LightSkeleton';
import TinyButton from 'components/themed/TinyButton';
import usePromiseTrack from 'hooks/usePromiseTrack';
import { groupBy, range } from 'utils';
import { getUsers } from 'api/v1';
import { User } from 'types';

type ChapterRefs = { [key: string]: React.RefObject<HTMLDivElement> };

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'max-content 1fr',
    overflow: 'hidden',
  },
  chapters: {
    padding: theme.spacing(1, 2),
    gap: theme.spacing(0.5),
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    background: '#333333',
    color: theme.palette.common.white,
  },
  container: {
    overflow: 'auto',
  },
  groups: {
    gap: theme.spacing(3),
    display: 'grid',
    gridAutoRows: 'max-content',
  },
  group: {
    gap: theme.spacing(2),
    display: 'grid',
    gridTemplateRows: 'max-content max-content',
  },
}));

const Users: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<User[]>([]);
  const [inProgress, trackedGetUsers] = usePromiseTrack(getUsers);

  useEffect(() => {
    trackedGetUsers().then(response => {
      setUsers(response.data?.list || []);
    });
  }, []);

  const updateUsers = async () => {
    const response = await getUsers();
    setUsers(response.data?.list || []);
  };

  const groups = groupBy(users, user => user.username[0].toUpperCase());
  const chapters = [...groups.keys()].sort((a, b) => a.localeCompare(b));
  const references = chapters.reduce<ChapterRefs>((accumulator, chapter) => {
    accumulator[chapter] = React.createRef();

    return accumulator;
  }, {});

  const handleChapterClick = (chapter: string) => {
    references[chapter].current?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.chapters}>
        {chapters.length > 0 && !inProgress
          ? chapters.map(chapter => (
              <Fade in={true} key={chapter}>
                <TinyButton color="inherit" onClick={() => handleChapterClick(chapter)}>
                  {chapter}
                </TinyButton>
              </Fade>
            ))
          : range(4).map(index => (
              <LightSkeleton variant="rect" width={32} height={32} key={index} />
            ))}
      </div>
      <div className={classes.container}>
        <Container className={classes.groups}>
          {chapters.length > 0 && !inProgress
            ? chapters.map(chapter => (
                <Fade in={true} key={chapter}>
                  <div className={classes.group} ref={references[chapter]}>
                    <Typography variant="h4">{chapter}</Typography>
                    <UsersGrid users={groups.get(chapter)!} updateUsers={updateUsers} />
                  </div>
                </Fade>
              ))
            : range(2).map(index => (
                <div className={classes.group} key={index}>
                  <Typography variant="h4">
                    <Skeleton width={100} />
                  </Typography>
                  <Skeleton variant="rect" height={240} />
                </div>
              ))}
        </Container>
      </div>
    </div>
  );
};

export default Users;
