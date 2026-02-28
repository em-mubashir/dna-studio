import { type Language } from '@/src/lib/utils/language'
import React from 'react'

interface BlogContentProps {
  content: any
  lang: Language
}

/**
 * BlogContent component renders rich text content from Payload CMS Lexical editor
 * 
 * Features:
 * - Supports all Lexical node types (text, headings, lists, quotes, links, code)
 * - Handles text formatting (bold, italic, underline, strikethrough, code)
 * - RTL support for Arabic content
 * - Uses @tailwindcss/typography for consistent styling
 * - Accessible markup with semantic HTML
 */
export default function BlogContent({ content, lang }: BlogContentProps) {
  if (!content) {
    return null
  }

  /**
   * Recursively renders a Lexical node and its children
   */
  const renderNode = (node: any, index: number): React.ReactNode => {
    if (!node) return null

    // Handle text nodes with formatting
    if (node.type === 'text') {
      let textContent: React.ReactNode = node.text || ''
      
      // Apply text formatting using bitwise flags
      // Lexical uses bitwise flags: 1=bold, 2=italic, 4=strikethrough, 8=underline, 16=code, etc.
      if (node.format) {
        const format = node.format
        
        // Bold (1)
        if (format & 1) {
          textContent = <strong>{textContent}</strong>
        }
        
        // Italic (2)
        if (format & 2) {
          textContent = <em>{textContent}</em>
        }
        
        // Strikethrough (4)
        if (format & 4) {
          textContent = <s>{textContent}</s>
        }
        
        // Underline (8)
        if (format & 8) {
          textContent = <u>{textContent}</u>
        }
        
        // Code (16)
        if (format & 16) {
          textContent = (
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
              {textContent}
            </code>
          )
        }
      }
      
      return <React.Fragment key={index}>{textContent}</React.Fragment>
    }

    // Render children for element nodes
    const children = node.children?.map((child: any, i: number) => renderNode(child, i))

    // Handle different element node types
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index}>
            {children}
          </p>
        )
      
      case 'heading':
        // Lexical uses 'tag' property for heading level (h1, h2, etc.)
        const HeadingTag = (node.tag || 'h2') as keyof JSX.IntrinsicElements
        return (
          <HeadingTag key={index}>
            {children}
          </HeadingTag>
        )
      
      case 'list':
        // Lexical uses 'listType' property: 'bullet', 'number', or 'check'
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={index}>
            {children}
          </ListTag>
        )
      
      case 'listitem':
        return (
          <li key={index} value={node.value}>
            {children}
          </li>
        )
      
      case 'quote':
        return (
          <blockquote key={index}>
            {children}
          </blockquote>
        )
      
      case 'link':
        return (
          <a
            key={index}
            href={node.fields?.url || node.url}
            target={node.fields?.newTab || node.newTab ? '_blank' : undefined}
            rel={node.fields?.newTab || node.newTab ? 'noopener noreferrer' : undefined}
          >
            {children}
          </a>
        )
      
      case 'linebreak':
        return <br key={index} />
      
      case 'horizontalrule':
        return <hr key={index} />
      
      case 'code':
        // Code block (not inline code)
        return (
          <pre key={index}>
            <code>{children}</code>
          </pre>
        )
      
      case 'block':
        // Generic block element
        return (
          <div key={index}>
            {children}
          </div>
        )
      
      default:
        // Fallback for unknown node types
        console.warn(`Unknown Lexical node type: ${node.type}`)
        return (
          <div key={index}>
            {children}
          </div>
        )
    }
  }

  /**
   * Renders the root content structure
   */
  const renderContent = () => {
    // Handle both root.children and direct children array
    const nodes = content.root?.children || content.children || []
    
    if (!nodes || nodes.length === 0) {
      return null
    }
    
    return nodes.map((node: any, index: number) => renderNode(node, index))
  }

  return (
    <div 
      className={`
        prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-gray-900
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-code:text-primary-600 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 prose-pre:text-gray-100
        prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-700
        prose-ul:list-disc prose-ol:list-decimal
        prose-li:text-gray-700
        prose-hr:border-gray-300
        ${lang === 'ar' ? 'text-right font-arabic' : 'text-left'}
      `}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
    >
      {renderContent()}
    </div>
  )
}
