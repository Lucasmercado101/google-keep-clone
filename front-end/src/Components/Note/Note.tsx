import { makeStyles, Typography, Modal } from "@material-ui/core";
import { useState } from "react";
import EditNote from "../../Components/EditNote/EditNote";
import { usePutNote } from "../../Hooks/queries";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    maxWidth: 240,
    borderRadius: 8,
    border: `thin solid ${theme.palette.text.disabled}`,
    padding: theme.spacing(1, 2),
    minHeight: 100,
    maxHeight: 450,
    height: "100%"
  },
  title: {
    fontWeight: 500,
    marginBottom: 5
  },
  content: {}
}));
// about 50 chars max title

type props = {
  title?: string;
  content?: string;
  archived: boolean;
  pinned: boolean;
  id: number;
};

const Note: React.FC<props> = ({ id, archived, content, pinned, title }) => {
  const putNote = usePutNote();
  const classes = useStyles();
  const [isEditingModal, setIsEditingModal] = useState(false);

  if (title) {
    // maximum 50 char title
    title = title.length > 50 ? `${title.substr(0, 47).trim()}...` : title;
  }

  if (content) {
    // maximum 235 content
    content =
      content.length > 235 ? `${content.substr(0, 232).trim()}...` : content;
  }

  return (
    <>
      <div
        onClick={() => setIsEditingModal(true)}
        className={classes.container}
      >
        <Typography
          className={classes.title}
          variant="subtitle1"
          component="h4"
        >
          {title}
        </Typography>
        <Typography className={classes.content}>{content}</Typography>
      </div>
      <Modal
        style={{ width: "100%", height: "100%", display: "flex" }}
        open={isEditingModal}
        onClose={() => setIsEditingModal(false)}
      >
        <EditNote
          style={{ margin: "auto", maxHeight: "100vh", overflow: "auto" }}
          archived={archived}
          content={content}
          pinned={pinned}
          title={title}
          onClickOutside={(data) => {
            putNote(id, data);
          }}
        />
      </Modal>
    </>
  );
};

export default Note;
