export default defineMiddleware((to) => {
  const { options } = useContext()

  useHead({
    title: to.meta.desc
      ? `${to.meta.desc} | ${options.desc}`
      : to.meta.title
        ? `${to.meta.title} | ${options.desc}`
        : options.desc,
    meta: [
      { name: 'description', content: options.desc },
    ],
  })
})
