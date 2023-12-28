import { AppBar, Box, Button, Card, CardContent, CardHeader, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Toolbar, Typography } from '@mui/material'
import React, { useRef, useState } from 'react'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import {URL} from '../App';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const form = useRef();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    // Login
    const submitLogin = async(e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
      
            let name = data.get('name');
            let email = data.get('email');
            let password = data.get('password');
               
          let res = await axios.post(`${URL}/users/signin`, {
            name,
            email,
            password
            })
            if(res.status === 200){
              navigate("/register")
              sessionStorage.setItem("token", res.data.token);
              sessionStorage.setItem('userId', res.data.user);
            }
        } catch (error) {
        console.log(error.text);
        }
    }

  return (
    <>
    <div>
    <Box sx={{ flexGrow: 1, m: -1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: '#000000' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QRS Course Enrollment
          </Typography>
          <Button color="inherit" onClick={()=>navigate('/admin/login')}>Admin Login</Button>
          <Button color="inherit" onClick={()=>navigate('/')}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#F9F9ED' }}>
        <Card sx={{ width: 400, borderRadius: '18px' }}>
            <CardHeader sx={{ backgroundColor: '#000000', color: '#FFF', textAlign: 'center', borderRadius: '18px', m: 2 }} title="Sign In" />
            <form ref={form} onSubmit={submitLogin}>
            <CardContent>
                <TextField required margin="dense" fullWidth id="name" name='name' label="Name" variant="outlined" />
                <TextField required margin="dense" fullWidth id="name" name='email' label="E mail" variant="outlined" />
                <FormControl margin="dense" sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        name='password'
                        required
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                        }
                    label="Password"
                    />
                </FormControl>
                <Button variant="contained" sx={{ backgroundColor: '#000000', my: 2, width: '100%', 
                '&:hover': { backgroundColor: '#131200', }, }} type="submit">Sign In</Button>
                <div>
                <Typography variant="subtitle1" gutterBottom onClick={()=>navigate('/signup')}>
                    Don't have account? Sign Up
                </Typography>
                </div>
            </CardContent>
            </form>
        </Card>
    </div>
    </>
  )
}

export default Login