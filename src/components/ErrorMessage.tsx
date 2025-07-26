import React from 'react';

const ErrorMessage: React.FC<{ error?: string }> = ({ error }) =>
  error ? <div className="text-red-500 text-sm mb-2">{error}</div> : null;

export default ErrorMessage;
