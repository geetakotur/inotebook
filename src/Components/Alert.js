import React from 'react';

function Alert(props) {
  const capitalize = (word) => {
    if(word==="danger"){
      word="error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  // Check if props.alert exists before accessing its properties
  if (props.alert) {
    return (
      <div>
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      </div>
    );
  }

  // If props.alert is null or undefined, return null or an alternative UI
  return null; // You can also return a message or alternative UI here.
}

export default Alert;
