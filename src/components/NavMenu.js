import React, { useEffect } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { logout } from "./../store/userActions";
import { connect } from "react-redux";
import { getUserInfo } from "./../store/userActions";
import Search from "./Search/Search";

function NavMenu({ isAuthenticated, logout, getUserInfo, user }) {
  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo();
    }
  }, [getUserInfo, isAuthenticated]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="light"
        variant="light"
        className="px-5"
        fixed="top"
        style={{
          boxShadow: "0 0 19px 2px rgba(0,0,0,.3)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          opacity: ".97",
          backdropFilter: "blur(10px)",
        }}
      >
        <Logo />

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {isAuthenticated ? (
              <NavLink
                to="/"
                activeClassName="activeLink"
                className="ml-5 mr-2 nav-item"
                exact
              >
                Home
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/register"
                  activeClassName="activeLink"
                  className="ml-5 mr-2 nav-item"
                  exact
                >
                  Register
                </NavLink>

                <NavLink
                  to="/login"
                  activeClassName="activeLink"
                  className="mx-2 nav-item"
                  exact
                >
                  Login
                </NavLink>
              </>
            )}

            <NavLink
              to="/about"
              activeClassName="activeLink"
              className="mx-2 nav-item"
              exact
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              activeClassName="activeLink"
              className="ml-2 nav-item"
              exact
            >
              Contact
            </NavLink>
          </Nav>

          <Search />
        </Navbar.Collapse>
      </Navbar>

      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "40px",
          display: "flex",
          width: "300px",
          marginRight: "-15px",
        }}
        className="justify-content-center"
      >
        {user && (
          <div
            style={{
              background: "#eeeeee",
              color: "#000",
              fontWeight: "500",
              width: "60%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            <span style={{ marginRight: "5px" }}>{user.name}</span>{" "}
            <span style={{ marginLeft: "5px" }}>{user?.surname}</span>
          </div>
        )}
        {isAuthenticated && (
          <Button
            variant="success"
            onClick={logout}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
}

export const Logo = () => {
  return <Navbar.Brand style={{ marginRight: "0" }}>Todo List</Navbar.Brand>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.userInfo,
  };
};

const mapDispatchToProps = {
  logout,
  getUserInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);
