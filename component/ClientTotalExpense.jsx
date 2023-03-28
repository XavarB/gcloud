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

  
    
      const clientsexpensetotal =  parseInt(expense.Medical_expenses) + parseInt(expense.Pakistan_Office_exp) + parseInt(expense.Pakistan_Sal) + parseInt(expense.Pakistan_Gov_fee) + parseInt(expense.Pakistan_Comission) + parseInt(expense.Others_Pakistan_exp) + parseInt(expense.Malaysia_Office_exp) + parseInt(expense.Malaysia_sal) + parseInt(expense.Malaysia_Gov_fee) + parseInt(expense.Malaysia_Comission) + parseInt(expense.Others_Malaysia_exp)


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
