import React from 'react';

const SummaryEditor = ({ component, handleContentChange }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label style={{ display: 'block', marginBottom: '5px' }}>个人简介:</label>
      <textarea 
        value={component.content.text || ''} 
        onChange={(e) => handleContentChange('text', e.target.value)}
        style={{ 
          width: '100%', 
          padding: '8px', 
          border: '1px solid #ccc', 
          borderRadius: '4px', 
          minHeight: '150px', 
          resize: 'vertical',
          fontFamily: 'inherit',
          lineHeight: '1.5'
        }}
        placeholder="请输入您的个人简介..."
      />
      <div style={{ marginTop: '5px', fontSize: '12px', color: '#666' }}>
        提示: 简洁有力的个人简介能让招聘者快速了解您的核心优势和职业目标。
      </div>
    </div>
  );
};

export default SummaryEditor;