import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const EducationEditor = ({ component, handleContentChange }) => {
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...(component.content.education || [])];
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    };
    handleContentChange('education', newEducation);
  };

  const moveEducation = (index, direction) => {
    const newEducation = [...(component.content.education || [])];
    if (direction === 'up' && index > 0) {
      [newEducation[index], newEducation[index - 1]] = [newEducation[index - 1], newEducation[index]];
    } else if (direction === 'down' && index < newEducation.length - 1) {
      [newEducation[index], newEducation[index + 1]] = [newEducation[index + 1], newEducation[index]];
    }
    handleContentChange('education', newEducation);
  };

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>教育经历:</label>
        {(component.content.education || []).map((edu, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h4 style={{ margin: 0 }}>教育经历 #{index + 1}</h4>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => moveEducation(index, 'up')}
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
                  onClick={() => moveEducation(index, 'down')}
                  disabled={index === (component.content.education || []).length - 1}
                  style={{ 
                    padding: '4px', 
                    background: index === (component.content.education || []).length - 1 ? '#f0f0f0' : '#e0e0e0', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: index === (component.content.education || []).length - 1 ? 'default' : 'pointer',
                    opacity: index === (component.content.education || []).length - 1 ? 0.5 : 1
                  }}
                >
                  <ChevronDown size={16} />
                </button>
                <button 
                  onClick={() => {
                    const newEducation = component.content.education.filter((_, i) => i !== index);
                    handleContentChange('education', newEducation);
                  }}
                  style={{ 
                    padding: '4px', 
                    background: '#ff5252', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>专业:</label>
                <input 
                  type="text" 
                  value={edu.school || ''} 
                  onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="如：北京大学"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>学校名称:</label>
                <input 
                  type="text" 
                  value={edu.degree || ''} 
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="如：计算机科学与技术"
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>学位:</label>
                <input 
                  type="text" 
                  value={edu.degreeType || ''} 
                  onChange={(e) => handleEducationChange(index, 'degreeType', e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  placeholder="如：学士/硕士/博士"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>日期:</label>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input 
                    type="text" 
                    value={edu.startDate || ''} 
                    onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                    style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    placeholder="开始"
                  />
                  <input 
                    type="text" 
                    value={edu.endDate || ''} 
                    onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                    style={{ width: '50%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    placeholder="结束"
                  />
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>GPA/成绩:</label>
              <input 
                type="text" 
                value={edu.gpa || ''} 
                onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="如：GPA 3.8/4.0 或 平均成绩 90/100"
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>描述:</label>
              <textarea 
                value={edu.description || ''} 
                onChange={(e) => handleEducationChange(index, 'description', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px', resize: 'vertical' }}
                placeholder="描述您在学校的主要成就、课程、项目等..."
              />
            </div>
          </div>
        ))}
        <button 
          onClick={() => {
            const newEducation = [...(component.content.education || []), { 
              school: '', 
              degree: '', 
              degreeType: '',
              startDate: '', 
              endDate: '', 
              gpa: '',
              description: ''
            }];
            handleContentChange('education', newEducation);
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
          添加教育经历
        </button>
      </div>
    </>
  );
};

export default EducationEditor;