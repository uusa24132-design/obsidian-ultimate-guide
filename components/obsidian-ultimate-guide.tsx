'use client'

import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Link2,
    Tag,
    Network,
    Layout,
    Zap,
    Calendar,
    Database,
    Palette,
    Sparkles,
    ChevronRight,
    Folder,
    Code2
} from 'lucide-react'

/**
 * ObsidianUltimateGuide Component
 * 
 * A stunning, modern single-page interactive guide for Obsidian note-taking app.
 * 
 * Features:
 * - Animated particle/node network background in hero section (knowledge graph visualization)
 * - Dark theme with purple accents (#7C3AED, #A78BFA)
 * - Glassmorphism cards with backdrop-blur effects
 * - Smooth scroll-triggered fade-in animations
 * - Six main sections: Hero, Core Concepts, Features, Hotkeys, Advanced, CTA
 * - Fully responsive design
 * - All content in Chinese (简体中文)
 * 
 * Design: Dark background #0F0F1A, cards #1E1E2E, purple accents, Inter font
 */
export default function ObsidianUltimateGuide() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})

    // Particle animation for hero background
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        // Particle system - use local ref to satisfy TS narrowing
        const c = canvas
        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            size: number

            constructor() {
                this.x = Math.random() * c.width
                this.y = Math.random() * c.height
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = (Math.random() - 0.5) * 0.5
                this.size = Math.random() * 2 + 1
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                if (this.x < 0 || this.x > c.width) this.vx *= -1
                if (this.y < 0 || this.y > c.height) this.vy *= -1
            }

            draw() {
                if (!ctx) return
                ctx.fillStyle = '#7C3AED'
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx.fill()
            }
        }

        // Create particles
        const particles: Particle[] = []
        const particleCount = 80
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        // Animation loop
        let animationId: number
        const animate = () => {
            ctx.fillStyle = 'rgba(15, 15, 26, 0.1)'
            ctx.fillRect(0, 0, c.width, c.height)

            // Update and draw particles
            particles.forEach((particle) => {
                particle.update()
                particle.draw()
            })

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x
                    const dy = p1.y - p2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(124, 58, 237, ${1 - distance / 150})`
                        ctx.lineWidth = 0.5
                        ctx.beginPath()
                        ctx.moveTo(p1.x, p1.y)
                        ctx.lineTo(p2.x, p2.y)
                        ctx.stroke()
                    }
                })
            })

            animationId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationId)
        }
    }, [])

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
                    }
                })
            },
            { threshold: 0.1 }
        )

        const sections = document.querySelectorAll('[data-animate]')
        sections.forEach((section) => observer.observe(section))

        return () => observer.disconnect()
    }, [])

    const hotkeys = [
        { function: '新建笔记', shortcut: 'Ctrl + N', description: '快速创建新文件' },
        { function: '命令面板', shortcut: 'Ctrl + P', description: '搜索并执行任何命令' },
        { function: '快速切换', shortcut: 'Ctrl + O', description: '搜索并跳转笔记' },
        { function: '编辑/预览', shortcut: 'Ctrl + E', description: '切换模式' },
        { function: '加粗', shortcut: 'Ctrl + B', description: '加粗文本' },
        { function: '插入链接', shortcut: '[[', description: '触发双向链接' },
    ]

    const plugins = [
        { icon: <Zap className="h-6 w-6" />, title: '日记 Daily Notes', description: '每日自动创建笔记，记录生活点滴' },
        { icon: <Database className="h-6 w-6" />, title: 'Dataview', description: '像数据库一样查询笔记，生成动态列表' },
        { icon: <Palette className="h-6 w-6" />, title: 'Excalidraw', description: '手绘风格画图，直观表达想法' },
        { icon: <Calendar className="h-6 w-6" />, title: 'Calendar', description: '日历视图配合日记，回顾时间线' },
    ]

    const themes = [
        { name: 'Minimal', color: 'bg-purple-600' },
        { name: 'Primary', color: 'bg-blue-600' },
        { name: 'Blue Topaz', color: 'bg-cyan-600' },
    ]

    return (
        <div className="min-h-screen bg-[#0F0F1A] text-gray-100" style={{ scrollBehavior: 'smooth' }}>
            {/* Hero Section with Particle Background */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{ background: '#0F0F1A' }}
                />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/50 backdrop-blur-sm px-4 py-1.5">
                        知识管理革命
                    </Badge>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-500 bg-clip-text text-transparent leading-tight">
                        Obsidian
                        <br />
                        终极使用指南
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                        不仅仅是笔记软件，更是随你成长的个人知识库
                    </p>
                    <Button
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 group animate-pulse hover:animate-none"
                    >
                        开始探索
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-purple-500/50 rounded-full flex items-start justify-center p-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                    </div>
                </div>
            </section>

            {/* Core Concepts Section */}
            <section
                id="concepts"
                data-animate
                className={`py-24 px-4 transition-all duration-1000 ${isVisible.concepts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-purple-300">
                        核心概念
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        理解这三个概念，你就掌握了 Obsidian 的精髓
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Vault Card */}
                        <Card className="bg-[#1E1E2E] border-purple-500/20 backdrop-blur-lg hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-600/20 group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                                    <Folder className="h-7 w-7 text-purple-400" />
                                </div>
                                <CardTitle className="text-2xl text-purple-300">📂 仓库 (Vault)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 leading-relaxed">
                                    你的笔记就是电脑上的普通文件夹，即使 Obsidian 倒闭，笔记依然可用
                                </p>
                            </CardContent>
                        </Card>

                        {/* Markdown Card */}
                        <Card className="bg-[#1E1E2E] border-purple-500/20 backdrop-blur-lg hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-600/20 group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                                    <Code2 className="h-7 w-7 text-purple-400" />
                                </div>
                                <CardTitle className="text-2xl text-purple-300">📝 Markdown 语法</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 leading-relaxed mb-3">
                                    轻量级标记语言，简单易学：
                                </p>
                                <div className="space-y-1 font-mono text-sm text-gray-400">
                                    <div><span className="text-purple-400">#</span> 标题</div>
                                    <div><span className="text-purple-400">**</span> 加粗</div>
                                    <div><span className="text-purple-400">-</span> 列表</div>
                                    <div><span className="text-purple-400">&gt;</span> 引用</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bidirectional Links Card */}
                        <Card className="bg-[#1E1E2E] border-purple-500/20 backdrop-blur-lg hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-600/20 group">
                            <CardHeader>
                                <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                                    <Link2 className="h-7 w-7 text-purple-400" />
                                </div>
                                <CardTitle className="text-2xl text-purple-300">🔗 双向链接</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300 leading-relaxed">
                                    输入 <code className="px-2 py-1 bg-purple-600/20 rounded text-purple-300 font-mono text-sm">[[</code> 建立笔记间的双向关联，模仿人脑的联通过程
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                data-animate
                className={`py-24 px-4 bg-[#0A0A12] transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-purple-300">
                        功能特性
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        强大而灵活的功能生态
                    </p>

                    <div className="space-y-16">
                        {/* Tag System */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                                        <Tag className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-purple-300">🏷️ 标签系统</h3>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                                    支持嵌套标签，点击可筛选相关笔记
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/50 px-3 py-1">
                                        #项目/阶段1
                                    </Badge>
                                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/50 px-3 py-1">
                                        #读书笔记
                                    </Badge>
                                    <Badge className="bg-purple-600/20 text-purple-300 border-purple-500/50 px-3 py-1">
                                        #待办事项
                                    </Badge>
                                </div>
                            </div>
                            <div className="bg-[#1E1E2E] rounded-3xl p-8 border border-purple-500/20">
                                <div className="space-y-3">
                                    <div className="h-3 bg-purple-600/30 rounded w-3/4" />
                                    <div className="h-3 bg-purple-600/20 rounded w-full" />
                                    <div className="h-3 bg-purple-600/20 rounded w-5/6" />
                                </div>
                            </div>
                        </div>

                        {/* Graph View */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <div className="bg-[#1E1E2E] rounded-3xl p-8 border border-purple-500/20 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Network className="h-32 w-32 text-purple-600/20" />
                                    </div>
                                    <div className="relative">
                                        <div className="flex justify-around mb-8">
                                            <div className="w-12 h-12 rounded-full bg-purple-600/50 animate-pulse" />
                                            <div className="w-16 h-16 rounded-full bg-purple-600/70 animate-pulse" style={{ animationDelay: '100ms' }} />
                                            <div className="w-10 h-10 rounded-full bg-purple-600/40 animate-pulse" style={{ animationDelay: '200ms' }} />
                                        </div>
                                        <div className="flex justify-center gap-8">
                                            <div className="w-14 h-14 rounded-full bg-purple-600/60 animate-pulse" style={{ animationDelay: '300ms' }} />
                                            <div className="w-10 h-10 rounded-full bg-purple-600/40 animate-pulse" style={{ animationDelay: '400ms' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="order-1 md:order-2">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                                        <Network className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-purple-300">🕸️ 关系图谱</h3>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed">
                                    可视化笔记连接的节点图，节点越大表示被引用次数越多。直观展现知识网络结构。
                                </p>
                            </div>
                        </div>

                        {/* Interface Layout */}
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center">
                                        <Layout className="h-6 w-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-purple-300">📐 界面布局</h3>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                                    灵活的三栏布局，完全可自定义
                                </p>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        左侧栏：文件浏览器
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        中央：编辑器
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        右侧栏：大纲 + 反向链接
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                        <kbd className="px-2 py-1 bg-purple-600/20 rounded text-purple-300 text-sm font-mono">Ctrl + E</kbd> 切换模式
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-[#1E1E2E] rounded-3xl p-6 border border-purple-500/20">
                                <div className="grid grid-cols-12 gap-2 h-48">
                                    <div className="col-span-3 bg-purple-600/20 rounded-xl" />
                                    <div className="col-span-6 bg-purple-600/30 rounded-xl" />
                                    <div className="col-span-3 bg-purple-600/20 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hotkeys Section */}
            <section
                id="hotkeys"
                data-animate
                className={`py-24 px-4 transition-all duration-1000 ${isVisible.hotkeys ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-purple-300">
                        快捷键速查
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        熟练使用快捷键，效率提升 10 倍
                    </p>

                    <div className="bg-[#1E1E2E] rounded-3xl overflow-hidden border border-purple-500/20">
                        <table className="w-full">
                            <thead className="bg-purple-600/10 border-b border-purple-500/20">
                                <tr>
                                    <th className="text-left px-6 py-4 text-purple-300 font-semibold">功能</th>
                                    <th className="text-left px-6 py-4 text-purple-300 font-semibold">快捷键</th>
                                    <th className="text-left px-6 py-4 text-purple-300 font-semibold">说明</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotkeys.map((hotkey, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-purple-500/10 hover:bg-purple-600/5 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-gray-200 font-medium">{hotkey.function}</td>
                                        <td className="px-6 py-4">
                                            <kbd className="px-3 py-1.5 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 font-mono text-sm">
                                                {hotkey.shortcut}
                                            </kbd>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{hotkey.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Advanced Section */}
            <section
                id="advanced"
                data-animate
                className={`py-24 px-4 bg-[#0A0A12] transition-all duration-1000 ${isVisible.advanced ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-purple-300">
                        进阶玩法
                    </h2>
                    <p className="text-center text-gray-400 mb-16 text-lg">
                        插件和主题让 Obsidian 更强大
                    </p>

                    {/* Plugins */}
                    <div className="mb-12">
                        <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
                            <Sparkles className="h-6 w-6" />
                            🔌 推荐插件
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {plugins.map((plugin, index) => (
                                <Card
                                    key={index}
                                    className="bg-[#1E1E2E] border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-600/10"
                                >
                                    <CardHeader>
                                        <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-3 text-purple-400">
                                            {plugin.icon}
                                        </div>
                                        <CardTitle className="text-lg text-purple-300">{plugin.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-gray-400 leading-relaxed">{plugin.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Themes */}
                    <div>
                        <h3 className="text-2xl font-bold text-purple-300 mb-6 flex items-center gap-2">
                            <Palette className="h-6 w-6" />
                            🎨 主题推荐
                        </h3>
                        <div className="flex flex-wrap gap-4">
                            {themes.map((theme, index) => (
                                <div
                                    key={index}
                                    className="px-6 py-3 bg-[#1E1E2E] border border-purple-500/20 rounded-2xl hover:border-purple-500/50 transition-all cursor-pointer flex items-center gap-3"
                                >
                                    <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                                    <span className="text-gray-200 font-medium">{theme.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-32 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-purple-300">
                        开始构建你的知识图谱
                    </h2>
                    <p className="text-xl text-gray-300 mb-10">
                        按下 <kbd className="px-3 py-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300 font-mono">Ctrl + N</kbd> 创建你的第一篇笔记
                    </p>
                    <Button
                        size="lg"
                        className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-6 text-lg rounded-2xl shadow-lg shadow-purple-600/50 hover:shadow-purple-600/70 transition-all duration-300 animate-pulse hover:animate-none"
                    >
                        立即开始
                        <Sparkles className="ml-2 h-5 w-5" />
                    </Button>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-purple-500/20 py-8 text-center text-gray-500 text-sm">
                <p>Obsidian 终极使用指南 © 2026. Made with 💜 for knowledge seekers.</p>
            </footer>
        </div>
    )
}
