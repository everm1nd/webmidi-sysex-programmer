// Parameter types
// VCED - Voice Edit Parameters
// ACED - Voice Edit Additional Parameters
const TYPES = {
  VCED: 'VCED',
  ACED: 'ACED'
}

const operatorParameters = (operatorNumber, offset) => {
  const offsetId = (param) => Object.assign({}, param, { id: param.id + offset })

  return [
    {
      id: 0,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Attack Rate`,
      min: 0,
      max: 31
    },
    {
      id: 1,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Decay 1 Rate`,
      min: 0,
      max: 31
    },
    {
      id: 2,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Decay 2 Rate`,
      min: 0,
      max: 31
    },
    {
      id: 3,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Release Rate`,
      min: 1,
      max: 15
    },
    {
      id: 4,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Decay 1 Level`,
      min: 0,
      max: 15
    },
    {
      id: 5,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Level Scaling`,
      min: 0,
      max: 99
    },
    {
      id: 6,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Rate Scaling`,
      min: 0,
      max: 3
    },
    {
      id: 7,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - EG Bias Sensitivity`,
      min: 0,
      max: 7
    },
    {
      id: 8,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Amplitude Modulation Enable`,
      min: 0,
      max: 1
    },
    {
      id: 9,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Key Velocity Sensitivity`,
      min: 0,
      max: 7
    },
    {
      id: 10,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Operator Output Level`,
      min: 0,
      max: 99
    },
    {
      id: 11,
      type: TYPES.VCED,
      name: `OP${operatorNumber} - Frequency`,
      min: 0,
      max: 63
    },
    {
      id: 12,
      type: TYPES.VCED,
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
    type: TYPES.VCED,
    name: 'Algorithm',
    min: 0,
    max: 7
  },
  {
    id: 53,
    type: TYPES.VCED,
    name: 'Feedback',
    min: 0,
    max: 7
  },
  {
    id: 54,
    type: TYPES.VCED,
    name: 'LFO Speed',
    min: 0,
    max: 99
  },
  {
    id: 55,
    type: TYPES.VCED,
    name: 'LFO Delay',
    min: 0,
    max: 99
  },
  {
    id: 56,
    type: TYPES.VCED,
    name: 'Pitch Modulation Depth',
    min: 0,
    max: 99
  },
  {
    id: 57,
    type: TYPES.VCED,
    name: 'Amplitude Modulation Depth',
    min: 0,
    max: 99
  },
  {
    id: 58,
    type: TYPES.VCED,
    name: 'LFO Sync',
    min: 0,
    max: 1
  },
  {
    id: 59,
    type: TYPES.VCED,
    name: 'LFO Wave',
    min: 0,
    max: 3
  },
  {
    id: 60,
    type: TYPES.VCED,
    name: 'Pitch Modulation Sensitivity',
    min: 0,
    max: 7
  },
  {
    id: 61,
    type: TYPES.VCED,
    name: 'Amplitude Modulation Sensitivity',
    min: 0,
    max: 3
  },
  {
    id: 62,
    type: TYPES.VCED,
    name: 'Transpose',
    min: 0,
    max: 48,
    default: 24
  },
  {
    id: 63,
    type: TYPES.VCED,
    name: 'Poly/Mono',
    min: 0,
    max: 1
  },
  {
    id: 64,
    type: TYPES.VCED,
    name: 'Pitch Bend Range',
    min: 0,
    max: 12
  },
  {
    id: 65,
    type: TYPES.VCED,
    name: 'Portamento Mode',
    min: 0,
    max: 1
  },
  {
    id: 66,
    type: TYPES.VCED,
    name: 'Portamento Time',
    min: 0,
    max: 99
  },
  {
    id: 67,
    type: TYPES.VCED,
    name: 'Foot Control Volume',
    min: 0,
    max: 99
  },
  {
    id: 68,
    type: TYPES.VCED,
    name: 'Sustain',
    min: 0,
    max: 99
  },
  {
    id: 69,
    type: TYPES.VCED,
    name: 'Portamento',
    min: 0,
    max: 1
  },
  {
    id: 70,
    type: TYPES.VCED,
    name: 'Chorus',
    min: 0,
    max: 1
  },
  {
    id: 71,
    type: TYPES.VCED,
    name: 'Modulation Wheel Pitch',
    min: 0,
    max: 99
  },
  {
    id: 72,
    type: TYPES.VCED,
    name: 'Modulation Wheel Amplitude',
    min: 0,
    max: 99
  },
  {
    id: 73,
    type: TYPES.VCED,
    name: 'Breath Control Pitch',
    min: 0,
    max: 99
  },
  {
    id: 74,
    type: TYPES.VCED,
    name: 'Breath Control Amplitude',
    min: 0,
    max: 99
  },
  {
    id: 75,
    type: TYPES.VCED,
    name: 'Breath Control Pitch Bias',
    min: 0,
    max: 99,
    default: 50
  },
  {
    id: 76,
    type: TYPES.VCED,
    name: 'Breath Control EG Bias',
    min: 0,
    max: 99
  },
  // TODO: replace this by-character input with normal string
  {
    id: 77,
    type: TYPES.VCED,
    name: 'Voice name char 1',
    min: 32,
    max: 127
  },
  {
    id: 78,
    type: TYPES.VCED,
    name: 'Voice name char 2',
    min: 32,
    max: 127
  },
  {
    id: 79,
    type: TYPES.VCED,
    name: 'Voice name char 3',
    min: 32,
    max: 127
  },
  {
    id: 80,
    type: TYPES.VCED,
    name: 'Voice name char 4',
    min: 32,
    max: 127
  },
  {
    id: 81,
    type: TYPES.VCED,
    name: 'Voice name char 5',
    min: 32,
    max: 127
  },
  {
    id: 82,
    type: TYPES.VCED,
    name: 'Voice name char 6',
    min: 32,
    max: 127
  },
  {
    id: 83,
    type: TYPES.VCED,
    name: 'Voice name char 7',
    min: 32,
    max: 127
  },
  {
    id: 84,
    type: TYPES.VCED,
    name: 'Voice name char 8',
    min: 32,
    max: 127
  },
  {
    id: 85,
    type: TYPES.VCED,
    name: 'Voice name char 9',
    min: 32,
    max: 127
  },
  {
    id: 86,
    type: TYPES.VCED,
    name: 'Voice name char 10',
    min: 32,
    max: 127
  },
  // Parameters 87-92 not used in the TX81Z
  // This is a tricky one. Data is encoded here as 4-bit number (0-1,0-1,0-1,0-1)
  // TODO: find some nice interface solution
  {
    id: 93,
    type: TYPES.VCED,
    name: 'Operator 4-1 On/Off',
    min: 0,
    max: 15
  }
]
