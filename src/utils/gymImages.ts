interface GymImageMapping {
  [key: string]: {
    banner: string;
    logo?: string;
  };
}

export const GYM_IMAGES: GymImageMapping = {
  "Boulder District": {
    banner: "/boulder-district-banner.png",
    logo: "/boulder-district-logo.png"
  },
  "Vertical World": {
    banner: "/vertical-world-banner.png",
    logo: "/vertical-world-logo.png"
  },
  "Seattle Bouldering Project": {
    banner: "/seattle-boulder-project-banner.png",
    logo: "/seattle-boulder-project-logo.png"
  }
};

export const getGymBanner = (gymName: string): string => {
  return GYM_IMAGES[gymName]?.banner || "/default-gym-banner.jpg";
};

export const getGymLogo = (gymName: string): string => {
  return GYM_IMAGES[gymName]?.logo || "/default-gym-logo.png";
}; 