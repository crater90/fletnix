/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/api/register', // automatically becomes /docs/with-basePath
        destination: 'http://localhost:5000/api/register', // automatically becomes /docs/another
        permanent: true,
      },
      {
        source: '/api/login', // automatically becomes /docs/with-basePath
        destination: 'http://localhost:5000/api/login', // automatically becomes /docs/another
        permanent: true,
      },
      {
        source: '/api/checkAuth', // automatically becomes /docs/with-basePath
        destination: 'http://localhost:5000/api/checkAuth', // automatically becomes /docs/another
        permanent: true,
      },
      {
        source: '/api/all-movies-shows', // automatically becomes /docs/with-basePath
        destination: 'http://localhost:5000/api/all-movies-shows', // automatically becomes /docs/another
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
