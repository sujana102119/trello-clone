import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';

function Header(props) {
  const { title } = props;

  return (
    <div className="header">
      <h1 className="title">{title}</h1>
      <button type="button" className="signOut">Sign Out</button>
    </div>
  );
}

Header.defaultProps = {
  title: '',
};

Header.propTypes = {
  title: PropTypes.string,
};
export default Header;
