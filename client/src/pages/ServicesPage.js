import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function ServicesPage() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Article Creation",
      description: "We craft detailed and structured articles for your wiki needs."
    },
    {
      title: "Editing Services",
      description: "Improve grammar, clarity, and formatting with expert editors."
    },
    {
      title: "Knowledge Sharing",
      description: "Collaborate with others and share domain knowledge efficiently."
    },
    {
      title: "SEO Optimization",
      description: "We ensure your articles rank better and reach more readers."
    }
  ];

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">WikiApp</span>
        <button className="btn btn-outline-light" onClick={() => navigate(-1)}>Back</button>
      </nav>

      {/* Services Header */}
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Our Services</h2>

        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-6 col-lg-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
