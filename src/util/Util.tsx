const enumKeys = function<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter(k => Number.isInteger(+k)) as K[];
}

export default enumKeys;