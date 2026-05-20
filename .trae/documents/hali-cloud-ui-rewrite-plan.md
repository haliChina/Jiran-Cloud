# Hali Cloud UI 重写计划 — 复杂动画与交互逻辑

## 项目概况

当前项目是一个单文件 HTML 落地页（Hali Cloud — QQ代挂平台），采用暗色命令中心风格。本次重写将使用 **React + TypeScript + Tailwind CSS + shadcn/ui** 技术栈，融入 **p5.js 生成艺术**，打造具有复杂动画效果和深度交互逻辑的全新 UI。

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 18 + TypeScript + Vite |
| 样式 | Tailwind CSS 3.4 + shadcn/ui 主题系统 |
| 组件库 | shadcn/ui（40+ 预装组件） |
| 动画 | Framer Motion（页面过渡、滚动动画、手势交互） |
| 生成艺术 | p5.js（粒子系统、流场、噪声背景） |
| 打包 | Parcel → 单文件 HTML |

---

## 设计方向：**"Quantum Command"** — 量子指挥中心

### 美学定位
- **基调**：暗色赛博朋克 × 量子物理可视化，深邃、精密、未来感
- **色彩**：主色深空黑 `#030408`，强调色量子蓝 `#6EE7FF`，辅助色极光绿 `#00FFB2`，警告色脉冲橙 `#FF8A3D`
- **字体**：展示字体 `Orbitron`（科技感），正文字体 `DM Sans`（清晰可读）
- **记忆点**：全页 p5.js 粒子流场背景 + 鼠标追踪交互 + 3D 卡片倾斜效果

### 与当前设计的关键差异
| 当前 | 重写后 |
|------|--------|
| CSS 动画为主 | Framer Motion 弹性物理动画 |
| 静态雷达 | p5.js 实时粒子流场 |
| 简单 hover 效果 | 3D 倾斜 + 磁性吸附 + 光标追踪 |
| 基础滚动显示 | 视差滚动 + 时间轴动画 + 滚动驱动进度 |
| 纯 CSS 渐变背景 | Canvas 生成艺术动态背景 |
| 基础标签切换 | 弹性滑动切换 + 内容变形过渡 |

---

## 实施步骤

### 阶段 1：项目初始化与基础架构

1. **初始化 React 项目**
   - 运行 `scripts/init-artifact.sh hali-cloud-ui`
   - 配置 Tailwind 自定义主题（颜色、字体、动画 token）
   - 安装额外依赖：`framer-motion`、`@use-gesture/react`

2. **建立设计系统**
   - 创建 `src/theme/` 目录，定义 CSS 变量与 Tailwind 扩展
   - 配色方案：Quantum Blue / Aurora Green / Pulse Orange / Deep Space
   - 动画 token：弹性参数、持续时间、缓动函数
   - 字体加载：Google Fonts 引入 Orbitron + DM Sans

3. **创建布局组件**
   - `QuantumLayout` — 全局布局容器，内嵌 p5.js Canvas 背景
   - `NavigationRail` — 顶部导航栏，磁性 hover + 滚动变形
   - `ScrollProgress` — 量子进度条（渐变 + 粒子尾迹）

### 阶段 2：p5.js 生成艺术组件

4. **创建粒子流场背景** `QuantumField`
   - 基于 Perlin 噪声的流场驱动粒子系统
   - 鼠标位置影响流场方向（排斥/吸引）
   - 粒子颜色随速度变化（慢→深蓝，快→量子蓝→白）
   - 粒子尾迹渐隐效果
   - 性能优化：限制粒子数量，使用 requestAnimationFrame

5. **创建雷达可视化** `QuantumRadar`
   - 替代当前 CSS 雷达，使用 p5.js 绘制
   - 旋转扫描线 + 脉冲波纹 + 随机出现的节点
   - 节点出现/消失的弹性动画
   - 实时数据驱动的节点状态

6. **创建矩阵可视化** `NodeMatrix`
   - 替代当前 CSS 矩阵，使用 Canvas 绘制
   - 每个节点有独立的呼吸动画周期
   - 活跃节点发出涟漪效果
   - 鼠标悬停节点放大 + 信息提示

### 阶段 3：核心页面组件（含复杂动画）

7. **Hero 区域** `HeroSection`
   - 左侧文案区：
     - 标题逐字显现动画（stagger，每个字符延迟 30ms）
     - 副标题打字机效果
     - 统计数据数字滚动动画（从 0 滚动到目标值）
     - CTA 按钮弹性出现 + 磁性 hover 效果
   - 右侧命令中心：
     - 面板卡片 3D 倾斜效果（鼠标追踪）
     - 面板内容实时更新动画
     - 扫描线光效（CSS + Framer Motion）

8. **功能展示区** `FeaturesSection`
   - 大卡片：3D 透视旋转 + 鼠标追踪倾斜
   - 轨道卡片：浮动动画 + 悬停放大 + 光晕效果
   - 核心标签：脉冲呼吸 + 旋转光环
   - 右侧堆叠卡片：滚动触发的交错入场动画

9. **订阅面板** `PricingSection`
   - 切换器：
     - 弹性滑动指示器（spring physics）
     - 切换时内容区域变形过渡（layout animation）
   - 价格卡片：
     - 悬停 3D 倾斜 + 边缘光效
     - 点击涟漪效果
     - 推荐卡片持续微光脉冲
   - 价格数字：计数器动画（切换时从旧值过渡到新值）

10. **优势展示区** `AdvantagesSection`
    - 卡片网格：
      - 滚动触发的交错入场（从不同方向）
      - 悬停时背景渐变旋转
      - 序号数字弹性缩放
    - 鼠标追踪的卡片光泽效果

11. **流程展示区** `ProcessSection`
    - 左侧任务面板：
      - 节点连线动画（SVG 路径描边）
      - 当前步骤高亮脉冲
      - 步骤间连线的流动粒子效果
    - 右侧步骤卡片：
      - 滚动驱动的逐步展现
      - 步骤编号旋转进入
      - 连接线渐变动画

12. **FAQ 区域** `FAQSection`
    - 手风琴组件：
      - Framer Motion AnimatePresence 实现平滑展开/收起
      - 高度自动计算过渡
      - 箭头图标旋转动画
      - 内容淡入 + 向上滑动

13. **CTA 区域** `CTASection`
    - 终端组件：
      - 打字机逐行输出效果
      - 光标闪烁
      - 行出现时的弹性动画
    - 背景扫描线 + 粒子效果

### 阶段 4：全局交互与动画系统

14. **滚动动画系统**
    - 使用 Framer Motion `useScroll` + `useTransform`
    - 视差效果：不同层以不同速度移动
    - 滚动驱动的进度指示器
    - 元素进入视口时的 stagger 入场

15. **鼠标交互系统**
    - 全局鼠标位置追踪（Context）
    - 3D 倾斜效果组件 `TiltCard`
    - 磁性按钮效果 `MagneticButton`
    - 光标追踪光效 `CursorGlow`

16. **页面过渡系统**
    - 区域间的平滑滚动
    - 导航点击时的滚动动画
    - 区域激活状态的视觉反馈

### 阶段 5：响应式与性能优化

17. **响应式适配**
    - 移动端：简化动画（减少粒子数、禁用 3D 倾斜）
    - 平板：中等动画强度
    - 桌面：完整动画体验
    - `prefers-reduced-motion` 媒体查询支持

18. **性能优化**
    - p5.js Canvas 使用 `will-change` 和 GPU 加速
    - 粒子数量根据设备性能动态调整
    - IntersectionObserver 控制非可见区域的动画暂停
    - 图片懒加载 + 预加载关键资源

### 阶段 6：打包与交付

19. **打包为单文件 HTML**
    - 运行 `scripts/bundle-artifact.sh`
    - 验证 `bundle.html` 在浏览器中正常运行
    - 确保所有动画和交互在打包后正常工作

20. **最终验证**
    - 桌面端完整功能测试
    - 移动端响应式测试
    - 动画性能测试（60fps 目标）
    - 所有链接和交互逻辑验证

---

## 文件结构

```
hali-cloud-ui/
├── src/
│   ├── App.tsx                    # 主应用入口
│   ├── main.tsx                   # React 挂载点
│   ├── index.css                  # 全局样式 + Tailwind
│   ├── theme/
│   │   ├── tokens.ts              # 设计 token（颜色、动画参数）
│   │   └── fonts.ts               # 字体加载配置
│   ├── components/
│   │   ├── layout/
│   │   │   ├── QuantumLayout.tsx   # 全局布局 + Canvas 背景
│   │   │   ├── NavigationRail.tsx  # 导航栏
│   │   │   └── ScrollProgress.tsx  # 滚动进度条
│   │   ├── canvas/
│   │   │   ├── QuantumField.tsx    # p5.js 粒子流场
│   │   │   ├── QuantumRadar.tsx    # p5.js 雷达
│   │   │   └── NodeMatrix.tsx      # Canvas 节点矩阵
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx     # Hero 区域
│   │   │   ├── FeaturesSection.tsx # 功能展示
│   │   │   ├── PricingSection.tsx  # 订阅面板
│   │   │   ├── AdvantagesSection.tsx # 优势展示
│   │   │   ├── ProcessSection.tsx  # 流程展示
│   │   │   ├── FAQSection.tsx      # FAQ
│   │   │   └── CTASection.tsx      # CTA
│   │   ├── interactive/
│   │   │   ├── TiltCard.tsx        # 3D 倾斜卡片
│   │   │   ├── MagneticButton.tsx  # 磁性按钮
│   │   │   ├── CursorGlow.tsx      # 光标追踪光效
│   │   │   └── TypeWriter.tsx      # 打字机效果
│   │   └── ui/                     # shadcn/ui 组件
│   ├── hooks/
│   │   ├── useMousePosition.ts     # 鼠标位置追踪
│   │   ├── useScrollAnimation.ts   # 滚动动画
│   │   └── useReducedMotion.ts     # 减少动画偏好
│   └── lib/
│       └── utils.ts                # 工具函数
├── index.html
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## 关键动画清单

| 动画 | 技术 | 位置 |
|------|------|------|
| 粒子流场背景 | p5.js | 全页背景 |
| 雷达旋转扫描 | p5.js | Hero 命令中心 |
| 节点矩阵呼吸 | Canvas | Hero 命令中心 |
| 标题逐字显现 | Framer Motion stagger | Hero 文案 |
| 数字滚动计数 | Framer Motion | Hero 统计 |
| 3D 卡片倾斜 | @use-gesture + Framer Motion | 全局卡片 |
| 磁性按钮 | Framer Motion spring | 全局按钮 |
| 弹性标签切换 | Framer Motion layout | 订阅面板 |
| 滚动视差 | Framer Motion useScroll | 全局 |
| SVG 路径描边 | Framer Motion pathLength | 流程连线 |
| 手风琴展开 | AnimatePresence | FAQ |
| 打字机效果 | 自定义 hook | CTA 终端 |
| 光标追踪光效 | Framer Motion useMotionValue | 全局 |
| 滚动进度条 | Framer Motion useScroll | 顶部 |

---

## 预期成果

一个单文件 HTML 落地页，具备：
- ✅ 全页 p5.js 粒子流场动态背景（鼠标交互）
- ✅ 14+ 种复杂动画效果
- ✅ 3D 倾斜卡片 + 磁性按钮 + 光标追踪
- ✅ 弹性物理动画（非线性缓动）
- ✅ 滚动驱动的视差与进度动画
- ✅ 完整的响应式适配
- ✅ 无障碍访问支持（prefers-reduced-motion）
- ✅ 60fps 流畅性能
