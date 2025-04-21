import React from 'react';
import { Mail, Phone, Star, Award, Github, Linkedin, Link2, MessageSquare, Briefcase } from 'lucide-react';
import { SiWechat, SiTencentqq } from 'react-icons/si';
// 导入图片组件
import Image from './ResumeComponents/Image';

// Helper function to get icon based on type
const getContactIcon = (type) => {
  switch (type.toLowerCase()) {
    case 'email':
      return <Mail size={16} color="black" style={{ marginRight: '10px', flexShrink: 0 }} />;
    case 'phone':
      return <Phone size={16} color="black" style={{ marginRight: '10px', flexShrink: 0 }} />;
    case 'github':
      return <Github size={16} color="black" style={{ marginRight: '10px', flexShrink: 0 }} />;
    case 'linkedin':
      return <Linkedin size={16} color="black" style={{ marginRight: '10px', flexShrink: 0 }} />;
    case 'website':
      return <Link2 size={16} color="black" style={{ marginRight: '10px', flexShrink: 0 }} />;
    case 'wechat': 
      return <SiWechat size={16} color="green" style={{ marginRight: '10px', flexShrink: 0 }} />;
    case 'qq':
      return <SiTencentqq size={16} color="#12B7F5" style={{ marginRight: '10px', flexShrink: 0 }} />;
    default: // Custom or other types
      return <span style={{ fontSize: '12px', marginRight: '10px', minWidth:'40px', textAlign:'right' }}>{type}:</span>;
  }
};

// Render stars function
const renderStars = (rating) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Star 
        key={i} 
        size={16} 
        fill={i <= rating ? '#FFC107' : 'none'} 
        stroke={i <= rating ? '#FFC107' : '#E0E0E0'} 
        style={{ marginRight: '2px' }} 
      />
    );
  }
  return stars;
};

// Render component function
const renderComponent = (component, themeColor) => {
  if (!component) return null;

  const componentStyle = {
    position: 'absolute',
    top: `${component.style.y || 0}px`,
    left: `${component.style.x || 0}px`,
    width: component.style.width ? `${component.style.width}px` : 'auto',
    height: component.style.height === 'auto' ? 'auto' : (component.style.height ? `${component.style.height}px` : 'auto'),
    padding: `${component.style.paddingTop || 15}px ${component.style.paddingRight || 15}px ${component.style.paddingBottom || 15}px ${component.style.paddingLeft || 15}px`,
    backgroundColor: component.style.backgroundColor || '#FFFFFF',
    borderRadius: `${component.style.borderRadius || 8}px`,
    boxShadow: component.style.shadow ? '0 4px 6px rgba(0,0,0,0.1)' : 'none',
    border: component.style.borderWidth ? `${component.style.borderWidth}px solid ${component.style.borderColor || '#e0e0e0'}` : 'none',
    zIndex: component.style.zIndex || 10,
    overflow: 'hidden',
    boxSizing: 'border-box',
    transform: 'none'
  };

  switch (component.type) {
    case 'personalInfo':
      return (
        <div style={componentStyle}>
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            {component.content.avatar && (
              <div style={{ 
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                overflow: 'hidden',
                position: 'relative',
                margin: '0 auto 10px auto',
                border: `3px solid ${themeColor}`,
                backgroundColor: '#f5f5f5'
              }}>
                <img 
                  src={component.content.avatar} 
                  alt="头像" 
                  style={{ 
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) translate(${component.content.avatarOffsetX || 0}px, ${component.content.avatarOffsetY || 0}px) scale(${component.content.avatarScale || 1})`,
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block'
                  }} 
                />
              </div>
            )}
            <h1 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '24px' }}>
              {component.content.name || '姓名'}
            </h1>
            <p style={{ margin: '0', color: '#666', fontSize: '16px' }}>
              {component.content.title || '职位'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', margin: '10px 0', fontSize: '14px', color: '#666' }}>
              <span>{component.content.age || ''} 岁</span>
              <span>{component.content.politicalStatus || ''}</span>
            </div>
          </div>
          
          {component.content.contact && component.content.contact.length > 0 && (
            <div>
              {component.content.contact.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  {getContactIcon(item.type)}
                  <span style={{ fontSize: '14px' }}>{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      );
      
    case 'skills':
      return (
        <div style={componentStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: themeColor, fontSize: '18px', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>
            技能专长
          </h2>
          {component.content.skills && component.content.skills.map((skill, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{skill.name}</span>
                <div style={{ display: 'flex' }}>
                  {renderStars(skill.rating)}
                </div>
              </div>
              {component.style && component.style.showProgressBar && (
                <div style={{ 
                  height: '5px',
                  backgroundColor: '#f0f0f0', 
                  borderRadius: '2px', 
                  overflow: 'hidden',
                  marginTop: '3px'
                }}>
                  <div style={{ 
                    height: '100%',
                    width: `${(skill.rating / 5) * 100}%`, 
                    backgroundColor: themeColor,
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      );
      
    case 'summary':
      return (
        <div style={componentStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: themeColor, fontSize: '18px', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>
            个人简介
          </h2>
          <p style={{ margin: '0', fontSize: '14px', lineHeight: '1.6', color: '#333' }}>
            {component.content.text || '这里是您的个人简介...'}
          </p>
        </div>
      );
      
    case 'education':
      return (
        <div style={componentStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: themeColor, fontSize: '18px', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>
            教育背景
          </h2>
          {component.content.education && component.content.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: index === component.content.education.length - 1 ? '0' : '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>
                  {edu.degreeType ? `${edu.degreeType} · ${edu.degree}` : edu.degree}
                </h3>
                <span style={{ fontSize: '14px', color: '#666' }}>
                  {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : (edu.dates || '')}
                </span>
              </div>
              <p style={{ margin: '0', fontSize: '15px', color: '#333', fontWeight: '500' }}>{edu.school}</p>
              {edu.description && (
                <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#666' }}>{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      );
      
    case 'experience':
      return (
        <div style={componentStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: themeColor, fontSize: '18px', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>
            工作经验
          </h2>
          {component.content.experience && component.content.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <h3 style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>{exp.position}</h3>
                <span style={{ fontSize: '14px', color: '#666' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', fontWeight: 'bold', color: '#333' }}>{exp.company}</p>
              <p style={{ margin: '0 0 5px 0', fontSize: '14px', color: '#333' }}>{exp.location}</p>
              <p style={{ margin: '0', fontSize: '14px', color: '#666', whiteSpace: 'pre-line', textAlign: 'left', paddingLeft: '8px' }}>{exp.description}</p>
            </div>
          ))}
        </div>
      );
      
    case 'achievements':
      return (
        <div style={componentStyle}>
          <h2 style={{ margin: '0 0 15px 0', color: themeColor, fontSize: '18px', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>
            成就与奖项
          </h2>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            {component.content.achievements && component.content.achievements.map((achievement, index) => (
              <li key={index} style={{ marginBottom: '8px', fontSize: '14px', color: '#333' }}>
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      );
      
    case 'hobbies':
        return (
          <div style={componentStyle}>
            <h3 style={{ marginTop: 0, marginBottom: '10px', color: themeColor }}>个人爱好</h3>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {(component.content.hobbies || []).map((hobby, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{hobby}</li>
              ))}
            </ul>
          </div>
        );
        
      case 'portfolio':
        return (
          <div style={componentStyle}>
            <h2 style={{ margin: '0 0 15px 0', color: themeColor, fontSize: '18px', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>
              {component.content.title || '个人成果展示'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(component.content.portfolioItems || []).map((item) => (
                <div key={item.id} style={{ 
                  padding: item.itemPadding || '15px', 
                  border: `${item.borderWidth || 1}px solid ${item.borderColor || '#eee'}`, 
                  borderRadius: `${item.borderRadius || 4}px`,
                  backgroundColor: item.backgroundColor || '#f9f9f9',
                  boxShadow: item.boxShadow ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  width: item.width || 'auto',
                  minHeight: item.minHeight || 'auto'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: item.titleColor || '#333' }}>{item.title}</h3>
                  
                  {item.image && (
                    <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '200px', 
                          borderRadius: `${item.imageBorderRadius || 4}px`,
                          boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                          transform: `translate(${item.imageOffsetX || 0}px, ${item.imageOffsetY || 0}px) scale(${item.imageScale || 1})`,
                          transformOrigin: 'center center',
                          transition: 'transform 0.3s ease'
                        }} 
                      />
                    </div>
                  )}
                  
                  <p style={{ 
                    margin: '0 0 10px 0', 
                    fontSize: '14px', 
                    color: item.descriptionColor || '#666' 
                  }}>
                    {item.description}
                  </p>
                  
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: item.linkColor || themeColor, 
                        textDecoration: 'none',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        display: 'inline-block'
                      }}
                    >
                      查看项目 →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      // 添加图片组件渲染
      case 'image':
        return (
          <div style={componentStyle}>
            {component.content.title && (
              <h2 style={{ margin: '0 0 15px 0', color: themeColor, fontSize: '18px', borderBottom: `2px solid ${themeColor}`, paddingBottom: '5px' }}>
                {component.content.title}
              </h2>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {(component.content.images || []).map((image, index) => (
                <div 
                  key={index} 
                  style={{ 
                    width: image.width || '100%',
                    textAlign: image.align || 'center',
                    margin: '0 auto 20px auto'
                  }}
                >
                  {image.src && (
                    <div 
                      style={{
                        border: image.borderStyle !== 'none' ? `${image.borderWidth || 1}px ${image.borderStyle || 'solid'} ${image.borderColor || '#000'}` : 'none',
                        borderRadius: `${image.borderRadius || 0}px`,
                        boxShadow: image.shadow ? '0 4px 8px rgba(0,0,0,0.2)' : 'none',
                        overflow: 'hidden',
                        display: 'inline-block',
                        maxWidth: '100%'
                      }}
                    >
                      <img 
                        src={image.src} 
                        alt={image.title || '图片'} 
                        style={{ 
                          display: 'block',
                          maxWidth: '100%',
                          transform: `scale(${image.scale || 1}) translate(${image.offsetX || 0}px, ${image.offsetY || 0}px)`,
                          transformOrigin: 'center center'
                        }} 
                      />
                    </div>
                  )}
                  
                  {image.title && (
                    <h3 style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                      {image.title}
                    </h3>
                  )}
                  
                  {image.description && (
                    <p style={{ margin: '5px 0', fontSize: '14px' }}>
                      {image.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div style={componentStyle}>
            {/* 空白组件不显示任何内容 */}
          </div>
        );
  }
};

// A4Resume component wrapped with React.forwardRef
const A4Resume = ({ settings, components = [] }) => {
  const getPageDimensions = () => {
    // 使用传入的页面尺寸，并确保有值
    const width = settings.width || 210;
    const height = settings.height || 297;
    console.log('Resume页面尺寸:', { width, height, settings });
    return {
      width: `${width}mm`,
      height: `${height}mm`
    };
  };

  const pageDimensions = getPageDimensions();
  const themeColor = settings?.themeColor || '#2196F3';
  const backgroundColor = settings?.backgroundColor || '#FFFFFF';
  const margins = settings?.margins || { top: 0, right: 0, bottom: 0, left: 0 };

  // 计算内容区域的样式
  const containerStyle = {
    position: 'relative',
    width: pageDimensions.width,
    height: pageDimensions.height,
    backgroundColor: backgroundColor,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    margin: '0',
    padding: `${margins.top}mm ${margins.right}mm ${margins.bottom}mm ${margins.left}mm`,
    boxSizing: 'border-box',
    overflow: 'hidden',
    pageBreakAfter: 'always',
    pageBreakInside: 'avoid',
    display: 'block',
    transformOrigin: 'top left'
  };

  // 内部容器样式
  const innerContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'inherit'
  };

  return (
    <div className="resume-a4" style={containerStyle}>
      <div style={innerContainerStyle}>
        {components.map((component) => (
          <React.Fragment key={component.id}>
            {renderComponent(component, themeColor)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default A4Resume;