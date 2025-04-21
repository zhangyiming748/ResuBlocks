import React from 'react';
import { Layers } from 'lucide-react';
import NumberInput from '../NumberInput';

const StyleEditor = ({ component, handleStyleChange }) => {
  return (
    <>
      {/* 位置和大小 */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '3px', fontWeight: 'bold', fontSize: '12px' }}>位置和大小:</label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>X坐标:</label>
            <NumberInput 
              value={component.style.x || 0} 
              onChange={(value) => handleStyleChange('x', value)}
              min={0}
              width="130px"
              style={{ 
                height: '28px' 
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>Y坐标:</label>
            <NumberInput 
              value={component.style.y || 0} 
              onChange={(value) => handleStyleChange('y', value)}
              min={0}
              width="130px"
              style={{ 
                height: '28px' 
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>宽度:</label>
            <NumberInput 
              value={component.style.width || 250} 
              onChange={(value) => handleStyleChange('width', value)}
              min={50}
              max={1000}
              width="130px"
              style={{ 
                height: '28px' 
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>高度:</label>
            <input
              type="text"
              value={
                component.style.height === 'auto'
                  ? (typeof component.actualHeight === 'number' ? component.actualHeight : 'auto')
                  : (component.style.height ?? '')
              }
              onChange={(e) => {
                if (component.style.height !== 'auto') {
                  const value = e.target.value;
                  if (value === '') {
                     handleStyleChange('height', '');
                  } else {
                    const numValue = parseInt(value);
                    if (!isNaN(numValue) && numValue >= 0) {
                      handleStyleChange('height', numValue);
                    }
                  }
                }
              }}
              onBlur={(e) => {
                 if (component.style.height !== 'auto') {
                    const currentHeight = component.style.height;
                    if (typeof currentHeight !== 'number' || currentHeight < 0) {
                        handleStyleChange('height', 250);
                    }
                 }
              }}
              style={{
                width: '130px',
                padding: '1px 4px',
                border: '1px solid #ccc',
                borderRadius: '3px',
                backgroundColor: component.style.height === 'auto' ? '#f0f0f0' : '#fff',
                cursor: component.style.height === 'auto' ? 'not-allowed' : 'text',
                textAlign: 'right',
                fontSize: '12px',
                height: '28px',
                boxSizing: 'border-box'
              }}
              disabled={component.style.height === 'auto'}
              placeholder={component.style.height !== 'auto' ? "输入高度" : ""}
              title={component.style.height === 'auto' ? `实际高度: ${component.actualHeight ?? '计算中...'}px` : ""}
            />
            <div style={{ marginTop: '2px' }}>
              <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontSize: '11px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  checked={component.style.height !== 'auto'}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleStyleChange('height', 250);
                    } else {
                      handleStyleChange('height', 'auto');
                    }
                  }}
                  style={{ marginRight: '3px', width: '12px', height: '12px' }}
                />
                使用固定高度
              </label>
            </div>
          </div>
        </div>
        {/* 将颜色设置移到下方 */}
        <div style={{ marginBottom: '8px' }}> 
          <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>颜色:</label>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input 
              type="color" 
              value={component.style.backgroundColor || '#FFFFFF'} 
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              style={{ marginRight: '8px', height: '24px', width: '30px', padding: '0', border: '1px solid #ccc', borderRadius: '3px' }}
            />
            <input 
              type="text" 
              value={component.style.backgroundColor || '#FFFFFF'} 
              onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
              style={{ flex: 1, padding: '1px 4px', border: '1px solid #ccc', borderRadius: '3px', height: '24px', fontSize: '12px' }}
            />
          </div>
        </div>
      </div>

      {/* 圆角 */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '3px', fontWeight: 'bold', fontSize: '13px' }}>圆角:</label>
        <input 
          type="range" 
          min="0" 
          max="50" 
          value={component.style.borderRadius || 8} 
          onChange={(e) => handleStyleChange('borderRadius', parseInt(e.target.value))}
          style={{ width: '100%', marginBottom: '3px', height: '20px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>0</span>
          <span>{component.style.borderRadius || 8}</span>
          <span>50</span>
        </div>
      </div>

      {/* 边框 */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '3px', fontWeight: 'bold', fontSize: '12px' }}>边框:</label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>宽度:</label>
            <NumberInput 
              value={component.style.borderWidth || 0} 
              onChange={(value) => handleStyleChange('borderWidth', value)}
              min={0}
              max={10}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '2px' }}>颜色:</label>
            <input 
              type="color" 
              value={component.style.borderColor || '#e0e0e0'} 
              onChange={(e) => handleStyleChange('borderColor', e.target.value)}
              style={{ width: '100%', padding: '0', border: '1px solid #ccc', borderRadius: '3px', height: '24px', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* 阴影 */}
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'flex', alignItems: 'center', marginBottom: '5px', fontWeight: 'bold' }}>
          <input 
            type="checkbox" 
            checked={component.style.shadow || false} 
            onChange={(e) => handleStyleChange('shadow', e.target.checked)}
            style={{ marginRight: '5px', width: '16px', height: '16px' }}
          />
          显示阴影
        </label>
      </div>

      {/* 层级 */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '3px', fontWeight: 'bold', fontSize: '13px' }}>
          <Layers size={13} style={{ marginRight: '4px' }} />
          层级:
        </label>
        <input 
          type="range" 
          min="1" 
          max="100" 
          value={component.style.zIndex || 10} 
          onChange={(e) => handleStyleChange('zIndex', parseInt(e.target.value))}
          style={{ width: '100%', marginBottom: '3px', height: '20px' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span>1</span>
          <span>{component.style.zIndex || 10}</span>
          <span>100</span>
        </div>
      </div>
      {/* 为技能组件添加进度条控制选项 */}
      {component.type === 'skills' && (
        <div style={{ marginBottom: '15px' }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            marginBottom: '5px'
          }}>
            <input 
              type="checkbox" 
              checked={component.style.showProgressBar || false} 
              onChange={(e) => handleStyleChange('showProgressBar', e.target.checked)}
              style={{ marginRight: '8px' }}
            />
            <span>显示技能进度条</span>
          </label>
          <div style={{ fontSize: '12px', color: '#666', marginLeft: '20px' }}>
            显示技能水平的可视化进度条，与星级评分对应。
          </div>
        </div>
      )}
    </>
  );
};

export default StyleEditor;