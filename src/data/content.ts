export type Lang = 'zh' | 'en';

type Dict = {
  brand: string;
  nav: { home: string; members: string; projects: string; papers: string; news: string };
  home: {
    badge: string;
    title: string;
    intro: string;
    highlights: { title: string; desc: string }[];
    quick: string;
  };
};

export const dict: Record<Lang, Dict> = {
  zh: {
    brand: 'LAB · ASTRO',
    nav: { home: '首页', members: '成员', projects: '项目', papers: '论文', news: '新闻' },
    home: {
      badge: 'Prototype v1 / Data-driven + i18n scaffold',
      title: '课题组官网（Astro 本地原型）',
      intro: '目标：先把视觉与信息架构跑起来，不碰服务器。你在公司 fetch 后即可本地预览。',
      highlights: [
        { title: '研究方向', desc: 'Embodied AI / HCI / Robotics' },
        { title: '近期成果', desc: '2026 已发表 8 篇论文，2 个开源项目' },
        { title: '招生与合作', desc: '欢迎本科实习、联合培养、企业课题合作' }
      ],
      quick: '快速入口'
    }
  },
  en: {
    brand: 'LAB · ASTRO',
    nav: { home: 'Home', members: 'Members', projects: 'Projects', papers: 'Papers', news: 'News' },
    home: {
      badge: 'Prototype v1 / Data-driven + i18n scaffold',
      title: 'Lab Website (Astro Local Prototype)',
      intro: 'Goal: finalize visual language and information architecture locally before any server deployment.',
      highlights: [
        { title: 'Research', desc: 'Embodied AI / HCI / Robotics' },
        { title: 'Recent Outputs', desc: '8 papers in 2026, 2 open-source projects' },
        { title: 'Join & Collaborate', desc: 'Internship, joint training, and industry collaboration welcome' }
      ],
      quick: 'Quick Links'
    }
  }
};

export const members = [
  { name: 'Prof. Zhang', role: { zh: '负责人 (PI)', en: 'PI' }, area: 'HCI + Robotics' },
  { name: 'Alice', role: { zh: '博士生', en: 'PhD' }, area: 'Vision-Language Agents' },
  { name: 'Bob', role: { zh: '硕士生', en: 'Master' }, area: 'Embodied Planning' },
  { name: 'Carol', role: { zh: '研究助理', en: 'RA' }, area: 'Human-in-the-loop System' }
];

export const projects = [
  { title: 'Project Orion', tag: 'Embodied AI', status: { zh: '进行中', en: 'Ongoing' } },
  { title: 'LabSite Pipeline', tag: 'Infra', status: { zh: '原型阶段', en: 'Prototype' } },
  { title: 'Multimodal Tutor', tag: 'EdTech', status: { zh: '规划中', en: 'Planning' } }
];

export const papers = [
  { year: 2026, title: 'Interactive Agents for Lab Knowledge Ops', venue: 'CHI' },
  { year: 2025, title: 'Embodied Skill Transfer with Sparse Demo', venue: 'ICRA' },
  { year: 2025, title: 'Human Feedback for Multi-agent Planning', venue: 'NeurIPS Workshop' }
];

export const news = [
  { date: '2026-02-28', title: { zh: '官网 Astro 原型上线（本地）', en: 'Astro local prototype launched' } },
  { date: '2026-02-20', title: { zh: '实验室春季招新启动', en: 'Spring recruitment started' } },
  { date: '2026-02-10', title: { zh: '两项论文被会议接收', en: 'Two papers accepted' } }
];
