import React from 'react';

const InputNumber = ({ label, value, onChange }) => (
  <label>
    {label}:
    <input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
  </label>
);

export default InputNumber;