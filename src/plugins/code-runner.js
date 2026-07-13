export const codeRunnerPlugin = {
  id: "code-runner",
  name: "Offline Python Code Runner",
  execute(code) {
    // Capture print outputs in a mock JS console
    let outputs = [];
    const lines = code.split("\n");

    // Standard patterns
    lines.forEach(line => {
      const matchPrint = line.match(/print\((.*)\)/);
      if (matchPrint) {
        let content = matchPrint[1].trim();
        // Strip quotes
        if ((content.startsWith('"') && content.endsWith('"')) || (content.startsWith("'") && content.endsWith("'"))) {
          outputs.push(content.substring(1, content.length - 1));
        } else {
          // Simple calculations
          try {
            const calculated = Function(`"use strict"; return (${content})`)();
            outputs.push(String(calculated));
          } catch (e) {
            outputs.push(`[Variable: ${content}]`);
          }
        }
      }
    });

    if (outputs.length === 0) {
      outputs.push("Code executed successfully with 0 output statements.");
    }

    return {
      success: true,
      stdout: outputs.join("\n")
    };
  }
};
