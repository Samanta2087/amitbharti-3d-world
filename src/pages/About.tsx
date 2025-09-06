import { Button } from "@/components/ui/button";
import { Users, Video, Award, TrendingUp, Heart, Target, Lightbulb } from "lucide-react";

const About = () => {
  const achievements = [
    {
      icon: Users,
      number: "130K+",
      label: "YouTube Subscribers",
      description: "Growing community of learners"
    },
    {
      icon: Video,
      number: "500+",
      label: "Videos Uploaded",
      description: "Educational content created"
    },
    {
      icon: Award,
      number: "50+",
      label: "Collaborations",
      description: "With creators and brands"
    },
    {
      icon: TrendingUp,
      number: "1M+",
      label: "Total Views",
      description: "Impact across platforms"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Passion for Teaching",
      description: "Making learning clear, fun, and useful for everyone"
    },
    {
      icon: Target,
      title: "Goal-Oriented",
      description: "Helping people learn something new in every video"
    },
    {
      icon: Lightbulb,
      title: "Innovative Content",
      description: "Fresh perspectives on education and online earning"
    }
  ];

  const timeline = [
    {
      year: "2020",
      title: "Channel Creation",
      description: "Started my YouTube journey with educational content"
    },
    {
      year: "2021",
      title: "10K Subscribers",
      description: "Reached first major milestone with consistent content"
    },
    {
      year: "2022",
      title: "50K Subscribers",
      description: "Expanded into tech reviews and Ayurveda insights"
    },
    {
      year: "2023",
      title: "100K Subscribers",
      description: "Hit six figures and launched community programs"
    },
    {
      year: "2024",
      title: "130K+ Subscribers",
      description: "Current milestone with diversified content portfolio"
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16 fade-in-up">
          <h1 className="text-4xl md:text-6xl font-poppins font-bold gradient-text mb-6">
            About Amit Bharti
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm Amit Bharti, a passionate YouTuber dedicated to making learning clear, fun, and useful. 
            Join my journey of education, growth, and inspiring content creation.
          </p>
        </div>

        {/* Profile & Bio Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary-glow rounded-3xl blur-3xl opacity-30"></div>
              <img
                src="https://i.postimg.cc/FRL4NYJd/amitbharti027-20250809-0001.jpg"
                alt="Amit Bharti"
                className="relative z-10 w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-primary/20"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-poppins font-bold text-foreground">
              My Story
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Welcome to my world! I'm Amit Bharti, and I believe that learning should be 
                accessible, engaging, and practical for everyone. My journey started with a 
                simple goal: to help people learn something new in every video I create.
              </p>
              <p>
                What began as a passion for sharing knowledge has grown into a thriving 
                community of over 130,000 subscribers who join me in exploring topics from 
                technology and health to Ayurveda and online earning opportunities.
              </p>
              <p>
                My inspiration comes from the belief that education should break barriers 
                and empower individuals to achieve their goals. Every piece of content I 
                create is designed with this philosophy in mind.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">My Mission</h3>
              <p className="text-muted-foreground">
                To create educational content that not only informs but transforms lives, 
                helping my audience develop new skills, gain insights, and achieve their 
                personal and professional goals.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12">What Drives Me</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card-3d p-8 rounded-xl text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12">Achievements</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="card-3d p-6 rounded-xl text-center group hover:scale-105 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <achievement.icon size={24} />
                </div>
                <div className="stat-number text-2xl">{achievement.number}</div>
                <div className="font-semibold text-sm mb-1">{achievement.label}</div>
                <div className="text-xs text-muted-foreground">{achievement.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="text-3xl font-poppins font-bold text-center mb-12">My Journey</h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="card-3d p-6 rounded-xl">
                      <div className="text-2xl font-bold text-primary mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-background relative z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center card-3d p-12 rounded-3xl">
          <h2 className="text-3xl font-poppins font-bold mb-4">Let's Connect</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join my community of learners and let's grow together. Subscribe to my channel 
            and be part of this amazing educational journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="btn-glow" asChild>
              <a href="https://youtube.com/@amitbharti" target="_blank" rel="noopener noreferrer">
                Subscribe on YouTube
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://t.me/amitbhartiofficial" target="_blank" rel="noopener noreferrer">
                Join Telegram Community
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;