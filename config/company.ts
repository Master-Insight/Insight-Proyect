type TCompany = {
  info: TCompanyInfo;
  social: TCompanySocial[];
};

type TCompanyInfo = {
  name: string;
  description: string;
  address: string;
  whatsapp: string;
};

type TCompanySocial = {
  name: string;
  reference: string;
  icon: string;
};

const company: TCompany = {
  // Información de la empresa
  info: {
    name: "Ideas Propias",
    description: "Consultora integral de negocios que asesora a empresas, empresarios y emprendedores que tienen ambición de progresar en su negocio.",
    address: "dirección",
    whatsapp: "351-1234567",
  },
  // Información para usar en las redes sociales (no whatsapp, si e-mail)
  social: [
    {
      name: "Email",
      reference: "mailto:contacto@empresa.com",
      icon: "mdi--alternate-email", // Reemplázalo por el nombre del ícono según tu sistema.
    },
    {
      name: "Facebook",
      reference: "https://www.facebook.com/",
      icon: "mdi:facebook", // Reemplázalo por el nombre del ícono según tu sistema.
    },
    {
      name: "X (Twitter)",
      reference: "https://twitter.com/",
      icon: "mdi::twitter", // Reemplázalo por el nombre del ícono según tu sistema.
    },
    {
      name: "Instagram",
      reference: "https://www.instagram.com/",
      icon: "mdi:instagram", // Reemplázalo por el nombre del ícono según tu sistema.
    },
    {
      name: "YouTube",
      reference: "https://www.youtube.com/",
      icon: "mdi--youtube", // Reemplázalo por el nombre del ícono según tu sistema.
    },
    {
      name: "LinkedIn",
      reference: "https://www.linkedin.com/",
      icon: "mdi:linkedin", // Reemplázalo por el nombre del ícono según tu sistema.
    },
  ],
}

export default company