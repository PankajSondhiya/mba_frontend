import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../../api/booking";
import { makePayment } from "../../api/payment";
import GIF from "./../../assets/simpson.gif";

const Payment = ({ movie, theatre, noOfSeats, totalCost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [bookingDetail, setBookingDetail] = useState({});
  const [paymentDetail, setPaymentDetail] = useState({});
  const navigate = useNavigate();

  async function makeBooking() {
    const data = await createBooking({
      theatreId: theatre._id,
      movieId: movie._id,
      timing: new Date().toLocaleDateString(),
      noOfSeats: noOfSeats,
    });
    setBookingDetail(data);
    return data;
  }

  async function initPayment(bookingId, totalCost) {
    const data = await makePayment({
      bookingId,
      amount: totalCost,
    });

    setPaymentDetail(data);
  }

  const bookAndPay = async () => {
    const bookingDetail = await makeBooking();
    await initPayment(bookingDetail._id, bookingDetail.totalCost);
  };

  const handleHide = () => {
    setIsOpen(false);
    if (paymentDetail.status === "SUCCESS") {
      navigate("/");
    }
  };

  return (
    <>
      <Button variant="danger" onClick={() => setIsOpen(true)}>
        Proceed to payment
      </Button>
      <Modal
        style={{ backdropFilter: "blur(10px)" }}
        size="sm"
        show={isOpen}
        onHide={handleHide}
        centered
        contentClassName="bg-light"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-danger fw-lighter">
            Order Summary
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row fw-lighter">
            <div className="col my-2">
              <h5>{movie.name}</h5>
              <small>{movie.language}</small>
              <br />
              <small className="fw-bolder">{theatre.name}</small>
              <br />
              <small className="text-success">m-Ticket</small>
            </div>
            <div className="col-3 text-center">
              <h5>{noOfSeats}</h5>
              <p>Tickets</p>
            </div>
            <hr className="text-muted" />
            <div className="row">
              <div className="col">
                <p className="fw-bolder">Total</p>
              </div>
              <div className="col-2">
                <p className="fw-bolder">₹{totalCost}</p>
              </div>
            </div>
            {paymentDetail.status === "SUCCESS" ? (
              <>
                <img alt="ticket" src={GIF} />
                <div className="bg-success py-1 text-white text-center shadow-lg rounded-3 bg-opacity-75">
                  <small className="fw-bolder">Booking Confirmed!</small>
                  <div className="row text-center my-2">
                    <div className="col-3">
                      <small className="fw-bolder">Booking Id : </small>
                    </div>
                    <div className="col-9">
                      <small className="text-uppercase">
                        {paymentDetail.bookingId}
                      </small>
                    </div>
                  </div>
                </div>
                <button className="btn btn-success my-2" onClick={handleHide}>
                  Go to home page
                </button>
              </>
            ) : (
              <button className="btn btn-danger" onClick={bookAndPay}>
                Confirm payment
              </button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Payment;
