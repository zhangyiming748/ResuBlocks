import React from 'react';
import { Link2 } from 'lucide-react';
import './Portfolio.css';

const Portfolio = ({ content, style }) => {
  return (
    <div style={{ ...style, padding: '15px' }}>
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
            {/* 图片容器移到最外层 */}
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
            
            {/* 内容容器 */}
            <div 
              className="portfolio-content"
              style={{ 
                // 保持原有样式
                '--item-padding': `${item.itemPadding || 15}px`, // 使用CSS变量
              }}
            >
              {/* 内容部分保持不变... */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;