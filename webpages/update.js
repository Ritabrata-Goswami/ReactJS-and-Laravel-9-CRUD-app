import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';
import '../App.css';


export default function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
                                        //Assigning values using useState() hook.
  const [getEditId, setEditId]=useState("");
  const [getEditName, setEditName]=useState("");
  const [getEditGender, setEditGender]=useState("");

  useEffect(()=>{fetchCandidate() },[]);

  const fetchCandidate = async() =>{
    fetch(`http://127.0.0.1:8000/api/v1/data/edit/${id}`).then((data)=>{
      return data.json();
    }).then((data)=>{
      console.log(data);

      data.map((val)=>{
        console.log(val.id);
        console.log(val.name);
        console.log(val.gender);
        setEditId(val.id);
        setEditName(val.name);
        setEditGender(val.gender);
      });

    }).catch(({response})=>{
      Swal.fire({
        text:response.data.message,
        icon:"error"
      })
    });
  }


  const updateFunc = async(event)=>{
    event.preventDefault();
    const formData = new FormData();

    formData.append('enter_name', getEditName);
    formData.append('enter_gender', getEditGender);

    await axios({
      method:"POST",
      headers: { 
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded' 
      },
      url: `http://127.0.0.1:8000/api/v1/data/save/${id}`,
      data: formData
    }).then((result)=>{
      console.log(result);
      Swal.fire({
        icon:"success",
        text:result.data.message
      });
      navigate("/display");
    }).catch(({response})=>{
      Swal.fire({
        text:response.data.message,
        icon:"error"
      })
    });
  }

  return (
    <div>
      <h2 class="w3-margin-left">Update Data Using ReactJS And Laravel</h2>
      <form onSubmit={updateFunc} class="w3-padding-large">
            Name:
            <input 
              class='w3-input text-size' 
              type="text" 
              name="enter_name" 
              placeholder='Enter name' 
              id="your_name" 
              value={getEditName}
              onChange={(event) =>{ setEditName(event.target.value)}}/>

            <div class="w3-margin-top">
              Gender:
              <input type="radio" name="enter_gender" value="male" checked={(getEditGender==="male")} onChange={(event) =>{ setEditGender(event.target.value)}}/> Male
              <input type="radio" name="enter_gender" value="female" checked={(getEditGender==="female")} onChange={(event) =>{ setEditGender(event.target.value)}}/> Female
            </div>
            <input type='submit' name='submit' value='submit' class="w3-margin-top w3-button w3-black w3-hover-green"/>
      </form>
    </div>
  );
}