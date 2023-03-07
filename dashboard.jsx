import React, { useEffect, useState } from 'react'
import { ApiClient } from 'adminjs'
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
  const [data, setData] = useState(null)
  const [users,setUsers] = useState([])
  const [clientsS1,setClientsS1] = useState([])
  const api = new ApiClient()
  
  useEffect(() => {
    api.getDashboard()
      .then((response) => {
        setUsers(response.data.users)
        setClientsS1(response.data.clients)
        setData(response.data) // { message: 'Hello World' }
        console.log(data);
      })
      .catch((error) => {
        // handle any errors
      });
  }, [])
  const { translateMessage, translateButton } = useTranslation()

    const userMarkup = users.map((user)=>{
      // const clientS1Markup = clientsS1.map((clientS1)=>{
      return(
        <tr>
        <td>{user.email}</td>
        <td>{user.role}</td>
        {/* <tr>
        <td>{clientS1.name}</td>
        <td>{clientS1.contact}</td>
      </tr> */}
      </tr>
    )
      
  })

  const clientMarkup = clientsS1.map((client)=>{
    return(
      <tr>{client.name}</tr>
    )
  })

  return (
    <>
    {
      data !== null && 
      <div>
        {/* <style>
        {"body":{"fontSize":"18px","fontWeight":"400"},"p_y_2":{"paddingTop":"28px","paddingBottom":"28px"},"p_y_3":{"paddingTop":"45px","paddingBottom":"45px"},"m_b_1":{"marginBottom":"18px"},"m_t_1":{"marginTop":"18px"},"main_counter_area":{"backgroundSize":"cover","overflow":"hidden"},"main_counter_area__main_counter_content__single_counter":{"background":"#000000","color":"#fff"},"main_counter_area__main_counter_content__single_counter_i":{"fontSize":"36px"}}
        </style> */}
        {/* <body style={{fontSize:"18px",fontWeight:"400"}}>
        <section id="counter" className="counter">
        <div style={{backgroundSize:"cover",overflow:"hidden",background:"#000000",color:"#fff",fontSize:"26px" }} className="main_counter_area">
          <div style={{paddingTop:"28px",paddingBottom:"28px"}} className="overlay p-y-3">
            <div className="container">
              <div className="row">
                <div className="main_counter_content text-center white-text wow fadeInUp">
                  <div className="col-md-3">
                    <div style={{paddingTop:"28px",paddingBottom:"28px",background:"#000000",color:"#fff",fontSize:"26px"}} className="single_counter p-y-2 m-t-1">
                      <i style={{marginBottom:"18px",fontSize:"26px"}} className="fa fa-briefcase m-b-1" />
                      <h2 className="statistic-counter">{(data.users.length)}</h2>
                      <span />
                      <p>Users</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{paddingTop:"28px",paddingBottom:"28px",background:"#000000",color:"#fff",fontSize:"26px"}} className="single_counter p-y-2 m-t-1">
                      <i style={{marginBottom:"18px",fontSize:"26px"}} className="fa fa-briefcase m-b-1" />
                      <h2 className="statistic-counter">{(data.users.length)}</h2>
                      <span />
                      <p>Customers</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{paddingTop:"28px",paddingBottom:"28px",background:"#000000",color:"#fff",fontSize:"26px"}} className="single_counter p-y-2 m-t-1">
                      <i style={{marginBottom:"18px",fontSize:"26px"}} className="fa fa-briefcase m-b-1" />
                      <h2 className="statistic-counter">{(data.users.length)}</h2>
                      <span />
                      <p>Employees</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{paddingTop:"28px",paddingBottom:"28px",background:"#000000",color:"#fff",fontSize:"26px"}} className="single_counter p-y-2 m-t-1">
                      <i style={{marginBottom:"18px",fontSize:"26px"}} className="fa fa-briefcase m-b-1" />
                      <h2 className="statistic-counter">{(data.users.length)}</h2>
                      <span />
                      <p>Employers</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{paddingTop:"28px",paddingBottom:"28px",background:"#000000",color:"#fff",fontSize:"26px"}} className="single_counter p-y-2 m-t-1">
                      <i style={{marginBottom:"18px",fontSize:"26px"}} className="fa fa-briefcase m-b-1" />
                      <h2 className="statistic-counter">{(data.users.length)}</h2>
                      <span />
                      <p>Income</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div style={{paddingTop:"28px",paddingBottom:"28px",background:"#000000",color:"#fff",fontSize:"26px"}} className="single_counter p-y-2 m-t-1">
                      <i style={{marginBottom:"18px",fontSize:"26px"}} className="fa fa-briefcase m-b-1" />
                      <h2 className="statistic-counter">{(data.users.length)}</h2>
                      <span />
                      <p>Agents</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </body> */}
     
     <table>
      <tbody>
        {clientMarkup}
      </tbody>
     </table>
     
        <section id="counter" className="counter">
  <div className="main_counter_area">
    <div className="overlay p-y-3">
      <div className="container">
        <div className="row">
          <div className="main_counter_content text-center white-text wow fadeInUp" style={{display:'flex'}}>
            <div className="col-md-3">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-briefcase m-b-1" />
                <h2 className="statistic-counter">200</h2>
                <span />
                <p>Study</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-check m-b-1" />
                <h2 className="statistic-counter">1000</h2>
                <p>Checked</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-coffee m-b-1" />
                <h2 className="statistic-counter">500</h2>
                <p>Coffee </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="single_counter p-y-2 m-t-1">
                <i className="fa fa-beer m-b-1" />
                <h2 className="statistic-counter">400</h2>
                <p>Pizzas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
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