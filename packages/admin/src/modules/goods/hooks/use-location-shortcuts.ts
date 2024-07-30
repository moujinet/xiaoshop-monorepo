export function useLocationShortcuts() {
  const { toPath } = useLocation()

  const nationwide = [
    '11',
    '12',
    '13',
    '14',
    '15',
    '21',
    '22',
    '23',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '50',
    '51',
    '52',
    '53',
    '54',
    '61',
    '62',
    '63',
    '64',
    '65',
  ]
  const remoteLocations = ['15', '54', '63', '65']

  const shortcuts = ref([
    { label: '全国', locations: nationwide.map(a => toPath(a)) },
    { label: '偏远地区', locations: remoteLocations.map(a => toPath(a)) },
    { label: '其他(除偏远地区)', locations: nationwide.filter(code => !remoteLocations.includes(code)).map(a => toPath(a)) },
  ])

  return shortcuts
}
