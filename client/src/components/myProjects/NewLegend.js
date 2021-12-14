import {
  Card,
  IconButton,
  Button,
  TextField,
  Popover,
  Typography,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { ColorPalette } from "material-ui-color";

const palette = {
  red: "#ff0000",
  blue: "#0000ff",
  green: "#00ff00",
  yellow: "yellow",
  cyan: "cyan",
  lime: "lime",
  gray: "gray",
  orange: "orange",
  purple: "purple",
  black: "black",
  white: "white",
  pink: "pink",
  darkblue: "darkblue",
};

const styles = {
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: 400,
  },
  projectBar: {
    display: "flex",
    backgroundColor: "#042f66",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    paddingLeft: 12,
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  doneButton: {
    borderRadius: 24,
    alignSelf: "center",
    paddingLeft: 24,
    paddingRight: 24,
  },
  buttonGroup: {
    paddingTop: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
};
const NewLegend = ({ handleClose }) => {
  return (
    <Card style={styles.cardContainer}>
      <div style={styles.projectBar}>
        <Typography>Add Legend</Typography>
        <IconButton onClick={handleClose} style={{ color: "white" }} fontSize="small">
          <CancelIcon fontSize="small" />
        </IconButton>
      </div>
      <div style={styles.contentContainer}>
        <div style={{ marginBottom: 16 }}>
          <TextField variant="outlined" size="small" placeholder="Name" />
        </div>
        <TextField
          multiline={true}
          variant="outlined"
          size="small"
          rows={4}
          placeholder="Description"
        />

        <ColorPalette size={16} palette={palette} />
        <div style={styles.buttonGroup}>
          <Button
            style={styles.doneButton}
            variant="contained"
            style={{ backgroundColor: "#042f66", color: "white", width: 100 }}
            size="small"
            disableElevation={true}
          >
            Done
          </Button>
          <Button color="primary" size="small">
            Add another legend
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NewLegend;
