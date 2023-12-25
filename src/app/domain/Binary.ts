export type Bit = '0' | '1'
export type Byte = [Bit, Bit, Bit, Bit, Bit, Bit, Bit, Bit]

export function groupInBytes(bits: Bit[]): Byte[] {
  const allBits = fillZerosUntilByteSize(bits)

  const bytes: Byte[] = []
  for (let i = 0; i < allBits.length; i += 8) {
    const byte = allBits.slice(i, i + 8) as Byte
    bytes.push(byte)
  }

  return bytes
}

export function fillZerosUntilByteSize(bits: Bit[]): Bit[] {
  const result = [...bits]

  while (result.length % 8 > 0) result.unshift('0')

  return result
}
