import { List, ButtonBase, ListItem, ListItemIcon, ListItemText, Typography, Paper, InputBase, Checkbox } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    container: {
        minWidth: 225,
        maxWidth: 225,
    },
    header: {
        padding: theme.spacing(2)
    },
    list: {
        maxHeight: 260,
        overflow: "auto"
    },
    listItem: {
        display: "flex",
    },
    listItemContainer: {
        paddingLeft: theme.spacing(1),
    },
    iconContainer: {
        height: 29,
        alignSelf: "flex-start",
        maxWidth: 25,
        minWidth: 0,
    },
    icon: {
        transform: "scale(0.8)"
    },
    listItemText: {
        lineHeight: 1
    }
}))

const dummyData = [['aa a aa a aa a ', 'a', 'a', 'a'], ['aaa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a aa a '], ['a'], ['a'], ['a'], ['a'], ['a', 'a', 'a', 'a', 'a'], ['a', 'a', 'a', 'a', 'a'], ['a', 'a'], ['a', 'a'], ['a'], ['a'], ['a', 'a'], ['a', 'a', 'a', 'a', 'a'], ['a', 'a'], ['a', 'a', 'a'], ['a', 'a', 'a', 'a'], ['a', 'a', 'a'], ['a', 'a', 'a', 'a']]


function LabelsMenu() {
    const classes = useStyles();
    return (
        <Paper elevation={3} className={classes.container}>
            <div className={classes.header}>
                <Typography>Label note</Typography>
                <InputBase placeholder="Enter label name" />
            </div>
            <List className={classes.list}>
                {dummyData.map(word =>
                    <ListItem classes={{ gutters: classes.listItemContainer }} className={classes.listItem} button disableRipple disableTouchRipple dense>
                        <ListItemIcon className={classes.iconContainer}>
                            <Checkbox
                                className={classes.icon}
                                edge="start"
                                tabIndex={-1}
                                style={{ pointerEvents: "none" }}
                            />
                        </ListItemIcon>
                        <ListItemText classes={{ primary: classes.listItemText }} >
                            {word.join("")}
                        </ListItemText>
                    </ListItem>
                )}
            </List>
        </Paper>
    )
}

export default LabelsMenu
