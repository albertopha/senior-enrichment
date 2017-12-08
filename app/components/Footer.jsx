import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {

  return (
    <footer>
      <div>
        <div className="pull-left">
            <button className="btn btn-default">
               <Link to="/create/campuses">Create Campus</Link>
            </button>
            <button className="btn btn-default">
                <Link to="/create/students">Create Student</Link>
            </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
