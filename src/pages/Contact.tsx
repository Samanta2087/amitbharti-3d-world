import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageCircle, Phone, MapPin, Send, Youtube, Instagram } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription here
    toast.success("Successfully subscribed to newsletter!");
    setNewsletterEmail("");
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@amitbharti.com",
      description: "For business inquiries & collaborations"
    },
    {
      icon: MessageCircle,
      title: "Community",
      value: "Telegram Group",
      description: "Join 20K+ members in our community",
      link: "https://t.me/amitbhartiofficial"
    },
    {
      icon: Youtube,
      title: "YouTube",
      value: "@amitbharti",
      description: "130K+ subscribers and growing",
      link: "https://youtube.com/@amitbharti"
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: "@amitbharti027",
      description: "Daily updates and behind-the-scenes",
      link: "https://www.instagram.com/amitbharti027?igsh=MWMxa2dsYXoxM2hwcw=="
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Let's connect! Whether you have a collaboration idea, feedback, or just want to say hello, 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="card-3d p-8 rounded-2xl">
            <h2 className="text-2xl font-poppins font-bold mb-6">Send Me a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="rounded-lg border-border/50 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="rounded-lg border-border/50 focus:border-primary"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Collaboration Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="rounded-lg border-border/50 focus:border-primary"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your idea or question..."
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="rounded-lg border-border/50 focus:border-primary"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full btn-glow">
                <Send className="mr-2" size={20} />
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information & Newsletter */}
          <div className="space-y-8">
            
            {/* Contact Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-poppins font-bold mb-6">Contact Information</h2>
              
              {contactInfo.map((info, index) => (
                <div key={index} className="card-3d p-6 rounded-xl group hover:scale-105 transition-transform duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <info.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{info.title}</h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-accent font-medium transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-primary font-medium">{info.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="card-3d p-8 rounded-2xl">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 animate-float">
                  <Mail size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold mb-2">Stay Updated</h3>
                <p className="text-muted-foreground">
                  Subscribe to my newsletter for the latest updates, exclusive content, and tips!
                </p>
              </div>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="rounded-lg border-border/50 focus:border-primary"
                />
                <Button type="submit" className="w-full btn-glow">
                  Subscribe to Newsletter
                </Button>
              </form>
            </div>

            {/* Quick Links */}
            <div className="card-3d p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-4">Quick Connect</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://youtube.com/@amitbharti" target="_blank" rel="noopener noreferrer">
                    <Youtube className="mr-2" size={16} />
                    YouTube
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.instagram.com/amitbharti027?igsh=MWMxa2dsYXoxM2hwcw==" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2" size={16} />
                    Instagram
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://t.me/amitbhartiofficial" target="_blank" rel="noopener noreferrer">
                    <Send className="mr-2" size={16} />
                    Telegram
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="mt-12 text-center card-3d p-6 rounded-xl">
          <p className="text-muted-foreground">
            <strong>Response Time:</strong> I typically respond to messages within 24-48 hours. 
            For urgent matters, please reach out via Telegram.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;