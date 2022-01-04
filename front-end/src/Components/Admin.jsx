import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {useState, useEffect} from "react";
import axios from "axios";
import "./admin.css";




import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';






const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};



function Admin() {
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [formData, setFormData] = useState({});
    const [rows, setRow] = useState([])
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setFormData({...formData, [name] : value});
    }
  
    // console.log(formData);
  
    const handleAdd = async () => {
      const {data} = await axios.post("http://localhost:2233/student/create", formData)
      setRow(data.student);
    }
  
  
    const fetchData = async () => {
      const {data} = await axios.get("http://localhost:2233/student/create");
      // console.log(data);
      setRow(data.student);
    }
  
    const handleDelete = async(id) => {
      const {data} = await axios.delete(`http://localhost:2233/student/create/${id}`);
      // // setRow(data.student);
      // console.log(data);
      fetchData();
    }
    useEffect(() => {
      fetchData();
    }, [])
  
  
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    const handleAge = async() => {
        const {data} = await axios.get("http://localhost:2233/student/create/age");
        setRow(data.student);
    }
    
    const handleName = async() => {
        const {data} = await axios.get("http://localhost:2233/student/create/name");
        setRow(data.student);
    }
  
    return (
        <div className="App">
      {/* {navbar} */}

    <div className = "navbarContainer">
      <div className = "st">
      <button onClick = {openModal} className = "addBtn">
        ADD STUDENT</button>
      <div className = "sortBtn">
      <button onClick = {fetchData} className = "addBtn">
        All
      </button>
          
      <button onClick = {handleAge} className = "addBtn">
        Sort by Age
      </button>
      <button onClick = {handleName} className = "addBtn">
        Sort by Name
      </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="ADD Student"
      >
        
        <button onClick={closeModal}>close</button>
        
        <div className = "form">
          <div>
            <label>Student Name</label>
            <input onChange = {(e) => handleChange(e)} name = "name" type = "text" placeholder = "Enter the student name" />
          </div>
          <div>
            <label>Student city</label>
            <input onChange = {(e) => handleChange(e)} name = "city" type = "text" placeholder = "Enter the student City" />
          </div>
          <div>
            <label>Student Age</label>
            <input onChange = {(e) => handleChange(e)} name = "age" type = "number" placeholder = "Enter the student Age" />
          </div>
          <div>
            <label>Student education</label>
            <input onChange = {(e) => handleChange(e)} name = "education" type = "text" placeholder = "Enter the student education" />
          </div>
          <div>
            <label>Student gender</label>
            <input onChange = {(e) => handleChange(e)} name = "gender" type = "text" placeholder = "Enter the student gender" />
          </div>
          <div>
            <label>Student contact</label>
            <input onChange = {(e) => handleChange(e)} name = "contact" type = "number" placeholder = "Enter the student contact" />

          </div>
          <div>
            <button onClick = {handleAdd} className = "addb">ADD</button>
          </div>
        </div>
      </Modal>
      </div>
    </div>

    <div className = "dataContainer">
      



    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>NAME</StyledTableCell>
            <StyledTableCell align="right">CITY</StyledTableCell>
            <StyledTableCell align="right">AGE</StyledTableCell>
            <StyledTableCell align="right">EDUCATION</StyledTableCell>
            <StyledTableCell align="right">GENDER</StyledTableCell>
            <StyledTableCell align="right">CONTACT</StyledTableCell>
            <StyledTableCell align="right">DELETE</StyledTableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.city}</StyledTableCell>
              <StyledTableCell align="right">{row.age}</StyledTableCell>
              <StyledTableCell align="right">{row.education}</StyledTableCell>
              <StyledTableCell align="right">{row.gender}</StyledTableCell>
              <StyledTableCell align="right">{row.contact}</StyledTableCell>
              <StyledTableCell align="right"><button onClick = {() => {
                handleDelete(row._id);
              }} className = "deleteBtn">DELETE</button></StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>






    </div>


    </div>
    )
}

export default Admin;