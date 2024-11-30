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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
                Email: skilled@gmail.com<br />
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