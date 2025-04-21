import React from 'react';

const PersonalInfoEditor = ({ component, handleContentChange }) => {
  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>姓名:</label>
        <input 
          type="text" 
          value={component.content.name || ''} 
          onChange={(e) => handleContentChange('name', e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>职位:</label>
        <input 
          type="text" 
          value={component.content.title || ''} 
          onChange={(e) => handleContentChange('title', e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      {/* Add Age input */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>年龄:</label>
        <input 
          type="number" 
          value={component.content.age || ''} 
          onChange={(e) => handleContentChange('age', e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      {/* Add Political Status input */}
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>政治面貌:</label>
        <input 
          type="text" 
          value={component.content.politicalStatus || ''} 
          onChange={(e) => handleContentChange('politicalStatus', e.target.value)}
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>头像:</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              try {
                const reader = new FileReader();
                
                reader.onloadend = () => {
                  try {
                    console.log("头像已加载，长度:", reader.result ? reader.result.length : 0);
                    
                    // 确保头像数据有效
                    if (reader.result && reader.result.startsWith('data:image')) {
                      // 检查图片大小，避免过大的图片
                      if (reader.result.length > 2000000) {
                        alert("图片太大，请选择小于2MB的图片");
                        return;
                      }
                      
                      // 逐个更新属性，而不是批量更新
                      handleContentChange('avatarScale', 1);
                      handleContentChange('avatarOffsetX', 0);
                      handleContentChange('avatarOffsetY', 0);
                      // 最后更新头像数据
                      handleContentChange('avatar', reader.result);
                      
                      console.log("头像已成功设置");
                    } else {
                      console.error("无效的图片数据");
                      alert("无效的图片格式，请选择其他图片");
                    }
                  } catch (error) {
                    console.error("处理图片时出错:", error);
                    alert("处理图片时出错，请尝试其他图片");
                  }
                };
                
                reader.onerror = () => {
                  console.error("读取文件时出错");
                  alert("读取文件时出错，请尝试其他图片");
                };
                
                reader.readAsDataURL(file);
              } catch (error) {
                console.error("文件处理初始化错误:", error);
                alert("文件处理错误，请尝试其他图片");
              }
            }
          }}
          style={{ width: '100%' }}
        />
        {component.content.avatar && (
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <div style={{ 
              position: 'relative', 
              margin: '0 auto', 
              width: '120px', 
              height: '120px', 
              overflow: 'hidden', 
              borderRadius: '50%', 
              border: '1px solid #ccc',
              backgroundColor: '#f5f5f5' // 添加背景色以便于查看容器
            }}>
              <img 
                src={component.content.avatar} 
                alt="头像预览" 
                style={{ 
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${component.content.avatarOffsetX || 0}px, ${component.content.avatarOffsetY || 0}px) scale(${component.content.avatarScale || 1})`,
                  width: '100%', // 修改为固定宽度100%
                  height: 'auto', // 高度自适应
                  objectFit: 'contain', // 修改为contain，确保图片完整显示
                  display: 'block' // 确保图片正确显示
                }} 
              />
            </div>
            
            {/* 头像控制区域 */}
            <div style={{ marginTop: '15px', border: '1px solid #eee', padding: '10px', borderRadius: '4px' }}>
              {/* 头像位置控制 */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>头像位置调整:</label>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                  <button 
                    onClick={() => handleContentChange('avatarOffsetY', (component.content.avatarOffsetY || 0) - 5)}
                    style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                  >
                    上移
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
                  <button 
                    onClick={() => handleContentChange('avatarOffsetX', (component.content.avatarOffsetX || 0) - 5)}
                    style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                  >
                    左移
                  </button>
                  <button 
                    onClick={() => handleContentChange('avatarOffsetX', (component.content.avatarOffsetX || 0) + 5)}
                    style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                  >
                    右移
                  </button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <button 
                    onClick={() => handleContentChange('avatarOffsetY', (component.content.avatarOffsetY || 0) + 5)}
                    style={{ padding: '5px 10px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0' }}
                  >
                    下移
                  </button>
                </div>
              </div>
              
              {/* 头像缩放控制 */}
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>头像缩放:</label>
                <input 
                  type="range" 
                  min="0.8" 
                  max="3" 
                  step="0.1" 
                  value={component.content.avatarScale || 1} 
                  onChange={(e) => handleContentChange('avatarScale', parseFloat(e.target.value))}
                  style={{ width: '100%', marginBottom: '5px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span>80%</span>
                  <span>{Math.round((component.content.avatarScale || 1) * 100)}%</span>
                  <span>300%</span>
                </div>
              </div>
              
              {/* 重置按钮 */}
              <button 
                onClick={() => {
                  handleContentChange('avatarOffsetX', 0);
                  handleContentChange('avatarOffsetY', 0);
                  handleContentChange('avatarScale', 1);
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
                重置头像位置和大小
              </button>
            </div>
            
            <button 
              onClick={() => handleContentChange('avatar', '')}
              style={{ display: 'block', margin: '5px auto', padding: '5px 10px', background: '#ff5252', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              删除头像
            </button>
          </div>
        )}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>联系方式:</label>
        {(component.content.contact || []).map((contact, index) => (
          <div key={index} style={{ display: 'flex', marginBottom: '5px', gap: '5px' }}>
            <select 
              value={contact.type} 
              onChange={(e) => {
                const newContact = [...component.content.contact];
                newContact[index] = { ...contact, type: e.target.value };
                handleContentChange('contact', newContact);
              }}
              style={{ width: '100px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="Email">Email</option>
              <option value="Phone">电话</option>
              <option value="Github">Github</option>
              <option value="Linkedin">LinkedIn</option>
              <option value="Website">网站</option>
              <option value="WeChat">微信</option>
              <option value="QQ">QQ</option>
            </select>
            <input 
              type="text" 
              value={contact.value || ''} // Ensure value is always defined (at least an empty string)
              onChange={(e) => {
                const newContact = [...component.content.contact];
                newContact[index] = { ...contact, value: e.target.value };
                handleContentChange('contact', newContact);
              }}
              style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
              placeholder="联系方式"
            />
            <button 
              onClick={() => {
                const newContact = component.content.contact.filter((_, i) => i !== index);
                handleContentChange('contact', newContact);
              }}
              style={{ padding: '8px', border: 'none', background: '#ff5252', color: 'white', borderRadius: '4px' }}
            >
              删除
            </button>
          </div>
        ))}
        <button 
          onClick={() => {
            const newContact = [...(component.content.contact || []), { id: Date.now(), type: 'Phone', value: '' }];
            handleContentChange('contact', newContact);
          }}
          style={{ padding: '8px', border: 'none', background: '#4CAF50', color: 'white', borderRadius: '4px', width: '100%', marginTop: '5px' }}
        >
          添加联系方式
        </button>
      </div>
    </>
  );
};

export default PersonalInfoEditor;