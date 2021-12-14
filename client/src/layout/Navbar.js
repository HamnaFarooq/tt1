import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../store/action/auth";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShareIcon from "@material-ui/icons/Share";
import NotificationsIcon from "@material-ui/icons/Notifications";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShareMenu from "../components/myProjects/ShareMenu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Popover } from "@material-ui/core";
import Notifications from "../components/myProjects/Notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  placement: {
    // right: "700px",
    // top: "2px",
    display: "flex",
    flexDirection: "row",
  },
  button: {
    margin: theme.spacing(1),
  },
  buttonBorder: {
    borderRadius: "20px",
  },
  buttonSpacing: {
    left: "15px",
  },
}));

const Navbar = () => {
  // const checking = useSelector(state => state.auth)
  // console.log(checking)
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [showShare, setShowShare] = useState(true);

  const handleCLickShare = (event) => {
    setShowShare(true);
    handleClick(event);
  };

  const handleCLickNotif = (event) => {
    setShowShare(false);
    handleClick(event);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const classes = useStyles();

  const isAuthenticatedVal = useSelector((state) => state.auth);

  const guestLinks = (
    <Fragment>
      <Link to="/login">
        <Button className={classes.placement}>
          Login
        </Button>
      </Link>
      <Link to="/signup">
        <Button className={classes.placement}>
          Signup
        </Button>
      </Link>
    </Fragment>
  );

  const authLinks = (
    <Fragment>
      <Button
        aria-describedby={id}
        onClick={(event) => handleCLickShare(event)}
        variant="contained"
        style={{ backgroundColor: "#042f66", color: "white" }}
        size="small"
        className={(classes.button, classes.buttonBorder)}
        startIcon={<ShareIcon />}
      >
        Share
      </Button>

      {/* <Button
        name="notifications"
        aria-describedby={id}
        onClick={(event) => handleCLickNotif(event)}
        style={{ color: "#042f66" }}
        size="large"
        className={classes.buttonSpacing}
        startIcon={<NotificationsIcon />}
      ></Button> */}

      <Button
        name="profile"
        style={{ color: "#042f66" }}
        size="large"
        startIcon={<AccountCircleIcon />}
      ></Button>

      <Button
        name="logout"
        style={{ color: "#042f66" }}
        size="large"
        onClick={() => dispatch(logout())}
        startIcon={<ExitToAppIcon />}
      ></Button>
    </Fragment>
  );

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar variant="dense">
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography
              variant="h5"
              style={{ fontWeight: "bold", color: "#042f66", flexGrow: 'inherit', marginRight: '1rem' }}
              className={classes.title}
            >
              Taskview
            </Typography>
            {isAuthenticatedVal.isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {console.log(showShare)}
          {showShare ? (
            <ShareMenu handleClose={handleClose} />
          ) : (
            <Notifications handleClose={handleClose} />
          )}
        </Popover>
      </div>
    </Fragment>
  );
};

export default Navbar;
