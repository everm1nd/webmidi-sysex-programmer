const makeVoiceEditMessage = (param = 0x02, value = 0x00) => {
  // Format Info from Yamaha TX81Z Manual:
  // Voice Edit Parameters (VCED)
  // 11110000 F0h Exclusive
  // 01000011 43h I.D.number(Yamaha)
  // 0001nnnn 1nh Basic receive channel
  // 0ggggghh ggggg = Group number, hh = Subgroup number
  // 0ppppppp ppppppp = Parameter number
  // 0ddddddd ddddddd = Data
  // 11110111 F7h End Of Exclusive
  const message = [
    // I comment the first byte out as it's added in .send function
    // 0xF0, // start of System Exclusive message
    0x43, // Yamaha vendor ID
    0x11, // MIDI channel
    0b0010010, // ggggg = Group number, hh = Subgroup number.
    param,
    value,
    0xf7 // End Of System Exclusive message
  ];
  return message;
};

export default {
  makeVoiceEditMessage
}
