import { useEffect } from "react";
import { makeStyles, Typography, IconButton } from "@material-ui/core";
import { Icon } from "@mdi/react";
import { mdiPinOutline as PinIcon, mdiPin as UnpinIcon } from "@mdi/js";
import { useMachine } from "@xstate/react";
import { createNoteMachine, sendTypes, stateTypes } from "./noteMachine";
import clsx from "clsx";
import { useRouter } from "react-router5";
import { sendTypes as homeSendTypes } from "../../Pages/Home/homeMachine";
import { useHomeMachineFSM } from "../../Pages/Home/homeMachine/homeMachineContext";
import { useQueryClient, useMutation } from "react-query";
import { putPinNote, putUnpinNote } from "../../api";

const useStyles = makeStyles((theme) => ({
  noteContainer: {
    width: 240,
    maxWidth: 240,
    minHeight: 100,
    maxHeight: 450,
    height: "100%",
    border: `thin solid transparent`,
    overflow: "hidden",
    borderRadius: 8
  },
  noteNoColorsContainer: {
    border: `thin solid ${theme.palette.text.disabled}`
  },
  coloredNote: ({ color }: { color?: string }) => ({
    position: "relative",
    "&::after": {
      zIndex: -1,
      content: "''",
      position: "absolute",
      height: "100%",
      top: 0,
      left: 0,
      width: "100%",
      filter: "saturate(350%) opacity(0.25)",
      backgroundImage: color && `linear-gradient(${color}, ${color})`
    }
  }),
  noteContentContainer: {
    padding: theme.spacing(1.5, 2)
  },
  title: {
    fontWeight: 500,
    marginBottom: 5,
    flexGrow: 1,
    lineHeight: 1.7
  },
  pinIcon: {
    float: "right",
    marginBottom: -10,
    marginLeft: -3,
    color: theme.palette.text.secondary
  },
  content: {
    fontSize: "1.05em"
  },
  shortContent: {
    fontWeight: 500,
    fontSize: "initial"
  },
  hidden: {
    opacity: 0,
    transition: "opacity 350ms"
  },
  visible: {
    opacity: 1
  }
}));

function shorten(str: string | undefined | null, len: number) {
  if (!str) return;
  return str.length > len ? `${str.substr(0, len - 3).trim()}...` : str;
}

const Note: React.FC<any> = ({
  id,
  archived,
  content,
  pinned = false,
  title,
  color,
  labels
}) => {
  const queryClient = useQueryClient();
  const pinNoteMutation = useMutation(() => putPinNote(id), {
    async onMutate() {
      const pinnedNotesKey = ["notes", { pinned: true }];
      await queryClient.cancelQueries(pinnedNotesKey);
      const previousNotes = queryClient.getQueryData(pinnedNotesKey);
      const normalNotesData = queryClient.getQueryData([
        "notes",
        { pinned: false, archived: false }
      ]);

      const pinnedNote = (normalNotesData as any).find(
        (noteData: any) => noteData.id === id
      );
      pinnedNote.pinned = true;

      // add new and sort by id ASC
      queryClient.setQueryData(pinnedNotesKey, (old) =>
        [...(old as {}[]), pinnedNote].sort(
          (noteData: any, nextNoteData: any) => {
            if (noteData.id > nextNoteData.id) return 1;
            if (noteData.id < nextNoteData.id) return -1;
            return 0;
          }
        )
      );

      queryClient.setQueryData(
        ["notes", { pinned: false, archived: false }],
        (old) => (old as {}[]).filter((noteData: any) => noteData.id !== id)
      );

      return { previousNotes };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["notes", { pinned: true }],
        (context as any).previousNotes
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries("notes");
    }
  });

  const unpinMutation = useMutation(() => putUnpinNote(id), {
    async onMutate() {
      const otherNotesKey = ["notes", { pinned: false, archived: false }];
      await queryClient.cancelQueries(otherNotesKey);
      const previousNotes = queryClient.getQueryData(otherNotesKey);
      const normalNotesData = queryClient.getQueryData([
        "notes",
        { pinned: true }
      ]);

      const unpinnedNote = (normalNotesData as any).find(
        (noteData: any) => noteData.id === id
      );
      unpinnedNote.pinned = false;

      // add new and sort by id ASC
      queryClient.setQueryData(otherNotesKey, (old) =>
        [...(old as {}[]), unpinnedNote].sort(
          (noteData: any, nextNoteData: any) => {
            if (noteData.id > nextNoteData.id) return 1;
            if (noteData.id < nextNoteData.id) return -1;
            return 0;
          }
        )
      );

      queryClient.setQueryData(["notes", { pinned: true }], (old) =>
        (old as {}[]).filter((noteData: any) => noteData.id !== id)
      );

      return { previousNotes };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        ["notes", { pinned: false, archived: false }],
        (context as any).previousNotes
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries("notes");
    }
  });

  const [state, send] = useMachine(createNoteMachine(pinned), {
    services: {
      pinNote: () =>
        pinNoteMutation.mutateAsync(id, {
          onSuccess() {
            queryClient.invalidateQueries("notes");
          }
        }),
      unpinNote: () =>
        unpinMutation.mutateAsync(id, {
          onSuccess() {
            queryClient.invalidateQueries("notes");
          }
        })
    }
  });
  const [_, homeSend] = useHomeMachineFSM();
  const classes = useStyles({ color });
  const router = useRouter();

  return (
    <div
      className={clsx(
        classes.noteContainer,
        color ? classes.coloredNote : classes.noteNoColorsContainer
      )}
      onMouseOver={() => send(sendTypes.MOUSE_HOVERED_ON_NOTE)}
      onMouseLeave={() => send(sendTypes.MOUSE_LEFT_NOTE_AREA)}
      onClick={() => {
        router.navigate(`notes.edit`, { id });
        homeSend(homeSendTypes.EDIT_NOTE, {
          id,
          archived,
          content,
          pinned,
          title,
          color,
          labels
        });
      }}
    >
      <div className={classes.noteContentContainer}>
        <Typography className={classes.title}>
          <IconButton
            size="small"
            className={clsx(
              classes.pinIcon,
              classes.hidden,
              state.matches({ noteDefault: stateTypes.MOUSE_HOVERED_ON }) &&
                classes.visible
            )}
            onClick={(e) => {
              e.stopPropagation();
              switch (true) {
                case state.matches({ pin: stateTypes.PINNED }):
                case state.matches({ pin: stateTypes.PINNING }):
                  send(sendTypes.UNPIN, { id });
                  break;
                case state.matches({ pin: stateTypes.UNPINNED }):
                case state.matches({ pin: stateTypes.UNPINNING }):
                  send(sendTypes.PIN, { id });
                  break;
              }
            }}
          >
            <Icon
              path={
                [{ pin: stateTypes.PINNED }, { pin: stateTypes.PINNING }].some(
                  state.matches
                )
                  ? UnpinIcon
                  : PinIcon
              }
              size={1}
            />
          </IconButton>
          {shorten(title, 90)}
        </Typography>
        <Typography
          className={clsx(
            classes.content,
            content && content.length < 20 && classes.shortContent
          )}
        >
          {shorten(content, 235)}
        </Typography>
      </div>
    </div>
  );
};

export default Note;
