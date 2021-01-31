import React from "react";

export default function About() {
  const style = {
    position: "absolute",
    width: "50%",
    height: "200px",
    inset: "0",
    margin: "auto",
  };

  return (
    <main role="main" className="inner cover text-center" style={style}>
      <h1 className="cover-heading">About Us</h1>
      <p className="lead">
        Our service is designed to make your business easier, faster and more
        efficient. Every day we improve the website for a more comfortable work
        and maximum efficiency. Happy hacking!
      </p>
    </main>
  );
}
