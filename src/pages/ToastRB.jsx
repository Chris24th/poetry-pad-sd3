import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastRB = (success) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <ToastContainer position="bottom-end">
        <Toast
          bg="success"
          onClose={() => setShow(false)}
          show={show}
          delay={5000}
          autohide
          // animation={true}
        >
          <Toast.Header></Toast.Header>
          <Toast.Body className="bg-success text-white">
            {success}
            <Link to="/signin" className="toast-link">
              Log In
            </Link>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ToastRB;
