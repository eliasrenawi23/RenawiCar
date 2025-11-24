import Link from 'next/link';
import Image from 'next/image';
import { Container } from './Container';

import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="mb-4">
                <Image 
                  src="/logo-bw.png" 
                  alt="RenawiCars Logo" 
                  width={180}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400 max-w-md">
                Your trusted partner in finding the perfect vehicle. We offer a wide selection of quality cars with transparent pricing and exceptional service.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t.common.details}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    {t.nav.home}
                  </Link>
                </li>
                <li>
                  <Link href="/cars" className="hover:text-white transition-colors">
                    {t.nav.browseCars}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    {t.nav.contact}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">{t.nav.contact}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="tel:+972501234567" className="hover:text-white transition-colors" dir="ltr">
                    +972 50-123-4567
                  </a>
                </li>
                <li>
                  <a href="mailto:info@renawicars.com" className="hover:text-white transition-colors">
                    info@renawicars.com
                  </a>
                </li>
                <li className="text-gray-400">
                  HaMasger 12<br />
                  Tel Aviv, Israel
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-gray-400">
                &copy; {currentYear} Renawi Cars. {t.footer.rights}
              </p>
              <p className="text-sm text-gray-500">
                {t.footer.vatIncluded}
              </p>
            </div>
            <div className="flex space-x-6 rtl:space-x-reverse mt-4 md:mt-0">
              <Link href="#" className="text-sm hover:text-white transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="#" className="text-sm hover:text-white transition-colors">
                {t.footer.terms}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
