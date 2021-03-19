import { useEffect, useState } from "react";
import Note from "../../Components/Note/Note";
import axios from "axios";
import Masonry from "react-masonry-css";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  notesGrid: {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
    margin: "auto"
  },
  notesGridItem: {
    maxWidth: 240,
    width: "100%",
    height: "auto",
    paddingLeft: theme.spacing(1) /* gutter size offset */,
    backgroundClip: "padding-box",
    "& > div": {
      marginBottom: theme.spacing(1) // space between items
    },
    // to center
    "&:first-child": {
      marginLeft: "auto"
    },
    "&:last-child": {
      marginRight: "auto"
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
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const promises = [];
    for (let i = 0; i < 9; i++) {
      promises.push(
        axios
          .get("https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum")
          .then((resp) => {
            const {
              words,
              very_long_sentence,
              short_sentence,
              long_sentence,
              paragraphs
            } = resp.data;
            let content = "";
            const which = ~~(Math.random() * 4);
            switch (which) {
              case 1:
                content = short_sentence;
                break;
              case 2:
                content = very_long_sentence;
                break;
              case 3:
                content = long_sentence;
                break;
              case 0:
                content = paragraphs.join(" ");
                break;
            }
            return {
              archived: false,
              pinned: false,
              title: words.join(" "),
              content: content
            };
          })
      );
    }
    Promise.all(promises).then((data) => {
      setData(data);
    });
  }, []);
  //TODO: select notes and make it copy-able to clipboard
  return (
    <Container maxWidth="xl" style={{ display: "flex" }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className={classes.notesGrid}
        columnClassName={classes.notesGridItem}
      >
        {data.map(({ title, content, archived, pinned }, i) => (
          <Note
            key={i}
            id={i}
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
