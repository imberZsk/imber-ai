'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * 通用 Header 组件
 * 提供页面导航功能，支持在首页和待办事项页面之间切换
 */
export default function Header() {
  const pathname = usePathname()

  // 导航链接配置
  const navLinks = [
    { href: '/', label: '聊天' },
    { href: '/todos', label: '待办事项' }
  ]

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/标题 */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              AI Chat App
            </Link>
          </div>

          {/* 导航链接 */}
          <div className="flex space-x-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </header>
  )
}

