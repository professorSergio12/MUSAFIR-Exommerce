import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

const ThemeProvider = ({ children }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white text-black-700 dark:text-black-200 dark:bg-[rgb(16,23,42)]">
        {children}
      </div>
    </div>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
