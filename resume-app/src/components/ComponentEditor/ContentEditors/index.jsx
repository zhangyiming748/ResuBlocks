import React from 'react';
import PersonalInfoEditor from './PersonalInfoEditor';
import SkillsEditor from './SkillsEditor';
import SummaryEditor from './SummaryEditor';
import EducationEditor from './EducationEditor';
import ExperienceEditor from './ExperienceEditor';
import AchievementsEditor from './AchievementsEditor';
import HobbiesEditor from './HobbiesEditor';
import PortfolioEditor from './PortfolioEditor';
import PortfolioItemStyleEditor from './PortfolioItemStyleEditor';
import ImageEditor from './ImageEditor';

// 主内容编辑器组件，根据组件类型返回对应的编辑器
const ContentEditor = ({ component, handleContentChange }) => {
  // 根据组件类型选择合适的编辑器
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
      return (
        <div>
          <PortfolioEditor component={component} handleContentChange={handleContentChange} />
          <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <PortfolioItemStyleEditor component={component} handleContentChange={handleContentChange} />
          </div>
        </div>
      );
    
    case 'image':
      return <ImageEditor component={component} handleContentChange={handleContentChange} />;
    
    default:
      return (
        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          <p>未知组件类型: {component.type}</p>
        </div>
      );
  }
};

export default ContentEditor; 