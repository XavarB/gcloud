import React, { useEffect, useState } from 'react'
import { ApiClient,useCurrentAdmin } from 'adminjs'
import styled from 'styled-components'
import {
  Box,
  H2,
  H5,
  H4,
  Text,
  Illustration,
  IllustrationProps,
  Button,
} from '@adminjs/design-system'
import { useTranslation } from 'adminjs'



export  function Dashboard()  {
  const [currentAdmin] = useCurrentAdmin();
  const [data, setData] = useState(null)
  const [users,setUsers] = useState([])
  const [clientsS1,setClientsS1] = useState([])
  const [employees,setEmployees] = useState([])
  const [expense,setExpense] = useState([])
  const [income,setIncome] = useState([])
  const api = new ApiClient()
  
  useEffect(() => {
    api.getDashboard()
      .then((response) => {
        setData(response.data) // { message: 'Hello World' }
        setUsers(response.data.users)
        setClientsS1(response.data.clients)
        setEmployees(response.data.employees)
        setExpense(response.data.expense)
        setIncome(response.data.income)
        // console.log(data);
      })
      .catch((error) => {
        // handle any errors
      });
  }, [])
  const { translateMessage, translateButton } = useTranslation()

  //   const userMarkup = users.map((user)=>{
  //     // const clientS1Markup = clientsS1.map((clientS1)=>{
  //     return(
  //       <tr>
  //       <td>{user.email}</td>
  //       <td>{user.role}</td>
  //     </tr>
  //   )
      
  // })

  // const clientMarkup = clientsS1.map((client)=>{
  //   return(
  //     <tr>{client.name}</tr>
  //   )
  // })

  return (
    <>
    {
      data !== null && 
      <div>
        {/* <style>
        {"body":{"fontSize":"18px","fontWeight":"400"},"p_y_2":{"paddingTop":"28px","paddingBottom":"28px"},"p_y_3":{"paddingTop":"45px","paddingBottom":"45px"},"m_b_1":{"marginBottom":"18px"},"m_t_1":{"marginTop":"18px"},"main_counter_area":{"backgroundSize":"cover","overflow":"hidden"},"main_counter_area__main_counter_content__single_counter":{"background":"#000000","color":"#fff"},"main_counter_area__main_counter_content__single_counter_i":{"fontSize":"36px"}}
        </style> */}
      {/* 987998 */}
     
     {/* <table>
      <tbody>
        {clientMarkup}
      </tbody>
     </table>
      */}
        {/* <section id="counter" className="counter">
         
  <div className="main_counter_area">
    <div className="overlay p-y-3">
      <div className="container ">
        <div className="row ">
          <div className="main_counter_content  text-center white-text wow fadeInUp" style={{display:''}}>
            <div className="col-md ">
              <div className="single_counter p-y-2 m-t-1">
            
                <i className="fa fa-briefcase m-b-1" />
                <img src="/users.png" alt="users" />
                <h2 className="statistic-counter">{(data.users.length)}</h2>
                <span />
              
                <p>Users</p>
              </div>
            </div>
            <div className="col-md">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-check m-b-1" />
                <h2 className="statistic-counter">{(data.clients.length)}</h2>
                <p>Clients</p>
              </div>
            </div>
            <div className="col-md">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-coffee m-b-1" />
                <h2 className="statistic-counter">{(data.employees.length)}</h2>
                <p>Employees </p>
              </div>
            </div>
            <div className="col-md">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-beer m-b-1" />
                <h2 className="statistic-counter">{(data.expense.length)}</h2>
                <p>Expense</p>
              </div>
            </div>
            <div className="col-md">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-beer m-b-1" />
                <h2 className="statistic-counter">{(data.income.length)}</h2>
                <p>Income</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section> */}
  <section className="wow fadeIn animated" style={{visibility: 'visible', animationName: 'fadeIn'}}>
    
        <div>
          <div className="row" >
          <h1 style={{fontSize:'100px', position:'absolute',paddingTop:80, fontFamily:'serif'}}>Farishta Enterprise</h1>
             <img src="/bg4.jpeg" alt="jjdh" style={{marginTop:0, paddingTop:0,position:'relitive'}}/>
            {/* counter */}
            <div className="col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated" data-wow-duration="300ms" style={{visibility: 'visible', animationDuration: '300ms', animationName: 'fadeInUp'}}>
              <img src="/users.png" alt="users" />
              <span id="anim-number-pizza" className="counter-number" />
              <span className="timer counter alt-font appear" data-to={980} data-speed={7000}>{(data.users.length)}</span>
              <p className="counter-title">Total active Users</p>
            </div>
            {/* end counter */}
            {/* counter */}
            <div className="col-md-3 col-sm-6 bottom-margin text-center counter-section wow fadeInUp sm-margin-bottom-ten animated" data-wow-duration="600ms" style={{visibility: 'visible', animationDuration: '600ms', animationName: 'fadeInUp'}}>
            
              <img src="/clients.png" alt="clients" />
              <span className="timer counter alt-font appear" data-to={980} data-speed={7000}>{(data.clients.length)}</span>
              <span className="counter-title">Total Clients</span>
            </div>
            {/* end counter */}
            {/* counter */}
            <div className="col-md-3 col-sm-6 bottom-margin-small text-center counter-section wow fadeInUp xs-margin-bottom-ten animated" data-wow-duration="900ms" style={{visibility: 'visible', animationDuration: '900ms', animationName: 'fadeInUp'}}>
            <img src="/employee.png" alt="employee" />
         
              <span className="timer counter alt-font appear" data-to={810} data-speed={7000}>{(data.employees.length)}</span>
              <span className="counter-title">Number of working Employees</span>
            </div>
            {/* end counter */}
            {/* counter */}
            <div className="col-md-3 col-sm-6 text-center counter-section wow fadeInUp animated" data-wow-duration="1200ms" style={{visibility: 'visible', animationDuration: '1200ms', animationName: 'fadeInUp'}}>
            <img src="/expences.png" alt="expences" />
             
              <span className="timer counter alt-font appear" data-to={600} data-speed={7000}>{(data.expense.length)}</span>
              <span className="counter-title">Clients expense entries</span>
            </div>
            {/* end counter */}
          </div>
        </div>
      </section>

      </div>
    }
    </>
    
  )
}

    
export default Dashboard



// <h1 style={{backgroundColor:'#fffff'}}>{(data.message)}</h1>
// <h1 style={{backgroundColor:'#fffff'}}>{(data.users.length)}</h1>
// <table className='container bg-primary'>
//   <tbody>
//     {userMarkup}
    
//   </tbody>
// </table>