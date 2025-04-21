import React, { useState } from 'react';
import { Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Download, Save, Upload } from 'lucide-react';
import html2pdf from 'html2pdf.js';

// 定义控制按钮样式
const controlButtonStyle = {
  padding: '4px', 
  margin: '1px', 
  lineHeight: 0, 
  border: '1px solid #ccc', 
  background: '#f8f8f8',
  borderRadius: '3px',
  cursor: 'pointer'
};

// Update props to include new contact handlers and avatar handler
// 在组件参数中添加一个ref参数，用于获取简历DOM元素
const EditorPanel = ({ 
  resumeData, 
  handleInputChange, 
  handleContactChange, 
  handleAddContact, 
  handleDeleteContact,
  handleAvatarChange,
  handleAvatarMove,
  handleAvatarZoom,
  handleSkillChange,
  handleAddSkill,
  handleDeleteSkill,
  handleAchievementChange,
  handleAddAchievement,
  handleDeleteAchievement,
  handleEducationChange,
  handleAddEducation,
  handleDeleteEducation,
  handleWorkExperienceChange,
  handleAddWorkExperience,
  handleDeleteWorkExperience,
  resumeRef, // 添加这个参数，用于引用简历DOM元素
  exportResumeData, // 添加导出数据函数参数
  importResumeData  // 添加导入数据函数参数
}) => {
  // State to manage collapsed sections
  const [collapsedSections, setCollapsedSections] = useState({
    personalInfo: true, // Initially collapsed
    skills: true, // Add skills section state
    achievements: true, // Add achievements section state
    summary: true, // Add summary section state
    education: true, // Add education section state, collapsed by default
    workExperience: true // Add work experience state, collapsed
  });

  // Function to toggle section collapse state
  const toggleSection = (sectionName) => {
    setCollapsedSections(prevState => ({
      ...prevState,
      [sectionName]: !prevState[sectionName]
    }));
  };

  // Contact type options - 删除这里的重复定义
  const contactTypes = ['Email', 'Phone', 'WeChat', 'QQ', 'Website', 'GitHub', 'LinkedIn', 'Custom'];

  // 添加导出PDF的函数
  const exportToPDF = () => {
    if (!resumeRef.current) {
      alert('无法找到简历元素');
      return;
    }

    const element = resumeRef.current;
    const filename = `${resumeData.name || '我的简历'}_${new Date().toLocaleDateString()}.pdf`;
    
    // 配置html2pdf选项
    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 执行导出
    html2pdf().set(opt).from(element).save();
  };

  // 删除这里的重复定义
  // Contact type options
  // const contactTypes = ['Email', 'Phone', 'WeChat', 'QQ', 'Website', 'GitHub', 'LinkedIn', 'Custom'];

  return (
    <div style={{ padding: '20px', borderRight: '1px solid #ccc', height: '100vh', overflowY: 'auto' }}>
      {/* 导出按钮组 */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <button 
          onClick={exportToPDF}
          style={{ 
            flex: 1,
            padding: '10px 15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
          }}
        >
          <Download size={16} />
          导出PDF
        </button>
        
        <button 
          onClick={exportResumeData}
          style={{ 
            flex: 1,
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
          }}
        >
          <Save size={16} />
          导出数据
        </button>
        
        <label 
          style={{ 
            flex: 1,
            padding: '10px 15px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px'
          }}
        >
          <Upload size={16} />
          导入数据
          <input 
            type="file" 
            accept=".json" 
            onChange={importResumeData} 
            style={{ display: 'none' }} 
          />
        </label>
      </div>
      
      {/* 组件列表 */}
      <h2 style={{ marginBottom: '20px' }}>编辑简历内容</h2>
      
      {/* Personal Info Section (includes contacts now) */}
      <div style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <h3 
          onClick={() => toggleSection('personalInfo')} 
          style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }} 
        >
          个人与联系信息
          <span>{collapsedSections.personalInfo ? '▶' : '▼'}</span>
        </h3>
        
        {!collapsedSections.personalInfo && (
          <div> 
            {/* Avatar Edit Section */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="avatar-upload" style={{ display: 'block', marginBottom: '5px' }}>头像:</label>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                {resumeData.avatar && (
                  <img 
                    src={resumeData.avatar} 
                    alt="Avatar Preview" 
                    style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px', objectFit: 'cover' }}
                  />
                )}
                <input 
                  type="file" 
                  id="avatar-upload"
                  accept="image/*" // Accept only image files
                  onChange={handleAvatarChange}
                  style={{ display: 'block' }} 
                />
              </div>
              {/* Avatar Controls (only show if avatar exists) */}
              {resumeData.avatar && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap'}}>
                  {/* Pan Buttons */}
                  <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center' }}>
                    <button onClick={() => handleAvatarMove('up')} title="向上移动" style={controlButtonStyle}><ArrowUp size={16} /></button>
                    <div style={{ display: 'flex'}}>
                      <button onClick={() => handleAvatarMove('left')} title="向左移动" style={controlButtonStyle}><ArrowLeft size={16} /></button>
                      <button onClick={() => handleAvatarMove('down')} title="向下移动" style={controlButtonStyle}><ArrowDown size={16} /></button>
                      <button onClick={() => handleAvatarMove('right')} title="向右移动" style={controlButtonStyle}><ArrowRight size={16} /></button>
                    </div>
                  </div>
                  {/* Zoom Slider */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="avatar-zoom" style={{ marginRight: '5px', fontSize: '14px' }}>缩放:</label>
                    <input 
                      type="range" 
                      id="avatar-zoom"
                      min="0.5" // Min scale 50%
                      max="3"   // Max scale 300%
                      step="0.1" 
                      value={resumeData.avatarScale} 
                      onChange={handleAvatarZoom} 
                      style={{ cursor: 'pointer' }} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Name Input */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '5px' }}>姓名:</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={resumeData.name} 
                onChange={handleInputChange}
                style={{ width: '90%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
            </div>
            {/* Title Input */}
            <div style={{ marginBottom: '15px' }}>
              <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>职位:</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={resumeData.title} 
                onChange={handleInputChange}
                style={{ width: '90%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
              />
            </div>

            {/* Dynamic Contact Inputs */}
            <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>联系方式:</h4>
            {resumeData.contact.map((contactItem) => (
              <div key={contactItem.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <select 
                  value={contactItem.type} 
                  onChange={(e) => handleContactChange(contactItem.id, 'type', e.target.value)}
                  style={{ marginRight: '5px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                >
                  {contactTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <input 
                  type={contactItem.type === 'Email' ? 'email' : contactItem.type === 'Phone' ? 'tel' : 'text'}
                  placeholder="内容" 
                  value={contactItem.value} 
                  onChange={(e) => handleContactChange(contactItem.id, 'value', e.target.value)}
                  style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '5px' }} 
                />
                <button 
                  onClick={() => handleDeleteContact(contactItem.id)}
                  style={{ padding: '5px', background: 'none', border: 'none', cursor: 'pointer' }} 
                  title="删除此联系方式"
                >
                  <Trash2 size={16} color="#dc2626" />
                </button>
              </div>
            ))}
            <button 
              onClick={handleAddContact}
              style={{ marginTop: '10px', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              + 添加联系方式
            </button>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <h3 
          onClick={() => toggleSection('skills')} 
          style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }} 
        >
          技能专长
          <span>{collapsedSections.skills ? '▶' : '▼'}</span>
        </h3>
        {!collapsedSections.skills && (
          <div>
            {resumeData.skills.map((skill, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '5px' }}>
                <input 
                  type="text"
                  placeholder="技能名称" 
                  value={skill.name} 
                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                  style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                />
                <input 
                  type="number"
                  min="0"
                  max="5"
                  placeholder="评分" 
                  value={skill.rating} 
                  onChange={(e) => handleSkillChange(index, 'rating', e.target.value)}
                  style={{ width: '60px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                />
                <button 
                  onClick={() => handleDeleteSkill(index)}
                  style={{ padding: '5px', background: 'none', border: 'none', cursor: 'pointer' }} 
                  title="删除此技能"
                >
                  <Trash2 size={16} color="#dc2626" />
                </button>
              </div>
            ))}
            <button 
              onClick={handleAddSkill}
              style={{ marginTop: '10px', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              + 添加技能
            </button>
          </div>
        )}
      </div>

      {/* Achievements Section */}
      <div style={{ 
        marginBottom: '15px', 
        borderBottom: '1px solid #eee',
        paddingBottom: '15px'
      }}>
        <h3 
          onClick={() => toggleSection('achievements')} 
          style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }} 
        >
          成就与奖项
          <span>{collapsedSections.achievements ? '▶' : '▼'}</span>
        </h3>
        {!collapsedSections.achievements && (
          <div>
            {resumeData.achievements.map((achievement, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '5px' }}>
                <textarea 
                  placeholder="成就描述"
                  value={achievement} 
                  onChange={(e) => handleAchievementChange(index, e.target.value)}
                  style={{ flexGrow: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '50px' }} 
                  rows={2} 
                />
                <button 
                  onClick={() => handleDeleteAchievement(index)}
                  style={{ padding: '5px', background: 'none', border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }} 
                  title="删除此成就"
                >
                  <Trash2 size={16} color="#dc2626" />
                </button>
              </div>
            ))}
            <button 
              onClick={handleAddAchievement}
              style={{ marginTop: '10px', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              + 添加成就
            </button>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div style={{
        marginBottom: '15px',
        borderBottom: '1px solid #eee',
        paddingBottom: '15px'
      }}>
        <h3 
          onClick={() => toggleSection('summary')} 
          style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }} 
        >
          个人简介
          <span>{collapsedSections.summary ? '▶' : '▼'}</span>
        </h3>
        {!collapsedSections.summary && (
          <div>
            <textarea 
              name="summary" 
              value={resumeData.summary} 
              onChange={handleInputChange} 
              style={{ width: '95%', minHeight: '120px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
              rows={5} 
              placeholder="输入你的个人简介..."
            />
          </div>
        )}
      </div>
      
      {/* Education Section */}
      <div style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <h3 
          onClick={() => toggleSection('education')} 
          style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }} 
        >
          教育背景
          <span>{collapsedSections.education ? '▶' : '▼'}</span>
        </h3>
        {!collapsedSections.education && (
          <div>
            {resumeData.education.map((edu, index) => (
              <div key={index} style={{ border: '1px solid #eee', borderRadius:'4px', padding:'10px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>学校:</label>
                    <input 
                      type="text"
                      value={edu.school} 
                      onChange={(e) => handleEducationChange(index, 'school', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>学位/专业:</label>
                    <input 
                      type="text"
                      value={edu.degree} 
                      onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>日期:</label>
                  <input 
                    type="text"
                    placeholder="例如：2018年9月 - 2022年6月"
                    value={edu.dates} 
                    onChange={(e) => handleEducationChange(index, 'dates', e.target.value)}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                  />
                </div>
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button 
                    onClick={() => handleDeleteEducation(index)}
                    style={{ padding: '4px 8px', background: '#fbe9e7', color:'#d32f2f', border: '1px solid #ffcdd2', borderRadius: '4px', cursor: 'pointer', fontSize:'12px' }} 
                    title="删除此教育经历"
                  >
                    删除此教育经历
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={handleAddEducation}
              style={{ marginTop: '10px', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              + 添加教育经历
            </button>
          </div>
        )}
      </div>

      {/* Work Experience Section */}
      <div style={{ marginBottom: '15px' }}>
        <h3 
          onClick={() => toggleSection('workExperience')} 
          style={{ cursor: 'pointer', marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }} 
        >
          工作经历
          <span>{collapsedSections.workExperience ? '▶' : '▼'}</span>
        </h3>
        {!collapsedSections.workExperience && (
          <div>
            {resumeData.workExperience.map((exp, index) => (
              <div key={index} style={{ border: '1px solid #eee', borderRadius:'4px', padding:'10px', marginBottom: '15px' }}>
                {/* Row 1: Company and Position */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>公司名称:</label>
                    <input 
                      type="text"
                      value={exp.company} 
                      onChange={(e) => handleWorkExperienceChange(index, 'company', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>职位:</label>
                    <input 
                      type="text"
                      value={exp.position} 
                      onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                  </div>
                </div>
                {/* Row 2: Dates */}
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>开始日期:</label>
                    <input 
                      type="text"
                      placeholder="例如：2021年6月"
                      value={exp.startDate} 
                      onChange={(e) => handleWorkExperienceChange(index, 'startDate', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>结束日期:</label>
                    <input 
                      type="text"
                      placeholder="例如：至今 或 2023年5月"
                      value={exp.endDate} 
                      onChange={(e) => handleWorkExperienceChange(index, 'endDate', e.target.value)}
                      style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    />
                  </div>
                </div>
                {/* Row 3: Description */}
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize:'14px' }}>工作内容/职责:</label>
                  <textarea 
                    value={exp.description} 
                    onChange={(e) => handleWorkExperienceChange(index, 'description', e.target.value)}
                    style={{ width: '100%', minHeight: '80px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} 
                    rows={3} 
                    placeholder="输入工作内容，可以使用换行..."
                  />
                </div>
                {/* Delete Button for this experience */}
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                  <button 
                    onClick={() => handleDeleteWorkExperience(index)}
                    style={{ padding: '4px 8px', background: '#fbe9e7', color:'#d32f2f', border: '1px solid #ffcdd2', borderRadius: '4px', cursor: 'pointer', fontSize:'12px' }} 
                    title="删除此工作经历"
                  >
                    删除此经历
                  </button>
                </div>
              </div>
            ))}
            <button 
              onClick={handleAddWorkExperience}
              style={{ marginTop: '10px', padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
            >
              + 添加工作经历
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPanel;