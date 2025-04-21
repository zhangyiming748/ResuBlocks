import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const ExperienceEditor = ({ component, handleContentChange }) => {
  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...(component.content.experience || [])];
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    };
    handleContentChange('experience', newExperience);
  };

  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: '15px' }}>工作经验</h3>
      {(component.content.experience || []).map((exp, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #eee', borderRadius: '4px' }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>公司名称:</label>
            <input 
              type="text" 
              value={exp.company || ''} 
              onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>职位:</label>
            <input 
              type="text" 
              value={exp.position || ''} 
              onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>工作地点:</label>
            <input 
              type="text" 
              value={exp.location || ''} 
              onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>开始时间:</label>
              <input 
                type="text" 
                value={exp.startDate || ''} 
                onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>结束时间:</label>
              <input 
                type="text" 
                value={exp.endDate || ''} 
                onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>工作描述:</label>
            <textarea 
              value={exp.description || ''} 
              onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
              style={{ width: 'calc(100% - 16px)', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px', resize: 'vertical', marginLeft: '8px' }}
            />
          </div>

          <button 
            onClick={() => {
              const newExperience = component.content.experience.filter((_, i) => i !== index);
              handleContentChange('experience', newExperience);
            }}
            style={{ 
              padding: '8px', 
              border: 'none', 
              background: '#ff5252', 
              color: 'white', 
              borderRadius: '4px', 
              width: '100%', 
              marginTop: '5px',
              cursor: 'pointer'
            }}
          >
            删除工作经验
          </button>
        </div>
      ))}
      <button 
        onClick={() => {
          const newExperience = [...(component.content.experience || []), { 
            company: '', 
            position: '', 
            location: '',
            startDate: '', 
            endDate: '', 
            description: ''
          }];
          handleContentChange('experience', newExperience);
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
        添加工作经验
      </button>
    </div>
  );
};

export default ExperienceEditor;