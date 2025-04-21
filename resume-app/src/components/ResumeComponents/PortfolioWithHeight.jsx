import React, { useEffect, useRef } from 'react';
import { Link2 } from 'lucide-react';
import './Portfolio.css';

const PortfolioWithHeight = ({ content, style }) => {
  const containerRef = useRef(null);
  
  // 使用useEffect在组件挂载后直接操作DOM
  useEffect(() => {
    if (containerRef.current) {
      const portfolioItems = containerRef.current.querySelectorAll('[data-height]');
      portfolioItems.forEach(item => {
        const height = item.dataset.height;
        if (height && height !== 'auto') {
          // 使用requestAnimationFrame确保在浏览器重绘前执行
          requestAnimationFrame(() => {
            // 同时设置父容器高度
            const parent = item.closest('.portfolio-item');
            if (parent) {
              parent.style.height = `calc(${height}px + 120px + 10px)`; // 120px图片高度 + 10px间距
            }
            
            // 使用更可靠的样式设置方式
            item.style.cssText = `
              height: ${height}px !important;
              min-height: ${height}px !important;
              max-height: ${height}px !important;
              overflow: auto !important;
            `;
          });
        }
      });
    }
  }, [content]); // 当content变化时重新应用高度

  return (
    <div style={{ ...style, padding: '15px' }} ref={containerRef}>
      <h2 style={{ 
        marginTop: 0, 
        marginBottom: '15px', 
        fontSize: '18px', 
        fontWeight: 'bold',
        borderBottom: '2px solid #2196F3',
        paddingBottom: '5px'
      }}>
        {content.title || '个人成果展示'}
      </h2>
      
      <div className="portfolio-grid">
        {(content.portfolioItems || []).map((item, index) => (
          <div key={item.id} className="portfolio-item">
            {/* 图片容器 */}
            {item.image && (
              <div className="portfolio-image-container">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="portfolio-image"
                  style={{ 
                    transform: `translate(${item.imageOffsetX || 0}px, ${item.imageOffsetY || 0}px) scale(${item.imageScale || 1})`,
                  }} 
                />
              </div>
            )}
            
            {/* 项目内容 - 使用data-height属性存储高度值 */}
            <div 
              style={{ 
                backgroundColor: item.backgroundColor || '#f9f9f9',
                border: `${item.borderWidth || 1}px solid ${item.borderColor || '#eeeeee'}`,
                borderRadius: `${item.borderRadius || 4}px`,
                padding: item.itemPadding !== undefined ? `${item.itemPadding}px` : '15px',
                boxShadow: item.boxShadow ? '0 2px 5px rgba(0,0,0,0.1)' : 'none',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
                boxSizing: 'border-box'
              }}
              data-height={item.height || 'auto'}
            >
              <h3 
                style={{ 
                  margin: '0 0 8px 0', 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  color: item.titleColor || '#333333'
                }}
              >
                {item.title}
              </h3>
              
              <p 
                style={{ 
                  margin: '0 0 10px 0', 
                  fontSize: '14px',
                  color: item.descriptionColor || '#666666',
                  flex: 1
                }}
              >
                {item.description}
              </p>
              
              {item.link && (
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '14px',
                    color: item.linkColor || '#2196F3',
                    textDecoration: 'none'
                  }}
                >
                  <Link2 size={14} style={{ marginRight: '5px' }} />
                  查看项目
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioWithHeight;