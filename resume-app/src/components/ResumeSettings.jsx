import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronRight, Plus } from 'lucide-react';

const ResumeSettings = ({ 
  resumeSettings, 
  updateResumeSettings,
  pageSettings,
  updatePageSettings,
  addComponent,
  addPage,
  exportPDF,
  exportResumeData,
  importResumeData
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('basic'); // 'basic', 'advanced'
  const [componentMenuVisible, setComponentMenuVisible] = useState(false); // 添加组件菜单状态
  const [isGlobalSettings, setIsGlobalSettings] = useState(true);

  // 页面尺寸预设
  const pageSizePresets = {
    'a4': { width: 210, height: 297 },
    'a5': { width: 148, height: 210 },
    'letter': { width: 216, height: 279 },
    'legal': { width: 216, height: 356 },
    'custom': null
  };

  const handleSettingChange = (setting, value) => {
    updateResumeSettings({
      ...resumeSettings,
      [setting]: value
    });
  };

  const handleLayerChange = (layerName, value) => {
    // 确保值是数字且在有效范围内
    const numValue = parseInt(value, 10);
    if (isNaN(numValue) || numValue < 1 || numValue > 10) return;
    
    updateResumeSettings({
      ...resumeSettings,
      layers: {
        ...resumeSettings.layers,
        [layerName]: numValue
      }
    });
  };

  const handlePageSizeChange = (preset) => {
    if (preset === 'custom') {
      // 保持当前尺寸
      return;
    }
    
    const size = pageSizePresets[preset];
    if (size) {
      updatePageSettings({
        width: size.width,
        height: size.height
      });
    }
  };

  const handleCustomSizeChange = (dimension, value) => {
    updatePageSettings({
      [dimension]: parseFloat(value) || 0
    });
  };

  // 显示组件菜单
  const showComponentMenu = () => {
    setComponentMenuVisible(true);
  };

  // 隐藏组件菜单
  const hideComponentMenu = () => {
    setComponentMenuVisible(false);
  };

  // 处理添加组件
  const handleAddComponent = (type) => {
    console.log('添加组件:', type); // 添加调试日志
    if (typeof addComponent === 'function') {
      addComponent(type);
      hideComponentMenu();
    } else {
      console.error('addComponent 不是一个函数:', addComponent);
    }
  };

  return (
    <div>
      {/* 简历设置按钮 */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '10px 15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
            cursor: 'pointer',
          marginBottom: '15px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        >
          <Settings size={18} style={{ marginRight: '10px' }} />
        <span style={{ flex: 1 }}>简历设置</span>
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
        
      {/* 设置面板 */}
        {isOpen && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '15px'
          }}>
            <button
              onClick={() => setIsGlobalSettings(true)}
              style={{
                flex: 1,
                padding: '8px',
                backgroundColor: isGlobalSettings ? '#2196F3' : '#e0e0e0',
                color: isGlobalSettings ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              全局设置
            </button>
            <button
              onClick={() => setIsGlobalSettings(false)}
              style={{
                flex: 1,
                padding: '8px',
                backgroundColor: !isGlobalSettings ? '#2196F3' : '#e0e0e0',
                color: !isGlobalSettings ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              页面设置
            </button>
          </div>

          {isGlobalSettings ? (
            // 全局设置
            <div>
              <h3>全局设置</h3>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>主题颜色</label>
                <input
                  type="color"
                  value={resumeSettings.themeColor}
                  onChange={(e) => handleSettingChange('themeColor', e.target.value)}
                  style={{ width: '100%', height: '40px' }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>字体</label>
                <select
                  value={resumeSettings.fontFamily}
                  onChange={(e) => handleSettingChange('fontFamily', e.target.value)}
                style={{ 
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                >
                  <option value="'Noto Sans SC', sans-serif">Noto Sans SC</option>
                  <option value="'Microsoft YaHei', sans-serif">微软雅黑</option>
                  <option value="'SimSun', serif">宋体</option>
                  <option value="'SimHei', sans-serif">黑体</option>
                </select>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>布局</label>
                <select
                  value={resumeSettings.layout}
                  onChange={(e) => handleSettingChange('layout', e.target.value)}
                style={{ 
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                >
                  <option value="standard">标准布局</option>
                  <option value="modern">现代布局</option>
                  <option value="creative">创意布局</option>
                </select>
              </div>
            </div>
          ) : (
            // 页面设置
            <div>
              <h3>页面设置</h3>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginBottom: '10px'
              }}>
                <button
                  onClick={() => addPage()}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}
                >
                  <Plus size={16} />
                  添加相同页面
                </button>
              </div>

                <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>页面尺寸</label>
                  <select 
                  value={Object.entries(pageSizePresets).find(([key, size]) => 
                    size && size.width === pageSettings.width && size.height === pageSettings.height
                  )?.[0] || 'custom'}
                  onChange={(e) => handlePageSizeChange(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '8px', 
                    marginBottom: '10px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                >
                  <option value="a4">A4 (210×297mm)</option>
                  <option value="a5">A5 (148×210mm)</option>
                  <option value="letter">Letter (216×279mm)</option>
                  <option value="legal">Legal (216×356mm)</option>
                  <option value="custom">自定义尺寸</option>
                  </select>
                
                  <div style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>宽度 (mm)</label>
                      <input 
                      type="number"
                      value={pageSettings.width}
                      onChange={(e) => handleCustomSizeChange('width', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px',
                      borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>高度 (mm)</label>
                    <input
                      type="number"
                      value={pageSettings.height}
                      onChange={(e) => handleCustomSizeChange('height', e.target.value)}
                        style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>方向</label>
                <select
                  value={pageSettings.orientation}
                  onChange={(e) => updatePageSettings({ orientation: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                >
                  <option value="portrait">纵向</option>
                  <option value="landscape">横向</option>
                </select>
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>背景颜色</label>
                    <input 
                      type="color" 
                  value={pageSettings.backgroundColor}
                  onChange={(e) => updatePageSettings({ backgroundColor: e.target.value })}
                  style={{ width: '100%', height: '40px' }}
                />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px' }}>边距 (mm)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>上</label>
                      <input 
                        type="number" 
                      value={pageSettings.margins.top}
                      onChange={(e) => updatePageSettings({
                        margins: { ...pageSettings.margins, top: parseFloat(e.target.value) || 0 }
                      })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                      />
                    </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>右</label>
                      <input 
                        type="number" 
                      value={pageSettings.margins.right}
                      onChange={(e) => updatePageSettings({
                        margins: { ...pageSettings.margins, right: parseFloat(e.target.value) || 0 }
                      })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                      />
                    </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>下</label>
                      <input 
                        type="number" 
                      value={pageSettings.margins.bottom}
                      onChange={(e) => updatePageSettings({
                        margins: { ...pageSettings.margins, bottom: parseFloat(e.target.value) || 0 }
                      })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                      />
                    </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px' }}>左</label>
                      <input 
                        type="number" 
                      value={pageSettings.margins.left}
                      onChange={(e) => updatePageSettings({
                        margins: { ...pageSettings.margins, left: parseFloat(e.target.value) || 0 }
                      })}
                      style={{
                        width: '100%',
                        padding: '8px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                </div>
                </div>
              </div>
            )}
          </div>
        )}

      {/* 添加组件按钮 - 移到下面 */}
      <div style={{ marginBottom: '15px', position: 'relative' }}>
        <button 
          onClick={showComponentMenu}
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
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <Plus size={18} style={{ marginRight: '5px' }} />
          添加组件
        </button>
        
        {componentMenuVisible && (
          <div style={{ 
            position: 'absolute', 
            top: '100%', 
            left: 0, 
            width: '100%', 
            background: 'white', 
            border: '1px solid #ddd', 
            borderRadius: '4px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
            zIndex: 1000 
          }}>
            <div style={{ padding: '10px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>选择组件类型</span>
              <button onClick={hideComponentMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>×</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px' }}>
              <div 
                onClick={() => handleAddComponent('personalInfo')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                个人信息
              </div>
              <div 
                onClick={() => handleAddComponent('skills')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                技能专长
              </div>
              <div 
                onClick={() => handleAddComponent('education')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                教育背景
              </div>
              <div 
                onClick={() => handleAddComponent('experience')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                工作经验
              </div>
              <div 
                onClick={() => handleAddComponent('summary')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                个人简介
              </div>
              <div 
                onClick={() => handleAddComponent('achievements')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                成就与奖项
              </div>
              <div 
                onClick={() => handleAddComponent('hobbies')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                个人爱好
              </div>
              <div 
                onClick={() => handleAddComponent('portfolio')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                个人成果展示
              </div>
              {/* 添加图片组件选项 */}
              <div 
                onClick={() => handleAddComponent('image')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                图片
              </div>
              <div 
                onClick={() => handleAddComponent('blank')} 
                style={{ padding: '10px', border: '1px solid #eee', borderRadius: '4px', cursor: 'pointer', textAlign: 'center' }}
              >
                空白组件
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeSettings;