import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const HobbiesEditor = ({ component, handleContentChange }) => {
  const handleHobbyChange = (index, value) => {
    const newHobbies = [...(component.content.hobbies || [])];
    newHobbies[index] = value;
    handleContentChange('hobbies', newHobbies);
  };

  const moveHobby = (index, direction) => {
    const newHobbies = [...(component.content.hobbies || [])];
    if (direction === 'up' && index > 0) {
      [newHobbies[index], newHobbies[index - 1]] = [newHobbies[index - 1], newHobbies[index]];
    } else if (direction === 'down' && index < newHobbies.length - 1) {
      [newHobbies[index], newHobbies[index + 1]] = [newHobbies[index + 1], newHobbies[index]];
    }
    handleContentChange('hobbies', newHobbies);
  };

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>个人爱好:</label>
        {(component.content.hobbies || []).map((hobby, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
            <input 
              type="text" 
              value={hobby || ''} 
              onChange={(e) => handleHobbyChange(index, e.target.value)}
              style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="如：阅读、旅行、摄影等"
            />
            <div style={{ display: 'flex', gap: '2px' }}>
              <button 
                onClick={() => moveHobby(index, 'up')}
                disabled={index === 0}
                style={{ 
                  padding: '4px', 
                  background: index === 0 ? '#f0f0f0' : '#e0e0e0', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: index === 0 ? 'default' : 'pointer',
                  opacity: index === 0 ? 0.5 : 1
                }}
              >
                <ChevronUp size={16} />
              </button>
              <button 
                onClick={() => moveHobby(index, 'down')}
                disabled={index === (component.content.hobbies || []).length - 1}
                style={{ 
                  padding: '4px', 
                  background: index === (component.content.hobbies || []).length - 1 ? '#f0f0f0' : '#e0e0e0', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: index === (component.content.hobbies || []).length - 1 ? 'default' : 'pointer',
                  opacity: index === (component.content.hobbies || []).length - 1 ? 0.5 : 1
                }}
              >
                <ChevronDown size={16} />
              </button>
              <button 
                onClick={() => {
                  const newHobbies = component.content.hobbies.filter((_, i) => i !== index);
                  handleContentChange('hobbies', newHobbies);
                }}
                style={{ 
                  padding: '4px', 
                  background: '#ff5252', 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer' 
                }}
                title="删除此爱好" 
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
        {/* 添加爱好按钮 */}
        <button 
          onClick={() => {
            const newHobbies = [...(component.content.hobbies || []), ''];
            handleContentChange('hobbies', newHobbies);
          }}
          style={{ 
            padding: '8px', 
            border: 'none', 
            background: '#4CAF50', 
            color: 'white', 
            borderRadius: '4px', 
            width: '100%', 
            marginTop: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Plus size={16} style={{ marginRight: '5px' }} />
          添加爱好
        </button>
      </div>
      
      <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        提示: 添加与目标职位相关或能展示个人特质的爱好，可以让简历更加立体。
      </div>
    </>
  );
};

export default HobbiesEditor;