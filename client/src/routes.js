import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import jwt_decode from 'jwt-decode';
import Login from './components/Login';

const ReactRoutes = () => {
    const [auth, setAuth] = useState(true);
    const [plan, setPlan] = useState();
    async function populateQuote() {
        const req = await fetch('http://localhost:3001/api/plan', {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        });

        const data = await req.json();
        console.log(data);
        if (data.status === 'ok') {
            setPlan(data.plan);
        } else {
            alert(data.error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwt_decode(token);
            if (!user) {
                localStorage.removeItem('token');
                // history.replace('/login');
            } else {
                populateQuote();
                setAuth(false);
            }
        }
    }, []);
    return (
        <BrowserRouter>
            <div className='container'>
                <Routes>
                    {/* <Route exact path='posts' element={<Post />}>
                        <Route path=':id' element={<PostItem />} />
                    </Route>*/}
                    {/* <Route path='/login' element={<Profile />} />  */}
                    <Route path='/' element={auth ? <Login setAuth={setAuth} /> : <Home plan={plan} setAuth={setAuth} />} />
                    <Route path='*' element={<h3>OOPS Page Not Found</h3>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default ReactRoutes;
