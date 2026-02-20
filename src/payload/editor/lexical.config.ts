import type { LexicalEditorProps } from '@payloadcms/richtext-lexical'

/**
 * Lexical Editor Configuration for DNA Media CMS
 * 
 * This configuration provides a rich text editing experience with:
 * - Standard formatting (bold, italic, underline, strikethrough)
 * - Headings (H1-H6)
 * - Lists (ordered and unordered)
 * - Links
 * - Block quotes
 * - Code blocks
 * - Horizontal rules
 * - Alignment options
 * - Indentation
 * 
 * The editor supports bilingual content (English and Arabic) with RTL support.
 */
export const lexicalEditorConfig: LexicalEditorProps = {
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    // Additional custom features can be added here in the future
    // Examples:
    // - Custom blocks
    // - Media embeds
    // - Tables
    // - Custom formatting
  ],
}
