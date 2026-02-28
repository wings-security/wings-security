import { Shield, Users, Clock, Award } from 'lucide-react';

const TrustBullets = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "Licensed Security Professionals"
    },
    {
      icon: Users,
      title: "Trained Officers (Static & Event Guards)"
    },
    {
      icon: Clock,
      title: "Faster Deployments"
    },
    {
      icon: Award,
      title: "Trusted by Ireland Businesses"
    }
  ];

  return (
    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 lg:gap-6">
      {trustPoints.map((point, index) => (
        <div key={index} className="flex flex-col items-center text-center space-y-2">
          <div className="p-2.5 sm:p-3 rounded-full bg-primary/20 backdrop-blur-sm">
            <point.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
          <span className="text-white text-[15px] sm:text-sm font-medium leading-snug max-w-[150px] sm:max-w-none">
            {point.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TrustBullets;
