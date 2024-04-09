const mergeClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export { mergeClasses }
