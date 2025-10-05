import { c as createComponent, d as createAstro, r as renderComponent, a as renderTemplate, f as renderSlot, m as maybeRenderHead } from './vendor-Cr_-A01q.js';
import 'kleur/colors';

const $$Astro = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Button;
  const {
    variant = "primary",
    size = "md",
    href,
    type = "button",
    disabled = false,
    fullWidth = false,
    loading = false,
    icon,
    iconPosition = "left",
    class: className = "",
    ...rest
  } = Astro2.props;
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantStyles = {
    primary: "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500",
    secondary: "bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500",
    outline: "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    emergency: "bg-gold-500 text-charcoal-900 hover:bg-gold-600 focus:ring-gold-400 shadow-lg"
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} ${className}`;
  const Element = href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Element", Element, { "class": classes, "href": href, "type": !href ? type : void 0, "disabled": disabled || loading, ...rest }, { "default": ($$result2) => renderTemplate`${loading && renderTemplate`${maybeRenderHead()}<svg class="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> </svg>`}${icon && iconPosition === "left" && !loading && renderTemplate`<span class="mr-2">${icon}</span>`}${renderSlot($$result2, $$slots["default"])} ${icon && iconPosition === "right" && !loading && renderTemplate`<span class="ml-2">${icon}</span>`}` })}`;
}, "/Users/yaronhayo/Desktop/KeyKingsKiro/src/components/ui/Button.astro", void 0);

export { $$Button as $ };
