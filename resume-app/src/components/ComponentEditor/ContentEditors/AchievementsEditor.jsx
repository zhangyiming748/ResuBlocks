import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Award } from 'lucide-react';

const AchievementsEditor = ({ component, handleContentChange }) => {
  const handleAchievementChange = (index, field, value) => {
    const newAchievements = [...(component.content.achievements || [])];
    newAchievements[index] = {
      ...newAchievements[index],
      [field]: value
    };
    handleContentChange('achievements', newAchievements);
  };

  const moveAchievement = (index, direction) => {
    const newAchievements = [...(component.content.achievements || [])];
    if (direction === 'up' && index > 0) {
      [newAchievements[index], newAchievements[index - 1]] = [newAchievements[index - 1], newAchievements[index]];
    } else if (direction === 'down' && index < newAchievements.length - 1) {
      [newAchievements[index], newAchievements[index + 1]] = [newAchievements[index + 1], newAchievements[index]];
    }
    handleContentChange('achievements', newAchievements);
  };

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>成就与奖项:</label>
        {(component.content.achievements || []).map((achievement, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Award size={18} style={{ marginRight: '5px', color: '#FFC107' }} />
                <h4 style={{ margin: 0 }}>成就/奖项 #{index + 1}</h4>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => moveAchievement(index, 'up')}
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
                  onClick={() => moveAchievement(index, 'down')}
                  disabled={index === (component.content.achievements || []).length - 1}
                  style={{ 
                    padding: '4px', 
                    background: index === (component.content.achievements || []).length - 1 ? '#f0f0f0' : '#e0e0e0', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: index === (component.content.achievements || []).length - 1 ? 'default' : 'pointer',
                    opacity: index === (component.content.achievements || []).length - 1 ? 0.5 : 1
                  }}
                >
                  <ChevronDown size={16} />
                </button>
                <button 
                  onClick={() => {
                    const newAchievements = component.content.achievements.filter((_, i) => i !== index);
                    handleContentChange('achievements', newAchievements);
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
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>标题:</label>
              <input 
                type="text" 
                value={achievement.title || ''} 
                onChange={(e) => handleAchievementChange(index, 'title', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="如：优秀员工奖 或 项目成就"
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>日期:</label>
              <input 
                type="text" 
                value={achievement.date || ''} 
                onChange={(e) => handleAchievementChange(index, 'date', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="如：2021.06 或 2020-2022"
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>颁发机构:</label>
              <input 
                type="text" 
                value={achievement.issuer || ''} 
                onChange={(e) => handleAchievementChange(index, 'issuer', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="如：公司名称 或 组织机构"
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>描述:</label>
              <textarea 
                value={achievement.description || ''} 
                onChange={(e) => handleAchievementChange(index, 'description', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '80px', resize: 'vertical' }}
                placeholder="描述您获得此成就或奖项的背景和意义..."
              />
            </div>
          </div>
        ))}
        <button 
          onClick={() => {
            const newAchievements = [...(component.content.achievements || []), { 
              title: '', 
              date: '', 
              issuer: '', 
              description: ''
            }];
            handleContentChange('achievements', newAchievements);
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
          添加成就/奖项
        </button>
      </div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        提示: 突出展示您最重要的成就和奖项，尤其是与目标职位相关的内容。
      </div>
    </>
  );
};

export default AchievementsEditor;