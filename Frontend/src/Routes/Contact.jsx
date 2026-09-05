import './contact.css';
import { useState } from 'react';

const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '');

function Contact(){
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('');

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                subject: formData.subject || 'Portfolio Contact',
                message: `${formData.message}${formData.phone ? `\n\nPhone: ${formData.phone}` : ''}`,
            };

            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Unable to send your message.');
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
            console.error('Contact submit error:', error);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(''), 5000);
        }
    };

    return (
        <>
            <section className="contact-section">
                <div className="contact-container">
                    <div className="contact-header">
                        <h1>CONTACT US</h1>
                        <div className="header-divider"></div>
                        <p className="header-subtitle">Get in touch with us for all your design needs</p>
                    </div>

                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="info-card">
                                <div className="info-icon">📍</div>
                                <div className="info-details">
                                    <h3>Address</h3>
                                    <p>Cameroon<br/>Douala-Bonaberi-Rail</p>
                                </div>
                            </div>
                            
                            <div className="info-card">
                                <div className="info-icon">📧</div>
                                <div className="info-details">
                                    <h3>Email</h3>
                                    <p>aminkengivan@gmail.com</p>
                                </div>
                            </div>
                            
                            <div className="info-card">
                                <div className="info-icon">📞</div>
                                <div className="info-details">
                                    <h3>Phone</h3>
                                    <p>+237-678-204-309</p>
                                </div>
                            </div>

                            
                        </div>

                        <div className="contact-form">
                            <div className="form-header">
                                <h2>Send us a Message</h2>
                                <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="success-message">
                                    <span>✅</span>
                                    <p>Thank you! Your message has been sent successfully.</p>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="error-message">
                                    <span>⚠️</span>
                                    <p>Something went wrong. Please try again later.</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form-inputs">
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="name">Name</label>
                                        <input 
                                            type="text" 
                                            id="name"
                                            name="name" 
                                            placeholder="Enter your name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="input-group">
                                        <label htmlFor="email">Email</label>
                                        <input 
                                            type="email" 
                                            id="email"
                                            name="email" 
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="input-row">
                                    <div className="input-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            placeholder="Subject of your message"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input 
                                        type="tel" 
                                        id="phone"
                                        name="phone" 
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="input-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea 
                                        id="message"
                                        name="message" 
                                        className="message-input" 
                                        placeholder="Type your message here..."
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`send-btn ${isSubmitting ? 'submitting' : ''}`}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="spinner"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <span className="btn-arrow">→</span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                
                <div className="background-decoration">
                    <div className="floating-shape shape-1"></div>
                    <div className="floating-shape shape-2"></div>
                    <div className="floating-shape shape-3"></div>
                </div>
            </section>
        </>
    )
}

export default Contact;