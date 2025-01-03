// src/components/FailureView/FailureView.js
import React from "react";
import "./FailedView.css";

const FailureView = ({ setShowFailedView }) => {
  const onRetry = () => {
    setShowFailedView(false);
  };

  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/content/react-js/list-creation-failure-lg-output.png"
        alt="Failure"
        className="failure-image"
      />
      <p className="failure-message">Oops! Something went wrong</p>
      <button type="button" className="retry-button" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
};

export default FailureView;
