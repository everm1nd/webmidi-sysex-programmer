import PARAMETER_TYPES from './parameterTypes'

export default [
  {
    type: 'group',
    name: 'OP1',
    elements: [
      {
        type: 'parameter',
        parameterType: PARAMETER_TYPES.VCED,
        number: 0
      },
      {
        type: 'parameter',
        parameterType: PARAMETER_TYPES.VCED,
        number: 1
      },
      {
        type: 'parameter',
        parameterType: PARAMETER_TYPES.VCED,
        number: 2
      }
    ]
  },
  {
    type: 'group',
    name: 'OP2',
    elements: [
      {
        type: 'parameter',
        parameterType: PARAMETER_TYPES.VCED,
        number: 3
      },
      {
        type: 'parameter',
        parameterType: PARAMETER_TYPES.VCED,
        number: 4
      }
    ]
  }
]
