import React ,{useState} from 'react'
import '../css/form.css';



const Form =()=>{
    
    const [userObject,setUserObject] = useState({
        name:"",
        contact:"",
        address:"",
        type:"",

    })

    const [tableEnteries,setTableEnteries] = useState([])
    const [errorMessage,setErrorMessage] = useState("")
    const submitHandler=e=>{
        // console.log(tableEnteries)
        e.preventDefault();
        setUserObject({...userObject,[e.target.name]:e.target.value});
        console.log(userObject);
    }

    const handleSubmit=e=>{
        e.preventDefault();
        const values = Object.values(userObject);
        console.log(values)
        let counter = 0;
        values.forEach(value=>{
            if(!value){
            counter =counter+1;}
        })
        if(counter === 0){
            // setTableEnteries([...tableEnteries,...values])
            const newData = (data)=>([...data, values])
            // console.log(newData)
            setTableEnteries(newData);
            setErrorMessage("")
            console.log(tableEnteries)
        }else{
            setErrorMessage("You missed sometihing")
        }
        const empty = {   
            name:"",
            contact:"",
            address:"",
            type:"",
        }
            setUserObject(empty)
         
    }

    return (
        <div className='wrapper'> 
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