const mergeClasses = (...classes: any) => {
  return classes.filter(Boolean).join(' ')
}

export { mergeClasses }
