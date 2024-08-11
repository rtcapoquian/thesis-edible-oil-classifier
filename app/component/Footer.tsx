import React from "react";
import { CardFooter } from "@/components/ui/card"; // Import CardFooter for styling
import { Button } from "@/components/ui/button"; // Import Button for social media links
import ModeToggle from "./ModeToggle";
import Link from "next/link"; // Import Link from Next.js

const CustomFooter: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-8 mt-16 border-t border-border">
      <div className="container mx-auto px-4">
        <CardFooter className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="text-center md:text-left space-y-4">
            <p className="text-lg font-semibold mb-4">&copy; RejiCode 2024</p>
            <div className="space-y-4">
              <a
                href="https://www.youtube.com/c/RejiCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="py-4 px-4 mr-4">
                  RejiCode on YouTube
                </Button>
              </a>
              <a
                href="https://github.com/RejiCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="py-4 px-4 mr-4">
                  RejiCode on GitHub
                </Button>
              </a>
              <a
                href="https://www.facebook.com/RejiCode"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="py-4 px-4 mr-4">
                  RejiCode on Facebook
                </Button>
              </a>
              <a
                href="https://www.linkedin.com/in/reji-code"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="py-4 px-4">
                  RejiCode on LinkedIn
                </Button>
              </a>
            </div>
          </div>
          <div className="text-center md:text-right flex items-center space-x-4">
            <Link href="/privacy-policy" passHref>
              <ModeToggle />
            </Link>
            <Link href="/terms-of-use" passHref>
              <Button variant="outline" className="py-4 px-4">
                Terms of Use
              </Button>
            </Link>
            <Link href="/privacy-policy" passHref>
              <Button variant="outline" className="py-4 px-4">
                Privacy Policy
              </Button>
            </Link>
          </div>
        </CardFooter>
      </div>
    </footer>
  );
};

export default CustomFooter;
