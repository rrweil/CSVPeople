import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [people, setPeople] = useState();

    useEffect(() => {
        const getPeople = async () => {
            const {data} = await axios.get('/api/people/getPeople');
            setPeople(data);
        }
        getPeople();
    }, []);

    const deleteAllPeople = () => {
        axios.post('/api/people/deleteAllPeople');
        setPeople([]);
    }

    return (<>
        <div className="row">
            <div className="col-md-6 offset-3 mt-5 mb-5">
                <button onClick={deleteAllPeople} className="btn btn-danger btn-lg btn-block">Delete All</button>
                </div>
            </div>
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Address</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people && people.map(person => 
                        {
                            return(
                            <tr>
                                <td>{person.id}</td>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.age}</td>
                                <td>{person.address}</td>
                                <td>{person.email}</td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>     
    </>);
}

export default Home;