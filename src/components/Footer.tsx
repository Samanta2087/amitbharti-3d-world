import { Link } from "react-router-dom";
import { Youtube, Instagram, Send, Mail, Heart } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Videos", path: "/videos" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Merch", path: "/merch" },
    { name: "Contact", path: "/contact" }
  ];

  const socialLinks = [
    {
      icon: Youtube,
      href: "https://youtube.com/@amitbharti",
      label: "YouTube",
      color: "hover:text-red-500"
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/amitbharti027?igsh=MWMxa2dsYXoxM2hwcw==",
      label: "Instagram",
      color: "hover:text-pink-500"
    },
    {
      icon: Send,
      href: "https://t.me/amitbhartiofficial",
      label: "Telegram",
      color: "hover:text-blue-500"
    },
    {
      icon: Mail,
      href: "mailto:hello@amitbharti.com",
      label: "Email",
      color: "hover:text-green-500"
    }
  ];

  return (
    <footer className="bg-card/50 border-t border-border/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-xl text-white shadow-lg">
                AB
              </div>
              <span className="font-poppins font-bold text-2xl gradient-text">
                Amit Bharti
              </span>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              Creating educational content that inspires, educates, and empowers. 
              Join our community of learners and let's grow together!
            </p>
            
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-muted/50 text-muted-foreground transition-all duration-300 ${social.color} hover:bg-primary/10 hover:scale-110 hover:shadow-lg`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Stats */}
          <div>
            <h3 className="font-poppins font-semibold text-lg mb-4">Community</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <span className="text-primary font-semibold">130K+</span>
                <span className="text-muted-foreground ml-2">YouTube Subscribers</span>
              </div>
              <div className="text-sm">
                <span className="text-primary font-semibold">30K+</span>
                <span className="text-muted-foreground ml-2">Instagram Followers</span>
              </div>
              <div className="text-sm">
                <span className="text-primary font-semibold">20K+</span>
                <span className="text-muted-foreground ml-2">Community Members</span>
              </div>
              <div className="text-sm">
                <span className="text-primary font-semibold">500+</span>
                <span className="text-muted-foreground ml-2">Videos Created</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="card-3d p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-poppins font-semibold text-lg mb-2">Stay Curious. Keep Learning.</h3>
              <p className="text-muted-foreground">Follow along on YouTube for more educational content!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-border/50 bg-background/50 focus:border-primary focus:outline-none min-w-[250px]"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/50">
          <div className="flex items-center text-muted-foreground text-sm mb-4 md:mb-0">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 mx-1 fill-current" />
            <span>for the learning community</span>
          </div>
          
          <div className="text-muted-foreground text-sm text-center md:text-right">
            <p>© 2024 Amit Bharti. All rights reserved.</p>
            <p className="mt-1">
              Educational content creator • Tech reviewer • Knowledge sharer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;