import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ThankYou = () => {
  const handleBackToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 flex items-center justify-center px-6">
      <Card className="glass-card border-wings-grey/20 bg-white/95 backdrop-blur-md max-w-md w-full">
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/20">
              <CheckCircle className="h-12 w-12 text-primary" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-2">
              Thank You for Your Submission!
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Your details have been received and our team will contact you shortly. We appreciate your interest in WINGS Security.
            </p>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>We'll contact you within 24 hours</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Professional consultation included</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>All inquiries sent to info@wingssecurity.ie</span>
            </div>
          </div>

          <Button 
            onClick={handleBackToHome}
            className="btn-wings-primary w-full group font-bold"
          >
            <Home className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Back to Home
          </Button>

          <div className="text-xs text-muted-foreground">
            Need immediate assistance? Call{' '}
            <a href="tel:+353873694378" className="text-primary hover:underline font-medium">
              +353 87 369 4378
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ThankYou;