import React, { useRef } from 'react'
import Base from '../components/Base'
import { Button, Card, CardContent, CardHeader, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {URL, token} from '../App';

const Course = () => {
    const form = useRef();
    const navigate = useNavigate();

    // add course
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const data = new FormData(e.currentTarget);
          
                let name = data.get('name');
                let description = data.get('description');
                   
              let res = await axios.post(`${URL}/admins/course/add`, {
                name,
                description
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                if(res.status === 200){
                  navigate("/dashboard")
                }
        } catch (error) {
            console.log(error.text); 
        }
    }

  return (
    <Base title={'Courses'}>
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Card sx={{ width: 400, borderRadius: '18px' }}>
            <CardHeader sx={{ backgroundColor: '#000000', color: '#FFF', textAlign: 'center', borderRadius: '18px', m: 2 }} title="Add Course" />
            <form ref={form} onSubmit={handleSubmit}>
            <CardContent>
                <TextField required margin="dense" fullWidth id="name" name='name' label="Course Name" variant="outlined" />
                <TextField required margin="dense" multiline rows={4} fullWidth id="description" name='description' label="Description" variant="outlined" />
                <Button variant="contained" sx={{ backgroundColor: '#000000', my: 2, width: '100%', 
                '&:hover': { backgroundColor: '#131200', }, }} type="submit">Add</Button>
            </CardContent>
            </form>
        </Card>
    </div>
    </Base>
  )
}

export default Course