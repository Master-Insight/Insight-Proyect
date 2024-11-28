import React from 'react'
import SocialLinkLI from '../Social/SocialLinkLI';


const Footer01 = ({ config }) => {
  console.log(config);
  const year = new Date().getFullYear() || 2024;

  return (
    <footer className="bg-gray-100 w-full">
      <div className="mx-auto px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        {/* Upper */}
        <div class="flex flex-col gap-8 lg:flex-row lg:justify-between">
          {/* Logo */}
          <div>
            {/* Logo */}
            <div className="flex justify-center sm:justify-start">
              <img
                src={config.images.logo[0]}
                alt="Logo Insight"
                className="w-auto" />
            </div>
            {/* Descripcion */}
            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              {config.info.description}
            </p>
            {/* Social Links */}
            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {config.social && config.social.map(elm => <SocialLinkLI key={elm.name} href={elm.href} name={elm.name} icon={elm.icon} />)}
            </ul>
          </div>

          {/* Map */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            {/* Navegacion 1 */}
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Navegación</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    Inico
                  </a>
                </li>
              </ul>
            </div>
            {/* Navegacion 2 */}
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Sectores</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Proyects
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Task
                  </a>
                </li>
              </ul>
            </div>
            {/* Info */}
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Escribenos</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>

                    <span className="flex-1 text-gray-700">{config.social[0].href.split(":")[1]}</span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>

                    <span className="flex-1 text-gray-700">{config.info.whatsapp}</span>
                  </a>
                </li>

                <li
                  className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>

                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    {config.info.address}
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Booton */}
        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">Todos los derechos reservados.</span>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; {year}
              {" " + config.info.name}
            </p>
          </div>
        </div>
      </div>
    </footer>

  )
}

export default Footer01
