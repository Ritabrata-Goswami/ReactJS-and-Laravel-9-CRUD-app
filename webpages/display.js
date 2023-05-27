import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate,Link } from 'react-router-dom';
import '../App.css';

export default function Display() {
  const navigate = useNavigate();
  const [candidateRecord, setCandidateRecord] = useState([]);

  useEffect(()=>{ fetchCandidateRecord() },[]);  //Assigning function using useEffect() hook.

  const fetchCandidateRecord = async () => {
    fetch(`http://127.0.0.1:8000/api/v1/data/display`).then((result)=>{
        return result.json();
    }).then((data) => {
      console.log(data);

      setCandidateRecord(data);
    })
}

const deleteCandidate = async(id) =>{
  const isConfirm = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    return result.isConfirmed
  });

  if(!isConfirm){
    return;
  }

  await axios.get(`http://127.0.0.1:8000/api/v1/data/delete/${id}`).then(({data})=>{
    Swal.fire({
      icon:"success",
      text:data.message
    })
    fetchCandidateRecord()
  }).catch(({response:{data}})=>{
    Swal.fire({
        text:data.message,
        icon:"error"
    })
  });
}

  return (
    <div>
      <h2 class="w3-margin-left">Display All Data Using ReactJS Laravel</h2>
      <table class="w3-margin-left">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        { candidateRecord.length > 0 ? (
            candidateRecord.map((row)=>(

            <tr>
              <td>{row.id}</td>
              <td>{row.name}</td>
              <td>{row.gender}</td>
              <td>
                <Link to={`/update/${row.id}`}>
                  <button class="w3-button w3-blue w3-hover-green">Edit</button>
                </Link>
              </td>
              <td>
                <button class="w3-button w3-red w3-hover-yellow" onClick={()=>deleteCandidate(row.id)}>Delete</button>
              </td>
            </tr>

            ))
          ) : (
            <tr>
              <td colspan="5" class="w3-text-red">{candidateRecord.message}</td>
            </tr>
          )
        }
      </table>
    </div>
  );
}