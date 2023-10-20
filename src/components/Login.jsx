import { useEffect, useState } from "react";
import { Button, Col, Container } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/countries')
    }, [user, loading])

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center text-center bg-secondary" style={{ minHeight: '55rem' }}>
            <Col className="d-flex flex-column mt-5 pt-5">
                <h5 className="text-light">Please enter your credentials</h5>
                <div className="d-flex flex-column mt-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="m-2 rounded border-0 p-1"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="m-2 rounded border-0 p-1"
                    />
                </div>
                <Button className="my-3 mx-2" variant="info" onClick={() => loginWithEmailAndPassword(email, password)}>Log In</Button>
                <div className="m-3 text-light">
                    Don't have an account?
                    <Link to="/register" className="m-2 text-info">Register</Link>
                </div>
            </Col>
        </Container>
    )

}

export default Login;