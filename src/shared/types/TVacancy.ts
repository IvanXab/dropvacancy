export type TVacancy = {
  id: string,
  name: string,
  description: string,
  alternate_url: string,
  published_at: string,
  url: string,
  found: number,
  employment: {
    name: string,
  },
  experience: {
    name: string,
  },
  salary: {
    from: string,
    to: string,
    currency: string,
  },
  address: {
    city: string,
    lat: number | undefined,
    lng: number | undefined,
  },
  employer: {
    name: string,
    logo_urls: {
      original: string
    },
  },
  key_skills: {
    name: string,
  }[],
};