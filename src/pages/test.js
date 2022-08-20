import React from "react";

import { collection, getDocs } from 'firebase/firestore/lite';
import { firebaseConfig, db } from "../GoogleAuth/firebase";
import { uid } from 'uid';
import { set, ref, onValue, remove } from "firebase/database";
import { useState, useEffect } from 'react';


  const Test = () => {
   
    const [clientName, setClientName] = useState("");
    const [clientNames, setClientNames] = useState([])

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
    // Warning: Maximum update depth exceeded.
    // This can happen when a component calls setState inside useEffect,
    // but useEffect either doesn't have a dependency array,
    // or one of the dependencies changes on every render.
    
    //read

    useEffect(()=> {
        onValue(ref(db), snapshot => {
            setClientNames([]);
            const data = snapshot.val();
            if(data !== null){
                Object.values(data).map(clientName => {
                    setClientNames(oldArray => [...oldArray, clientName])
                })
            }
        }, [])
    })
    //update
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
                <button 
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    disabled={!clientName} 
                    onClick={createClient} 
                    type="submit" 
                    >Submit
                </button>
            </div>
            </form>
            {/* Read client from database */}
            {clientNames.map((clientName) => (
                <>
                    <h1>{clientName.name}</h1>
                    <button
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
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

