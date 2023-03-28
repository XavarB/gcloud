import React,{useState,useEffect} from 'react'
import {props} from 'adminjs'

export default function AgentAgency(props) {
    const {record,property} = props
    console.log(record);
const {params} = record
// const income = record.populated.income.params
// console.log(income);

const url =window.location.href
const lastPart = url.split("/").pop();
console.log(lastPart)

  
    
     
    

      return (
       
        {Agent}
      
  )
}
