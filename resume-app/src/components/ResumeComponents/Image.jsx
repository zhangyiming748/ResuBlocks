import React from 'react';
import './Image.css';

const Image = ({ content, style }) => {
  return (
    <div style={{ ...style, padding: '15px' }}>
      {content.title && (
        <h2 style={{ 
          marginTop: 0, 
          marginBottom: '15px', 
          fontSize: '18px', 
          fontWeight: 'bold',
          borderBottom: '2px solid #2196F3',
          paddingBottom: '5px'
        }}>
          {content.title}
        </h2>
      )}
      
      <div className="image-gallery">
        {(content.images || []).map((image, index) => (
          <div 
            key={index} 
            className="image-item"
            style={{ 
              width: image.width || '100%',
              textAlign: image.align || 'center',
              margin: '0 auto 20px auto'
            }}
          >
            {image.src && (
              <div 
                className="image-container"
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
              <h3 className="image-title" style={{ marginTop: '10px', fontSize: '16px', fontWeight: 'bold' }}>
                {image.title}
              </h3>
            )}
            
            {image.description && (
              <p className="image-description" style={{ margin: '5px 0', fontSize: '14px' }}>
                {image.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;