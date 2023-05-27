import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import '../App.css';


export default function Insert() {
  const navigate = useNavigate();

  const [candidateName, setUserName] = useState("");
  const [candidateGender, setUserGender] = useState("");
  const [validationError,setValidationError] = useState({});
  
  const submitFunc = async(e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('enter_name', candidateName)
    formData.append('enter_gender', candidateGender)

    await axios({
      method: 'post',
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      url: 'http://127.0.0.1:8000/api/v1/data/insert-data',
      data: formData
    }).then(({data})=>{
      console.log(data);
      Swal.fire({
        icon:"success",
        text:data.message
      })
      navigate("/insert");
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors);
        console.log(response.data.errors);
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }


  return (
    <div>
        <h2 class="w3-margin-left">Insert Data Using ReactJS Laravel App</h2>
        <h5 class="w3-margin-left">Insert Page</h5>
        <form onSubmit={submitFunc} class="w3-padding-large">
          Name:
          <input 
            class='w3-input text-size' 
            type="text" 
            name="enter_name" 
            placeholder='Enter name' 
            id="your_name" 
            onChange={(event) =>{ setUserName(event.target.value)}}/>

          <div class="w3-margin-top">
            Gender:
            <input type="radio" name="enter_gender" value="male" onChange={(event) =>{ setUserGender(event.target.value)}}/> Male
            <input type="radio" name="enter_gender" value="female" onChange={(event) =>{ setUserGender(event.target.value)}}/> Female
          </div>
          <input type='submit' name='submit' value='submit' class="w3-margin-top w3-button w3-black w3-hover-green"/>
        </form>
    </div>
  );
}
