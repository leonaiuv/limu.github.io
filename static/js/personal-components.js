// 个人网站React组件
// 为AI Agent工程师个人网站定制的组件

// 个人简介组件
const PersonalHero = () => {
  const { Typography, Box, Button } = MaterialUI;
  
  // 滚动到作品集区域
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return React.createElement(
    Box,
    {
      sx: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: '1.5rem',
        maxWidth: '600px'
      }
    },
    // 打招呼
    React.createElement(
      Typography,
      {
        variant: 'h5',
        sx: { color: '#64ffda' }
      },
      '你好，我是'
    ),
    // 姓名
    React.createElement(
      Typography,
      {
        variant: 'h1',
        sx: {
          fontSize: { xs: '2.5rem', md: '4rem' },
          fontWeight: '700',
          lineHeight: '1.2'
        }
      },
      '李沐'
    ),
    // 职业介绍
    React.createElement(
      Typography,
      {
        variant: 'h2',
        sx: {
          fontSize: { xs: '1.5rem', md: '2.5rem' },
          fontWeight: '600',
          opacity: '0.8'
        }
      },
      '我打造智能、自主的AI Agent'
    ),
    // 个人描述
    React.createElement(
      Typography,
      {
        variant: 'body1',
        sx: {
          fontSize: '1.1rem',
          opacity: '0.7',
          maxWidth: '500px'
        }
      },
      '我专注于设计和开发能够自主完成任务的AI Agent系统。通过整合大语言模型、工具使用和推理能力，我为企业和个人构建能够理解需求并采取行动的智能助手。'
    ),
    // 按钮组
    React.createElement(
      Box,
      {
        sx: {
          display: 'flex',
          gap: '1rem',
          marginTop: '1rem'
        }
      },
      React.createElement(
        Button,
        {
          variant: 'contained',
          onClick: scrollToProjects,
          sx: {
            background: 'linear-gradient(90deg, #64ffda 0%, #0a84ff 100%)',
            color: '#001e3c',
            padding: '0.8rem 2rem',
            fontWeight: '600',
            '&:hover': {
              background: 'linear-gradient(90deg, #64ffda 20%, #0a84ff 80%)',
              transform: 'translateY(-5px)',
              boxShadow: '0 10px 20px rgba(0, 118, 255, 0.3)'
            },
            transition: 'all 0.3s ease'
          }
        },
        '查看我的作品'
      ),
      React.createElement(
        Button,
        {
          variant: 'outlined',
          sx: {
            borderColor: '#64ffda',
            color: '#64ffda',
            padding: '0.8rem 2rem',
            fontWeight: '600',
            '&:hover': {
              borderColor: '#64ffda',
              background: 'rgba(100, 255, 218, 0.1)',
              transform: 'translateY(-5px)'
            }
          }
        },
        '下载简历'
      )
    )
  );
};

// 个人名片组件
const PersonalCard = () => {
  const { Card, Avatar, Typography, Box, Chip } = MaterialUI;
  
  return React.createElement(
    Card, 
    {
      sx: {
        background: 'rgba(10, 25, 50, 0.5)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: '100%'
      }
    },
    // 背景装饰
    React.createElement('div', {
      style: {
        position: 'absolute',
        width: '100%',
        height: '5px',
        top: 0,
        background: 'linear-gradient(90deg, #64ffda, #0a84ff)'
      }
    }),
    // 内容
    React.createElement(Box, {
      sx: {
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }
    },
      // 头像
      React.createElement(Avatar, {
        sx: {
          width: 120,
          height: 120,
          border: '3px solid #64ffda'
        },
        src: 'static/images/avatar.png' // 更新为个人头像图片
      }),
      // 姓名
      React.createElement(Typography, {
        variant: 'h4',
        sx: { fontWeight: 700 }
      }, '李沐'),
      // 职业
      React.createElement(Typography, {
        variant: 'h6',
        sx: { 
          color: '#64ffda',
          marginBottom: '1rem'
        }
      }, 'AI Agent 工程师'),
      // 技能标签
      React.createElement(Box, {
        sx: {
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center'
        }
      }, [
        'LLM', 'RAG', 'Agent设计', 'Python', 'JavaScript'
      ].map((skill, index) => React.createElement(Chip, {
        key: index,
        label: skill,
        sx: {
          background: 'rgba(100, 255, 218, 0.1)',
          borderColor: 'rgba(100, 255, 218, 0.3)',
          color: 'white'
        }
      })))
    )
  );
};

// 技能展示组件
const SkillsShowcase = () => {
  const { Box, Typography, LinearProgress } = MaterialUI;
  
  const skills = [
    { name: 'LLM集成与微调', level: 95 },
    { name: 'AI Agent设计', level: 90 },
    { name: '工具调用与功能扩展', level: 88 },
    { name: 'RAG系统构建', level: 85 },
    { name: 'Python开发', level: 92 },
    { name: '前端开发 (React)', level: 80 },
    { name: '数据分析', level: 75 }
  ];
  
  return React.createElement(
    Box,
    {
      sx: {
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem'
      }
    },
    // 标题
    React.createElement(
      Typography,
      {
        variant: 'h4',
        align: 'center',
        sx: { 
          fontWeight: 600,
          marginBottom: '2rem'
        }
      },
      '专业技能'
    ),
    // 技能进度条
    ...skills.map((skill, index) => 
      React.createElement(
        Box,
        {
          key: index,
          sx: {
            marginBottom: '1.5rem'
          }
        },
        React.createElement(
          Box,
          {
            sx: {
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }
          },
          React.createElement(
            Typography,
            { variant: 'body1', fontWeight: 500 },
            skill.name
          ),
          React.createElement(
            Typography,
            { variant: 'body2' },
            `${skill.level}%`
          )
        ),
        React.createElement(
          LinearProgress,
          {
            variant: 'determinate',
            value: skill.level,
            sx: {
              height: 10,
              borderRadius: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 5,
                background: 'linear-gradient(90deg, #64ffda, #0a84ff)'
              }
            }
          }
        )
      )
    )
  );
};

// 项目卡片组件
const ProjectCard = ({ title, image, description, tags, link }) => {
  const { Card, CardMedia, CardContent, Typography, Box, Chip, Button } = MaterialUI;
  
  return React.createElement(
    Card,
    {
      sx: {
        background: 'rgba(10, 25, 50, 0.6)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
        }
      }
    },
    // 项目图片
    React.createElement(
      CardMedia,
      {
        component: 'img',
        height: '200',
        image: image,
        alt: title
      }
    ),
    // 项目内容
    React.createElement(
      CardContent,
      {
        sx: {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }
      },
      // 标题
      React.createElement(
        Typography,
        {
          gutterBottom: true,
          variant: 'h5',
          component: 'div',
          fontWeight: 600
        },
        title
      ),
      // 描述
      React.createElement(
        Typography,
        {
          variant: 'body2',
          color: 'text.secondary',
          sx: { 
            mb: 2,
            color: 'rgba(255, 255, 255, 0.7)'
          }
        },
        description
      ),
      // 技术标签
      React.createElement(
        Box,
        {
          sx: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            mb: 2,
            mt: 'auto'
          }
        },
        tags.map((tag, index) => 
          React.createElement(
            Chip,
            {
              key: index,
              label: tag,
              size: 'small',
              sx: {
                background: 'rgba(100, 255, 218, 0.1)',
                color: '#64ffda',
                fontSize: '0.7rem'
              }
            }
          )
        )
      ),
      // 查看详情按钮
      React.createElement(
        Button,
        {
          variant: 'outlined',
          size: 'small',
          href: link,
          sx: {
            mt: 'auto',
            borderColor: '#64ffda',
            color: '#64ffda',
            alignSelf: 'flex-start',
            '&:hover': {
              borderColor: '#64ffda',
              background: 'rgba(100, 255, 218, 0.1)'
            }
          }
        },
        '查看详情'
      )
    )
  );
};

// 时间线组件
const ExperienceTimeline = () => {
  const { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, Paper, Typography } = MaterialUI;
  
  const experiences = [
    {
      year: '2022 - 至今',
      title: 'AI Agent 开发者',
      company: '自由开发者',
      description: '独立开发多个AI Agent项目，专注于构建自主决策和工具调用能力的智能助手。'
    },
    {
      year: '2020 - 2022',
      title: '机器学习工程师',
      company: '某科技公司',
      description: '负责NLP模型开发和部署，构建智能对话系统和文本分析工具。'
    },
    {
      year: '2018 - 2020',
      title: '软件开发工程师',
      company: '某互联网企业',
      description: '全栈开发，负责Web应用的前后端实现，参与多个项目的架构设计。'
    },
    {
      year: '2014 - 2018',
      title: '计算机科学学士',
      company: '某知名大学',
      description: '专注于人工智能和数据科学课程，获得优秀毕业生称号。'
    }
  ];
  
  return React.createElement(
    Box,
    {
      sx: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '1rem'
      }
    },
    // 标题
    React.createElement(
      Typography,
      {
        variant: 'h4',
        align: 'center',
        sx: { 
          fontWeight: 600,
          marginBottom: '2rem'
        }
      },
      '工作经历'
    ),
    // 时间线
    React.createElement(
      Timeline,
      {
        position: 'alternate',
        sx: {
          [`& .MuiTimelineItem-root:before`]: {
            display: { xs: 'none', sm: 'block' }
          }
        }
      },
      experiences.map((exp, index) => 
        React.createElement(
          TimelineItem,
          { key: index },
          React.createElement(
            TimelineSeparator,
            null,
            React.createElement(
              TimelineDot,
              {
                sx: {
                  background: index === 0 ? '#64ffda' : 'rgba(100, 255, 218, 0.5)'
                }
              }
            ),
            index < experiences.length - 1 ? React.createElement(TimelineConnector) : null
          ),
          React.createElement(
            TimelineContent,
            null,
            React.createElement(
              Paper,
              {
                elevation: 3,
                sx: {
                  padding: '1.5rem',
                  background: 'rgba(10, 25, 50, 0.5)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    background: 'rgba(10, 25, 50, 0.7)',
                    transform: 'translateY(-5px)',
                    transition: 'all 0.3s ease'
                  }
                }
              },
              React.createElement(
                Typography,
                {
                  variant: 'subtitle2',
                  color: '#64ffda'
                },
                exp.year
              ),
              React.createElement(
                Typography,
                {
                  variant: 'h6',
                  fontWeight: 600
                },
                exp.title
              ),
              React.createElement(
                Typography,
                {
                  variant: 'subtitle1',
                  fontWeight: 500
                },
                exp.company
              ),
              React.createElement(
                Typography,
                {
                  variant: 'body2',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginTop: '0.5rem'
                },
                exp.description
              )
            )
          )
        )
      )
    )
  );
};

// 初始化个人网站React组件
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否成功加载了React组件库
  if (window.React && window.ReactDOM && window.MaterialUI) {
    console.log('个人网站组件库已加载');
    
    // 挂载个人简介组件
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.innerHTML = ''; // 清空原有内容
      const heroRoot = ReactDOM.createRoot(heroContent);
      heroRoot.render(React.createElement(PersonalHero, null));
    }
    
    // 挂载技能展示组件
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const skillsContainer = skillsSection.querySelector('.section-content');
      if (skillsContainer) {
        skillsContainer.innerHTML = ''; // 清空原有内容
        const skillsRoot = ReactDOM.createRoot(skillsContainer);
        skillsRoot.render(React.createElement(SkillsShowcase, null));
      }
    }
    
    // 挂载经历时间线组件
    const experienceSection = document.getElementById('experience');
    if (experienceSection) {
      const experienceContainer = experienceSection.querySelector('.section-content');
      if (experienceContainer) {
        experienceContainer.innerHTML = ''; // 清空原有内容
        const expRoot = ReactDOM.createRoot(experienceContainer);
        expRoot.render(React.createElement(ExperienceTimeline, null));
      }
    }
    
    // 挂载个人信息卡
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const aboutContainer = aboutSection.querySelector('.personal-info-container');
      if (aboutContainer) {
        const personalCardRoot = ReactDOM.createRoot(aboutContainer);
        personalCardRoot.render(React.createElement(PersonalCard, null));
      }
    }
  } else {
    console.error('无法加载React组件，请确保已引入必要的库');
  }
}); 