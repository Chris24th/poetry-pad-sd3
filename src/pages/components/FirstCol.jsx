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
  const [thesau, setThesau] = useState();
  const [rhymeF, setRhymeF] = useState();
  const [error, setError] = useState();

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
          if (res.data[0].meta) {
            console.log(res.data);
            setThesau(res.data);
            setError("");
          } else {
            setThesau();
            setError("Sorry, word not found in the Thesaurus.");
          }
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
            {error && (
              <span className="thes-p mb-4" style={{ fontStyle: "italic" }}>
                {error}
              </span>
            )}
            {choice === 1 &&
              rhymeF &&
              rhymeF.map((rhyme) => (
                <span className="fc-words-span" key={rhyme.word}>
                  {rhyme.word}
                </span>
              ))}
            {choice === 0 && thesau && (
              <>
                <div className="thes-div">
                  <Row style={{ background: "none" }}>
                    <div className="thes-word">{thesau[0].hwi.hw}</div>
                  </Row>
                  <Row style={{ background: "none" }}>
                    <span className="thes-fl">{thesau[0].fl}</span>
                    <span className="thes-def">- {thesau[0].shortdef[0]}</span>
                  </Row>
                  <span className="thes-p">Synonyms:</span>
                  {thesau.map((thes) =>
                    thes.meta.syns.map((syn) => (
                      <span className="fc-words-span" key={syn[0][0]}>
                        {syn[0]}
                      </span>
                    ))
                  )}
                </div>
                <div className="thes-div">
                  <span className="thes-p">Antonyms:</span>
                  {thesau.map((thes) =>
                    thes.meta.ants.map((ant) => (
                      <span className="fc-words-span">{ant[0]}</span>
                    ))
                  )}
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
