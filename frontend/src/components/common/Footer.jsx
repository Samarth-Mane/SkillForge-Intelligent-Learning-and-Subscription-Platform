import React from "react";
import { Link } from "react-router-dom";
import { HiAcademicCap } from "react-icons/hi";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

const footerLinks = {
  Platform: [
    { label: "Browse Courses", to: "/courses" },
    { label: "Pricing", to: "/subscription" },
    { label: "For Teams", to: "/" },
    { label: "For Instructors", to: "/" },
  ],
  Company: [
    { label: "About Us", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Blog", to: "/" },
    { label: "Press Kit", to: "/" },
  ],
  Support: [
    { label: "Help Center", to: "/" },
    { label: "Contact", to: "/" },
    { label: "Community", to: "/" },
    { label: "Status", to: "/" },
  ],
  Legal: [
    { label: "Privacy Policy", to: "/" },
    { label: "Terms of Service", to: "/" },
    { label: "Cookie Policy", to: "/" },
    { label: "Refunds", to: "/" },
  ],
};

const socials = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

const Footer = () => (
  <footer className="border-t border-white/5 bg-navy-950/50">
    <div className="container-max section-padding py-16">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
        {/* Brand col */}
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <HiAcademicCap className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              LearnFlow
            </span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs">
            Accelerate your career with expert-led courses, hands-on projects,
            and industry-recognized certificates.
          </p>
          <div className="flex gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all duration-200"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-slate-200 font-semibold text-sm mb-4">
              {title}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-500 hover:text-slate-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="glow-divider mt-12 mb-6" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} LearnFlow. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1 text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
