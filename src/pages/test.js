import React from "react";

import { db } from "../GoogleAuth/firebase";
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from "firebase/database";
import { useState, useEffect } from 'react';


  const Test = () => {
   
    const [clientName, setClientName] = useState("");
    const [clientNames, setClientNames] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUuid, setTempUuid] = useState("");


    const handleClientNameChange = (e) => {
        
        setClientName(e.target.value);
    }
    //write
    const createClient = () => {
        const uuid = uid()
        set(ref(db, `/${uuid}`),{
            name: clientName,
            uuid: uuid,
        })

        setClientName("");
    }
    
    //read
    useEffect(()=> {
        onValue(ref(db), snapshot => {
            const data = snapshot.val();
            if(data !== null){
                setClientNames(Object.values(data))
            }
        })
    }, [])


    //update
    const handleUpdate = (clientName) => {
        setIsEdit(true);
        setTempUuid(clientName.uuid);
        setClientName(clientName.name);
    }

    const handleSubmitChange = () => {
        update(ref(db, `/${tempUuid}`), {
            name: clientName,
            uuid: tempUuid,
        });
        setClientName("");
        setIsEdit(false);
    }
    
    //delete
    const handleDelete = (clientName) => {
        remove(ref(db, `/${clientName.uuid}`));
    }

    return (

      <React.Fragment>

        <div>
            <form>
            <div> {/**Create Client in database */}
                <input type='text' value={clientName} onChange={handleClientNameChange} required />
                {isEdit ? (
                    <>
                    <button 
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        disabled={!clientName} 
                        onClick={handleSubmitChange} 
                        type="submit" 
                        >Submit Change
                    </button>
                    <button onClick={()=> {
                        setIsEdit(false);
                        setClientName("");
                        }}>X</button>
                    </>
                ) : (
                    <button 
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        disabled={!clientName} 
                        onClick={createClient} 
                        type="submit" 
                        >Submit
                    </button>
                )}
            </div>
            </form>
            {/* Read client from database */}
            {clientNames.map((clientName) => (
                <>
                    <h1 key={clientName.uuid}>{clientName.name}</h1>
                    <button
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    onClick={() => handleUpdate(clientName)}
                    >Update</button>
                    <button
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={() => handleDelete(clientName)}
                    >Delete</button>
                </>
            ))}
        </div>

      </React.Fragment>

    );

  }



export default Test;

