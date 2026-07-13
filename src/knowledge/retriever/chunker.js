export function chunkMarkdown(text) {
  const sections = text.split(/(?=## Section:)/g);
  return sections.map(section => {
    const lines = section.trim().split("\n");
    const title = lines[0].replace("## Section:", "").trim();
    const content = lines.slice(1).join("\n").trim();
    
    // Find keywords line if present
    const keywordsLine = lines.find(l => l.toLowerCase().startsWith("keywords:"));
    const keywords = keywordsLine 
      ? keywordsLine.replace(/keywords:/i, "").split(",").map(k => k.trim()) 
      : [];

    return {
      title,
      text: content,
      keywords
    };
  });
}
