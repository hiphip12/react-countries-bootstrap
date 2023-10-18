import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
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
        <Col className="d-flex flex-column justify-content-center">
            <div>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="m-2"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="m-2"
                />
            </div>
            <Button className="mt-3" variant="success" onClick={() => loginWithEmailAndPassword(email, password)}>Log In</Button>
            <div className="m-3">
                Don't have an account?
                <Link to="/register" className="m-2">Register</Link>
            </div>
        </Col>
    )

}

export default Login;