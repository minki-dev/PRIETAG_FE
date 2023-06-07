import Link from 'next/link'
import React from 'react'


export default function Header() {
  return (
    <nav>
      <Link href='/'>
        {/* 로고 */}
      </Link>
      <ul>
        <Link href='/'>홈</Link>
        <Link href='/editTemplate'>템플릿 편집</Link>
        <Link href='/dashboard'>대시보드</Link>
      </ul>
    </nav>
  )
}
