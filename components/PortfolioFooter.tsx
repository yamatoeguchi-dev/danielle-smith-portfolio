interface PortfolioFooterProps {
  name: string;
  year?: number;
}

const PortfolioFooter = ({ name, year = 2026  }: PortfolioFooterProps) => {
  return (
    <footer className="w-full py-8 mt-16 border-t border-border">
      <div className="container max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm text-muted-foreground">
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
