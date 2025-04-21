import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Trash2, Move, Copy } from 'lucide-react';
import StyleEditor from './StyleEditor';
import PersonalInfoEditor from './ContentEditors/PersonalInfoEditor';
import SkillsEditor from './ContentEditors/SkillsEditor';
import SummaryEditor from './ContentEditors/SummaryEditor';
import EducationEditor from './ContentEditors/EducationEditor';
import ExperienceEditor from './ContentEditors/ExperienceEditor';
import AchievementsEditor from './ContentEditors/AchievementsEditor';
import HobbiesEditor from './ContentEditors/HobbiesEditor';
import PortfolioEditor from './ContentEditors/PortfolioEditor';
import PortfolioItemStyleEditor from './ContentEditors/PortfolioItemStyleEditor';
import ImageEditor from './ContentEditors/ImageEditor'; // 添加导入
import ContentEditor from './ContentEditors/index.jsx';

const ComponentEditor = ({ component, updateComponent, deleteComponent, duplicateComponent, isOpen, onToggle }) => {
  const [activeTab, setActiveTab] = useState('content'); // 'content' or 'style'
  
  const handleStyleChange = (property, value) => {
    updateComponent({
      ...component,
      style: {
        ...component.style,
        [property]: value
      }
    });
  };
  
  const handleContentChange = (property, value) => {
    updateComponent({
      ...component,
      content: {
        ...component.content,
        [property]: value
      }
    });
  };

  // 辅助函数：根据组件类型返回显示名称
  const getComponentTypeName = (type) => {
    const typeMap = {
      'personalInfo': '个人信息',
      'skills': '技能专长',
      'summary': '个人简介',
      'achievements': '成就与奖项',
      'education': '教育背景',
      'experience': '工作经验',
      'hobbies': '个人爱好',
      'portfolio': '个人成果展示',
      'image': '图片集',
      'blank': '未知组件'
    };
    return typeMap[type] || '未知组件';
  };

  // 渲染内容编辑区域
  const renderContentEditor = () => {
    switch (component.type) {
      case 'personalInfo':
        return <PersonalInfoEditor component={component} handleContentChange={handleContentChange} />;
      case 'skills':
        return <SkillsEditor component={component} handleContentChange={handleContentChange} />;
      case 'summary':
        return <SummaryEditor component={component} handleContentChange={handleContentChange} />;
      case 'education':
        return <EducationEditor component={component} handleContentChange={handleContentChange} />;
      case 'experience':
        return <ExperienceEditor component={component} handleContentChange={handleContentChange} />;
      case 'achievements':
        return <AchievementsEditor component={component} handleContentChange={handleContentChange} />;
      case 'hobbies':
        return <HobbiesEditor component={component} handleContentChange={handleContentChange} />;
      case 'portfolio':
        return <PortfolioEditor component={component} handleContentChange={handleContentChange} />;
      case 'image': // 添加图片编辑器
        return <ImageEditor component={component} handleContentChange={handleContentChange} />;
      default:
        return <div>未知组件类型</div>;
    }
  };

  // 渲染项目框样式编辑区域
  const renderPortfolioItemStyleEditor = () => {
    return <PortfolioItemStyleEditor component={component} handleContentChange={handleContentChange} />;
  };

  return (
    <div style={{ 
      marginBottom: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '6px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
    }}>
      {/* 组件标题栏 */}
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '12px 15px', 
          backgroundColor: '#f8f8f8', 
          borderBottom: isOpen ? '1px solid #ddd' : 'none',
          cursor: 'pointer'
        }}
        onClick={() => onToggle(component.id)}
      >
        {isOpen ? 
          <ChevronDown size={20} style={{ marginRight: '8px' }} /> : 
          <ChevronRight size={20} style={{ marginRight: '8px' }} />
        }
        <span style={{ flex: 1, fontWeight: 'bold', fontSize: '15px' }}>{getComponentTypeName(component.type)}</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              duplicateComponent(component.id);
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '8px',
              borderRadius: '4px',
              color: '#666'
            }}
            title="复制组件"
          >
            <Copy size={18} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              deleteComponent(component.id);
            }}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              padding: '8px',
              borderRadius: '4px',
              color: '#ff5252'
            }}
            title="删除组件"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      
      {/* 展开的内容 */}
      {isOpen && (
        <div style={{ padding: '12px' }}>
          {/* 标签切换 */}
          <div style={{ 
            display: 'flex', 
            marginBottom: '12px', 
            borderBottom: '1px solid #eee',
            position: 'relative'
          }}>
            <div 
              onClick={() => setActiveTab('content')}
              style={{ 
                padding: '8px 15px', 
                cursor: 'pointer',
                fontWeight: activeTab === 'content' ? 'bold' : 'normal',
                color: activeTab === 'content' ? '#2196F3' : '#666',
                borderBottom: activeTab === 'content' ? '2px solid #2196F3' : 'none',
                position: 'relative',
                bottom: '-1px',
                fontSize: '14px'
              }}
            >
              内容
            </div>
            <div 
              onClick={() => setActiveTab('style')}
              style={{ 
                padding: '8px 15px', 
                cursor: 'pointer',
                fontWeight: activeTab === 'style' ? 'bold' : 'normal',
                color: activeTab === 'style' ? '#2196F3' : '#666',
                borderBottom: activeTab === 'style' ? '2px solid #2196F3' : 'none',
                position: 'relative',
                bottom: '-1px',
                fontSize: '14px'
              }}
            >
              样式
            </div>
          </div>
          
          {/* 激活的标签内容 */}
          {activeTab === 'content' ? (
            <ContentEditor 
              component={component} 
              handleContentChange={handleContentChange} 
            />
          ) : (
            <StyleEditor 
              component={component} 
              handleStyleChange={handleStyleChange} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ComponentEditor;