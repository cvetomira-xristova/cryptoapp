import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-key': '0e4655aff8mshccdfbc3aa8f168ep17395bjsnb80d24120190',
  'x-rapidapi-host': 'news-api14.p.rapidapi.com',
};

const baseUrl = 'https://news-api14.p.rapidapi.com/v2/search';

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ searchTerm, count }) =>
        createRequest(
          `/articles?query=${searchTerm}&language=en&limit=${count}`
        ),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
