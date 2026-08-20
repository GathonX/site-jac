const WHATSAPP_PREFILLED_MESSAGE = "Bonjour, je souhaite avoir plus d'informations sur vos offres touristiques.";

export const SITE_CONFIG = {
  // TODO: remplacer par le vrai domaine une fois réservé/déployé — utilisé pour les URLs
  // canoniques, le sitemap, og:url et les données structurées.
  siteUrl: "https://www.nosybesecretislands.com",
  name: "Nosy Be Secret Islands Tours",
  phone: "032 66 875 43",
  phoneTel: "+261326687543",
  email: "mandimbizarajuno@gmail.com",
  whatsappUrl: `https://wa.me/261326687543?text=${encodeURIComponent(WHATSAPP_PREFILLED_MESSAGE)}`,
  social: {
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
    x: "https://www.x.com",
  },
};
