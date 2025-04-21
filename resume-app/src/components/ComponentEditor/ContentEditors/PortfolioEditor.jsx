import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react';

const PortfolioEditor = ({ component, handleContentChange }) => {
  const handlePortfolioItemChange = (index, field, value) => {
    const newPortfolioItems = [...(component.content.portfolioItems || [])];
    newPortfolioItems[index] = {
      ...newPortfolioItems[index],
      [field]: value
    };
    handleContentChange('portfolioItems', newPortfolioItems);
  };

  const addPortfolioItem = () => {
    const newPortfolioItems = [...(component.content.portfolioItems || [])];
    newPortfolioItems.push({
      id: Date.now(),
      title: '项目名称',
      description: '项目描述',
      link: 'https://example.com',
      image: ''
    });
    handleContentChange('portfolioItems', newPortfolioItems);
  };

  const removePortfolioItem = (index) => {
    const newPortfolioItems = [...(component.content.portfolioItems || [])];
    newPortfolioItems.splice(index, 1);
    handleContentChange('portfolioItems', newPortfolioItems);
  };

  const movePortfolioItem = (index, direction) => {
    if (
      (direction === -1 && index === 0) || 
      (direction === 1 && index === (component.content.portfolioItems || []).length - 1)
    ) {
      return;
    }
    
    const newPortfolioItems = [...(component.content.portfolioItems || [])];
    const temp = newPortfolioItems[index];
    newPortfolioItems[index] = newPortfolioItems[index + direction];
    newPortfolioItems[index + direction] = temp;
    
    handleContentChange('portfolioItems', newPortfolioItems);
  };

  // 在 handleImageUpload 函数后添加
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      handlePortfolioItemChange(index, 'image', event.target.result);
    };
    reader.readAsDataURL(file);
    
    // 设置默认缩放值为1
    handlePortfolioItemChange(index, 'imageScale', 1);
  };

  return (
    <div>
      <h3 style={{ marginTop: 0, marginBottom: '15px' }}>个人成果展示</h3>
      
      {/* 添加标题编辑输入框 */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>卡片标题:</label>
        <input 
          type="text" 
          value={component.content.title || '个人成果展示'} 
          onChange={(e) => handleContentChange('title', e.target.value)}
          style={{ 
            width: '100%', 
            padding: '8px', 
            border: '1px solid #ccc', 
            borderRadius: '4px' 
          }}
        />
      </div>
      
      {(component.content.portfolioItems || []).map((item, index) => (
        <div key={item.id} style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          border: '1px solid #eee',
          borderRadius: '4px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h4 style={{ margin: 0 }}>项目 {index + 1}</h4>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button 
                onClick={() => movePortfolioItem(index, -1)}
                disabled={index === 0}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: index === 0 ? 'default' : 'pointer',
                  opacity: index === 0 ? 0.5 : 1
                }}
              >
                <ChevronUp size={16} />
              </button>
              <button 
                onClick={() => movePortfolioItem(index, 1)}
                disabled={index === (component.content.portfolioItems || []).length - 1}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: index === (component.content.portfolioItems || []).length - 1 ? 'default' : 'pointer',
                  opacity: index === (component.content.portfolioItems || []).length - 1 ? 0.5 : 1
                }}
              >
                <ChevronDown size={16} />
              </button>
              <button 
                onClick={() => removePortfolioItem(index)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <Trash2 size={16} color="#ff5252" />
              </button>
            </div>
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>标题:</label>
            <input 
              type="text" 
              value={item.title} 
              onChange={(e) => handlePortfolioItemChange(index, 'title', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>描述:</label>
            <textarea 
              value={item.description} 
              onChange={(e) => handlePortfolioItemChange(index, 'description', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px',
                minHeight: '80px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>链接:</label>
            <input 
              type="url" 
              value={item.link} 
              onChange={(e) => handlePortfolioItemChange(index, 'link', e.target.value)}
              style={{ 
                width: '100%', 
                padding: '8px', 
                border: '1px solid #ccc', 
                borderRadius: '4px' 
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>图片:</label>
            {item.image && (
              <div style={{ marginBottom: '10px' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: '150px', 
                    display: 'block',
                    marginBottom: '10px'
                  }} 
                />
                <button 
                  onClick={() => handlePortfolioItemChange(index, 'image', '')}
                  style={{ 
                    padding: '5px 10px', 
                    background: '#ff5252', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}
                >
                  删除图片
                </button>
              </div>
            )}
            {!item.image && (
              <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleImageUpload(index, e)}
                style={{ 
                  width: '100%', 
                  padding: '8px', 
                  border: '1px solid #ccc', 
                  borderRadius: '4px' 
                }}
              />
            )}
            
            {/* 图片缩放和位置控制 */}
            {item.image && (
              <div style={{ marginTop: '10px', marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>图片缩放:</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.1" 
                  value={item.imageScale || 1} 
                  onChange={(e) => handlePortfolioItemChange(index, 'imageScale', parseFloat(e.target.value))}
                  style={{ width: '100%', marginBottom: '5px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>50%</span>
                  <span>{Math.round((item.imageScale || 1) * 100)}%</span>
                  <span>200%</span>
                </div>
                
                {/* 添加图片位置调整控制 */}
                <div style={{ marginTop: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>图片位置调整:</label>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                    <button 
                      onClick={() => handlePortfolioItemChange(index, 'imageOffsetY', (item.imageOffsetY || 0) - 5)}
                      style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                    >
                      上移
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                    <button 
                      onClick={() => handlePortfolioItemChange(index, 'imageOffsetX', (item.imageOffsetX || 0) - 5)}
                      style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                    >
                      左移
                    </button>
                    <button 
                      onClick={() => handlePortfolioItemChange(index, 'imageOffsetX', (item.imageOffsetX || 0) + 5)}
                      style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                    >
                      右移
                    </button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button 
                      onClick={() => handlePortfolioItemChange(index, 'imageOffsetY', (item.imageOffsetY || 0) + 5)}
                      style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                    >
                      下移
                    </button>
                  </div>
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                  <button 
                    onClick={() => {
                      handlePortfolioItemChange(index, 'imageScale', 1);
                      handlePortfolioItemChange(index, 'imageOffsetX', 0);
                      handlePortfolioItemChange(index, 'imageOffsetY', 0);
                    }}
                    style={{ 
                      padding: '4px 8px', 
                      backgroundColor: '#607D8B', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    重置位置和缩放
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* 项目框样式设置部分已移除 */}
        </div>
      ))}
      
      <button 
        onClick={addPortfolioItem}
        style={{ 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        <Plus size={16} style={{ marginRight: '5px' }} />
        添加项目
      </button>
    </div>
  );
};

export default PortfolioEditor;