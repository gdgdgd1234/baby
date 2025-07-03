import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useVelocity } from 'framer-motion';
import { Code, Palette, Database, Smartphone, Globe, Zap, Star, Sparkles, Heart, Coffee, Rocket, Target, CheckCircle, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const [currentSkill, setCurrentSkill] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  // Smoother scroll animations with reduced intensity
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Gentler mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 150, damping: 50 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 150, damping: 50 });

  // Reduced velocity tracking
  const mouseXVelocity = useVelocity(mouseX);
  const mouseYVelocity = useVelocity(mouseY);
  const velocityFactor = useTransform([mouseXVelocity, mouseYVelocity], ([x, y]) => Math.min(Math.sqrt(x * x + y * y) / 2000, 1.2));

  const movingSkills = [
    "Frontend Development",
    "Backend Development", 
    "UI/UX Design",
    "Mobile Development",
    "Cloud Architecture",
    "DevOps & Deployment"
  ];

  // Reduced particle counts and slower animations
  const skills = [
    { 
      name: 'Frontend Development', 
      icon: Code, 
      description: 'React, TypeScript, Next.js, Tailwind CSS',
      color: 'from-blue-400 to-cyan-400',
      particles: 6,
      delay: 0
    },
    { 
      name: 'Backend Development', 
      icon: Database, 
      description: 'Node.js, Python, PostgreSQL, MongoDB',
      color: 'from-green-400 to-emerald-400',
      particles: 5,
      delay: 0.1
    },
    { 
      name: 'UI/UX Design', 
      icon: Palette, 
      description: 'Figma, Adobe XD, Sketch, Prototyping',
      color: 'from-purple-400 to-pink-400',
      particles: 7,
      delay: 0.2
    },
    { 
      name: 'Mobile Development', 
      icon: Smartphone, 
      description: 'React Native, Flutter, Progressive Web Apps',
      color: 'from-orange-400 to-red-400',
      particles: 4,
      delay: 0.3
    },
    { 
      name: 'Web Technologies', 
      icon: Globe, 
      description: 'HTML5, CSS3, JavaScript, TypeScript',
      color: 'from-indigo-400 to-purple-400',
      particles: 5,
      delay: 0.4
    },
    { 
      name: 'Performance Optimization', 
      icon: Zap, 
      description: 'Webpack, Vite, SEO, Web Vitals',
      color: 'from-yellow-400 to-orange-400',
      particles: 4,
      delay: 0.5
    },
  ];

  // Slower floating elements
  const floatingElements = [
    { icon: Star, delay: 0, duration: 15 },
    { icon: Sparkles, delay: 2, duration: 18 },
    { icon: Heart, delay: 4, duration: 20 },
    { icon: Coffee, delay: 6, duration: 16 },
    { icon: Rocket, delay: 8, duration: 22 },
    { icon: Target, delay: 10, duration: 14 }
  ];

  // How Can I Contribute data
  const contributions = [
    {
      title: "Frontend Development",
      description: "Building responsive, interactive user interfaces with modern frameworks and libraries.",
      points: [
        "React.js & Next.js applications",
        "TypeScript for type-safe development",
        "Responsive design with Tailwind CSS",
        "State management with Redux/Zustand"
      ]
    },
    {
      title: "Backend Development",
      description: "Creating robust server-side applications and APIs for scalable web solutions.",
      points: [
        "RESTful API development",
        "Database design and optimization",
        "Authentication & authorization",
        "Microservices architecture"
      ]
    },
    {
      title: "Full-Stack Solutions",
      description: "End-to-end development from concept to deployment with modern tech stacks.",
      points: [
        "MERN/MEAN stack development",
        "Cloud deployment (AWS, Vercel)",
        "CI/CD pipeline setup",
        "Performance optimization"
      ]
    }
  ];

  // Key Skills data
  const keySkills = [
    { name: "JavaScript", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "React.js", level: 95 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 88 },
    { name: "Python", level: 80 },
    { name: "PostgreSQL", level: 85 },
    { name: "MongoDB", level: 82 },
    { name: "AWS", level: 75 },
    { name: "Docker", level: 78 },
    { name: "Git", level: 92 },
    { name: "Figma", level: 85 }
  ];

  // Mouse tracking with throttling
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          setMousePosition({ x, y });
          mouseX.set(x);
          mouseY.set(y);
        }
      }, 16); // Throttle to ~60fps
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeoutId);
      };
    }
  }, [mouseX, mouseY]);

  // Change skill every 5 seconds (much slower)
  useEffect(() => {
    const skillInterval = setInterval(() => {
      setCurrentSkill(prev => (prev + 1) % movingSkills.length);
    }, 5000); // Increased from 3000 to 5000ms

    return () => clearInterval(skillInterval);
  }, []);

  // Gentler particle system
  const SkillParticles = ({ count, color }: { count: number; color: string }) => {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-gradient-to-r ${color} rounded-full opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              x: [0, Math.sin(i) * 8, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </>
    );
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={containerRef}>
      {/* Slower floating background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-purple-400/10"
            style={{
              left: `${20 + (index * 15)}%`,
              top: `${30 + (index * 10)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(index) * 20, 0],
              rotate: [0, 180],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            <element.icon size={20} />
          </motion.div>
        ))}
      </div>

      {/* Gentler mouse follower effect */}
      <motion.div
        className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl pointer-events-none"
        style={{
          x: mouseXSpring,
          y: mouseYSpring,
          scale: velocityFactor,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.6 }}
      />

      <div className="container mx-auto px-6">
        <motion.div
          style={{ y, opacity, scale }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            About{' '}
            <motion.span 
              className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 6, // Slower gradient animation
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Me
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg max-w-2xl mx-auto"
          >
            I'm a passionate developer with 5+ years of experience creating digital solutions that make a difference.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Side - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-8"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <motion.h3 
              className="text-3xl font-bold text-white mb-6"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              My Story
            </motion.h3>
            
            <motion.div className="space-y-6">
              {[
                "I started my journey in web development 5 years ago and have been passionate about creating beautiful, functional websites ever since. I specialize in modern web technologies and love to work on projects that challenge me to grow as a developer.",
                "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring."
              ].map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="text-gray-300 text-lg leading-relaxed cursor-pointer"
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Moving Skills Text - NO BLINKING CURSOR */}
            <motion.div
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))',
                    'linear-gradient(45deg, rgba(236, 72, 153, 0.05), rgba(6, 182, 212, 0.05))',
                    'linear-gradient(45deg, rgba(6, 182, 212, 0.05), rgba(168, 85, 247, 0.05))'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }} // Much slower
              />
              
              <h4 className="text-lg font-semibold text-white mb-4 relative z-10">Currently Specializing In:</h4>
              <div className="flex items-center h-8 relative z-10">
                <motion.span
                  key={currentSkill}
                  initial={{ opacity: 0, x: 20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -20, scale: 0.9 }}
                  transition={{ 
                    duration: 1.2, // Much slower transition
                    ease: "easeOut"
                  }}
                  className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-bold text-xl"
                >
                  {movingSkills[currentSkill]}
                </motion.span>
              </div>
            </motion.div>

            {/* Stats with gentler animations */}
            <motion.div 
              className="flex space-x-8 pt-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { value: "50+", label: "Projects", color: "text-purple-400" },
                { value: "5+", label: "Years", color: "text-pink-400" },
                { value: "100+", label: "Happy Clients", color: "text-cyan-400" }
              ].map((stat, index) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`text-3xl font-bold ${stat.color}`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: 1 + index * 0.1, 
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.3 }
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Character with slower animations */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative flex justify-center"
            style={{ perspective: "1000px" }}
          >
            <motion.div 
              className="relative w-full h-96"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Slower background rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border-2 border-purple-400/10"
                  style={{
                    scale: 1 + i * 0.1,
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20 + i * 10, // Much slower
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
              
              <motion.div 
                className="relative w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center overflow-hidden"
                style={{ transformStyle: "preserve-3d" }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.2)",
                    "0 0 30px rgba(236, 72, 153, 0.2)",
                    "0 0 20px rgba(168, 85, 247, 0.2)"
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity }} // Slower glow
              >
                {/* Fewer, slower particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -60, 0],
                      x: [0, Math.sin(i) * 30, 0],
                      opacity: [0, 0.4, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 8 + Math.random() * 4, // Much slower
                      repeat: Infinity,
                      delay: Math.random() * 4,
                      ease: "easeInOut"
                    }}
                  />
                ))}
                
                <motion.div 
                  className="text-8xl relative z-10"
                  animate={{ 
                    rotateY: [0, 5, -5, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 8, // Much slower
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 10,
                    transition: { duration: 0.5 }
                  }}
                >
                  👩‍💼
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* How Can I Contribute Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <motion.div className="text-center mb-12">
            <motion.h3 
              className="text-3xl font-bold text-white mb-6"
              whileHover={{ scale: 1.02 }}
            >
              How Can I{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Contribute
              </span>
            </motion.h3>
            <motion.p 
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              I bring a comprehensive skill set to help your projects succeed from conception to deployment.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contributions.map((contribution, index) => (
              <motion.div
                key={contribution.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                className="group relative bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    background: [
                      `linear-gradient(45deg, rgba(168, 85, 247, 0.03), rgba(236, 72, 153, 0.03))`,
                      `linear-gradient(45deg, rgba(236, 72, 153, 0.03), rgba(6, 182, 212, 0.03))`,
                      `linear-gradient(45deg, rgba(6, 182, 212, 0.03), rgba(168, 85, 247, 0.03))`
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                />

                <div className="relative z-10">
                  <motion.h4 
                    className="text-xl font-semibold text-white mb-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {contribution.title}
                  </motion.h4>
                  
                  <motion.p 
                    className="text-gray-400 mb-4"
                    whileHover={{ color: "#e5e7eb" }}
                    transition={{ duration: 0.2 }}
                  >
                    {contribution.description}
                  </motion.p>

                  <ul className="space-y-2">
                    {contribution.points.map((point, pointIndex) => (
                      <motion.li
                        key={pointIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + pointIndex * 0.1 + 0.5, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-gray-300 group/item"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm group-hover/item:text-white transition-colors duration-300">
                          {point}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.h3 
            className="text-3xl font-bold text-white mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Key{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h3>
          <motion.p 
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Technical expertise across modern web development technologies and tools.
          </motion.p>
        </motion.div>

        <motion.div 
          ref={skillsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {keySkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                <span className="text-purple-400 font-medium">{skill.level}%</span>
              </div>
              
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ 
                    delay: index * 0.1 + 0.3, 
                    duration: 1.2,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full relative"
                >
                  <motion.div
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;