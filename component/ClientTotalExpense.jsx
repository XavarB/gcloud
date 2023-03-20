import React,{useState,useEffect} from 'react'
import {props} from 'adminjs'

export default function ClientExpenseTotal(props) {
    const {record,property} = props
    console.log(record);
const {params} = record
const expense = record.populated.expense.params
console.log(expense);

const url =window.location.href
const lastPart = url.split("/").pop();
console.log(lastPart)

  
    
      const clientsexpensetotal =  expense.Medical_expenses + expense.Pakistan_Office_exp + expense.Pakistan_Sal + expense.Pakistan_Gov_fee + expense.Pakistan_Comission + expense.Others_Pakistan_exp + expense.Malaysia_Office_exp + expense.Malaysia_sal + expense.Malaysia_Gov_fee + expense.Malaysia_Comission + expense.Others_Malaysia_exp


      console.log(clientsexpensetotal);

      if (lastPart==='show'){
        return (
          <section className="box__Box-sc-17sbq3p-0 buPzZx adminjs_Box">
          <label className="label__Label-sc-o90s7d-0 jqkxb adminjs_Label"> Total Expense</label>
  
          {clientsexpensetotal}
          </section>
    )
      }else
      return (
        <div>
        {clientsexpensetotal}
        </div>
  )
}
