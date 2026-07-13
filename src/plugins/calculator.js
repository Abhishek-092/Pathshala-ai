export const calculatorPlugin = {
  id: "calculator",
  name: "Offline Scientific Calculator",
  execute(expression) {
    try {
      // Safe math evaluation
      const clean = expression.replace(/[^0-9+\-*/().]/g, "");
      const res = Function(`"use strict"; return (${clean})`)();
      return { success: true, result: res };
    } catch (e) {
      return { success: false, error: "Invalid math expression." };
    }
  }
};
