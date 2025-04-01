// DeepSynth Web 页面专用 React 组件

// 技术栈标签组件
const EnhancedTechStack = () => {
  const { Chip, Box } = MaterialUI;
  
  const techItems = [
    { label: 'React', icon: '⚛️' },
    { label: 'Vue', icon: '🟢' },
    { label: 'Next.js', icon: '▲' },
    { label: 'TypeScript', icon: '🔷' },
    { label: 'TailwindCSS', icon: '🌊' }
  ];
  
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginTop: '20px',
        justifyContent: 'center'
      }
    },
    techItems.map((tech, index) => 
      React.createElement(
        Chip,
        {
          key: index,
          label: tech.label,
          icon: React.createElement('span', null, tech.icon),
          sx: {
            background: 'rgba(100, 255, 218, 0.1)',
            border: '1px solid rgba(100, 255, 218, 0.3)',
            color: 'white',
            '&:hover': {
              background: 'rgba(100, 255, 218, 0.2)',
            }
          }
        }
      )
    )
  );
};

// 增强的"立即开始"按钮组件
const EnhancedGetStarted = () => {
  const { Button, Box, Typography } = MaterialUI;
  
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        marginTop: '60px',
        marginBottom: '40px',
        background: 'rgba(10, 25, 50, 0.3)',
        borderRadius: '16px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, rgba(100, 255, 218, 0.7), rgba(10, 132, 255, 0.7))'
        }
      }
    },
    // 背景装饰元素
    React.createElement(
      'div',
      {
        style: {
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 50, 0) 70%)',
          top: '-150px',
          right: '-150px',
          zIndex: 0
        }
      }
    ),
    // 标题
    React.createElement(
      Typography,
      {
        variant: 'h3',
        component: 'h2',
        sx: {
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: '700',
          marginBottom: '16px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #64ffda, #0a84ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative',
          zIndex: 1
        }
      },
      '准备好开始了吗？'
    ),
    // 描述文字
    React.createElement(
      Typography,
      {
        variant: 'body1',
        sx: {
          fontSize: '1.125rem',
          textAlign: 'center',
          marginBottom: '32px',
          maxWidth: '600px',
          color: 'rgba(255, 255, 255, 0.8)',
          position: 'relative',
          zIndex: 1
        }
      },
      '立即体验DeepSynth Web，开启现代Web应用开发之旅'
    ),
    // 按钮组
    React.createElement(
      Box,
      {
        sx: {
          display: 'flex',
          gap: '16px',
          position: 'relative',
          zIndex: 1
        }
      },
      React.createElement(
        Button,
        {
          variant: 'contained',
          sx: {
            padding: '10px 30px',
            fontSize: '1rem',
            fontWeight: '600',
            background: 'linear-gradient(90deg, #64ffda 0%, #0a84ff 100%)',
            color: '#001e3c',
            '&:hover': {
              background: 'linear-gradient(90deg, #64ffda 20%, #0a84ff 80%)',
              transform: 'translateY(-3px)',
              boxShadow: '0 7px 20px rgba(0, 118, 255, 0.3)'
            },
            transition: 'all 0.3s ease'
          }
        },
        '免费试用'
      ),
      React.createElement(
        Button,
        {
          variant: 'outlined',
          sx: {
            padding: '10px 30px',
            fontSize: '1rem',
            fontWeight: '600',
            border: '2px solid #64ffda',
            color: '#64ffda',
            '&:hover': {
              background: 'rgba(100, 255, 218, 0.1)',
              borderColor: '#64ffda',
              transform: 'translateY(-3px)'
            }
          }
        },
        '了解更多'
      )
    )
  );
};

// 初始化页面特定的 React 组件
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否成功加载了 React, ReactDOM 和 MaterialUI
  if (window.React && window.ReactDOM && window.MaterialUI) {
    console.log('Web 页面 React 组件库已加载');
    
    // 技术栈标签
    const techStackContainer = document.querySelector('.tech-stack');
    if (techStackContainer) {
      techStackContainer.innerHTML = ''; // 清空原有内容
      const techRoot = ReactDOM.createRoot(techStackContainer);
      techRoot.render(React.createElement(EnhancedTechStack, null));
    }
    
    // 立即开始部分
    const getStartedSection = document.querySelector('.get-started-section');
    if (getStartedSection) {
      getStartedSection.innerHTML = ''; // 清空原有内容
      const getStartedRoot = ReactDOM.createRoot(getStartedSection);
      getStartedRoot.render(React.createElement(EnhancedGetStarted, null));
    }
  } else {
    console.error('无法加载 React 组件，请确保已引入必要的库');
  }
}); 