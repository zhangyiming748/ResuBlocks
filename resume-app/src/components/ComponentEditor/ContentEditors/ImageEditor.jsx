import React from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Image } from 'lucide-react';
import NumberInput from '../../NumberInput';

const ImageEditor = ({ component, handleContentChange }) => {
  const handleImageChange = (index, field, value) => {
    const newImages = [...(component.content.images || [])];
    newImages[index] = {
      ...newImages[index],
      [field]: value
    };
    handleContentChange('images', newImages);
  };

  const moveImage = (index, direction) => {
    const newImages = [...(component.content.images || [])];
    if (direction === 'up' && index > 0) {
      [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    } else if (direction === 'down' && index < newImages.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    handleContentChange('images', newImages);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      handleImageChange(index, 'src', event.target.result);
    };
    reader.readAsDataURL(file);
    
    // 设置默认缩放值为1
    handleImageChange(index, 'scale', 1);
  };

  return (
    <>
      {/* 添加图片集标题编辑 */}
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          图片集标题:
        </label>
        <input 
          type="text" 
          value={component.content.title || ''} 
          onChange={(e) => handleContentChange('title', e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          placeholder="图片集标题（可选）"
        />
        <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
          此标题将显示在图片集的顶部，留空则不显示标题
        </p>
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>图片集:</label>
        {(component.content.images || []).map((image, index) => (
          <div key={index} style={{ marginBottom: '15px', padding: '10px', border: '1px solid #eee', borderRadius: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image size={18} style={{ marginRight: '5px', color: '#2196F3' }} />
                <h4 style={{ margin: 0 }}>图片 #{index + 1}</h4>
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button 
                  onClick={() => moveImage(index, 'up')}
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
                  onClick={() => moveImage(index, 'down')}
                  disabled={index === (component.content.images || []).length - 1}
                  style={{ 
                    padding: '4px', 
                    background: index === (component.content.images || []).length - 1 ? '#f0f0f0' : '#e0e0e0', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: index === (component.content.images || []).length - 1 ? 'default' : 'pointer',
                    opacity: index === (component.content.images || []).length - 1 ? 0.5 : 1
                  }}
                >
                  <ChevronDown size={16} />
                </button>
                <button 
                  onClick={() => {
                    const newImages = component.content.images.filter((_, i) => i !== index);
                    handleContentChange('images', newImages);
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
                value={image.title || ''} 
                onChange={(e) => handleImageChange(index, 'title', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="图片标题（可选）"
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>描述:</label>
              <textarea 
                value={image.description || ''} 
                onChange={(e) => handleImageChange(index, 'description', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px', resize: 'vertical' }}
                placeholder="图片描述（可选）"
              />
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>图片:</label>
              {image.src ? (
                <div style={{ marginBottom: '10px', textAlign: 'center' }}>
                  <div style={{ 
                    position: 'relative', 
                    margin: '0 auto', 
                    maxWidth: '100%', 
                    overflow: 'hidden', 
                    border: '1px solid #ccc',
                    backgroundColor: '#f5f5f5'
                  }}>
                    <img 
                      src={image.src} 
                      alt={image.title || '图片预览'} 
                      style={{ 
                        display: 'block',
                        maxWidth: '100%',
                        transform: `scale(${image.scale || 1}) translate(${image.offsetX || 0}px, ${image.offsetY || 0}px)`,
                        transformOrigin: 'center center'
                      }} 
                    />
                  </div>
                  
                  {/* 图片控制区域 */}
                  <div style={{ marginTop: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '4px' }}>
                    {/* 图片缩放控制 */}
                    <div style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>图片缩放:</label>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="2" 
                        step="0.1" 
                        value={image.scale || 1} 
                        onChange={(e) => handleImageChange(index, 'scale', parseFloat(e.target.value))}
                        style={{ width: '100%', marginBottom: '5px' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                        <span>50%</span>
                        <span>{Math.round((image.scale || 1) * 100)}%</span>
                        <span>200%</span>
                      </div>
                    </div>
                    
                    {/* 图片位置控制 */}
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>图片位置调整:</label>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                        <button 
                          onClick={() => handleImageChange(index, 'offsetY', (image.offsetY || 0) - 5)}
                          style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                        >
                          上移
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                        <button 
                          onClick={() => handleImageChange(index, 'offsetX', (image.offsetX || 0) - 5)}
                          style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                        >
                          左移
                        </button>
                        <button 
                          onClick={() => handleImageChange(index, 'offsetX', (image.offsetX || 0) + 5)}
                          style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                        >
                          右移
                        </button>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button 
                          onClick={() => handleImageChange(index, 'offsetY', (image.offsetY || 0) + 5)}
                          style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                        >
                          下移
                        </button>
                      </div>
                    </div>
                    
                    {/* 重置按钮 */}
                    <button 
                      onClick={() => {
                        handleImageChange(index, 'offsetX', 0);
                        handleImageChange(index, 'offsetY', 0);
                        handleImageChange(index, 'scale', 1);
                      }}
                      style={{ 
                        padding: '5px 10px', 
                        backgroundColor: '#607D8B', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        width: '100%',
                        marginBottom: '10px'
                      }}
                    >
                      重置图片位置和大小
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleImageChange(index, 'src', '')}
                    style={{ 
                      display: 'block', 
                      margin: '10px auto', 
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
              ) : (
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={(e) => handleImageUpload(index, e)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
              )}
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>宽度设置:</label>
              <select
                value={image.width || '100%'}
                onChange={(e) => handleImageChange(index, 'width', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="25%">25% - 四分之一宽度</option>
                <option value="33%">33% - 三分之一宽度</option>
                <option value="50%">50% - 半宽</option>
                <option value="75%">75% - 四分之三宽度</option>
                <option value="100%">100% - 全宽</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>对齐方式:</label>
              <select
                value={image.align || 'center'}
                onChange={(e) => handleImageChange(index, 'align', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="left">左对齐</option>
                <option value="center">居中对齐</option>
                <option value="right">右对齐</option>
              </select>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>边框样式:</label>
              <select
                value={image.borderStyle || 'none'}
                onChange={(e) => handleImageChange(index, 'borderStyle', e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              >
                <option value="none">无边框</option>
                <option value="solid">实线边框</option>
                <option value="dashed">虚线边框</option>
                <option value="dotted">点状边框</option>
              </select>
            </div>
            
            {image.borderStyle !== 'none' && (
              <>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>边框颜色:</label>
                  <input 
                    type="color" 
                    value={image.borderColor || '#000000'} 
                    onChange={(e) => handleImageChange(index, 'borderColor', e.target.value)}
                    style={{ width: '100%', height: '30px' }}
                  />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>边框宽度 (px):</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="10" 
                    value={image.borderWidth || 1} 
                    onChange={(e) => handleImageChange(index, 'borderWidth', parseInt(e.target.value))}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                  />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', marginBottom: '5px' }}>边框圆角 (px):</label>
                  <NumberInput 
                    value={image.borderRadius || 0} 
                    onChange={(value) => handleImageChange(index, 'borderRadius', value)}
                    min={0} 
                    max={50}
                  />
                </div>
              </>
            )}
            
            <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                id={`shadow-${index}`}
                checked={image.shadow || false} 
                onChange={(e) => handleImageChange(index, 'shadow', e.target.checked)}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor={`shadow-${index}`}>添加阴影效果</label>
            </div>
          </div>
        ))}
        <button 
          onClick={() => {
            const newImages = [...(component.content.images || []), {
              id: Date.now(),
              title: '图片标题',
              description: '图片描述',
              src: '',
              scale: 1,
              offsetX: 0,
              offsetY: 0,
              width: '100%',
              align: 'center',
              borderStyle: 'none',
              borderWidth: 1,
              borderRadius: 0,
              shadow: false
            }];
            handleContentChange('images', newImages);
          }}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            width: '100%',
            padding: '10px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '15px'
          }}
        >
          <Plus size={16} />
          <span>添加图片</span>
        </button>
      </div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
        提示: 您可以添加多张图片，并调整每张图片的大小、位置和样式。图片可以用于展示您的作品、证书或其他视觉内容。
      </div>
    </>
  );
};

export default ImageEditor;