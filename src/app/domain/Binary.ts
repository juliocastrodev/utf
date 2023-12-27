export type Bit = '0' | '1'
export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]

export function groupInBytes(bits: Bit[]): Byte[] {
  if (bits.length % 8 !== 0)
    throw new Error(
      `Binary sequence ${bits} cannot be grouped in bytes: its number of bits is not multiple of 8`,
    )

  const bytes: Byte[] = []
  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.slice(i, i + 8) as Byte
    bytes.push(byte)
  }

  return bytes
}

export function isBinary(str: string) {
  return /^(0|1)+$/g.test(str)
}
