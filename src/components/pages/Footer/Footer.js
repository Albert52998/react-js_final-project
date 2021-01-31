import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { Logo } from "../../NavMenu";

const Footer = () => {
  return (
    <footer class="pt-4 my-md-5 pt-md-5 border-top w-100">
      <div class="row">
        <div class="col-12 col-md">
          <Logo />
          <small class="d-block mb-3 text-muted">© 2020-2021</small>
        </div>
        <div class="col-6 col-md">
          <h5>Pages</h5>
          <ul class="list-unstyled text-small">
            <li>
              <NavLink to="/" className="text-muted">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-muted">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-muted">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>My social networks</h5>
          <ul class="list-unstyled text-small">
            <li>
              <a
                className="text-muted"
                href="https://github.com/Albert52998"
                target="_blank"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                className="text-muted"
                href="https://www.linkedin.com/in/albert-harutyunyan-b73209205/"
                target="_blank"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <a href="#">
            <FontAwesomeIcon icon={faArrowUp} />
            &nbsp;Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
