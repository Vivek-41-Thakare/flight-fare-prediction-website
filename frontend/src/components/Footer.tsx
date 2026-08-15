import React from "react";

export function Footer(): React.JSX.Element {
  return React.createElement(
    "footer",
    { className: "border-t border-border/40 bg-muted/30" },
    React.createElement(
      "div",
      { className: "container py-8" },
      React.createElement(
        "div",
        { className: "flex flex-col items-center justify-center gap-4 text-center" },
        React.createElement(
          "p",
          { className: "text-sm text-muted-foreground" },
          "© 2026. Built by Vivek Thakare"
        )
      )
    )
  );
}
