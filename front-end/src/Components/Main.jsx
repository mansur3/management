import "./main.css";
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



const Main = () => {

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
      const {data} = await axios.post("http://localhost:2233/contest", formData)
      setRow(data.contest);
    }
  
  
    const fetchData = async () => {
      const {data} = await axios.get("http://localhost:2233/contest");
      // console.log(data);
      setRow(data.contest);
    }
  
    const handleDelete = async(id) => {
      const {data} = await axios.delete(`http://localhost:2233/contest/${id}`);
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
    const filterDSA = async() => {
        const {data} = await axios.get("http://localhost:2233/contest/type/dsa");
        setRow(data.contest);
    }
    
    const handleDeadline = async() => {
        const {data} = await axios.get("http://localhost:2233/contest/sortByDeadline");
        setRow(data.contest);
    }
    const filterCoding = async () => {
        const {data} = await axios.get("http://localhost:2233/contest/type/coding");
        setRow(data.contest);
    }
    return (
        <div className="App">
        {/* {navbar} */}
  
      <div className = "navbarContainer">
        <div className = "st">
        <button onClick = {openModal} className = "addBtn">
          ADD CONTEST</button>
        <div className = "sortBtn">
        <button onClick = {fetchData} className = "addBtn">
          All
        </button>
            
        <button onClick = {filterDSA} className = "addBtn">
          Filter by DSA
        </button>
        <button onClick = {filterCoding} className = "addBtn">
          Filter by coding
        </button>
        <button onClick = {handleDeadline} className = "addBtn">
          Sort by Deadline
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
              <label>Title</label>
              <input onChange = {(e) => handleChange(e)} name = "title" type = "text" placeholder = "Enter the title" />
            </div>
            <div>
              <label>Type</label>
              <input onChange = {(e) => handleChange(e)} name = "type" type = "text" placeholder = "Enter the type" />
            </div>
            <div>
              <label>Deadline</label>
              <input onChange = {(e) => handleChange(e)} name = "deadline" type = "datetime-local" placeholder = "Enter the deadline" />
            </div>
            <div>
              <label>Tags</label>
              <input onChange = {(e) => handleChange(e)} name = "tags" type = "text" placeholder = "Enter the tags" />
            </div>
            <div>
              <label>Time</label>
              <input onChange = {(e) => handleChange(e)} name = "time" type = "text" placeholder = "Enter the time" />
            </div>
            {/* <div>
              <label>Student contact</label>
              <input onChange = {(e) => handleChange(e)} name = "contact" type = "number" placeholder = "Enter the student contact" />
  
            </div> */}
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
              <StyledTableCell>TITLE</StyledTableCell>
              <StyledTableCell align="right">TYPE</StyledTableCell>
              <StyledTableCell align="right">DEADLINE</StyledTableCell>
              <StyledTableCell align="right">TAGS</StyledTableCell>
              <StyledTableCell align="right">TIME</StyledTableCell>
              {/* <StyledTableCell align="right">CONTACT</StyledTableCell> */}
              <StyledTableCell align="right">DELETE</StyledTableCell>
  
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.title}>
                <StyledTableCell component="th" scope="row">
                  {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.type}</StyledTableCell>
                <StyledTableCell align="right">{row.deadline}</StyledTableCell>
                <StyledTableCell align="right">{row.tags}</StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
                {/* <StyledTableCell align="right">{row.contact}</StyledTableCell> */}
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

export {Main};