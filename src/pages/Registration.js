import React, { useEffect, useRef, useState } from 'react'
import Base from '../components/Base'
import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import axios from 'axios';
import { URL, token } from '../App';

const Registration = () => {
    const form = useRef();
    const [course, setCourse] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState('');

    const handleChange = (event) => {
        setSelectedCourse(event.target.value);
    };

    const handleChangeDate = (event) => {
      setSelectedSchedule(event.target.value);
  };

   //   Fetching user name
   const getUser = async() => {
    const logg = sessionStorage.getItem('userId');
    if (logg) {
      setUserId(logg);
    }
  };

    // get course and schedule list
    const fetchDetails = async () => {
        try {
            const res = await axios.get(`${URL}/users/details`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setCourse(res.data.data.courses);
            setSchedule(res.data.data.trainingSchedule);
            setLoading(false);
        } catch (error) {
            console.log(error.text);
        }
    }

    useEffect(() => {
        fetchDetails();
        getUser();
    }, [])

    // register
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const data = {
            studentId: userId,
            courseId: selectedCourse,
            scheduleId: selectedSchedule
        };

        console.log(userId)

        const res = await axios.post(`${URL}/users/register`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
            console.log("Registration Done")
        }
        } catch (error) {
            console.log(error.text);
        }
    }

    return (
        <Base title={'Registration Table'}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Card sx={{ width: 400, borderRadius: '18px' }}>
                    <CardHeader sx={{ backgroundColor: '#000000', color: '#FFF', textAlign: 'center', borderRadius: '18px', m: 2 }} title="Course Registration" />
                    <form ref={form} onSubmit={handleSubmit}>
                        <CardContent>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                              <div>
                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="course"
                                        value={selectedCourse}
                                        label="Select Course"
                                        onChange={handleChange}
                                    >
                                        {course && course.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl fullWidth margin="dense">
                                    <InputLabel id="demo-simple-select-label">Select Date&Time</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="schedule"
                                        value={selectedSchedule}
                                        label="Select Date&Time"
                                        onChange={handleChangeDate}
                                    >
                                        {schedule && schedule.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>
                                                {item.date} from {item.startTime} to {item.endTime}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                </div>
                            )}
                            <Button variant="contained" sx={{ backgroundColor: '#000000', my: 2, width: '100%', '&:hover': { backgroundColor: '#131200', }, }} type="submit">Register</Button>
                        </CardContent>
                    </form>
                </Card>
            </div>
        </Base>
    )
}

export default Registration;
