import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../api'; // Assuming this import is correctly set up
import { enterUser } from '../store/actions';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useStyles from './FormDesign'; 


export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    } else if (e.target.name === 'password') {
      setPassword(e.target.value);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const check = {
      Username: name,
      Password: password,
    };

    checkUser(check)
      .then((res) => {
        sessionStorage["user"] = JSON.stringify(res); //save connected user in sessionstorage
        dispatch(enterUser(res));
        alert(`ברוך שובך: ${res.Name}!`);
        navigate('/list');
      })
      .catch((err) => {
        console.log(err);
        alert('משתמש זה אינו קיים במערכת!');
        navigate('/register');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          {/* Replace this with your avatar */}
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="שם משתמש"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="סיסמה"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            כניסה
          </Button>
        </form>
      </div>
    </Container>
  );
}
