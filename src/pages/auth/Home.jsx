// import {}
import { Row, Figure } from "react-bootstrap";
import LandingFrame from "../../images/landingframe.svg";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Row>
        <Figure>
          <Figure.Image
            width="100%"
            height="100%"
            alt="100%x100%"
            src={LandingFrame}
          />
        </Figure>
      </Row>
      <Row style={{ marginRight: "150px", marginBottom: "100px" }}>
        <a
          onClick={() => {
            navigate("/dashboard");
            window.location.reload();
          }}
          className="landing-btn"
        >
          Start Writing
          <BsArrowRight className="auth-arrow" />
        </a>
      </Row>
    </div>
  );
};

export default Home;
