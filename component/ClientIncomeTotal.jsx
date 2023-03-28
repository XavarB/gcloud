import React,{useState,useEffect} from 'react'
import {props} from 'adminjs'

export default function ClientIncomeTotal(props) {
    const {record,property} = props
    console.log(record);
const {params} = record
const income = record.populated.income.params
console.log(income);

const url =window.location.href
const lastPart = url.split("/").pop();
console.log(lastPart)

  
    
      const clientsincometotal = parseInt(income.Client_income) + parseInt(income.Agent_or_Agency_income )+ parseInt(income.Employer_income )+ parseInt(income.other_Incomes)

      if (lastPart==='show'){
        return (
          <section className="box__Box-sc-17sbq3p-0 buPzZx adminjs_Box">
          <label className="label__Label-sc-o90s7d-0 jqkxb adminjs_Label">Client Income Total</label>
  
          {clientsincometotal}
          </section>
    )
      }else
      return (
        <div>
        {clientsincometotal}
        </div>
  )
}
