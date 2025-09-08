export default function SocialProof() {
  const companies = [
    "Wijha Real Estate",
    "Asawer Real Estate", 
    "Muscat Properties",
    "Oman Holdings"
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-muted-foreground text-lg mb-8">Trusted by leading property managers across Oman</p>
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="h-12 w-40 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground font-medium">{company}</span>
              </div>
            ))}
          </div>
          
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-medium text-foreground mb-6 leading-relaxed">
              "Bunanyat transformed our property management operations. We've reduced administrative work by 75% and improved our tenant satisfaction significantly. The bilingual support is exactly what we needed in Oman."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-lg">AH</span>
              </div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Ahmed Al-Harthi</div>
                <div className="text-muted-foreground">Property Manager, Wijha Real Estate</div>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground text-lg mt-12">Join 200+ property managers across Oman managing 5,000+ units</p>
        </div>
      </div>
    </section>
  );
}
