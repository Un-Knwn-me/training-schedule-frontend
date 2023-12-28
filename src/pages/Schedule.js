import React, { useRef, useState } from 'react'
import Base from '../components/Base'
import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {URL, token} from '../App';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Schedule = () => {
    const form = useRef();
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

     // Login
     const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Create FormData object
          const data = new FormData(form.current);
      
          // Format date and time to the desired MySQL format
          const formattedDate = selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : null;
          const formattedStartTime = startTime ? dayjs(startTime).format('HH:mm:ss') : null;
          const formattedEndTime = endTime ? dayjs(endTime).format('HH:mm:ss') : null;
      
          console.log(formattedDate, formattedStartTime, formattedEndTime);
      
          let res = await axios.post(`${URL}/admins/schedule/add`, {
            date: formattedDate,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.status === 200) {
            navigate('/dashboard');
          } else {
            console.log(data);
          }
        } catch (error) {
          console.log(error.text);
        }
      };
      

  return (
    <Base title={'Time Schedule'}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <Card sx={{ width: 400, borderRadius: '18px' }}>
            <CardHeader sx={{ backgroundColor: '#000000', color: '#FFF', textAlign: 'center', borderRadius: '18px', m: 2 }} title="Set Time Schedule" />
            <form ref={form} onSubmit={handleSubmit}>
            <CardContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Select Date" value={selectedDate} onChange={(date) => setSelectedDate(date)} sx={{ width: '100%', my: 1 }} />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Select start time" value={startTime} onChange={(time) => setStartTime(time)} sx={{ width: '100%', my: 1 }} />
                </LocalizationProvider>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker label="Select end time" value={endTime} onChange={(time) => setEndTime(time)} sx={{ width: '100%', my: 1 }} />
                </LocalizationProvider>

      
                <Button variant="contained" sx={{ backgroundColor: '#000000', my: 2, width: '100%', 
                '&:hover': { backgroundColor: '#131200', }, }} type="submit">Schedule</Button>
            </CardContent>
            </form>
        </Card>
    </div>
    </Base>
  )
}

export default Schedule