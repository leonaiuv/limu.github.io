// 项目页面特定React组件

// 增强的挑战卡片组件
const EnhancedChallengeCard = () => {
  const { Card, CardContent, Typography, Box } = MaterialUI;
  
  // 挑战数据
  const challengeData = [
    {
      title: '网页内容理解限制',
      challenge: '网页结构复杂，内容多样，难以准确抽取和理解',
      solution: '采用多层次内容提取策略，结合语义分析和结构分析，提高内容理解准确度'
    },
    {
      title: '上下文窗口限制',
      challenge: 'LLM的上下文窗口有限，无法处理整个长网页',
      solution: '实现智能内容分块和重要信息提取，配合RAG系统处理长内容'
    },
    {
      title: '用户意图识别准确度',
      challenge: '正确识别用户意图，尤其是模糊或复杂的指令',
      solution: '开发多轮对话确认机制，结合意图分类和提示工程优化'
    },
    {
      title: '安全与隐私考量',
      challenge: '确保不处理敏感信息，同时保持功能完整性',
      solution: '实现内容过滤系统，隐私数据检测，以及安全沙箱执行环境'
    }
  ];
  
  return React.createElement(
    Box,
    {
      sx: {
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)'
        },
        gap: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem'
      }
    },
    challengeData.map((item, index) => 
      React.createElement(
        Card,
        {
          key: index,
          sx: {
            background: 'rgba(10, 25, 50, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '16px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            height: '100%',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
              '&::before': {
                opacity: 1,
                transform: 'translateY(0)'
              }
            },
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #64ffda, #0a84ff)',
              opacity: 0.7,
              transform: 'translateY(-4px)',
              transition: 'all 0.3s ease'
            }
          }
        },
        React.createElement(
          CardContent,
          {
            sx: {
              padding: '1.5rem'
            }
          },
          // 标题
          React.createElement(
            Typography,
            {
              variant: 'h5',
              component: 'h3',
              gutterBottom: true,
              sx: {
                fontWeight: 600,
                color: '#64ffda',
                marginBottom: '1rem'
              }
            },
            item.title
          ),
          // 挑战部分
          React.createElement(
            Box,
            {
              sx: {
                marginBottom: '1rem'
              }
            },
            React.createElement(
              Typography,
              {
                variant: 'subtitle1',
                component: 'p',
                sx: {
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  opacity: 0.9
                }
              },
              '挑战:'
            ),
            React.createElement(
              Typography,
              {
                variant: 'body1',
                sx: {
                  color: 'rgba(255, 255, 255, 0.8)'
                }
              },
              item.challenge
            )
          ),
          // 解决方案部分
          React.createElement(
            Box,
            null,
            React.createElement(
              Typography,
              {
                variant: 'subtitle1',
                component: 'p',
                sx: {
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                  opacity: 0.9
                }
              },
              '解决方案:'
            ),
            React.createElement(
              Typography,
              {
                variant: 'body1',
                sx: {
                  color: 'rgba(255, 255, 255, 0.8)'
                }
              },
              item.solution
            )
          )
        )
      )
    )
  );
};

// 项目总结组件
const ProjectConclusion = () => {
  const { Box, Typography, Button, Paper } = MaterialUI;
  
  return React.createElement(
    Paper,
    {
      elevation: 0,
      sx: {
        padding: { xs: '2rem', md: '3rem' },
        background: 'rgba(10, 25, 50, 0.4)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        maxWidth: '900px',
        margin: '0 auto'
      }
    },
    // 背景装饰
    React.createElement('div', {
      style: {
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 50, 0) 70%)',
        borderRadius: '50%',
        zIndex: 0
      }
    }),
    // 标题
    React.createElement(
      Typography,
      {
        variant: 'h3',
        component: 'h2',
        sx: {
          textAlign: 'center',
          marginBottom: '2rem',
          fontWeight: 600,
          position: 'relative',
          zIndex: 1,
          background: 'linear-gradient(90deg, #64ffda, #0a84ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }
      },
      '项目结论'
    ),
    // 内容
    React.createElement(
      Typography,
      {
        variant: 'body1',
        paragraph: true,
        sx: {
          fontSize: '1.1rem',
          lineHeight: 1.7,
          textAlign: 'center',
          marginBottom: '2rem',
          color: 'rgba(255, 255, 255, 0.9)',
          position: 'relative',
          zIndex: 1
        }
      },
      '对话式Web助手展示了AI Agent如何增强网页浏览体验，通过自然语言交互和上下文理解能力，为用户提供更加智能、流畅的网页交互方式。这个项目是我探索AI Agent与Web技术结合的重要实践。'
    ),
    // 按钮区
    React.createElement(
      Box,
      {
        sx: {
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 1,
          flexWrap: { xs: 'wrap', sm: 'nowrap' }
        }
      },
      React.createElement(
        Button,
        {
          variant: 'contained',
          href: 'https://github.com/limu',
          target: '_blank',
          startIcon: React.createElement('span', { className: 'material-icons' }, 'code'),
          sx: {
            background: 'linear-gradient(90deg, #64ffda 0%, #0a84ff 100%)',
            color: '#001e3c',
            padding: '0.8rem 1.5rem',
            fontWeight: '600',
            borderRadius: '8px',
            '&:hover': {
              background: 'linear-gradient(90deg, #64ffda 20%, #0a84ff 80%)',
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0, 118, 255, 0.3)'
            },
            transition: 'all 0.3s ease'
          }
        },
        'GitHub仓库'
      ),
      React.createElement(
        Button,
        {
          variant: 'outlined',
          href: '../index.html#projects',
          startIcon: React.createElement('span', { className: 'material-icons' }, 'arrow_back'),
          sx: {
            borderColor: '#64ffda',
            color: '#64ffda',
            padding: '0.8rem 1.5rem',
            fontWeight: '600',
            borderRadius: '8px',
            '&:hover': {
              borderColor: '#64ffda',
              background: 'rgba(100, 255, 218, 0.1)',
              transform: 'translateY(-5px)'
            }
          }
        },
        '返回作品集'
      )
    )
  );
};

// 初始化项目页面React组件
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否成功加载了React组件库
  if (window.React && window.ReactDOM && window.MaterialUI) {
    console.log('项目页面组件库已加载');
    
    // 挂载挑战卡片组件
    const challengesGrid = document.querySelector('.challenges-grid');
    if (challengesGrid) {
      const challengesRoot = ReactDOM.createRoot(challengesGrid);
      challengesRoot.render(React.createElement(EnhancedChallengeCard, null));
    }
    
    // 挂载项目结论组件
    const getStartedContent = document.querySelector('.get-started-content');
    if (getStartedContent) {
      const conclusionRoot = ReactDOM.createRoot(getStartedContent);
      conclusionRoot.render(React.createElement(ProjectConclusion, null));
    }
  } else {
    console.error('无法加载React组件，请确保已引入必要的库');
  }
}); 