import './book.css';
import Freelance from '../assets/Freelance.webp';
import edit from '../assets/edit.webp';
import design from '../assets/design.webp';

function Book() {
  const handleBooking = (serviceName) => {
    alert(`Booking ${serviceName}. This will redirect to booking page.`);
    // Add your booking logic here
  };

  return (
    <>
      <h2 className="our-ser">Our Services</h2>
      <div className="figure">
        <figure className="fig">
          <img src={Freelance} alt="Freelance Design Service" />
          <figcaption className="cap">
            <h4>Freelance Design Service</h4>
            <hr />
            <p>2 hours</p>
            <br />
            <p>$250</p>
            <button 
              onClick={() => handleBooking('Freelance Design Service')} 
              id="serv-btn"
            >
              Book Now
            </button>
          </figcaption>
        </figure>
        
        <figure className="fig">
          <img src={edit} alt="Video Editing Premier Pro Course" />
          <figcaption className="cap">
            <h4>Video Editing Premier Pro</h4>
            <hr />
            <p>Ended</p>
            <br />
            <p>$200</p>
            <button 
              onClick={() => handleBooking('Video Editing Premier Pro')} 
              id="serv-btn"
            >
              View Course
            </button>
          </figcaption>
        </figure>
        
        <figure className="fig">
          <img src={design} alt="Graphic Design Intro Course" />
          <figcaption className="cap">
            <h4>Graphic Design Intro</h4>
            <hr />
            <p>Ended</p>
            <br />
            <p>$150</p>
            <button 
              onClick={() => handleBooking('Graphic Design Intro')} 
              id="serv-btn"
            >
              View Course
            </button>
          </figcaption>
        </figure>
      </div>
    </>
  );
}

export default Book;