import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  Form,
  Container,
  Col,
  Row,
} from "react-bootstrap";
import axios from "axios";

const FirstCol = () => {
  const [searchWord, setSearchWord] = useState("");
  const [choice, setChoice] = useState(0);

  const onSearch = async (e) => {
    e.preventDefault();
    axios
      .get("https://rhymebrain.com/talk?function=getRhymes&word=" + searchWord)
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <Container className="mb-3">
      <Row className="mb-3">
        <DropdownButton
          variant="dark"
          title={choice === 0 ? "Thesaurus" : "Rhyme Finder"}
        >
          <Dropdown.Item onClick={() => setChoice(0)}>Thesaurus</Dropdown.Item>
          <Dropdown.Item onClick={() => setChoice(1)}>
            Rhyme Finder
          </Dropdown.Item>
        </DropdownButton>
      </Row>
      <Form>
        <Form.Control
          placeholder="Type here"
          size="sm"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="dark"
          size="sm"
          className="mt-2 w-100"
          onClick={onSearch}
        >
          Search
        </Button>
      </Form>
      <div className="d-flex justify-content-center">
        <Row className="mt-2 fc-words">
          <Col className="fc-words-col">
            <span className="fc-words-span">xxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxx</span>
            <span className="fc-words-span">xxx</span>
            <span className="fc-words-span">xxx</span>
            <span className="fc-words-span">xxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxx</span>
            <span className="fc-words-span">xxx</span>
            <span className="fc-words-span">xxx</span>
            <span className="fc-words-span">xxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxx</span>
            <span className="fc-words-span">xxx</span>
            <span className="fc-words-span">xxx</span>
            <span className="fc-words-span">xxxx</span>
            <span className="fc-words-span">xx</span>
            <span className="fc-words-span">xxxxx</span>
            <span className="fc-words-span">xx</span>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FirstCol;
