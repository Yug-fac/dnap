"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/admin/protected-route"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { UpdatesBar } from "@/components/layout/updates-bar"

// Pages
import HomePage from "@/pages/home"
import AboutPage from "@/pages/about"
import PricingPage from "@/pages/pricing"
import BooksPage from "@/pages/books"
import TeamPage from "@/pages/team"
import ContactPage from "@/pages/contact"

// Admin Pages
import AdminDashboard from "@/pages/admin/dashboard"
import AdminBooks from "@/pages/admin/books"
import AdminTestimonials from "@/pages/admin/testimonials"
import AdminUpdates from "@/pages/admin/updates"
import AdminMessages from "@/pages/admin/messages"
import AdminEmails from "@/pages/admin/emails"
import AdminSpeeches from "@/pages/admin/speeches"
import AdminLogin from "@/pages/admin/login"

import "./globals.css"

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="light" storageKey="dna-publications-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Admin Login Route */}
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Protected Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/dashboard" element={<AdminDashboard />} />
                      <Route path="/books" element={<AdminBooks />} />
                      <Route path="/speeches" element={<AdminSpeeches />} />
                      <Route path="/testimonials" element={<AdminTestimonials />} />
                      <Route path="/updates" element={<AdminUpdates />} />
                      <Route path="/messages" element={<AdminMessages />} />
                      <Route path="/emails" element={<AdminEmails />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />

              {/* Public Routes */}
              <Route
                path="/*"
                element={
                  <>
                    <UpdatesBar />
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/pricing" element={<PricingPage />} />
                        <Route path="/books" element={<BooksPage />} />
                        <Route path="/team" element={<TeamPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}
