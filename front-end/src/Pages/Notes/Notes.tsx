import { useEffect, useState } from "react";
import Note from "../../Components/Note/Note";
import axios from "axios";
import Masonry from "react-masonry-css";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { useFetchAllMyNotes } from "../../Hooks/queries";

const useStyles = makeStyles((theme) => ({
  notesGrid: {
    display: "flex",
    width: "80%",
    alignItems: "flex-start",
    margin: "auto"
  },
  notesGridItem: {
    maxWidth: 240,
    width: "100%",
    height: "100%",
    paddingLeft: theme.spacing(1) /* gutter size offset */,
    backgroundClip: "padding-box",
    "& > div": {
      marginBottom: theme.spacing(1) // space between items
    }
  }
}));

const breakpointColumnsObj = {
  default: 7,
  1900: 6,
  1500: 5,
  1300: 4,
  1050: 3,
  850: 2,
  600: 1
};

function Notes() {
  const classes = useStyles();
  const { data: notesData } = useFetchAllMyNotes();

  //TODO: drag and drop, add ordinals to notes
  //TODO: select notes and make it copy-able to clipboard
  return (
    <Container maxWidth="xl" style={{ display: "flex" }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.notesGrid}
        columnClassName={classes.notesGridItem}
      >
        {notesData &&
          notesData.map(({ title, content, archived, pinned, id }) => (
            <Note
              key={id}
              id={id}
              title={title}
              content={content}
              pinned={pinned}
              archived={archived}
            />
          ))}
      </Masonry>
    </Container>
  );
}

export default Notes;
