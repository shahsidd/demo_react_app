import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CustomCss.css'

class HomeComponent extends React.Component {

    state = {
        employeeArr: [],
        isShow: false,
        mode: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        axios.get('https://reqres.in/api/users?page=1')
            .then(data => {
                console.log(data.data.data);
                this.setState({ employeeArr: data.data.data })
            })
            .catch(err => console.log('Error in while fetching data!' + err))
    }

    addUpdateUser = (id = '') => {
        let postData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
        }
        if (this.state.mode == 'Add') {
            axios.post('https://reqres.in/api/users', postData)
                .then(data => {
                    if (data.data) {
                        this.resetFields();
                        alert('Record inserted successfully!!')
                    }
                })
                .catch(err => console.log('Error in while adding data!' + err))

        } else {
            axios.put('https://reqres.in/api/users/' + id, postData)
                .then(data => {
                    if (data.data) {
                        alert('Record Updated successfully!!')
                    }
                })
                .catch(err => console.log('Error in while adding data!' + err))
        }
    }

    deleteUser = (id) => {
        if (window.confirm("Are you want to delete id : " + id)) {
            axios.delete('https://reqres.in/api/users/' + id)
                .then(data => {
                    alert('Record deleted successfully!!')
                })
                .catch(err => console.log('Error in while adding data!' + err))
        }
    }

    onInputChange = (e, key) => {
        this.setState({ [key]: e.target.value })
    }

    //Common method for show/hide div for insert/update
    showDiv = (flag, mode, data = []) => {
        this.setState({ isShow: flag, mode: mode, id: data.id })
        this.resetFields()
        if (mode == 'Edit') {
            this.setState({ firstName: data['first_name'], lastName: data['last_name'], email: data['email'], id: data['id'] })
        }
    }

    onCancel = () => {
        this.setState({ isShow: false, mode: '', firstName: '', lastName: '', email: '', id: '' })
    }

    resetFields = () => {
        this.setState({ firstName: '', lastName: '', email: '', id: '' })
    }

    render() {
        return (
            <div className='mainDiv' >
                <h1>Home Component</h1>
                <div className='tableWrapper'>
                    <div className='btnDiv'>
                        <button className='newBtn' onClick={() => this.showDiv(true, 'Add')}>Add New Record</button>
                    </div>
                    <div className='tableDiv'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    ![undefined, null, []].includes(this.state.employeeArr) ?
                                        this.state.employeeArr.map(items => (
                                            <tr>
                                                <td>{items.id}</td>
                                                <td>{items.first_name}</td>
                                                <td>{items.last_name}</td>
                                                <td>{items.email}</td>
                                                <td >
                                                    <div className='twoBtns'>
                                                        <button onClick={() => this.showDiv(true, 'Edit', items)}>Edit</button>
                                                        <button onClick={() => this.deleteUser(items.id)}>Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        : null
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        this.state.isShow ?
                            <div className='hiddenDiv'>
                                <div className='inputGrp'>
                                    <input placeholder='Enter first name' value={this.state.firstName} onChange={e => this.onInputChange(e, 'firstName')} />
                                    <input placeholder='Enter last name' value={this.state.lastName} onChange={e => this.onInputChange(e, 'lastName')} />
                                    <input placeholder='Enter email' value={this.state.email} onChange={e => this.onInputChange(e, 'email')} />
                                </div>
                                <div className='btnGrp'>
                                    <button onClick={() => this.addUpdateUser(this.state.id)}>{this.state.mode}</button>
                                    <button onClick={() => this.onCancel()}>Cancel</button>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div >
        )
    }
}

export default HomeComponent