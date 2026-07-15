import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Menu, X, Code, Palette, Video, Monitor, Layout, User, Mail, Phone, Github, Linkedin, Twitter, ArrowRight, CheckCircle, Star, Briefcase, Calendar } from 'lucide-react';

const PortfolioDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
 
  const [currentProject, setCurrentProject] = useState(0);

  const services = [
    {
      id: 'ui-ux',
      title: 'UI/UX Design',
      icon: <Layout size={24} />,
      description: 'User-centered design solutions that enhance digital experiences',
      skills: ['User Research', 'Wireframing', 'Prototyping', 'Visual Design'],
      projects: 45,
      color: '#6366f1'
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      icon: <Palette size={24} />,
      description: 'Creative visual solutions for branding and marketing materials',
      skills: ['Brand Identity', 'Logo Design', 'Print Design', 'Digital Graphics'],
      projects: 38,
      color: '#8b5cf6'
    },
    {
      id: 'video-editing',
      title: 'Video Editing',
      icon: <Video size={24} />,
      description: 'Professional video production and post-production services',
      skills: ['Motion Graphics', 'Color Grading', 'Audio Editing', 'Visual Effects'],
      projects: 22,
      color: '#06b6d4'
    },
    {
      id: 'web-development',
      title: 'Web Development',
      icon: <Code size={24} />,
      description: 'Full-stack web applications built with modern technologies',
      skills: ['React.js', 'Node.js', 'Database Design', 'API Development'],
      projects: 31,
      color: '#10b981'
    },
    {
      id: 'web-design',
      title: 'Web Design',
      icon: <Monitor size={24} />,
      description: 'Responsive and visually appealing website designs',
      skills: ['Responsive Design', 'CSS3', 'JavaScript', 'User Interface'],
      projects: 42,
      color: '#f59e0b'
    }
  ];

  const recentProjects = [
    { name: 'E-commerce Platform', type: 'Web Development', status: 'Completed' },
    { name: 'Brand Identity Package', type: 'Graphic Design', status: 'In Progress' },
    { name: 'Mobile App UI', type: 'UI/UX Design', status: 'Completed' },
    { name: 'Product Demo Video', type: 'Video Editing', status: 'Review' }
  ];

  const stats = [
    { label: 'Total Projects', value: '178', icon: <Briefcase size={20} /> },
    { label: 'Client Satisfaction', value: '98%', icon: <Star size={20} /> },
    { label: 'Years Experience', value: '6+', icon: <Calendar size={20} /> },
    { label: 'Active Clients', value: '24', icon: <User size={20} /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % recentProjects.length);
    }, 3000);
    return () => clearInterval(interval);
  });

  const tabStyles = {
    container: {
      display: 'flex',
      borderBottom: '2px solid #f1f5f9',
      marginBottom: '2rem',
      overflowX: 'auto'
    },
    tab: {
      padding: '1rem 1.5rem',
      cursor: 'pointer',
      fontSize: '0.95rem',
      fontWeight: '500',
      color: '#64748b',
      borderBottom: '2px solid transparent',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease'
    },
    activeTab: {
      color: '#3b82f6',
      borderBottomColor: '#3b82f6'
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      marginTop:'6rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
    

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem'
      }}>
        {/* Tab Navigation */}
        <div style={tabStyles.container}>
          {['overview', 'services', 'projects', 'contact'].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...tabStyles.tab,
                ...(activeTab === tab ? tabStyles.activeTab : {})
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {/* Welcome Section */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              marginBottom: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Welcome to My Creative Portfolio
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '1.5rem'
              }}>
                I'm a multidisciplinary creative professional specializing in UI/UX design, 
                graphic design, video editing, web development, and web design. With over 6 years 
                of experience, I help businesses create compelling digital experiences.
              </p>
              <Link to='/Portfolio' style={{
                textDecoration:'none',
                width:'1.5rem',
              }}>
              <button style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2563eb';
                e.target.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#3b82f6';
                e.target.style.transform = 'translateY(0)';
              }}>
                View My Work <ArrowRight size={16} />
              </button>
              </Link>
            </div>
          
            {/* Stats Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <div style={{
                    backgroundColor: '#f1f5f9',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    color: '#3b82f6'
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: '700',
                      color: '#1e293b'
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: '#64748b'
                    }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Projects */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '2rem',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '1.5rem'
              }}>
                Recent Projects
              </h3>
              <div style={{
                display: 'grid',
                gap: '1rem'
              }}>
                {recentProjects.map((project, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '1rem',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: currentProject === index ? '#f8fafc' : 'transparent',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div>
                      <div style={{
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#1e293b'
                      }}>
                        {project.name}
                      </div>
                      <div style={{
                        fontSize: '0.9rem',
                        color: '#64748b'
                      }}>
                        {project.type}
                      </div>
                    </div>
                    <div style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      backgroundColor: project.status === 'Completed' ? '#dcfce7' : 
                                     project.status === 'In Progress' ? '#fef3c7' : '#e0e7ff',
                      color: project.status === 'Completed' ? '#166534' : 
                             project.status === 'In Progress' ? '#92400e' : '#3730a3'
                    }}>
                      {project.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                My Services
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Comprehensive creative services to bring your digital vision to life
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem'
            }}>
              {services.map((service) => (
                <div
                  key={service.id}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '2rem',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #e2e8f0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-4px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '4px',
                    backgroundColor: service.color
                  }} />
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{
                      backgroundColor: `${service.color}20`,
                      padding: '0.75rem',
                      borderRadius: '10px',
                      color: service.color
                    }}>
                      {service.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.3rem',
                        fontWeight: '600',
                        color: '#1e293b',
                        margin: 0
                      }}>
                        {service.title}
                      </h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#64748b',
                        margin: 0
                      }}>
                        {service.projects} projects completed
                      </p>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: '1.6',
                    marginBottom: '1.5rem'
                  }}>
                    {service.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    {service.skills.map((skill, index) => (
                      <span
                        key={index}
                        style={{
                          padding: '0.4rem 0.8rem',
                          backgroundColor: '#f1f5f9',
                          color: '#475569',
                          fontSize: '0.85rem',
                          fontWeight: '500',
                          borderRadius: '20px'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button style={{
                    width: '100%',
                    padding: '0.75rem',
                    backgroundColor: service.color,
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}>
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Featured Projects
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#64748b',
              marginBottom: '2rem'
            }}>
              Coming soon - A showcase of my best work across all service areas
            </p>
            <div style={{
              padding: '3rem',
              backgroundColor: '#f8fafc',
              borderRadius: '8px',
              border: '2px dashed #cbd5e1'
            }}>
              <Briefcase size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>
                Project gallery under construction
              </p>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div>
            <div style={{
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '1rem'
              }}>
                Let's Work Together
              </h2>
              <p style={{
                fontSize: '1.1rem',
                color: '#64748b',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                Ready to start your next project? Get in touch and let's create something amazing together.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Contact Info */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '1.5rem'
                }}>
                  Contact Information
                </h3>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {[
                    { icon: <Mail size={20} />, label: 'Email', value: '  aminkengivan@gmail.com' },
                    { icon: <Phone size={20} />, label: 'Phone', value: '+91 (987) 848-8851' }
                  ].map((contact, index) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px'
                    }}>
                      <div style={{ color: '#3b82f6' }}>
                        {contact.icon}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '0.9rem',
                          color: '#64748b',
                          fontWeight: '500'
                        }}>
                          {contact.label}
                        </div>
                        <div style={{
                          fontSize: '1rem',
                          color: '#1e293b',
                          fontWeight: '600'
                        }}>
                          {contact.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  marginTop: '2rem',
                  paddingTop: '2rem',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '1rem'
                  }}>
                    Follow Me
                  </h4>
                  <div style={{
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    {[
                      { icon: <Github size={20} />, label: 'GitHub' },
                      { icon: <Linkedin size={20} />, label: 'LinkedIn' },
                      { icon: <Twitter size={20} />, label: 'Twitter' }
                    ].map((social, index) => (
                      <button
                        key={index}
                        style={{
                          width: '45px',
                          height: '45px',
                          borderRadius: '8px',
                          backgroundColor: '#f1f5f9',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#3b82f6';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#f1f5f9';
                          e.target.style.color = '#64748b';
                        }}
                      >
                        {social.icon}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: '#1e293b',
                  marginBottom: '1.5rem'
                }}>
                  Send a Message
                </h3>
                
                <form style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '1rem'
                  }}>
                    <input
                      type="text"
                      placeholder="Your Name"
                      style={{
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      style={{
                        padding: '0.75rem',
                        border: '2px solid #e2e8f0',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'border-color 0.2s ease'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                  <textarea
                    placeholder="Your Message"
                    rows="5"
                    style={{
                      padding: '0.75rem',
                      border: '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'border-color 0.2s ease',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  ></textarea>
                  <button
                    type="submit"
                    style={{
                      padding: '1rem',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#2563eb';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#3b82f6';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PortfolioDashboard;