const companies = ["Google", "Facebook", "Apple"] as const;

type Companies = (typeof companies)[number];

type CompanyConfiguration = { rating: number };

type Configuration = {
  [K in Companies]: CompanyConfiguration;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const configuration: Configuration = {
  Google: { rating: 3 },
  Facebook: { rating: 1 },
  Apple: { rating: 2 },
};
