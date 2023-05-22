import React ,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/form.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const Form =()=>{
    
    const [userObject,setUserObject] = useState({
        name:"",
        contact:"",
        address:"",
        type:"",
        key:"",
    })
    const [deleteIndex,setDeleteIndex] = useState("");
    const [tableEnteries,setTableEnteries] = useState([])
    const [errorMessage,setErrorMessage] = useState("")

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false)
      setDeleteIndex("");
    };
    const handleShow = (e) => {
      setShow(true)
      setDeleteIndex(e.target.id);
    };

    const submitHandler=e=>{
        // console.log(tableEnteries)
        e.preventDefault();
        setUserObject({...userObject,[e.target.name]:e.target.value});
        console.log(userObject);
    }

    const handleSubmit=e=>{
        e.preventDefault();
        if(userObject.key === "")
        userObject.key = tableEnteries.length.toString(); 
        console.log(userObject)
        const values = Object.values(userObject);
        console.log(values)
        let counter = 0;
        // checking for null values in form and updating the counter if one existed  
        values.forEach(value=>{
            if(!value){
            counter =counter+1;}
        })
        // if all the entries are filled in array (no null entry encountered)
        if(counter === 0){
            //checking if the new entry is encountered or updating an existing entry 
            if(userObject.key*1 === tableEnteries.length){
            const newData = (data)=>([...data, values])
            setTableEnteries(newData);}
            else{
              // Cloning the existing table array
              const clone = [...tableEnteries];
              clone[userObject.key*1] = values;
              setTableEnteries(clone);
            }
            setErrorMessage("")
            // console.log(tableEnteries)
        }
        // Error message if null value encountered 
        else{
            setErrorMessage("You missed sometihing")
        }
        // Setting user object empty if for new form submisssion 
        const empty = {   
            name:"",
            contact:"",
            address:"",
            type:"",
            key:""
        }
            setUserObject(empty)
         
    }

    // A handler when user clicks on a edit button
    const editEntry=e=>{
      // console.log(typeof(e.target.value));
      let editValues = e.target.value.split(",");
      console.log(editValues);
      const fill ={
        name:editValues[0],
        contact:editValues[1],
        address:editValues[2],
        type:editValues[3],
        key:editValues[4]
      }
      // console.log(fill)
      setUserObject(fill);
    }

    // Handler when user clicks on delete button 
    const deleteEntry=e=>{
      // e.preventDefault();
      // console.log(e);
      setTableEnteries(tableEnteries => tableEnteries.filter((item, i) => i !== deleteIndex*1));
      // closing the modal 
       setShow(false);
    }

    return (


        <div className='wrapper'> 
        <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You sure you want to delete the entry</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteEntry}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
            <div className='login'>    
        <div>
        <label className='formlabel' >Name</label><br />
        <input type="text" name="name" value={userObject.name} onChange={submitHandler}    />
        </div>
        <div>
        <label className='formlabel'>Contact</label><br />
        <input type="number" name="contact" value={userObject.contact} onChange={submitHandler}  />
        </div>
        <div>
        <label className='formlabel'>Address</label><br />
        <input type="text" name="address" value={userObject.address} onChange={submitHandler} required/>
        </div>
        <div>
       <label className='formlabel'> Type</label><br />
        <select name="type" value={userObject.type} onChange={submitHandler} >
            <option value=""> ------ </option>
            <option value="Admin"> Admin</option>
            <option value="Super Admin">Super Admin</option>

            </select>    
        </div>
        <div className='submit'>
        <button type="submit" onClick={handleSubmit} className='submitbtn'>Submit</button>
        </div>
        <div className='errormsg'>{errorMessage}</div>
        </div>
        
        <div className='usertable'>
        <table className="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Contact</th>
          <th>Adress</th>
          <th>Type</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {tableEnteries.map((data, index) => {
          return (
            <tr key={index}>
                {console.log(data)}
              <td>{index + 1}</td>
              <td>{data[0]}</td>
              <td>{data[1]}</td>
              <td>{data[2]}</td>
              <td>{data[3]}</td>
              <td><button value={[data[0],data[1],data[2],data[3],index]}onClick={editEntry} className='oprBtn'>Edit Entry</button></td>
              <td><button id={index} onClick={handleShow} className='oprBtn'>Delete Entry</button></td>

            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
        </div>
    )
}

export default Form;