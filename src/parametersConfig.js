const operatorParameters = (operatorNumber, offset) => {
  const offsetId = (param) => Object.assign({}, param, { id: param.id + offset })

  return [
    {
      id: 0,
      name: `OP${operatorNumber} - Attack Rate`,
      min: 0,
      max: 31
    },
    {
      id: 1,
      name: `OP${operatorNumber} - Decay 1 Rate`,
      min: 0,
      max: 31
    },
    {
      id: 2,
      name: `OP${operatorNumber} - Decay 2 Rate`,
      min: 0,
      max: 31
    },
    {
      id: 3,
      name: `OP${operatorNumber} - Release Rate`,
      min: 1,
      max: 15
    },
    {
      id: 4,
      name: `OP${operatorNumber} - Decay 1 Level`,
      min: 0,
      max: 15
    },
    {
      id: 5,
      name: `OP${operatorNumber} - Level Scaling`,
      min: 0,
      max: 99
    },
    {
      id: 6,
      name: `OP${operatorNumber} - Rate Scaling`,
      min: 0,
      max: 3
    },
    {
      id: 7,
      name: `OP${operatorNumber} - EG Bias Sensitivity`,
      min: 0,
      max: 7
    },
    {
      id: 8,
      name: `OP${operatorNumber} - Amplitude Modulation Enable`,
      min: 0,
      max: 1
    },
    {
      id: 9,
      name: `OP${operatorNumber} - Key Velocity Sensitivity`,
      min: 0,
      max: 7
    },
    {
      id: 10,
      name: `OP${operatorNumber} - Operator Output Level`,
      min: 0,
      max: 99
    },
    {
      id: 11,
      name: `OP${operatorNumber} - Frequency`,
      min: 0,
      max: 63
    },
    {
      id: 12,
      name: `OP${operatorNumber} - Detune`,
      min: 0,
      max: 6,
      default: 3
    }
  ].map(offsetId)
}

export default [
  ...operatorParameters(4,0),
  ...operatorParameters(3,13),
  ...operatorParameters(2,26),
  ...operatorParameters(1,39),
  {
    id: 52,
    name: 'Algorithm',
    min: 0,
    max: 7
  },
  {
    id: 53,
    name: 'Feedback',
    min: 0,
    max: 7
  },
  {
    id: 54,
    name: 'LFO Speed',
    min: 0,
    max: 99
  },
  {
    id: 55,
    name: 'LFO Delay',
    min: 0,
    max: 99
  },
  {
    id: 56,
    name: 'Pitch Modulation Depth',
    min: 0,
    max: 99
  },
  {
    id: 57,
    name: 'Amplitude Modulation Depth',
    min: 0,
    max: 99
  },
  {
    id: 58,
    name: 'LFO Sync',
    min: 0,
    max: 1
  },
  {
    id: 59,
    name: 'LFO Wave',
    min: 0,
    max: 3
  },
  {
    id: 60,
    name: 'Pitch Modulation Sensitivity',
    min: 0,
    max: 7
  },
  {
    id: 61,
    name: 'Amplitude Modulation Sensitivity',
    min: 0,
    max: 3
  },
  {
    id: 62,
    name: 'Transpose',
    min: 0,
    max: 48,
    default: 24
  }
]
