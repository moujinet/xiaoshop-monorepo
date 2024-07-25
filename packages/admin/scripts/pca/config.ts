export default {
  host: 'https://www.stats.gov.cn',
  path: '/sj/tjbz/tjyqhdmhcxhfdm/2023/{page}.html',
  timeout: 5000,
  retry: 2,
  retryDelay: 1000,
  cache: {
    path: '.xiao/cache',
    lockfile: '.xiao/pca-updater.lock',
  },
  dest: {
    path: 'public/js/pca',
  },
}
