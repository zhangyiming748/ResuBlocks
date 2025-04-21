import React, { useRef, useState } from 'react';

// 防抖动的数字输入框组件
const NumberInput = ({ 
  value, 
  onChange, 
  min, 
  max, 
  step = 1,
  width = '100%',
  style = {} 
}) => {
  const [inputValue, setInputValue] = useState(value);
  // 用于长按功能的引用
  const intervalRef = useRef(null);
  
  // 在组件更新时同步外部值
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);
  
  // 处理输入变化
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // 只有当输入的是有效数字时才触发onChange
    const numValue = parseFloat(newValue);
    if (!isNaN(numValue)) {
      handleValueChange(numValue);
    }
  };
  
  // 处理失去焦点事件
  const handleBlur = () => {
    // 验证并矫正值
    let numValue = parseFloat(inputValue);
    
    if (isNaN(numValue)) {
      numValue = value; // 恢复原值
    } else {
      // 确保值在范围内
      if (min !== undefined && numValue < min) numValue = min;
      if (max !== undefined && numValue > max) numValue = max;
    }
    
    setInputValue(numValue);
    onChange(numValue);
  };
  
  // 增加或减少值
  const changeValue = (increment) => {
    let numValue = parseFloat(value);
    if (isNaN(numValue)) numValue = 0;
    
    numValue += increment ? step : -step;
    
    // 确保值在范围内
    if (min !== undefined && numValue < min) numValue = min;
    if (max !== undefined && numValue > max) numValue = max;
    
    onChange(numValue);
  };
  
  // 核心函数：处理值变更
  const handleValueChange = (newValue) => {
    let numValue = newValue;
    
    // 确保值在范围内
    if (min !== undefined && numValue < min) numValue = min;
    if (max !== undefined && numValue > max) numValue = max;
    
    onChange(numValue);
  };
  
  // 开始长按
  const startIncrement = (increment) => (e) => {
    // 阻止默认行为和事件冒泡
    e.preventDefault();
    e.stopPropagation();
    
    // 立即执行一次
    changeValue(increment);
    
    // 设置长按间隔
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      changeValue(increment);
    }, 150); // 调整间隔时间以控制长按速度
  };
  
  // 结束长按
  const stopIncrement = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  // 清理副作用
  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return (
    <div 
      style={{ 
        display: 'flex', 
        width: width,
        ...style 
      }}
    >
      <button 
        onMouseDown={startIncrement(false)}
        onMouseUp={stopIncrement}
        onMouseLeave={stopIncrement}
        onTouchStart={startIncrement(false)}
        onTouchEnd={stopIncrement}
        style={{
          width: '28px',
          height: '28px',
          background: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '3px 0 0 3px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          touchAction: 'manipulation',
          fontSize: '14px',
          padding: 0
        }}
      >
        -
      </button>
      
      <input 
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        style={{
          flex: 1,
          padding: '1px 4px',
          border: '1px solid #ccc',
          borderLeft: 'none',
          borderRight: 'none',
          textAlign: 'center',
          minWidth: 0,
          height: '28px',
          boxSizing: 'border-box',
          fontSize: '13px'
        }}
      />
      
      <button 
        onMouseDown={startIncrement(true)}
        onMouseUp={stopIncrement}
        onMouseLeave={stopIncrement}
        onTouchStart={startIncrement(true)}
        onTouchEnd={stopIncrement}
        style={{
          width: '28px',
          height: '28px',
          background: '#f0f0f0',
          border: '1px solid #ccc',
          borderRadius: '0 3px 3px 0',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          touchAction: 'manipulation',
          fontSize: '14px',
          padding: 0
        }}
      >
        +
      </button>
    </div>
  );
};

export default NumberInput; 