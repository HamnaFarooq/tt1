import { useHistory } from "react-router-dom";
import { register } from "../../store/action/auth";
import { useDispatch, useSelector } from "react-redux";

import {
  Button,
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Typography,
  Card,
} from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 300,
  },
  container: {
    display: "flex",
    paddingTop: 24,
    flexDirection: "column",
  },
};

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticatedVal = useSelector((state) => state.auth);

  isAuthenticatedVal.isAuthenticated && history.push("/");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }));
  };

  const [rememberChecked, setRememberChecked] = useState(true);

  return (
    <Card style={styles.card}>
      <div style={styles.container}>
        <InputLabel style={{ marginBottom: 4 }}>Name</InputLabel>
        <TextField
          name="name"
          value={name}
          onChange={(e) => onChange(e)}
          style={{ marginBottom: 8 }}
          variant="outlined"
          size="small"
        />

        <InputLabel style={{ marginBottom: 4 }}>Email</InputLabel>
        <TextField
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          style={{ marginBottom: 8 }}
          variant="outlined"
          size="small"
        />

        <InputLabel style={{ marginBottom: 4 }}>Password</InputLabel>
        <TextField
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
          style={{ marginBottom: 8 }}
          variant="outlined"
          size="small"
        />
        <FormControlLabel
          style={{ marginBottom: 8 }}
          control={
            <Checkbox
              checked={rememberChecked}
              onChange={() => setRememberChecked(!rememberChecked)}
              name="rememberme"
              color="primary"
            />
          }
          label="Remember me"
        />
        <Typography style={{ marginBottom: 8 }} align="center" variant="body2">
          Have an account?{" "}
          <Link onClick={() => history.push("/login")} variant="body2">
            {"Sign in"}
          </Link>
        </Typography>

        <Button onClick={(e) => onSubmit(e)} color="primary" size="small">
          Done
        </Button>
      </div>
    </Card>
  );
};

export default Signup;
