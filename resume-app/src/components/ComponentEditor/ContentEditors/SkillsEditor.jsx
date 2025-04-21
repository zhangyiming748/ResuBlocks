import React from 'react';
import { Star, Plus, Trash2 } from 'lucide-react';

const SkillsEditor = ({ component, handleContentChange }) => {
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>技能列表:</label>
        {(component.content.skills || []).map((skill, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
            <input 
              type="text" 
              value={skill.name} 
              onChange={(e) => {
                const newSkills = [...component.content.skills];
                newSkills[index] = { ...skill, name: e.target.value };
                handleContentChange('skills', newSkills);
              }}
              style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="技能名称"
            />
            <select 
              value={skill.rating} 
              onChange={(e) => {
                const newSkills = [...component.content.skills];
                newSkills[index] = { ...skill, rating: parseInt(e.target.value) };
                handleContentChange('skills', newSkills);
              }}
              style={{ width: '80px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              {[0, 1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star}
                  size={16}
                  fill={star <= skill.rating ? '#FFC107' : 'none'}
                  stroke={star <= skill.rating ? '#FFC107' : '#ccc'}
                  style={{ marginRight: '2px' }}
                />
              ))}
            </div>
            {/* 删除按钮 */}
            <button 
              onClick={() => {
                const newSkills = component.content.skills.filter((_, i) => i !== index);
                handleContentChange('skills', newSkills);
              }}
              style={{ 
                padding: '8px', 
                border: 'none', 
                background: '#ff5252', 
                color: 'white', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer' 
              }}
              title="删除此技能" 
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {/* 添加技能按钮 */}
        <button 
          onClick={() => {
            const newSkills = [...(component.content.skills || []), { name: '', rating: 0 }];
            handleContentChange('skills', newSkills);
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
          添加技能
        </button>
      </div>
      
      {/* 删除了进度条控制选项，因为它已经在StyleEditor中实现 */}
      
      <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        提示: 评分为0表示不显示星级，仅显示技能名称。
      </div>
    </>
  );
};

export default SkillsEditor;