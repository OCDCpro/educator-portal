// @ts-nocheck
import { defineConfig } from 'vitepress'
import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

// Helper function to extract first H1 heading from markdown file
function getTitleFromMarkdown (filePath: string): string {
  const fullPath = path.join(handbookRoot, `${filePath}.md`)
  try {
    const content = fs.readFileSync(fullPath, 'utf-8')
    // Match first H1 heading (# Title)
    const match = content.match(/^#\s+(.+)$/m)
    if (match) {
      return match[1].trim()
    }
  } catch (error) {
    // If file doesn't exist or can't be read, fall back to filename
  }
  
  // Fallback: use filename
  const fileName = filePath.split('/').pop()
  return fileName.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
}

// Build a dictionary of all handbook files and their titles
const handbookRoot = path.resolve(process.cwd(), 'src/librelane-materials/handbook/source')
const titleMap: Record<string, string> = {}

function buildTitleMap(dir: string, basePath: string = '') {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = basePath ? `${basePath}/${entry.name}` : entry.name
      
      if (entry.isDirectory()) {
        buildTitleMap(fullPath, relativePath)
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const filePathWithoutExt = relativePath.replace(/\.md$/, '')
        titleMap[filePathWithoutExt] = getTitleFromMarkdown(filePathWithoutExt)
      }
    }
  } catch (error) {
    console.warn(`Could not read directory ${dir}:`, error)
  }
}

buildTitleMap(handbookRoot)

// Plugin to convert Sphinx {doc} references to markdown links
function docReferencePlugin(md) {
  // Pattern: {doc}`title <path>` or {doc}`path`
  const docPattern = /\{doc\}`([^`]+)`/g
  
  // Hook into inline text rendering
  md.core.ruler.before('inline', 'doc-references', (state) => {
    const tokens = state.tokens

    for (let i = 0; i < tokens.length; i++) {
      if (tokens[i].type !== 'inline') continue
      
        const token = tokens[i]
        
        const text = token.content
        if (!text.includes('{doc}')) continue
        
        // Parse and replace {doc} references
        const matches = [...text.matchAll(docPattern)]
        if (matches.length === 0) continue

        token.content = text.replace(docPattern, (match, content) => {
            // Extract path from content (handle both `title <path>` and `path` formats)
            const angleMatch = content.match(/^(.+?)\s*<(.+?)>$/)
            const path = angleMatch ? angleMatch[2].trim() : content.trim()
            return `[${path}](${path})`
        })
        const newTokens = []        
    }
    
    return true
  })
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "src",
  ignoreDeadLinks: true,
  // Don't render the Reveal markdown file as a standalone page
  srcExclude: [
    'librelane-materials/slides/slides.md'
  ],
  
  // Configure Vite to handle missing images gracefully
  vite: {
    plugins: [
      {
        name: 'ignore-missing-images',
        resolveId(id) {
          // If it's an image that might be missing, return a placeholder
          if (/\.(jpg|jpeg|png|gif|svg|webp)$/.test(id) && id.includes('Bilder5')) {
            // Return the id itself to prevent further resolution
            return '\0virtual:missing-image'
          }
        },
        load(id) {
          if (id === '\0virtual:missing-image') {
            // Return a data URL for a transparent 1x1 pixel
            return `export default "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"`
          }
        }
      }
    ]
  },
  
  // Set base path dynamically based on environment variable
  // Usage: BASE_PATH=/my-repo/ npm run docs:build
  // Or in package.json: "docs:build:prod": "BASE_PATH=/ocdcpro-ttt-portal/ vitepress build"
  base: process.env.BASE_PATH || '/',
  
  title: "OCDCpro Educator Portal",
  themeConfig: {
    // Show deeper on-page outline (right sidebar) similar to Sphinx
    outline: 'deep',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Overview', link: '/overview/' },
      { text: 'Handbook', link: '/handbook/' },
      { text: 'Overview Slides', link: '/overview-slides/' },
      { text: 'Materials', link: '/materials/' }
    ],

    // Use path-based sidebars so /handbook/ shows a dedicated, auto-generated sidebar
    sidebar: {
      '/handbook/': [
        {
          text: 'Handbook',
          items: (() => {
            const tocPath = path.resolve(process.cwd(), 'src/librelane-materials/handbook/source/_toc.yml')
            const handbookRoot = path.resolve(process.cwd(), 'src/librelane-materials/handbook/source')
            
            // Recursive function to process TOC entries
            const processEntries = (entries: any[]): any[] => {
              return entries.map((entry: any) => {
                const filePath = entry.file.replace(/\.md$/, '')
                const title = getTitleFromMarkdown(filePath)
                
                const item: any = {
                  text: title,
                  link: `/handbook/${filePath}/`
                }
                
                // If this entry has nested entries, process them recursively
                if (entry.entries && Array.isArray(entry.entries)) {
                  item.items = processEntries(entry.entries)
                  item.collapsed = false  // Keep sections expanded by default
                }
                
                return item
              })
            }
            
            try {
              const tocContent = fs.readFileSync(tocPath, 'utf-8')
              const toc = yaml.load(tocContent)
              
              return processEntries(toc.entries)
            } catch (error) {
              console.warn('Could not read _toc.yml:', error)
              return []
            }
          })()
        }
      ],
      '/': [
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ocdcpro' }
    ]
  },

  // Map the handbook sources to live under /handbook/
  // Keys are paths relative to srcDir ("src/")
  rewrites: {
    'librelane-materials/handbook/source/:rest*': 'handbook/:rest*',
  },

  markdown: {
    config: (md) => {
      md.use(docReferencePlugin)
    }
  }
})
