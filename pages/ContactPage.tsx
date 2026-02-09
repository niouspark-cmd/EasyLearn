
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <nav className="sticky top-0 z-50 glass-morphism dark:bg-slate-900/80 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white">Adesua Lab</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-6 py-2 blue-gradient text-white font-bold rounded-lg shadow-lg">Join Us</Link>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Let's Talk Success</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">Whether you're an institution looking for a bulk solution or a student needing help, we're here.</p>
          </div>

          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[40px]">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Direct Contact</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Mail className="text-blue-600" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Email Us</p>
                      <p className="text-slate-500">support@easylearn.edu.gh</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Phone className="text-blue-600" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Call Us</p>
                      <p className="text-slate-500">+233 24 123 4567</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <MapPin className="text-blue-600" />
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">Visit HQ</p>
                      <p className="text-slate-500">East Legon, Accra, Ghana</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <form className="bg-white dark:bg-slate-900 p-10 rounded-[40px] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 dark:text-white" />
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Inquiry Type</label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 dark:text-white">
                    <option>Institutional Sales</option>
                    <option>Individual Support</option>
                    <option>Partnership</option>
                  </select>
                </div>
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                  <textarea rows={4} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 dark:text-white" />
                </div>
                <button className="col-span-2 py-4 blue-gradient text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
                  Send Message <Send size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
