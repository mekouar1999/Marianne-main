// Comprehensive prose classes for blog content styling
// Ensures consistent formatting across editor preview and blog display

export const proseClasses = `
prose prose-lg max-w-none
prose-headings:text-gray-900 prose-headings:font-bold
prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-6
prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2
prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed
prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-a:underline
prose-strong:text-gray-900 prose-strong:font-bold
prose-em:text-gray-600 prose-em:italic
prose-ul:mb-4
prose-ol:mb-4
prose-li:text-gray-700 prose-li:leading-relaxed
prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:my-4
`.trim().replace(/\s+/g, ' ');

// Detailed breakdown of what each element does:
/*
Basic prose setup:
- prose prose-lg max-w-none: Base prose styling with large size and no max width

Headings (h1, h2, h3, h4):
- prose-headings:text-gray-900 prose-headings:font-bold: All headings dark gray and bold
- prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-6: H1 large with generous spacing
- prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4: H2 prominent with good spacing
- prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3: H3 medium with moderate spacing
- prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2: H4 smaller with tight spacing

Paragraphs (p):
- prose-p:text-gray-700 prose-p:mb-4 prose-p:leading-relaxed: Readable gray with good spacing

Links (a):
- prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-a:underline: Blue links with hover

Text formatting:
- prose-strong:text-gray-900 prose-strong:font-bold: Bold text dark and prominent
- prose-em:text-gray-600 prose-em:italic: Italic text subtle gray

Lists (ul, ol, li):
- prose-ul:mb-4: Bullet lists with spacing (styling handled by Tailwind typography)
- prose-ol:mb-4: Numbered lists with spacing (styling handled by Tailwind typography)
- prose-li:text-gray-700 prose-li:leading-relaxed: List items readable (positioning handled by Tailwind typography)

Blockquotes:
- prose-blockquote:border-l-4 prose-blockquote:border-gray-300: Left border
- prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600: Indented italic
- prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:my-4: Background and spacing
*/