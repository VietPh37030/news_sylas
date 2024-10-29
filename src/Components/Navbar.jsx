import React from 'react';
 import hamburgerIcon from '../assets/menu_icon_rm.png'; 

const Navbar = ({ setCategory }) => {
  return (
    <div>
      {/* Hamburger icon to toggle the drawer */}
      <img
        src={hamburgerIcon} // Hình ảnh biểu tượng hamburger
        alt="Menu"
        style={{ width: '30px', cursor: 'pointer' }} // Bạn có thể điều chỉnh kích thước theo ý muốn
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      />

      {/* Offcanvas Drawer */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Sylas
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav flex-column">
            <li className="nav-item">
              <a className="nav-link" onClick={() => setCategory("technology")}>Chi tiết</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setCategory("business")}>Business</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setCategory("health")}>Health</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setCategory("sports")}>Sport</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => setCategory("entertainment")}>Entertainment</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
