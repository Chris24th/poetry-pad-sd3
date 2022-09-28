import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Comment = ({ selectedCom }) => {
  const user = JSON.parse(localStorage.getItem("user-data"));
  const [comments, setComments] = useState();
  const [textContent, setTextContent] = useState("");

  const displayComment = async () => {
    await axios
      .get("https://poetry-pad.herokuapp.com/api/displaycomment")
      .then((res) => {
        console.log(res.data);
        res.data && setComments(res.data);
      });
  };

  const onSend = async (e) => {
    e.preventDefault();
    await axios
      .post("https://poetry-pad.herokuapp.com/api/createcomment", {
        idPoem: selectedCom,
        idUser: user.id,
        textContent: textContent,
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    displayComment();
  });

  return (
    <Container className="mt-4">
      <Row className="inline-flex">
        <Form className="d-flex" onSubmit={onSend}>
          <Form.Control
            type="text"
            placeholder="Type here to add comment"
            className="me-2"
            onChange={(e) => setTextContent(e.target.value)}
            required
          />
          <Button type="submit" variant="dark" size="sm">
            Send
          </Button>
        </Form>
      </Row>
      <Container>
        {/* {comments.map(
          (comm) => 
          comm.idPoem === selectedCom &&
           <>
          {comm.textContent}
          </>
        )} */}
      </Container>
    </Container>
  );
};

export default Comment;
