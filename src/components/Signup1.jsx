import signupcss from './Signup.module.css';
import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';


function Signup({isLogin,URL}) {
  URL=URL+'signup/';
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setdob] = useState('');
  const [pno, setpno] = useState('');
  const [bname, setbname] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [country, setCountry] = useState('');
  const [message1, setmessage1] = useState('');
  const [message2, setmessage2] = useState('');

  const [otpGenerated, setOtpGenerated] = useState(false);
  const [vemail, setvemail] = useState(false);
  const [otp, setotp] = useState('');
  const [votp, setvotp] = useState('');

  const navigate=useNavigate()

  async function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lng);

          try {
            const response = await axios.get(
              `https://secure.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=vishnuvardhanvaka`
            );
            const countryName = response.data.countryName;
            setCountry(countryName);
          } catch (error) {
            console.log(error);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  function otpsubmit(e) {
    e.preventDefault();
    if (votp === otp.toString()) {
      
      setmessage2('Please wait...')
      const form = new FormData();
      let data = {
        username: username,
        email: email,
        password: password,
        'phone number': pno,
        dob: dob,
        latitude: latitude,
        longitude: longitude,
        country: country,
      };
      if (bname.trim() !== '') {
        data['bname'] = bname;
      }
      form.append('stage', 1);
      for (var key in data) {
        form.append(key, data[key]);
      }
      fetch(URL, {
        method: 'POST',
        body: form,
      })
        .then((response) => response.json())
        .then((data) => {
          setmessage2(data['message']);
        });
        isLogin()
        localStorage.setItem('isLoggedIn','true')
        localStorage.setItem('username',username)
        localStorage.setItem('email',email)
        navigate('/home')
    } else {
      
      setmessage2('Please wait ...')
      setmessage2('Wrong OTP');
      setvotp('')
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append('stage', 0);
    form.append('email', email);
    form.append('username', username);
    form.append('dob',dob);
    fetch(URL, {
      method: 'POST',
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        setmessage1(data['message']);
        if (data['status'] === 1) {
          setotp(data['otp']);
          localStorage.setItem('age',data['age'])
          setvemail(true);
        }
      });
    
    setmessage1('Generating OTP...');
    setOtpGenerated(true);
  }

  return (
    <div className={signupcss.signup}>
        <div className={signupcss.name}>Sign up</div>
      <form onSubmit={handleSubmit}>
        <div className={signupcss.field}>
          <input
            type="text"
            placeholder="Username*"
            onChange={(e) => setusername(e.target.value)}
            value={username}
            required
          />
        </div>
        <div className={signupcss.field}>
          <input
            type="text"
            placeholder="Location*"
            value={country}
            required
          />
          <button type="button" onClick={handleLocationClick}>
            Get Location
          </button>
        </div>
        <div className={signupcss.field}>
          <input
            type="number"
            placeholder="Phone number*"
            onChange={(e) => setpno(e.target.value)}
            value={pno}
            required
          />
        </div>
        <div className={signupcss.field}>
          <input
            type="email"
            placeholder="Email*"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div className={signupcss.field}>
          <input
            type="text"
            placeholder="Password*"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div className={signupcss.field}>
          <label>Baby DOB:</label>
          <input
            type="date"
            placeholder="Baby DOB*"
            onChange={(e) => setdob(e.target.value)}
            value={dob}
            required
          />
        </div>
        <div className={signupcss.field}>
          <input
            type="text"
            placeholder="Baby name"
            onChange={(e) => setbname(e.target.value)}
            value={bname}
          />
        </div>
        <button type="submit">Generate OTP</button>
        <div className={signupcss.message}>{message1}</div>
      </form>
      <form onSubmit={otpsubmit}>
        {otpGenerated && vemail && (
          <div className={signupcss.otpfield}>
            <input
              type="text"
              placeholder="OTP"
              value={votp}
              onChange={(e) => setvotp(e.target.value)}
              required
            />
            <div className={signupcss.message}>{message2}</div>
            <button type="submit">Signup</button>
          </div>
        )}
      </form>
    </div>
  );
}

export default Signup;
