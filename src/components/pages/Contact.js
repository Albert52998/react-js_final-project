import React, { useState } from "react";
import { connect } from "react-redux";
import { contact } from "../../store/userActions";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function Contact(props) {
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    message: null,
  });

  const handleSubmit = () => {
    let { name, email, message } = values;

    setErrors({
      name: name ? null : "Name is required",
      email: email ? null : "Email is required",
      message: message ? null : "Message is required",
    });

    if (email && message) {
      console.log(values);
      props.contact(values);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: null,
    });
  };

  return (
    <Container>
      <Row
        className="justify-content-center"
        style={{
          position: "absolute",
          height: "300px",
          width: "1200px",
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
          margin: "auto",
        }}
      >
        <Col xs={12} sm={8} md={6}>
          <Form>
            <h3 className="text-center">Contact Us</h3>
            <Form.Group style={{ marginTop: "20px" }}>
              <Form.Control
                type="name"
                name="name"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
              />
              {<Form.Text className="text-danger">{errors.name}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
              />
              {<Form.Text className="text-danger">{errors.email}</Form.Text>}
            </Form.Group>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows={3}
                type="message"
                name="message"
                placeholder="Enter your message"
                value={values.message}
                onChange={handleChange}
              />
              {<Form.Text className="text-danger">{errors.message}</Form.Text>}
            </Form.Group>
          </Form>

          <div className="text-center">
            <Button variant="primary" onClick={handleSubmit}>
              Send
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

const mapDispatchToProps = {
  contact,
};

export default connect(null, mapDispatchToProps)(Contact);
