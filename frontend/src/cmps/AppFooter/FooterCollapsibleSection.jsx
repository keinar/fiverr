import { ChevronDown } from "lucide-react";
import React from "react";

export default function FooterCollapsibleSection({
  title,
  children,
  isExpanded,
  toggleExpand,
}) {
  return (
    <div className="footer-item">
      <article>
        <div className="footer-title-wrapper">
          <div className="item-title">{title}</div>
          <div
            className={`chevron-wrapper ${isExpanded ? "chevron-toggle" : ""}`}
            onClick={toggleExpand}
          >
            <ChevronDown size={20} color="#62646a" />
          </div>
        </div>
        <div
          className={`footer-collapsible-content ${
            isExpanded ? "display-content" : ""
          }`}
        >
          {children}
        </div>
      </article>
    </div>
  );
}
