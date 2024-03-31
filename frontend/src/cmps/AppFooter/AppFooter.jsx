import { useState } from "react";
import { ChevronUp } from "lucide-react";
import FooterBottom from "./FooterBottom";
import FooterCollapsibleSection from "./FooterCollapsibleSection";

export function AppFooter() {
  const [expandStates, setExpandStates] = useState({
    categories: false,
    about: false,
    supportAndEducation: false,
    community: false,
    businessSolutions: false,
  });

  function handleToggleIsExpand(category) {
    setExpandStates((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  return (
    <section>
      <footer className="full main-container">
        <div className="app-footer">
          <div className="footer-wrapper">
            <div className="footer-collapsibles">
              <FooterCollapsibleSection
                title="Categories"
                isExpanded={expandStates.categories}
                toggleExpand={() => handleToggleIsExpand("categories")}
              >
                <ul>
                  <li> Graphics & Design</li>
                  <li>Digital Marketing</li>
                  <li>Writing & Translation</li>
                  <li>Video & Animation</li>
                  <li>Music & Audio</li>
                  <li>Fiverr Logo Maker</li>
                  <li>Programming & Tech</li>
                  <li>Data</li>
                  <li>Business</li>
                  <li>Lifestyle</li>
                  <li>Photography</li>
                  <li>End-to-End Projects</li>
                  <li>Sitemap</li>
                </ul>
              </FooterCollapsibleSection>

              <FooterCollapsibleSection
                title="About"
                isExpanded={expandStates.about}
                toggleExpand={() => handleToggleIsExpand("about")}
              >
                <ul>
                  <li> Careers</li>
                  <li>Press & News</li>
                  <li>Partnerships</li>
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Intellectual Property Claims</li>
                  <li>Investor Relations</li>
                </ul>
              </FooterCollapsibleSection>

              <FooterCollapsibleSection
                title="Support and Education"
                isExpanded={expandStates.supportAndEducation}
                toggleExpand={() => handleToggleIsExpand("supportAndEducation")}
              >
                <ul>
                  <li> Help & Support</li>
                  <li>Trust & Safety</li>
                  <li>Selling on Fiverr</li>
                  <li>Buying on Fiverr</li>
                  <li>Fiverr Guides</li>
                  <li>Fiverr Workspace</li>
                  <li>Learn</li>
                </ul>
              </FooterCollapsibleSection>

              <FooterCollapsibleSection
                title="Community"
                isExpanded={expandStates.community}
                toggleExpand={() => handleToggleIsExpand("community")}
              >
                <ul>
                  <li> Help & Support</li>
                  <li>Trust & Safety</li>
                  <li>Selling on Fiverr</li>
                  <li>Buying on Fiverr</li>
                  <li>Fiverr Guides</li>
                  <li>Fiverr Workspace</li>
                  <li>Learn</li>
                </ul>
              </FooterCollapsibleSection>

              <FooterCollapsibleSection
                title="Business Solutions"
                isExpanded={expandStates.businessSolutions}
                toggleExpand={() => handleToggleIsExpand("businessSolutions")}
              >
                <ul>
                  <li> Help & Support</li>
                  <li>Trust & Safety</li>
                  <li>Selling on Fiverr</li>
                  <li>Buying on Fiverr</li>
                  <li>Fiverr Guides</li>
                  <li>Fiverr Workspace</li>
                  <li>Learn</li>
                </ul>
              </FooterCollapsibleSection>
            </div>
          </div>
          {/* <UserMsg /> */}
        </div>
      </footer>
      <FooterBottom />
    </section>
  );
}
