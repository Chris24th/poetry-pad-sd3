import { useState, useEffect } from "react";
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
  const [thesau, setThesau] = useState();
  const [rhymeF, setRhymeF] = useState();

  const onSearch = async (e) => {
    e.preventDefault();
    if (choice === 1) {
      axios
        .get(
          "https://rhymebrain.com/talk?function=getRhymes&word=" + searchWord
        )
        .then((res) => {
          setRhymeF(res.data.slice(0, 40));
        });
    } else {
      axios
        .get(
          "https://dictionaryapi.com/api/v3/references/thesaurus/json/" +
            searchWord +
            "?key=d8da13e5-4ab1-4ec3-9c7c-ce41ec6184a1"
        )
        .then((res) => {
          console.log(res.data);
          setThesau(res.data);
        });
    }
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
      <Form onSubmit={onSearch}>
        <Form.Control
          placeholder="Type here..."
          size="sm"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          required
        />
        <Button type="submit" variant="dark" size="sm" className="mt-2 w-100">
          Search
        </Button>
      </Form>
      <div className="d-flex justify-content-center">
        <Row className="mt-2 fc-words">
          <Col className="fc-words-col">
            {choice === 1 &&
              rhymeF &&
              rhymeF.map((rhyme) => (
                <span className="fc-words-span">{rhyme.word}</span>
              ))}
            {choice === 0 && thesau && (
              <>
                <div className="thes-div">
                  <span className="thes-p">Synonyms:</span>

                  {thesau.map((thes) => (
                    <span className="fc-words-span">{thes.meta.id}</span>
                  ))}
                </div>
                <div className="thes-div">
                  <span className="thes-p">Antonyms:</span>
                  {thesau.map((thes) => (
                    <span className="fc-words-span">{thes.meta.id}</span>
                  ))}
                </div>
              </>
            )}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default FirstCol;
