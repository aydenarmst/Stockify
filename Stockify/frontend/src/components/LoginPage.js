import React, { useState, useContext } from "react";
import styled from "@emotion/styled";
import AuthContext from "../context/AuthContext";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const FormContainer = styled.div`
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  width: 300px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: none;
  background-color: #f7f7f7;
  &:focus {
    outline-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(AuthContext);

  return (
    <Container>
      <FormContainer>
        <Title>Login</Title>
        <form onSubmit={loginUser}>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </form>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
