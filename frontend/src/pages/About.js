import React from "react";
import Image3 from "../images/images3.png";
import Image4 from "../images/images4.png";
import Image5 from "../images/images5.png";

const About = () => {
  return (
    <div className="about-container">
      {/* ---------- Our Story (Image Left) ---------- */}
      <section className="py-5" style={{ backgroundColor: "#f4f1ff" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Image Left */}
            <div className="col-lg-6 col-md-6 col-12 mb-4 mb-md-0">
              <img src={Image3} className="img-fluid" alt="Our Story" />
            </div>

            {/* Text Right */}
            <div className="col-lg-6 col-md-6 col-12">
              <h2 className="text-purple">Our Story</h2>
              <p>
                Founded in 2025, Bookies began as a small idea between three
                book lovers who wanted to create a space where stories could
                truly connect people. Inspired by the vibrant energy of Beirut
                and a shared passion for reading, we set out to build an online
                home for book enthusiasts of all kinds. From day one, our aim
                has been simple: to bring readers closer to the stories that
                inspire, comfort, and ignite their imagination.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Our Mission (Image Right) ---------- */}
      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="container">
          <div className="row align-items-center flex-md-row-reverse">
            {/* Image Right */}
            <div className="col-lg-6 col-md-6 col-12 mb-4 mb-md-0">
              <img src={Image4} className="img-fluid" alt="Our Mission" />
            </div>

            {/* Text Left */}
            <div className="col-lg-6 col-md-6 col-12">
              <h2 className="text-purple">Our Mission</h2>
              <p>
                At Bookies, our mission is simple yet profound—to be the bridge
                between readers and the extraordinary worlds hidden within the
                covers of a book. We curate a collection that mirrors the
                diversity of our community’s literary tastes.
              </p>
              <p>
                Our pledge is to provide an unmatched reading experience,
                delivering original, high-quality books swiftly to doorsteps
                worldwide. Join us as we embark on a mission to enrich lives
                through the joy of reading, one carefully selected story at a
                time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Meet Our Team (Image Left) ---------- */}
      <section className="py-5" style={{ backgroundColor: "#f4f1ff" }}>
        <div className="container">
          <div className="row align-items-center">
            {/* Image Left */}
            <div className="col-lg-6 col-md-6 col-12 mb-4 mb-md-0">
              <img src={Image5} className="img-fluid" alt="Team" />
            </div>

            {/* Text Right */}
            <div className="col-lg-6 col-md-6 col-12">
              <h2 className="text-purple">Meet Our Team</h2>
              <p>
                Being a family-based business, this bookstore is run by a
                full-stack developer with a passion for books, along with his
                younger brother and friend.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
