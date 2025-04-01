// React 组件文件
// 使用 Material UI 增强网站界面

// 导航栏组件 - 基于现有导航栏设计但增加功能和动画
const EnhancedNavbar = () => {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  // 监听滚动事件
  React.useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 处理移动菜单点击
  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // 获取 Material UI 组件
  const { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText } = MaterialUI;
  
  // 导航链接数据
  const navLinks = [
    { name: '首页', href: '#hero' },
    { name: '关于我们', href: '#about' },
    { name: '产品特点', href: '#features' },
    { name: '产品系列', href: '#projects' },
    { name: '联系我们', href: '#contact' }
  ];
  
  return React.createElement(
    React.Fragment,
    null,
    // 主导航栏
    React.createElement(
      AppBar,
      { 
        position: 'fixed',
        className: `react-nav ${scrolled ? 'scrolled' : ''}`,
        sx: { background: 'rgba(13, 18, 30, 0.9)', backdropFilter: 'blur(10px)' }
      },
      React.createElement(
        Toolbar,
        null,
        // Logo
        React.createElement(
          'div',
          { className: 'logo' },
          React.createElement(
            'a',
            { href: '#', className: 'logo-container' },
            React.createElement(
              'span',
              { className: 'logo-text' },
              React.createElement('span', { className: 'highlight' }, 'Deep'),
              'Synth'
            ),
            React.createElement(
              'div',
              { className: 'logo-icon' },
              React.createElement(
                'svg',
                { viewBox: '0 0 100 100', className: 'logo-svg' },
                React.createElement('circle', { className: 'logo-circle', cx: '50', cy: '50', r: '45' }),
                React.createElement('path', { className: 'logo-path', d: 'M25,50 L75,50 M50,25 L50,75 M35,35 L65,65 M35,65 L65,35' })
              )
            )
          )
        ),
        
        // 桌面导航链接
        React.createElement(
          'div',
          { className: 'nav-links desktop-only' },
          navLinks.map((link, index) => 
            React.createElement(
              Button,
              { 
                key: index,
                href: link.href,
                className: 'nav-link mui-btn',
                sx: { 
                  color: 'white',
                  '&:hover': { color: '#64ffda' }
                }
              },
              link.name
            )
          )
        ),
        
        // 移动端菜单图标
        React.createElement(
          IconButton,
          {
            className: 'mobile-menu-btn',
            onClick: handleMobileMenuToggle,
            sx: { 
              display: { xs: 'block', md: 'none' },
              color: 'white'
            }
          },
          React.createElement('span', { className: 'material-icons' }, 'menu')
        )
      )
    ),
    
    // 移动端侧边菜单
    React.createElement(
      Drawer,
      {
        anchor: 'right',
        open: mobileOpen,
        onClose: handleMobileMenuToggle,
        sx: {
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '320px',
            background: 'rgba(10, 15, 25, 0.95)',
            backdropFilter: 'blur(10px)',
            color: 'white'
          }
        }
      },
      React.createElement(
        List,
        null,
        navLinks.map((link, index) => 
          React.createElement(
            ListItem,
            { 
              key: index,
              component: 'a',
              href: link.href,
              onClick: handleMobileMenuToggle,
              sx: { '&:hover': { background: 'rgba(100, 255, 218, 0.1)' } }
            },
            React.createElement(ListItemText, { primary: link.name })
          )
        )
      )
    )
  );
};

// 按钮组件 - 增强版的按钮
const EnhancedButton = ({ primary, children, onClick, href }) => {
  const { Button } = MaterialUI;
  
  return React.createElement(
    Button,
    {
      variant: primary ? 'contained' : 'outlined',
      className: primary ? 'enhanced-primary-btn' : 'enhanced-secondary-btn',
      onClick: onClick,
      href: href,
      sx: {
        borderRadius: '4px',
        padding: '10px 24px',
        fontWeight: '600',
        textTransform: 'none',
        background: primary ? 'linear-gradient(90deg, #64ffda 0%, #0a84ff 100%)' : 'transparent',
        color: primary ? '#001e3c' : '#64ffda',
        border: primary ? 'none' : '2px solid #64ffda',
        '&:hover': {
          background: primary ? 'linear-gradient(90deg, #64ffda 20%, #0a84ff 80%)' : 'rgba(100, 255, 218, 0.1)',
          transform: 'translateY(-3px)',
          boxShadow: primary ? '0 4px 20px rgba(0, 118, 255, 0.23)' : 'none'
        },
        transition: 'all 0.3s ease-in-out'
      }
    },
    children
  );
};

// 特性卡片组件 - 增强版的特性卡片
const EnhancedFeatureCard = ({ title, description, icon, delay }) => {
  const { Card, CardContent, Typography } = MaterialUI;
  
  return React.createElement(
    Card,
    {
      className: `enhanced-feature-card animate ${delay ? `animate-delay-${delay}` : ''}`,
      sx: {
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
          '&::before': {
            opacity: 1
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #64ffda 0%, #0a84ff 100%)',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }
      }
    },
    React.createElement(
      CardContent,
      {
        sx: {
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }
      },
      React.createElement(
        'div',
        { className: 'feature-icon' },
        icon
      ),
      React.createElement(
        Typography,
        {
          variant: 'h6',
          component: 'h3',
          sx: {
            fontWeight: '600',
            color: 'white',
            fontSize: '1.25rem'
          }
        },
        title
      ),
      React.createElement(
        Typography,
        {
          variant: 'body2',
          sx: {
            color: 'rgba(255, 255, 255, 0.7)',
            lineHeight: 1.6
          }
        },
        description
      )
    )
  );
};

// 初始化 React 组件
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否成功加载了 React, ReactDOM 和 MaterialUI
  if (window.React && window.ReactDOM && window.MaterialUI) {
    console.log('React 组件库已加载');
    
    // 在这里挂载你的 React 组件
    const navbarContainer = document.getElementById('react-navbar-container');
    if (navbarContainer) {
      const root = ReactDOM.createRoot(navbarContainer);
      root.render(React.createElement(EnhancedNavbar, null));
    }
    
    // 增强按钮可以单独调用
    // 后续在其他 JS 中使用
  } else {
    console.error('无法加载 React 组件，请确保已引入必要的库');
  }
}); 