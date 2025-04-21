// 在个人信息组件中渲染头像的部分
{content.avatar && (
  <div style={{ 
    width: '80px', 
    height: '80px', 
    borderRadius: '50%', 
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto 10px auto',
    backgroundColor: '#f5f5f5' // 添加背景色
  }}>
    <img 
      src={content.avatar} 
      alt={content.name || '头像'} 
      style={{ 
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(-50%, -50%) translate(${content.avatarOffsetX || 0}px, ${content.avatarOffsetY || 0}px) scale(${content.avatarScale || 1})`,
        maxWidth: 'none', // 修改这里
        minWidth: '100%', // 确保最小宽度
        minHeight: '100%', // 确保最小高度
        objectFit: 'cover', // 使用cover而不是contain
        display: 'block'
      }} 
    />
  </div>
)}