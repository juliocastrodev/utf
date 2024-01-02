export class NotBinarySequenceError extends Error {
  constructor(str: string) {
    super(`String [${str}] is not fully made of bits`)
  }
}
