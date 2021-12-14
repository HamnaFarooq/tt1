import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/action/auth";
import { useHistory } from "react-router-dom";

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

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    width: 300,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    width: 300,
  },
  signupButton: {
    borderRadius: 24,
    width: 100,
    marginBottom: 16,
    alignSelf: "center",
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthentiatedVal = useSelector((state) => state.auth);

  isAuthentiatedVal.isAuthenticated && history.push("/");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const [rememberChecked, setRememberChecked] = useState(true);
  return (
    <Card style={styles.card}>
      <div
        style={{
          display: "flex",
          paddingTop: 24,
          flexDirection: "column",
        }}
      >
        <InputLabel style={{ marginBottom: 4 }}>Email</InputLabel>
        <TextField
          style={{ marginBottom: 8 }}
          variant="outlined"
          size="small"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
        />

        <InputLabel style={{ marginBottom: 4 }}>Password</InputLabel>
        <TextField
          style={{ marginBottom: 8 }}
          variant="outlined"
          size="small"
          name="password"
          value={password}
          onChange={(e) => onChange(e)}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: 8,
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
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
          <Typography onClick={() => { }} style={{ marginTop: 8 }}>
            Forgot password?
          </Typography>
        </div>
        <Button
          style={{
            ...styles.signupButton,
            backgroundColor: "#042f66",
            color: "white",
          }}
          variant="contained"
          size="small"
          onClick={(e) => onSubmit(e)}
        >
          Login
        </Button>
        <Typography style={{ marginBottom: 8 }} align="center" variant="body2">
          Not a member yet?{" "}
          <Link onClick={() => history.push("/signup")} variant="body2">
            {"Join us"}
          </Link>
        </Typography>
      </div>
    </Card>
  );
};

export default Login;
