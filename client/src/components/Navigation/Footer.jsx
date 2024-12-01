const Footer = () => {
    return (
      <>
      <br />
      <footer className=" text-light pt-5 pb-4 " style={{ backgroundColor: '#144B7D' }}>
        <div className="container" >
          <div className="row">
            {/* Text Section */}
            <div className="col-md-6 mb-3">
              <p>
              At Advajobs, we strive to connect talented professionals with the best companies. 
              Our platform has been designed to make job searching easier and more efficient for both job 
              seekers and employers. Since our inception,. Whether fresh graduate or an experienced professional,
               Advajobs is here to guide you through every step of your career journey.
              </p>
            </div>
  
            {/* Useful Links */}
            <div className="col-md-3 mb-3">
              <h5>Useful Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-light text-decoration-none">Find</a></li>
                <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
              </ul>
            </div>
  
            {/* Contact Information */}
            <div className="col-md-3 mb-3">
              <h5>Say Hello..!</h5>
              <p>
                Email: advajobs@gmail.com<br />
                Address: It has survived not only five centuries,<br />
                Phone: +94 77 123 4567
              </p>
            </div>
          </div>
  
          {/* Email and Message Form */}
          <div className="row">
            <div className="col-md-5 mb-3" >
              <input
                type="email"
                className="form-control border-0 custom-placeholder"
                placeholder="Email"
                style={{ backgroundColor: '#144B7D',opacity: '1',color: 'white'}}
              />
            </div>
  
            <div className="col-md-5 mb-3">
              <input
                type="text"
                className="form-control border-0 custom-placeholder "
                placeholder="Leave us a message"
                style={{ backgroundColor: '#144B7D',opacity: '1',color: 'white'}}
              />
            </div>
  
            <div className="col-md-2 mb-3">
              <button className="btn btn-light w-100">Submit</button>
            </div>
          </div>
        </div>
      </footer>
      </>
    );
  };
  
  export default Footer;