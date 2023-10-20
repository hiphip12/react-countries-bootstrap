import { useEffect, useState } from "react";
import { Button, Container, Col } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../auth/firebase";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if (!name) alert("Please enter name")
        registerWithEmailAndPassword(name, email, password)
    }

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/countries')
    }, [user, loading])

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center text-center bg-secondary" style={{ minHeight: '62rem' }}>
            <Col className="d-flex flex-column mt-5 pt-5">
                <h5 className="text-light">Please register below</h5>
                <div className="d-flex flex-column mt-2">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="my-2 rounded border-0 p-1"
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="my-2 rounded border-0 p-1"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="my-2 rounded border-0 p-1"
                    />
                </div>
                <Button className="my-3" variant="info" onClick={register}>Register</Button>
                <div className="m-3 text-light">
                    Already have an account?
                    <Link to="/login" className="m-2 text-info">Log In</Link>
                </div>
            </Col>
        </Container>
    )

}

export default Register;