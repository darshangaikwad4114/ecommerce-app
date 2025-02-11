import React from "react";

// Footer component to display the footer section of the webpage
const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto">
        <p className="text-white text-center">
          &copy; {new Date().getFullYear()} Darshan Gaikwad. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
