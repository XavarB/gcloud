import React from 'react'
import {props} from 'adminjs'

export default function IncomeTotal(props) {
    const {record,property} = props
const {params} = record
    const sum = parseInt( params.Client_income ) + parseInt(params.Agent_or_Agency_income) + parseInt(params.Employer_income) + parseInt(params.other_Incomes) 

    console.log(params)
  return (
    <section className="box__Box-sc-17sbq3p-0 buPzZx adminjs_Box">
        <label className="label__Label-sc-o90s7d-0 jqkxb adminjs_Label">Total Income</label>
        {sum}
        </section>
  )
}
